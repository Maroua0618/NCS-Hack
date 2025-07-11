# -*- coding: utf-8 -*-
"""QuizGenerator.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1KPVJ2taVs1Qv1BqbAvaJIy1rYE7zT7_G
"""

import spacy
import random
from typing import List, Dict, Tuple
import json

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Mock dataset (replace with your actual dataset)
resources = [
    {
        "topic": "Machine Learning",
        "difficulty": "beginner",
        "learning_style": "Visual",
        "content": """
        Machine learning is a subset of artificial intelligence that enables systems to learn from data.
        Supervised learning uses labeled data to train models, while unsupervised learning works with unlabeled data.
        Common algorithms include linear regression, decision trees, and neural networks.
        Overfitting occurs when a model captures noise instead of the underlying pattern.
        """
    },
    {
        "topic": "Calculus",
        "difficulty": "intermediate",
        "learning_style": "Reading/Writing",
        "content": """
        Calculus studies change through derivatives and integrals.
        A derivative represents the rate of change of a function, while an integral calculates the area under a curve.
        The fundamental theorem of calculus connects derivatives and integrals.
        Limits define the behavior of functions as inputs approach specific values.
        """
    },
    {
        "topic": "Physics",
        "difficulty": "beginner",
        "learning_style": "Kinesthetic",
        "content": """
        Physics explores the universe’s fundamental principles.
        Newton’s first law states an object at rest stays at rest unless acted upon by a force.
        Energy, the capacity to do work, exists as kinetic or potential energy.
        Momentum is the product of an object’s mass and velocity.
        """
    }
]

def load_dataset(file_path: str = None) -> List[Dict]:
    """Load dataset from a file (e.g., JSON) or use mock dataset."""
    if file_path:
        try:
            with open(file_path, 'r') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading dataset: {e}. Using mock dataset.")
    return resources

def select_resource(learning_style: str, dataset: List[Dict]) -> Dict:
    """Select a resource based on the user's learning style."""
    matching_resources = [r for r in dataset if r["learning_style"].lower() == learning_style.lower()]
    if not matching_resources:
        matching_resources = dataset  # Fallback to any resource
    return random.choice(matching_resources)

def extract_key_concepts(text: str) -> List[Dict]:
    """Extract key concepts from the resource text."""
    doc = nlp(text)
    concepts = []
    for ent in doc.ents:
        concepts.append({"text": ent.text, "label": ent.label_, "sentence": next((sent.text for sent in doc.sents if ent.text in sent.text), "")})
    for chunk in doc.noun_chunks:
        if chunk.text not in [c["text"] for c in concepts]:
            concepts.append({"text": chunk.text, "label": "NOUN", "sentence": next((sent.text for sent in doc.sents if chunk.text in sent.text), "")})
    for token in doc:
        if token.pos_ in ["VERB", "ADJ"] and token.text not in [c["text"] for c in concepts]:
            concepts.append({"text": token.text, "label": token.pos_, "sentence": next((sent.text for sent in doc.sents if token.text in sent.text), "")})
    random.shuffle(concepts)
    return concepts[:15]

def generate_multiple_choice_question(concept: Dict, text: str) -> Tuple[str, List[str], str]:
    """Generate a clear multiple-choice question."""
    sentence = concept["sentence"]
    question_templates = [
        f"In the context of '{sentence}', what is meant by '{concept['text']}'?",
        f"What best describes '{concept['text']}' in the given text?",
        f"Based on the text, what does '{concept['text']}' refer to?",
        f"Which option defines '{concept['text']}' in this resource?"
    ]
    question = random.choice(question_templates)
    correct_answer = concept["text"]
    doc = nlp(text)
    distractors = [token.text for token in doc if token.pos_ == concept["label"] and token.text != correct_answer]
    distractors = random.sample(distractors, min(3, len(distractors))) if distractors else ["data", "system", "algorithm"]
    options = distractors + [correct_answer]
    random.shuffle(options)
    return question, options, correct_answer

def generate_fill_in_the_blank_question(concept: Dict, text: str) -> Tuple[str, str]:
    """Generate a fill-in-the-blank question."""
    sentence = concept["sentence"]
    if not sentence:
        return None, None
    question = sentence.replace(concept["text"], "________")
    return question, concept["text"]

def generate_true_false_question(concept: Dict, text: str) -> Tuple[str, str]:
    """Generate a true/false question."""
    sentence = concept["sentence"]
    if not sentence:
        return None, None
    is_true = random.choice([True, False])
    if sensitive_term(concept["text"]):  # Avoid modifying sensitive terms
        is_true = True
    if is_true:
        question = f"Is this statement true based on the text? '{sentence}'"
        correct_answer = "True"
    else:
        question = f"Is this statement true based on the text? '{sentence.replace(concept['text'], 'not ' + concept['text'])}'"
        correct_answer = "False"
    return question, correct_answer

def sensitive_term(term: str) -> bool:
    """Check if a term is sensitive to negation (e.g., proper nouns)."""
    return term[0].isupper() or term in ["machine learning", "calculus", "physics"]

def generate_quiz(resource: Dict, num_questions: int = 5) -> List[Dict]:
    """Generate a dynamic quiz from the resource content."""
    concepts = extract_key_concepts(resource["content"])
    if len(concepts) < num_questions:
        num_questions = len(concepts)

    quiz = []
    question_types = ["multiple_choice", "fill_in_the_blank", "true_false"]
    for _ in range(num_questions):
        concept = random.choice(concepts)
        question_type = random.choice(question_types)

        if question_type == "multiple_choice":
            question, options, correct_answer = generate_multiple_choice_question(concept, resource["content"])
            quiz.append({
                "type": "multiple_choice",
                "question": question,
                "options": options,
                "correct_answer": correct_answer
            })
        elif question_type == "fill_in_the_blank":
            question, correct_answer = generate_fill_in_the_blank_question(concept, resource["content"])
            if question:
                quiz.append({
                    "type": "fill_in_the_blank",
                    "question": question,
                    "correct_answer": correct_answer
                })
        else:
            question, correct_answer = generate_true_false_question(concept, resource["content"])
            if question:
                quiz.append({
                    "type": "true_false",
                    "question": question,
                    "correct_answer": correct_answer
                })
        concepts.remove(concept)

    random.shuffle(quiz)
    return quiz

def evaluate_quiz(quiz: List[Dict], user_answers: List[str]) -> Tuple[float, List[Dict]]:
    """Evaluate user answers and return score and incorrect questions."""
    correct_count = 0
    incorrect_questions = []
    for i, question in enumerate(quiz):
        user_answer = user_answers[i].strip().lower() if i < len(user_answers) else ""
        correct_answer = question["correct_answer"].lower()
        if user_answer == correct_answer:
            correct_count += 1
        else:
            incorrect_questions.append({
                "question": question["question"],
                "user_answer": user_answer,
                "correct_answer": correct_answer
            })
    score = (correct_count / len(quiz)) * 100 if quiz else 0
    return score, incorrect_questions

def run_quiz(learning_style: str, dataset_file: str = None):
    """Run an interactive quiz based on the user's learning style."""
    dataset = load_dataset(dataset_file)
    resource = select_resource(learning_style, dataset)
    print(f"Selected Resource: {resource['topic']} ({resource['difficulty']}) for {learning_style} learners")
    quiz = generate_quiz(resource)
    user_answers = []

    print("\nStarting Quiz...")
    for i, question in enumerate(quiz):
        print(f"\nQuestion {i + 1}: {question['question']}")
        if question["type"] == "multiple_choice":
            for j, option in enumerate(question["options"]):
                print(f"{j + 1}. {option}")
            answer = input("Enter the number of your answer: ")
            try:
                answer_idx = int(answer) - 1
                user_answers.append(question["options"][answer_idx])
            except (ValueError, IndexError):
                user_answers.append("")
        elif question["type"] == "true_false":
            answer = input("Enter 'True' or 'False': ")
            user_answers.append(answer)
        else:
            answer = input("Fill in the blank: ")
            user_answers.append(answer)

    score, incorrect_questions = evaluate_quiz(quiz, user_answers)
    print(f"\nYour Score: {score:.2f}%")
    if score >= 60:
        print("Congratulations! You passed the quiz.")
    else:
        print("You did not pass the quiz (required: 60%). Please review the following:")
        for q in incorrect_questions:
            print(f"- Question: {q['question']}")
            print(f"  Your answer: {q['user_answer']}")
            print(f"  Correct answer: {q['correct_answer']}")

    return score, incorrect_questions, resource, quiz

# Example usage
if __name__ == "__main__":
    learning_style = "Visual"
    score, incorrect, resource, quiz = run_quiz(learning_style)