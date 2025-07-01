import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
from datetime import datetime, timedelta
import asyncio
from typing import List, Dict, Optional, Tuple
import logging
import json

class EnhancedMentorRecommendationSystem:
    def __init__(self, 
                 similarity_weight: float = 0.4,
                 rating_weight: float = 0.25,
                 availability_weight: float = 0.15,
                 activity_weight: float = 0.1,
                 compatibility_weight: float = 0.1):
        """
        Enhanced mentor recommendation system with multiple scoring factors.
        
        Args:
            similarity_weight: Weight for content similarity (expertise vs goals)
            rating_weight: Weight for mentor ratings
            availability_weight: Weight for mentor availability
            activity_weight: Weight for mentor recent activity
            compatibility_weight: Weight for learning style compatibility
        """
        self.similarity_weight = similarity_weight
        self.rating_weight = rating_weight
        self.availability_weight = availability_weight
        self.activity_weight = activity_weight
        self.compatibility_weight = compatibility_weight
        
        # Initialize components
        self.vectorizer = TfidfVectorizer(
            max_features=1000,
            ngram_range=(1, 2),
            stop_words='english',
            lowercase=True
        )
        self.scaler = MinMaxScaler()
        self.svd = TruncatedSVD(n_components=100, random_state=42)
        
        # Cache for performance
        self.mentor_cache = {}
        self.cache_expiry = timedelta(hours=1)
        self.last_cache_update = None
        
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)

        # Load data once
        users_path = './data/users.json'
        mentors_path = './data/mentors.json'
        with open(users_path, encoding='utf-8') as f:
            self.users = json.load(f)
        with open(mentors_path, encoding='utf-8') as f:
            self.mentors = json.load(f)

    async def get_user_profile(self, user_id: str) -> Optional[Dict]:
        """Get user profile from local JSON."""
        user = next((u for u in self.users if u['id'] == user_id), None)
        if not user:
            return None
        return {
            'id': user['id'],
            'learningGoals': user.get('learningGoals', []),
            'subjects': [],  # You can add more if you have subject info
            'learningStyle': user.get('learningStyle', ''),
            'bio': user.get('bio', ''),
            'totalStudyTime': user.get('totalStudyTime', 0),
            'currentStreak': user.get('currentStreak', 0)
        }

    async def get_available_mentors(self, exclude_user_id: str = None) -> List[Dict]:
        """Get mentors from local JSON."""
        mentors = [
            m for m in self.mentors
            if m.get('status', '').lower() == 'active'
            and m.get('userId') != exclude_user_id
        ]
        mentor_data = []
        for mentor in mentors:
            mentor_data.append({
                'id': mentor['userId'],
                'userId': mentor['userId'],
                'email': mentor.get('email', ''),
                'name': '',  # You can join first/last name if you want
                'expertise': mentor.get('mentorProfile', {}).get('expertise', []),
                'experience': mentor.get('mentorProfile', {}).get('experience', ''),
                'title': mentor.get('mentorProfile', {}).get('title', ''),
                'bio': '',  # You can fetch from users.json if you want
                'portfolio': mentor.get('mentorProfile', {}).get('portfolio', ''),
                'availability': mentor.get('mentorProfile', {}).get('availability', {}),
                'rating': mentor.get('ratings', {}).get('averageRating', 0.0),
                'totalReviews': mentor.get('ratings', {}).get('totalReviews', 0),
                'totalSessions': mentor.get('ratings', {}).get('totalSessions', 0),
                'recent_reviews': [],
                'activity_score': 0.5,  # Placeholder
                'availability_score': 0.5,  # Placeholder
                'last_updated': mentor.get('updatedAt', None)
            })
        return mentor_data

    async def _calculate_activity_score(self, mentor_user_id: str) -> float:
        """Calculate mentor activity score based on recent interactions."""
        try:
            # Count recent sessions (last 30 days)
            thirty_days_ago = datetime.now() - timedelta(days=30)
            
            # This would need to be adapted based on how you track mentor sessions
            # For now, using last login and profile updates as proxy
            user = await User.findById(mentor_user_id)
            
            if not user.lastLoginAt:
                return 0.0
                
            days_since_login = (datetime.now() - user.lastLoginAt).days
            
            # Score decreases with days since last login
            if days_since_login <= 7:
                return 1.0
            elif days_since_login <= 30:
                return 0.7
            elif days_since_login <= 90:
                return 0.3
            else:
                return 0.1
                
        except Exception as e:
            self.logger.error(f"Error calculating activity score: {e}")
            return 0.0

    def _calculate_availability_score(self, availability: Dict) -> float:
        """Calculate availability score based on available days and hours."""
        if not availability:
            return 0.0
            
        available_days = availability.get('availableDays', [])
        available_hours = availability.get('availableHours', '')
        
        # Score based on number of available days (more days = higher score)
        day_score = len(available_days) / 7.0 if available_days else 0.0
        
        # Simple hour scoring (could be enhanced with actual hour parsing)
        hour_score = 0.5 if available_hours else 0.0
        
        return (day_score + hour_score) / 2.0

    def _calculate_learning_style_compatibility(self, user_style: str, mentor_data: Dict) -> float:
        """Calculate compatibility based on learning styles and mentor approach."""
        if not user_style:
            return 0.5  # Neutral score if no learning style specified
            
        # This is a simplified compatibility matrix
        # You could enhance this based on educational research
        compatibility_matrix = {
            'visual': {'visual': 1.0, 'auditory': 0.6, 'kinesthetic': 0.7, 'reading': 0.8},
            'auditory': {'visual': 0.6, 'auditory': 1.0, 'kinesthetic': 0.5, 'reading': 0.7},
            'kinesthetic': {'visual': 0.7, 'auditory': 0.5, 'kinesthetic': 1.0, 'reading': 0.6},
            'reading': {'visual': 0.8, 'auditory': 0.7, 'kinesthetic': 0.6, 'reading': 1.0}
        }
        
        # Extract mentor's teaching style from bio/experience (simplified)
        mentor_text = (mentor_data.get('bio', '') + ' ' + 
                      mentor_data.get('experience', '')).lower()
        
        # Simple keyword matching for teaching style detection
        style_keywords = {
            'visual': ['visual', 'diagram', 'chart', 'image', 'demonstration'],
            'auditory': ['discussion', 'explain', 'talk', 'audio', 'verbal'],
            'kinesthetic': ['hands-on', 'practice', 'exercise', 'interactive', 'doing'],
            'reading': ['reading', 'text', 'written', 'documentation', 'articles']
        }
        
        mentor_style_scores = {}
        for style, keywords in style_keywords.items():
            score = sum(1 for keyword in keywords if keyword in mentor_text)
            mentor_style_scores[style] = score
            
        # Find dominant mentor style
        if mentor_style_scores:
            dominant_style = max(mentor_style_scores, key=mentor_style_scores.get)
            return compatibility_matrix.get(user_style.lower(), {}).get(dominant_style, 0.5)
        
        return 0.5

    async def recommend_mentors(self, user_id: str, top_n: int = 10) -> List[Dict]:
        """
        Generate mentor recommendations using multiple factors.
        
        Args:
            user_id: User ID to generate recommendations for
            top_n: Number of recommendations to return
            
        Returns:
            List of recommended mentors with scores and explanations
        """
        try:
            # Get user profile
            user_profile = await self.get_user_profile(user_id)
            if not user_profile:
                raise ValueError(f"User with id {user_id} not found")
            
            # Get available mentors (with caching)
            mentors = await self._get_mentors_with_cache(user_id)
            if not mentors:
                return []
            
            # Prepare text data for similarity calculation
            user_text = self._prepare_user_text(user_profile)
            mentor_texts = [self._prepare_mentor_text(m) for m in mentors]
            
            # Calculate content similarity
            similarity_scores = self._calculate_content_similarity(user_text, mentor_texts)
            
            # Calculate individual scores
            rating_scores = self._calculate_rating_scores(mentors)
            availability_scores = [m['availability_score'] for m in mentors]
            activity_scores = [m['activity_score'] for m in mentors]
            
            # Calculate learning style compatibility
            compatibility_scores = [
                self._calculate_learning_style_compatibility(
                    user_profile.get('learningStyle', ''), mentor
                ) for mentor in mentors
            ]
            
            # Normalize all scores
            similarity_scores = self._normalize_scores(similarity_scores)
            rating_scores = self._normalize_scores(rating_scores)
            availability_scores = self._normalize_scores(availability_scores)
            activity_scores = self._normalize_scores(activity_scores)
            compatibility_scores = self._normalize_scores(compatibility_scores)
            
            # Calculate final scores
            final_scores = (
                self.similarity_weight * similarity_scores +
                self.rating_weight * rating_scores +
                self.availability_weight * availability_scores +
                self.activity_weight * activity_scores +
                self.compatibility_weight * compatibility_scores
            )
            
            # Rank mentors
            top_indices = final_scores.argsort()[::-1][:top_n]
            
            # Prepare recommendations with explanations
            recommendations = []
            for idx in top_indices:
                mentor = mentors[idx]
                rec = {
                    'mentorId': mentor['id'],
                    'userId': mentor['userId'],
                    'name': mentor['name'],
                    'email': mentor['email'],
                    'expertise': mentor['expertise'],
                    'title': mentor['title'],
                    'rating': mentor['rating'],
                    'totalReviews': mentor['totalReviews'],
                    'availability': mentor['availability'],
                    'finalScore': float(final_scores[idx]),
                    'scoreBreakdown': {
                        'contentSimilarity': float(similarity_scores[idx]),
                        'rating': float(rating_scores[idx]),
                        'availability': float(availability_scores[idx]),
                        'activity': float(activity_scores[idx]),
                        'compatibility': float(compatibility_scores[idx])
                    },
                    'matchReason': self._generate_match_reason(
                        user_profile, mentor, 
                        similarity_scores[idx], rating_scores[idx],
                        availability_scores[idx], compatibility_scores[idx]
                    )
                }
                recommendations.append(rec)
            
            return recommendations
            
        except Exception as e:
            self.logger.error(f"Error generating recommendations: {e}")
            return []

    async def _get_mentors_with_cache(self, exclude_user_id: str) -> List[Dict]:
        """Get mentors with caching for performance."""
        now = datetime.now()
        
        if (self.last_cache_update and 
            now - self.last_cache_update < self.cache_expiry and
            exclude_user_id in self.mentor_cache):
            return self.mentor_cache[exclude_user_id]
        
        mentors = await self.get_available_mentors(exclude_user_id)
        self.mentor_cache[exclude_user_id] = mentors
        self.last_cache_update = now
        
        return mentors

    def _prepare_user_text(self, user_profile: Dict) -> str:
        """Prepare user text for similarity matching."""
        components = []
        
        if user_profile.get('learningGoals'):
            components.extend(user_profile['learningGoals'])
        if user_profile.get('subjects'):
            components.extend(user_profile['subjects'])
        if user_profile.get('bio'):
            components.append(user_profile['bio'])
        if user_profile.get('learningStyle'):
            components.append(user_profile['learningStyle'])
            
        return ' '.join(components)

    def _prepare_mentor_text(self, mentor: Dict) -> str:
        """Prepare mentor text for similarity matching."""
        components = []
        
        if mentor.get('expertise'):
            components.extend(mentor['expertise'])
        if mentor.get('title'):
            components.append(mentor['title'])
        if mentor.get('experience'):
            components.append(mentor['experience'])
        if mentor.get('bio'):
            components.append(mentor['bio'])
            
        return ' '.join(components)

    def _calculate_content_similarity(self, user_text: str, mentor_texts: List[str]) -> np.ndarray:
        """Calculate content similarity using TF-IDF and cosine similarity."""
        if not mentor_texts:
            return np.array([])
            
        all_texts = mentor_texts + [user_text]
        
        try:
            # Fit TF-IDF
            tfidf_matrix = self.vectorizer.fit_transform(all_texts)
            
            # Apply dimensionality reduction if needed
            if tfidf_matrix.shape[1] > 100:
                tfidf_matrix = self.svd.fit_transform(tfidf_matrix)
            
            # Calculate similarities
            mentor_vectors = tfidf_matrix[:-1]
            user_vector = tfidf_matrix[-1].reshape(1, -1)
            
            similarities = cosine_similarity(mentor_vectors, user_vector).flatten()
            return similarities
            
        except Exception as e:
            self.logger.error(f"Error calculating content similarity: {e}")
            return np.zeros(len(mentor_texts))

    def _calculate_rating_scores(self, mentors: List[Dict]) -> np.ndarray:
        """Calculate rating scores considering both average and review count."""
        scores = []
        for mentor in mentors:
            rating = mentor.get('rating', 0.0)
            review_count = mentor.get('totalReviews', 0)
            
            # Bayesian average to handle mentors with few reviews
            # Assumes global average of 4.0 with confidence of 10 reviews
            global_avg = 4.0
            confidence = 10
            
            bayesian_rating = (rating * review_count + global_avg * confidence) / (review_count + confidence)
            scores.append(bayesian_rating)
            
        return np.array(scores)

    def _normalize_scores(self, scores: np.ndarray) -> np.ndarray:
        """Normalize scores to 0-1 range."""
        if len(scores) == 0:
            return scores
            
        scores = np.array(scores)
        if scores.max() == scores.min():
            return np.ones_like(scores) * 0.5
            
        return (scores - scores.min()) / (scores.max() - scores.min())

    def _generate_match_reason(self, user_profile: Dict, mentor: Dict, 
                             similarity: float, rating: float, 
                             availability: float, compatibility: float) -> str:
        """Generate human-readable explanation for the match."""
        reasons = []
        
        if similarity > 0.7:
            reasons.append("Strong expertise match with your learning goals")
        elif similarity > 0.4:
            reasons.append("Good expertise alignment")
            
        if rating > 0.8:
            reasons.append("Highly rated mentor")
        elif rating > 0.6:
            reasons.append("Well-rated mentor")
            
        if availability > 0.7:
            reasons.append("Good availability")
            
        if compatibility > 0.7:
            reasons.append("Compatible teaching style")
            
        return "; ".join(reasons) if reasons else "General match based on overall profile"

# Usage example
async def main():
    recommender = EnhancedMentorRecommendationSystem()
    
    # Get recommendations
    user_id = "user_98"  # Replace with actual user ID
    recommendations = await recommender.recommend_mentors(user_id, top_n=5)
    
    for i, rec in enumerate(recommendations, 1):
        print(f"\n{i}. {rec['name']} ({rec['title']})")
        print(f"   Score: {rec['finalScore']:.3f}")
        print(f"   Rating: {rec['rating']:.1f} ({rec['totalReviews']} reviews)")
        print(f"   Match Reason: {rec['matchReason']}")
        print(f"   Expertise: {', '.join(rec['expertise'][:3])}")

if __name__ == "__main__":
    asyncio.run(main())