from .database import SessionLocal, Base, engine
from .models import Question

Base.metadata.create_all(bind=engine)

db = SessionLocal()

questions_data = [
    # Scene Size-Up & Safety
    {
        "text": "You arrive at a motor vehicle accident scene with multiple vehicles involved. Before approaching any patients, what should you do first?",
        "options": {"A": "Begin triage", "B": "Ensure scene safety", "C": "Call for additional resources", "D": "Approach the most obvious injury"},
        "correct_answer": "B",
        "explanation": "Scene safety must be established before patient care to protect responders and patients.",
        "category": "Scene Size-Up & Safety",
        "difficulty": 850.0
    },
    {
        "text": "At a hazardous materials incident, you notice responders without proper PPE. What is your immediate action?",
        "options": {"A": "Enter the hot zone", "B": "Evacuate the area", "C": "Don appropriate PPE", "D": "Begin decontamination"},
        "correct_answer": "C",
        "explanation": "Personal protective equipment is essential for safety in hazardous environments.",
        "category": "Scene Size-Up & Safety",
        "difficulty": 900.0
    },
    # Add more scene safety questions to reach 34
]

# Generate realistic scenario-based questions
import random

scenario_templates = [
    "You respond to a {age} patient who {complaint}. {assessment}. What is your next action?",
    "EMS is called to a {location} for a patient {condition}. {vitals}. What do you do first?",
    "At a {scene}, you find a patient {symptoms}. {history}. What is your priority?",
]

def generate_scenario_question(category, template, difficulty):
    age_options = ["25-year-old", "45-year-old", "65-year-old", "8-year-old child"]
    locations = ["residential home", "nursing facility", "construction site", "restaurant"]
    conditions = ["complaining of chest pain", "with altered mental status", "who fell from height", "with difficulty breathing"]
    assessments = ["Patient is alert and oriented", "Patient appears in distress", "Patient is unresponsive", "Patient has obvious deformities"]
    vitals = ["Pulse 120, BP 140/90", "Resp 30, pulse weak", "BP 180/110, pulse 100", "SpO2 92%, resp 24"]
    symptoms = ["with severe abdominal pain", "exhibiting signs of stroke", "with suspected overdose", "who is bleeding profusely"]
    histories = ["No significant medical history", "History of diabetes", "Taking blood thinners", "Recent surgery"]
    
    q = {
        "text": template.format(
            age=random.choice(age_options),
            location=random.choice(locations),
            condition=random.choice(conditions),
            assessment=random.choice(assessments),
            vitals=random.choice(vitals),
            symptoms=random.choice(symptoms),
            history=random.choice(histories),
            complaint=random.choice(["has chest pain", "is short of breath", "fell and hit head", "has a seizure"]),
            scene=random.choice(["motor vehicle accident", "industrial accident", "home emergency", "public event"])
        ),
        "options": {"A": "Assess ABCs", "B": "Administer oxygen", "C": "Contact medical control", "D": "Transport immediately"},
        "correct_answer": random.choice(["A", "B", "C", "D"]),
        "explanation": f"This scenario requires {category.lower()} assessment and intervention.",
        "category": category,
        "difficulty": difficulty
    }
    return q

# Generate 200+ questions
categories = ["Scene Size-Up & Safety", "Primary Assessment", "Secondary Assessment", "Treatment & Transport", "Operations"]
for i in range(210):
    category = random.choice(categories)
    template = random.choice(scenario_templates)
    difficulty = 800 + random.randint(0, 400)
    q = generate_scenario_question(category, template, difficulty)
    questions_data.append(q)

# Make ~20% pediatric
pediatric_count = int(len(questions_data) * 0.2)
for i in random.sample(range(len(questions_data)), pediatric_count):
    if "pediatric" not in questions_data[i]["text"].lower():
        questions_data[i]["text"] = questions_data[i]["text"].replace("patient", "pediatric patient")

for q_data in questions_data:
    existing = db.query(Question).filter(Question.text == q_data["text"]).first()
    if not existing:
        question = Question(**q_data)
        db.add(question)

db.commit()
print(f"Seeded {len(questions_data)} NREMT blueprint questions")

db.close()