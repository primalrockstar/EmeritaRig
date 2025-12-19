from .database import SessionLocal, Base, engine
from .models import Question

Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Sample NREMT-style questions
questions_data = [
    # Trauma questions (15)
    {
        "text": "A patient has been involved in a motor vehicle accident and is unresponsive. What is the priority assessment?",
        "options": {"A": "Airway", "B": "Breathing", "C": "Circulation", "D": "Disability"},
        "correct_answer": "A",
        "explanation": "Airway is the first priority in the ABCs of trauma assessment.",
        "category": "Trauma",
        "difficulty": 800.0
    },
    {
        "text": "You arrive at a scene where a patient has fallen from a height. The patient is conscious but complaining of back pain. What should you do first?",
        "options": {"A": "Immobilize the spine", "B": "Assess vital signs", "C": "Administer pain medication", "D": "Move the patient"},
        "correct_answer": "A",
        "explanation": "Suspected spinal injury requires immobilization before other interventions.",
        "category": "Trauma",
        "difficulty": 900.0
    },
    {
        "text": "A patient presents with a gunshot wound to the abdomen. What type of shock is most likely?",
        "options": {"A": "Hypovolemic", "B": "Cardiogenic", "C": "Distributive", "D": "Obstructive"},
        "correct_answer": "A",
        "explanation": "Abdominal injuries often lead to hypovolemic shock due to blood loss.",
        "category": "Trauma",
        "difficulty": 1000.0
    },
    {
        "text": "During assessment of a trauma patient, you note paradoxical chest movement. This indicates:",
        "options": {"A": "Flail chest", "B": "Pneumothorax", "C": "Hemothorax", "D": "Pulmonary contusion"},
        "correct_answer": "A",
        "explanation": "Paradoxical chest movement is a sign of flail chest where a segment moves opposite to the rest.",
        "category": "Trauma",
        "difficulty": 1100.0
    },
    {
        "text": "A patient has a penetrating chest wound. What is the immediate treatment?",
        "options": {"A": "Apply occlusive dressing", "B": "Remove the object", "C": "Apply direct pressure", "D": "Start CPR"},
        "correct_answer": "A",
        "explanation": "Occlusive dressing prevents air from entering the pleural space in penetrating chest wounds.",
        "category": "Trauma",
        "difficulty": 1200.0
    },
    # Add more trauma questions here (10 more to make 15)
    {
        "text": "In assessing a head injury patient, what is a sign of increasing intracranial pressure?",
        "options": {"A": "Bradycardia", "B": "Hypertension", "C": "Tachycardia", "D": "Hypotension"},
        "correct_answer": "A",
        "explanation": "Cushing's triad includes bradycardia as a late sign of increased ICP.",
        "category": "Trauma",
        "difficulty": 1000.0
    },
    {
        "text": "A patient with a femur fracture is in severe pain. What analgesic can EMT-B administer?",
        "options": {"A": "Morphine", "B": "Fentanyl", "C": "Nitrous oxide", "D": "Ibuprofen"},
        "correct_answer": "C",
        "explanation": "EMT-B can administer nitrous oxide for pain management in some protocols.",
        "category": "Trauma",
        "difficulty": 900.0
    },
    {
        "text": "What is the primary concern with pelvic fractures?",
        "options": {"A": "Airway obstruction", "B": "Massive hemorrhage", "C": "Spinal injury", "D": "Pneumothorax"},
        "correct_answer": "B",
        "explanation": "Pelvic fractures can cause significant internal bleeding.",
        "category": "Trauma",
        "difficulty": 1100.0
    },
    {
        "text": "A burn patient has burns to the face and neck. What is the priority?",
        "options": {"A": "Assess airway", "B": "Cool the burns", "C": "Remove clothing", "D": "Give fluids"},
        "correct_answer": "A",
        "explanation": "Burns to the face and neck can compromise the airway.",
        "category": "Trauma",
        "difficulty": 800.0
    },
    {
        "text": "In a mass casualty incident, how do you prioritize patients?",
        "options": {"A": "START triage", "B": "By age", "C": "By gender", "D": "Randomly"},
        "correct_answer": "A",
        "explanation": "START (Simple Triage And Rapid Treatment) is used for mass casualty triage.",
        "category": "Trauma",
        "difficulty": 1000.0
    },
    # Cardiology questions (15)
    {
        "text": "A patient complains of chest pain. What is the first question to ask?",
        "options": {"A": "When did it start?", "B": "What does it feel like?", "C": "Is it radiating?", "D": "Rate the pain"},
        "correct_answer": "A",
        "explanation": "Time of onset helps determine if it's acute coronary syndrome.",
        "category": "Cardiology",
        "difficulty": 800.0
    },
    {
        "text": "What ECG finding indicates myocardial infarction?",
        "options": {"A": "ST elevation", "B": "T wave inversion", "C": "Q waves", "D": "All of the above"},
        "correct_answer": "D",
        "explanation": "ST elevation, T wave inversion, and Q waves can all indicate MI.",
        "category": "Cardiology",
        "difficulty": 1200.0
    },
    {
        "text": "A patient is in cardiac arrest. What is the ratio for compressions to breaths in adult CPR?",
        "options": {"A": "30:2", "B": "15:2", "C": "5:1", "D": "10:2"},
        "correct_answer": "A",
        "explanation": "Adult CPR ratio is 30 compressions to 2 breaths.",
        "category": "Cardiology",
        "difficulty": 900.0
    },
    {
        "text": "What medication can EMT-B administer for chest pain?",
        "options": {"A": "Aspirin", "B": "Nitroglycerin", "C": "Morphine", "D": "Heparin"},
        "correct_answer": "A",
        "explanation": "EMT-B can administer aspirin for suspected cardiac chest pain.",
        "category": "Cardiology",
        "difficulty": 1000.0
    },
    {
        "text": "A patient has a pulse but is not breathing. What do you do?",
        "options": {"A": "Start CPR", "B": "Give rescue breaths", "C": "Defibrillate", "D": "Wait for ALS"},
        "correct_answer": "B",
        "explanation": "If pulse is present but no breathing, provide rescue breaths.",
        "category": "Cardiology",
        "difficulty": 1000.0
    },
    # Add more cardiology (10 more)
    {
        "text": "What is the heart rate for ventricular tachycardia?",
        "options": {"A": "60-100 bpm", "B": "100-150 bpm", "C": "150-250 bpm", "D": ">250 bpm"},
        "correct_answer": "C",
        "explanation": "VT is typically 150-250 bpm with wide complexes.",
        "category": "Cardiology",
        "difficulty": 1100.0
    },
    {
        "text": "A patient with bradycardia has a heart rate of 40 bpm and is symptomatic. What is first treatment?",
        "options": {"A": "Atropine", "B": "Epinephrine", "C": "CPR", "D": "Pacemaker"},
        "correct_answer": "A",
        "explanation": "Atropine is used for symptomatic bradycardia.",
        "category": "Cardiology",
        "difficulty": 1200.0
    },
    {
        "text": "What is the target SpO2 for cardiac patients?",
        "options": {"A": "90-92%", "B": "94-98%", "C": "100%", "D": "85-90%"},
        "correct_answer": "B",
        "explanation": "Oxygen saturation should be maintained at 94-98% for most patients.",
        "category": "Cardiology",
        "difficulty": 900.0
    },
    {
        "text": "A patient is in V-fib. What is the treatment?",
        "options": {"A": "Defibrillate", "B": "CPR", "C": "Medications", "D": "All of the above"},
        "correct_answer": "D",
        "explanation": "V-fib requires immediate defibrillation, CPR, and possibly medications.",
        "category": "Cardiology",
        "difficulty": 1100.0
    },
    {
        "text": "What is a common cause of cardiac arrest in children?",
        "options": {"A": "Respiratory failure", "B": "Trauma", "C": "Poisoning", "D": "Electrocution"},
        "correct_answer": "A",
        "explanation": "Most pediatric cardiac arrests are due to respiratory causes.",
        "category": "Cardiology",
        "difficulty": 1000.0
    },
    # Airway questions (20)
    {
        "text": "What is the most common cause of airway obstruction in adults?",
        "options": {"A": "Foreign body", "B": "Tongue", "C": "Swelling", "D": "Trauma"},
        "correct_answer": "B",
        "explanation": "The tongue is the most common cause of airway obstruction in unconscious patients.",
        "category": "Airway",
        "difficulty": 800.0
    },
    {
        "text": "How do you open the airway in an unconscious patient?",
        "options": {"A": "Jaw thrust", "B": "Head tilt-chin lift", "C": "Finger sweep", "D": "Heimlich"},
        "correct_answer": "B",
        "explanation": "Head tilt-chin lift is used when no spinal injury is suspected.",
        "category": "Airway",
        "difficulty": 900.0
    },
    {
        "text": "A patient is choking. What is the first step?",
        "options": {"A": "Abdominal thrusts", "B": "Back blows", "C": "Chest compressions", "D": "CPR"},
        "correct_answer": "A",
        "explanation": "Abdominal thrusts (Heimlich) are first for conscious choking adults.",
        "category": "Airway",
        "difficulty": 1000.0
    },
    {
        "text": "What device can EMT-B use to maintain airway?",
        "options": {"A": "Endotracheal tube", "B": "Laryngeal mask", "C": "Oropharyngeal airway", "D": "Nasopharyngeal airway"},
        "correct_answer": "C",
        "explanation": "EMT-B can use oropharyngeal airways for unconscious patients.",
        "category": "Airway",
        "difficulty": 1000.0
    },
    {
        "text": "A patient has stridor. What does this indicate?",
        "options": {"A": "Upper airway obstruction", "B": "Lower airway obstruction", "C": "Pleural rub", "D": "Pulmonary edema"},
        "correct_answer": "A",
        "explanation": "Stridor is a high-pitched sound indicating upper airway narrowing.",
        "category": "Airway",
        "difficulty": 1100.0
    },
    # Add more airway (15 more to make 20)
    {
        "text": "What is the correct size for adult BVM?",
        "options": {"A": "Small", "B": "Medium", "C": "Large", "D": "Extra large"},
        "correct_answer": "B",
        "explanation": "Adult BVM is medium size for most adults.",
        "category": "Airway",
        "difficulty": 900.0
    },
    {
        "text": "A patient is hyperventilating. What is the treatment?",
        "options": {"A": "Increase oxygen", "B": "Decrease oxygen", "C": "Rebreather mask", "D": "Paper bag"},
        "correct_answer": "D",
        "explanation": "For hyperventilation syndrome, rebreathing into a paper bag can help.",
        "category": "Airway",
        "difficulty": 1000.0
    },
    {
        "text": "What is CPAP used for?",
        "options": {"A": "Asthma", "B": "COPD", "C": "Pneumonia", "D": "All respiratory conditions"},
        "correct_answer": "B",
        "explanation": "CPAP is particularly useful for COPD patients with respiratory distress.",
        "category": "Airway",
        "difficulty": 1200.0
    },
    {
        "text": "A patient has a foreign body in the airway. What is contraindicated?",
        "options": {"A": "Blind finger sweep", "B": "Abdominal thrusts", "C": "Back blows", "D": "Chest compressions"},
        "correct_answer": "A",
        "explanation": "Blind finger sweep can push the object deeper and is contraindicated.",
        "category": "Airway",
        "difficulty": 1100.0
    },
    {
        "text": "What is the normal respiratory rate for adults?",
        "options": {"A": "8-12/min", "B": "12-20/min", "C": "20-30/min", "D": "30-40/min"},
        "correct_answer": "B",
        "explanation": "Normal adult respiratory rate is 12-20 breaths per minute.",
        "category": "Airway",
        "difficulty": 800.0
    },
    # Additional unique questions
    {
        "text": "What is the Glasgow Coma Scale used for?",
        "options": {"A": "Pain assessment", "B": "Neurological assessment", "C": "Cardiac assessment", "D": "Respiratory assessment"},
        "correct_answer": "B",
        "explanation": "GCS assesses level of consciousness and neurological status.",
        "category": "Trauma",
        "difficulty": 1000.0
    },
    {
        "text": "A patient has a blood pressure of 200/120. What is this called?",
        "options": {"A": "Hypertension", "B": "Hypertensive crisis", "C": "Normal", "D": "Hypotension"},
        "correct_answer": "B",
        "explanation": "BP >180/120 is considered a hypertensive crisis.",
        "category": "Cardiology",
        "difficulty": 1100.0
    },
    {
        "text": "What is the antidote for opioid overdose?",
        "options": {"A": "Atropine", "B": "Naloxone", "C": "Epinephrine", "D": "Benadryl"},
        "correct_answer": "B",
        "explanation": "Naloxone reverses opioid overdose.",
        "category": "Medical",
        "difficulty": 1200.0
    },
    {
        "text": "A patient is in diabetic ketoacidosis. What is elevated?",
        "options": {"A": "Blood glucose", "B": "Ketones", "C": "Both", "D": "Neither"},
        "correct_answer": "C",
        "explanation": "DKA involves high blood glucose and ketones.",
        "category": "Medical",
        "difficulty": 1300.0
    },
    {
        "text": "What is the normal pH range for blood?",
        "options": {"A": "6.8-7.0", "B": "7.0-7.2", "C": "7.35-7.45", "D": "7.5-7.7"},
        "correct_answer": "C",
        "explanation": "Normal arterial blood pH is 7.35-7.45.",
        "category": "Medical",
        "difficulty": 900.0
    }
]

for q_data in questions_data:
    existing = db.query(Question).filter(Question.text == q_data["text"]).first()
    if not existing:
        question = Question(**q_data)
        db.add(question)

db.commit()
print("Seeded exam questions")

db.close()