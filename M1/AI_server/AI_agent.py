import os
import json
from datetime import datetime, timedelta
import google.generativeai as genai


# Configure Gemini API

genai.configure(api_key="AIzaSyDtf7JlHI60LvUFsEpOBnJcRlJIhCqIBRs")
model = genai.GenerativeModel("gemini-2.0-flash")


# === AGENT CLASSES ===

class UserProfilerAgent:
    def __init__(self, user_data):
        self.user_data = user_data

    def recommend_resources(self, topic):
        learning_style = self.user_data.get('learningStyle', 'visual')
        personality = self.user_data.get('personalityStyle', 'balanced')

        prompt = (
            f"The user has a {learning_style} learning style and {personality} personality.\n"
            f"Suggest the best types of learning resources for studying the topic '{topic}'.\n"
            f"Be specific (e.g., video courses, interactive tutorials, audiobooks, flashcards, etc.)."
        )
        try:
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return f"Error generating recommendations: {str(e)}"


class GoalPlannerAgent:
    def __init__(self, goal_data, resources):
        self.goal_data = goal_data
        self.resources = resources

    def generate_roadmap(self):
        target_date = self.goal_data.get("targetCompletionDate")
        if isinstance(target_date, str):
            target_date = datetime.strptime(target_date, "%Y-%m-%d")
        else:
            target_date = datetime.now() + timedelta(days=30)

        total_days = max(1, (target_date - datetime.now()).days)
        total_resources = len(self.resources)

        prompt = (
            f"Generate a step-by-step learning roadmap for the topic '{self.goal_data.get('topic', 'General Learning')}' "
            f"to be completed in {total_days} days using the following {total_resources} resources:\n"
            f"{', '.join(self.resources)}\n"
            f"The plan should:\n"
            f"- Distribute the resources across the {total_days} days\n"
            f"- Include estimated daily durations\n"
            f"- Add completion checkpoints or questions\n"
            f"- Match the tone to someone self-learning and trying to stay motivated"
        )

        try:
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return f"Error generating roadmap: {str(e)}"


class QuizEvaluatorAgent:
    def evaluate_quiz(self, answers, quiz_questions):
        if not answers or not quiz_questions or len(answers) != len(quiz_questions):
            return {
                "score": 0,
                "failed_questions": [],
                "feedback": "Invalid quiz data provided"
            }

        correct_count = sum(1 for i, ans in enumerate(answers) if ans == quiz_questions[i].get('correctIndex', 0))
        score = (correct_count / len(quiz_questions)) * 100

        failed_questions = []
        for i in range(len(answers)):
            if answers[i] != quiz_questions[i].get('correctIndex', 0):
                correct_idx = quiz_questions[i].get('correctIndex', 0)
                user_idx = answers[i]
                options = quiz_questions[i].get('options', [])
                failed_questions.append({
                    "question": quiz_questions[i].get("question", f"Question {i+1}"),
                    "correctAnswer": options[correct_idx] if correct_idx < len(options) else "Unknown",
                    "yourAnswer": options[user_idx] if user_idx < len(options) else "Unknown"
                })

        prompt = (
            f"The user scored {score:.2f}% on a quiz with {len(quiz_questions)} questions.\n"
            f"They got {correct_count} correct and missed {len(failed_questions)}.\n"
            "Missed Questions:\n" +
            "\n".join([
                f"Q: {fq['question']}\nYour Answer: {fq['yourAnswer']}\nCorrect Answer: {fq['correctAnswer']}"
                for fq in failed_questions[:3]
            ]) +
            "\nGive personalized motivational feedback. Suggest 1-2 areas to review. Keep it encouraging and under 4 lines."
        )

        try:
            response = model.generate_content(prompt)
            feedback = response.text.strip()
        except Exception as e:
            feedback = f"Quiz completed! Score: {score:.1f}%. Keep practicing to improve!"

        return {
            "score": score,
            "failed_questions": failed_questions,
            "feedback": feedback
        }


class DynamicMilestoneAgent:
    def create_milestones(self, total_days, topic, difficulty):
        prompt = (
            f"Create a simple learning plan for '{topic}' (difficulty: {difficulty}) over {total_days} days. "
            f"Resources: {', '.join(['Resource ' + str(i+1) for i in range(total_days)])}. "
            f"Return a simple text format with daily goals, not JSON."
        )
        try:
            response = model.generate_content(prompt)
            return {"milestones": response.text.strip()}
        except Exception as e:
            return {"milestones": f"Day-by-day plan for {topic} over {total_days} days."}

    def handle_quiz_failure(self, failed_questions):
        prompt = (
            f"User failed {len(failed_questions)} quiz questions. "
            f"Suggest review tasks for milestone {1}. "
            f"Keep response in simple text format."
        )
        try:
            response = model.generate_content(prompt)
            return {"review_plan": response.text.strip()}
        except Exception as e:
            return {"review_plan": "Review the failed topics and retake the quiz when ready."}


class MotivatorAgent:
    def generate_quote(self, personality_style):
        prompt = f"Generate a short motivational quote for a learner with {personality_style} personality style. Be encouraging and personalized."
        try:
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return "Every expert was once a beginner. Keep learning!"


class AdaptiveDifficultyAgent:
    def adjust_difficulty(self, quiz_score):
        if quiz_score > 80:
            suggestion = "Consider increasing difficulty level"
        elif quiz_score < 60:
            suggestion = "Consider easier materials or more review time"
        else:
            suggestion = "Current difficulty level is appropriate"
        return {"difficulty_suggestion": suggestion, "score": quiz_score}


class ProgressOptimizerAgent:
    def adjust_roadmap(self, completed_today, avg_completion_rate, current_difficulty, user_personality):
        prompt = (
            f"A learner completed {completed_today} milestones today.\n"
            f"Their average daily completion rate is {avg_completion_rate:.2f}.\n"
            f"The current difficulty level of content is '{current_difficulty}'.\n"
            f"Their personality type is '{user_personality}'.\n"
            "As an AI learning assistant, suggest if we should adjust the learner's roadmap. "
            "Provide one of these options: [increase workload], [reduce workload], [maintain pace].\n"
            "Explain why in a short, motivating tone (max 3 lines)."
        )
        try:
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return "Maintain current pace. You're doing great! Keep up the consistent effort."


class SessionAnalyticsAgent:
    def analyze_sessions(self, session_data):
        if not session_data:
            return {"analysis": "Start tracking your study sessions for better insights!"}
        prompt = f"Analyze this study data: {session_data}. Give simple scheduling advice."
        try:
            response = model.generate_content(prompt)
            return {"analysis": response.text.strip()}
        except Exception as e:
            return {"analysis": "Keep consistent study sessions for better results."}


# === MAIN SYSTEM ===

def run_learning_flow(user, goal, answers=None, quiz_questions=None, completed_today=0, session_data=None):
    # No database calls; user and goal are passed directly

    # Initialize agents
    profiler = UserProfilerAgent(user)
    planner = GoalPlannerAgent(goal, ["Resource 1", "Resource 2", "Resource 3"])
    evaluator = QuizEvaluatorAgent()
    milestone_manager = DynamicMilestoneAgent()
    motivator = MotivatorAgent()
    difficulty_adjuster = AdaptiveDifficultyAgent()
    progress_optimizer = ProgressOptimizerAgent()
    session_analyzer = SessionAnalyticsAgent()

    results = {}

    topic = goal.get("goalDetails", {}).get("topic", "General Learning")
    results["useful_tips_for_choosing_external_resources"] = profiler.recommend_resources(topic)

    results["roadmap"] = planner.generate_roadmap()

    target_date = goal.get("goalDetails", {}).get("targetCompletionDate", datetime.now() + timedelta(days=30))
    if isinstance(target_date, str):
        target_date = datetime.strptime(target_date, "%Y-%m-%d")
    total_days = max(1, (target_date - datetime.now()).days)
    results["milestones"] = milestone_manager.create_milestones(
        total_days, topic, user.get("testResults", {}).get("level", "beginner")
    )

 

    results["motivational_quote"] = motivator.generate_quote(user.get("personalityStyle", "balanced"))

    quiz_score = results.get("quiz_result", {}).get("score", 70)
    results["difficulty_adjustment"] = difficulty_adjuster.adjust_difficulty(quiz_score)

    completion_rate = completed_today / max(1, total_days)
    results["roadmap_adjustment"] = progress_optimizer.adjust_roadmap(
        completed_today, completion_rate, user.get("testResults", {}).get("level", "beginner"), user.get("personalityStyle", "balanced")
    )

    results["session_insights"] = session_analyzer.analyze_sessions(session_data)

    return results


# === EXAMPLE USAGE ===

if __name__ == "__main__":
    # Sample test input
    user_data = {
        "_id": "user123",
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "learningStyle": "visual",
        "personalityStyle": "INTJ",
        "testResults": {
            "learningStyleScore": {"visual": 90, "auditory": 5, "kinesthetic": 5},
            "level": "beginner"
        }
    }
    goal_data = {
        "_id": "goal123",
        "userId": "user123",
        "goalDetails": {
            "title": "Learn Python",
            "description": "Master Python basics",
            "topic": "Python Programming",
            "subject": "Web Development",
            "difficulty": "Beginner",
            "targetCompletionDate": "2025-08-01"
        },
        "progress": {
            "currentProgress": 0,
            "totalMilestones": 0
        }
    }
    quiz_questions = [
        {
            "question": "What is a variable?",
            "options": ["A storage location", "A function", "A loop", "A class"],
            "correctIndex": 0
        },
        {
            "question": "How do you print in Python?",
            "options": ["console.log()", "print()", "echo", "printf()"],
            "correctIndex": 1
        }
    ]
    user_answers = [0, 1]  # Both correct
    session_data = {
        "sessions": [{"date": "2025-07-01", "duration": 60, "completed": 2}]
    }

    result = run_learning_flow(
        user_data, 
        goal_data, 
        answers=user_answers, 
        quiz_questions=quiz_questions,
        completed_today=3, 
        session_data=session_data
    )
    
    def print_section_header(title):
        print("\n" + "═" * 60)
        print(f"📌 {title.upper()}")
        print("─" * 60)

    def print_result(result):
        for key, value in result.items():
            print_section_header(key)
            if isinstance(value, dict):
                for k, v in value.items():
                    print(f"  • {k}: {v}")
            else:
                print(value.strip())

    print("\n📊 LEARNING FLOW RESULTS")
    print("═" * 60)
    print_result(result)
