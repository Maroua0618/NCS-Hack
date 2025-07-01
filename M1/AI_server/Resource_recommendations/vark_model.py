import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.neural_network import MLPRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import xgboost as xgb
from sklearn.pipeline import Pipeline
import warnings
warnings.filterwarnings('ignore')

class VARKRecommendationModel:
    def evaluate_accuracy(self, df, student_profile=None, cv=5):
        """
        Evaluate model accuracy using cross-validation (R² and RMSE)
        Args:
            df: DataFrame with resource data
            student_profile: dict with student VARK preferences
            cv: number of cross-validation folds
        """
        from sklearn.model_selection import cross_val_score
        from sklearn.pipeline import Pipeline
        from sklearn.preprocessing import StandardScaler
        import xgboost as xgb

        # Engineer features with student profile
        if student_profile is None:
            student_profile = {'visual': 1, 'auditory': 1, 'reading': 1, 'kinesthetic': 1}

        df_features = self.engineer_features(df, student_profile)
        X, y = self.prepare_data(df_features)
        # If y is None, cannot evaluate accuracy
        if y is None:
            print("No target variable found for cross-validation accuracy evaluation.")
            return
        # Drop rows where y is missing
        mask = ~y.isna()
        X = X.loc[mask]
        y = y.loc[mask]
        if len(y) == 0:
            print("No valid target values for cross-validation.")
            return

        # Create a fresh pipeline for cross-validation
        if self.model_type == 'xgboost':
            model = xgb.XGBRegressor(
                n_estimators=100,
                max_depth=6,
                learning_rate=0.1,
                random_state=42
            )
        elif self.model_type == 'random_forest':
            from sklearn.ensemble import RandomForestRegressor
            model = RandomForestRegressor(
                n_estimators=100,
                max_depth=10,
                random_state=42
            )
        elif self.model_type == 'neural_network':
            from sklearn.neural_network import MLPRegressor
            model = MLPRegressor(
                hidden_layer_sizes=(64, 32, 16),
                activation='relu',
                solver='adam',
                max_iter=500,
                random_state=42
            )
        elif self.model_type == 'gradient_boost':
            from sklearn.ensemble import GradientBoostingRegressor
            model = GradientBoostingRegressor(
                n_estimators=100,
                learning_rate=0.1,
                max_depth=6,
                random_state=42
            )
        else:
            from sklearn.linear_model import Ridge
            model = Ridge(alpha=1.0)

        pipeline = Pipeline([
            ('scaler', StandardScaler()),
            ('regressor', model)
        ])


    def __init__(self, model_type='xgboost'):
        """
        Initialize the VARK-based recommendation model
        
        Args:
            model_type: 'xgboost', 'random_forest', 'neural_network', 'gradient_boost'
        """
        self.model_type = model_type
        self.model = None
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.feature_columns = []
        
    def calculate_vark_compatibility(self, student_vark, resource_vark):
        """
        Calculate compatibility score between student VARK profile and resource
        
        Args:
            student_vark: dict with keys ['visual', 'auditory', 'reading', 'kinesthetic']
            resource_vark: dict with keys ['vark_visual', 'vark_auditory', 'vark_reading', 'vark_kinesthetic']
        
        Returns:
            compatibility_score: float between 0-1
        """
        # Only use VARK keys from student_vark
        vark_keys = ['visual', 'auditory', 'reading', 'kinesthetic']
        vark_scores = {k: float(student_vark.get(k, 0)) for k in vark_keys}
        total_student = sum(vark_scores.values())
        if total_student == 0:
            return 0
        student_norm = {k: v/total_student for k, v in vark_scores.items()}
        
        # Normalize resource VARK scores
        total_resource = (resource_vark['vark_visual'] + resource_vark['vark_auditory'] + 
                         resource_vark['vark_reading'] + resource_vark['vark_kinesthetic'])
        if total_resource == 0:
            return 0
            
        resource_norm = {
            'visual': resource_vark['vark_visual'] / total_resource,
            'auditory': resource_vark['vark_auditory'] / total_resource,
            'reading': resource_vark['vark_reading'] / total_resource,
            'kinesthetic': resource_vark['vark_kinesthetic'] / total_resource
        }
        
        # Calculate compatibility using cosine similarity
        compatibility = (
            student_norm['visual'] * resource_norm['visual'] +
            student_norm['auditory'] * resource_norm['auditory'] +
            student_norm['reading'] * resource_norm['reading'] +
            student_norm['kinesthetic'] * resource_norm['kinesthetic']
        )
        
        return compatibility
    
    def engineer_features(self, df, student_profile=None):
        """
        Create engineered features for the model
        
        Args:
            df: DataFrame with resource data
            student_profile: dict with student VARK preferences (for prediction)
        
        Returns:
            DataFrame with engineered features
        """
        features_df = df.copy()
        
        # Multimodal score (how many different modalities the resource supports)
        features_df['multimodal_score'] = (
            features_df['has_visuals'].astype(int) +
            features_df['has_audio'].astype(int) +
            features_df['has_text'].astype(int) +
            features_df['is_interactive'].astype(int)
        ) / 4.0
        
        # VARK dominance score (how much the resource favors one style)
        vark_cols = ['vark_visual', 'vark_auditory', 'vark_reading', 'vark_kinesthetic']
        features_df['vark_dominance'] = features_df[vark_cols].max(axis=1) / features_df[vark_cols].sum(axis=1)
        
        # Quality score (combination of ratings and completion rate)
        features_df['quality_score'] = (
            features_df['effectiveness_rating'] * 0.4 +
            features_df['user_ratings_average'] * 0.3 +
            features_df['completion_rate'] * 0.3
        )
        
        # Engagement score (time spent vs duration)
        features_df['engagement_ratio'] = np.where(
            features_df['duration_minutes'] > 0,
            features_df['time_spent_average'] / features_df['duration_minutes'],
            0
        )
        
        # Difficulty appropriateness (encode difficulty levels)
        difficulty_mapping = {'Beginner': 1, 'Intermediate': 2, 'Advanced': 3}
        features_df['difficulty_numeric'] = features_df['difficulty_level'].map(difficulty_mapping)
        
        # If student profile provided, calculate compatibility
        if student_profile:
            features_df['vark_compatibility'] = features_df.apply(
                lambda row: self.calculate_vark_compatibility(
                    student_profile,
                    {
                        'vark_visual': row['vark_visual'],
                        'vark_auditory': row['vark_auditory'],
                        'vark_reading': row['vark_reading'],
                        'vark_kinesthetic': row['vark_kinesthetic']
                    }
                ), axis=1
            )
        
        return features_df
    
    def prepare_data(self, df, target_column='recommendation_score'):
        """
        Prepare data for training/prediction
        
        Args:
            df: DataFrame with features
            target_column: name of target variable
        
        Returns:
            X: feature matrix, y: target vector
        """
        # Select numerical features
        numerical_features = [
            'vark_visual', 'vark_auditory', 'vark_reading', 'vark_kinesthetic',
            'effectiveness_rating', 'user_ratings_average', 'completion_rate',
            'duration_minutes', 'time_spent_average', 'difficulty_numeric',
            'multimodal_score', 'vark_dominance', 'quality_score', 'engagement_ratio'
        ]
        
        # Add VARK compatibility if available
        if 'vark_compatibility' in df.columns:
            numerical_features.append('vark_compatibility')
        
        # Select categorical features
        categorical_features = ['resource_type', 'subject', 'vark_dominant_style']
        
        # Handle categorical encoding
        df_encoded = df.copy()
        for cat_col in categorical_features:
            if cat_col in df.columns:
                if cat_col not in self.label_encoders:
                    self.label_encoders[cat_col] = LabelEncoder()
                    df_encoded[cat_col + '_encoded'] = self.label_encoders[cat_col].fit_transform(df[cat_col].fillna('Unknown'))
                else:
                    df_encoded[cat_col + '_encoded'] = self.label_encoders[cat_col].transform(df[cat_col].fillna('Unknown'))
                numerical_features.append(cat_col + '_encoded')
        
        # Select final features
        available_features = [col for col in numerical_features if col in df_encoded.columns]
        X = df_encoded[available_features].fillna(0)
        
        self.feature_columns = available_features
        
        if target_column in df.columns:
            y = df[target_column]
            return X, y
        else:
            return X, None
    
    def create_target_variable(self, df):
        """
        Create a recommendation score target variable from existing metrics
        
        Args:
            df: DataFrame with resource data
        
        Returns:
            DataFrame with recommendation_score column
        """
        df_copy = df.copy()
        
        # Create composite recommendation score
        # Weights: effectiveness (30%), user ratings (25%), completion rate (25%), engagement (20%)
        df_copy['recommendation_score'] = (
            df_copy['effectiveness_rating'] * 0.3 +
            df_copy['user_ratings_average'] * 0.25 +
            df_copy['completion_rate'] * 0.25 +
            np.clip(df_copy['time_spent_average'] / df_copy['duration_minutes'], 0, 2) * 0.2
        )
        
        # Normalize to 0-10 scale
        df_copy['recommendation_score'] = np.clip(df_copy['recommendation_score'], 0, 10)
        
        return df_copy
    
    def train(self, df, student_profiles=None, student_profile=None):
        """
        Train the recommendation model
        
        Args:
            df: DataFrame with resource data
            student_profiles: list of student VARK profiles for training
            student_profile: single student VARK profile (for feature consistency)
        """
        # Create target variable if not exists
        if 'recommendation_score' not in df.columns:
            df = self.create_target_variable(df)
        
        # Engineer features
        if student_profiles:
            # If multiple student profiles, simulate interactions
            training_data = []
            for student in student_profiles:
                student_df = self.engineer_features(df, student)
                training_data.append(student_df)
            df_features = pd.concat(training_data, ignore_index=True)
        else:
            # Use provided student_profile or a default one for feature consistency
            if student_profile is None:
                # Default: balanced VARK
                student_profile = {'visual': 1, 'auditory': 1, 'reading': 1, 'kinesthetic': 1}
            df_features = self.engineer_features(df, student_profile)
        
        # Prepare data
        X, y = self.prepare_data(df_features)
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        # Initialize model based on type
        if self.model_type == 'xgboost':
            self.model = xgb.XGBRegressor(
                n_estimators=100,
                max_depth=6,
                learning_rate=0.1,
                random_state=42
            )
        elif self.model_type == 'random_forest':
            self.model = RandomForestRegressor(
                n_estimators=100,
                max_depth=10,
                random_state=42
            )
        elif self.model_type == 'neural_network':
            self.model = MLPRegressor(
                hidden_layer_sizes=(64, 32, 16),
                activation='relu',
                solver='adam',
                max_iter=500,
                random_state=42
            )
        elif self.model_type == 'gradient_boost':
            self.model = GradientBoostingRegressor(
                n_estimators=100,
                learning_rate=0.1,
                max_depth=6,
                random_state=42
            )
        else:
            self.model = Ridge(alpha=1.0)
        
        # Train model
        self.model.fit(X_scaled, y)
        
        # Print training results
        predictions = self.model.predict(X_scaled)
        mse = mean_squared_error(y, predictions)
        mae = mean_absolute_error(y, predictions)
        r2 = r2_score(y, predictions)
        
        print(f"Training Results ({self.model_type}):")
        print(f"MSE: {mse:.4f}")
        print(f"MAE: {mae:.4f}")
        print(f"R² Score: {r2:.4f}")
        
        return self
    
    def predict(self, df, student_profile):
        """
        Predict recommendation scores for resources given a student profile
        
        Args:
            df: DataFrame with resource data
            student_profile: dict with student VARK preferences
        
        Returns:
            array of recommendation scores
        """
        if self.model is None:
            raise ValueError("Model not trained. Call train() first.")
        
        # Engineer features with student profile
        df_features = self.engineer_features(df, student_profile)
        
        # Prepare data
        X, _ = self.prepare_data(df_features)
        
        # Scale features
        X_scaled = self.scaler.transform(X)
        
        # Predict
        predictions = self.model.predict(X_scaled)
        
        return predictions
    
    def recommend(self, df, student_profile, subject=None, topic=None, learning_goal=None, top_k=10):
        """
        Get top-k recommendations for a student, with hard constraints on VARK preferences.
        
        Args:
            df: DataFrame with resource data
            student_profile: dict with student VARK preferences
            subject: optional subject to filter by (overrides student_profile if provided)
            topic: optional topic to filter by (overrides student_profile if provided)
            learning_goal: optional learning goal to filter by (overrides student_profile if provided)
            top_k: number of recommendations to return
        
        Returns:
            DataFrame with top recommendations
        """
        # Use subject/topic/learning_goal from student_profile if not explicitly provided
        subject_val = subject if subject is not None else student_profile.get('subject')
        topic_val = topic if topic is not None else student_profile.get('topic')
        learning_goal_val = learning_goal if learning_goal is not None else student_profile.get('learning_goal')

        df_filtered = df.copy()
        # Filter by subject if provided
        if subject_val:
            df_filtered = df_filtered[df_filtered['subject'].str.contains(subject_val, case=False, na=False)]
        # Filter by topic if provided
        if topic_val:
            df_filtered = df_filtered[df_filtered['topic'].str.contains(topic_val, case=False, na=False)]
        # Filter by learning goal if provided
        if learning_goal_val:
            df_filtered = df_filtered[df_filtered['learning_goal'].str.contains(learning_goal_val, case=False, na=False)]

        # --- HARD CONSTRAINTS BASED ON VARK PROFILE ---
        # If reading is 0, exclude text resources and resources with vark_dominant_style == 'vark_reading'
        if 'reading' in student_profile and student_profile['reading'] == 0:
            if 'resource_type' in df_filtered.columns:
                df_filtered = df_filtered[df_filtered['resource_type'].str.lower() != 'text']
            if 'vark_dominant_style' in df_filtered.columns:
                df_filtered = df_filtered[df_filtered['vark_dominant_style'].str.lower() != 'vark_reading']
        # If visual is 0, exclude resources with vark_dominant_style == 'vark_visual'
        if 'visual' in student_profile and student_profile['visual'] == 0:
            if 'vark_dominant_style' in df_filtered.columns:
                df_filtered = df_filtered[df_filtered['vark_dominant_style'].str.lower() != 'vark_visual']
        # If auditory is 0, exclude resources with vark_dominant_style == 'vark_auditory'
        if 'auditory' in student_profile and student_profile['auditory'] == 0:
            if 'vark_dominant_style' in df_filtered.columns:
                df_filtered = df_filtered[df_filtered['vark_dominant_style'].str.lower() != 'vark_auditory']
        # If kinesthetic is 0, exclude resources with vark_dominant_style == 'vark_kinesthetic'
        if 'kinesthetic' in student_profile and student_profile['kinesthetic'] == 0:
            if 'vark_dominant_style' in df_filtered.columns:
                df_filtered = df_filtered[df_filtered['vark_dominant_style'].str.lower() != 'vark_kinesthetic']

        if df_filtered.empty:
            return pd.DataFrame()

        # Get predictions
        scores = self.predict(df_filtered, student_profile)

        # Add scores to dataframe
        df_filtered = df_filtered.copy()
        df_filtered['predicted_score'] = scores

        # Sort by score and return top-k
        recommendations = df_filtered.nlargest(top_k, 'predicted_score')

        return recommendations[['resource_type', 'subject', 'topic', 
                               'learning_goal', 'description', 'url', 'predicted_score']]
    
    def get_feature_importance(self):
        """
        Get feature importance from the trained model
        
        Returns:
            DataFrame with feature importance
        """
        if self.model is None:
            raise ValueError("Model not trained. Call train() first.")
        
        if hasattr(self.model, 'feature_importances_'):
            importance_df = pd.DataFrame({
                'feature': self.feature_columns,
                'importance': self.model.feature_importances_
            }).sort_values('importance', ascending=False)
            return importance_df
        else:
            print("Feature importance not available for this model type.")
            return None

# Example usage and testing
def main():

    file_path = '../Datasets/comprehensive_vark_dataset.csv' 
    df = pd.read_csv(file_path)
    df = pd.DataFrame(df)

    # Ensure target variable exists for all models
    model_for_target = VARKRecommendationModel()
    df = model_for_target.create_target_variable(df)

    student_profile = {
    'visual': 100,
    'auditory': 100,
    'reading': 0,
    'kinesthetic': 0,
    'subject': 'Music',
    'topic': None,
    'learning_goal': None
}

    # Only use xgboost model
  
    model = VARKRecommendationModel(model_type='xgboost')
    model.train(df, student_profile=student_profile)
    from io import StringIO
    import sys
    old_stdout = sys.stdout
    sys.stdout = mystdout = StringIO()
    model.evaluate_accuracy(df, student_profile=student_profile)
    sys.stdout = old_stdout
    output = mystdout.getvalue()
    print(output)

    # Recommend resources
    recommendations = model.recommend(df, student_profile, top_k=5)
    print("\nTop 5 Recommendations:")
    print(recommendations)
    # Show feature importance if available
    importance = model.get_feature_importance()
    if importance is not None:
        print("\nFeature Importance:")
        print(importance.head(10))

if __name__ == "__main__":
    main()