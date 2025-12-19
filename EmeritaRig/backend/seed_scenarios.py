#!/usr/bin/env python3

import random
from .database import SessionLocal
from .models import Scenario

def generate_scenarios():
    scenarios = [
        {
            "title": "7yo Male - Anaphylaxis",
            "dispatch_info": "Priority 1 - 7-year-old male with severe allergic reaction after eating peanuts. Mother reports child having difficulty breathing and swelling.",
            "vitals": {"bp": "90/60", "hr": 140, "rr": 28, "spo2": "92%", "temp": "98.6°F"},
            "narrative_key_points": ["Administer EpiPen 0.15mg IM", "High Flow O2", "IV Access", "Diphenhydramine 25mg IV", "Monitor for airway compromise"],
            "difficulty": "Advanced",
            "category": "Pediatric"
        },
        {
            "title": "45yo Male - Acute MI",
            "dispatch_info": "Priority 1 - 45-year-old male complaining of severe chest pain radiating to left arm. Patient states pain started while exercising.",
            "vitals": {"bp": "160/90", "hr": 110, "rr": 20, "spo2": "96%", "temp": "98.8°F"},
            "narrative_key_points": ["Aspirin 324mg PO", "Oxygen 4L NC", "12-lead ECG", "IV Access", "Nitroglycerin 0.4mg SL if no contraindications"],
            "difficulty": "Basic",
            "category": "Medical"
        },
        {
            "title": "32yo Female - Motor Vehicle Crash",
            "dispatch_info": "Priority 1 - 32-year-old female involved in high-speed MVC. Patient trapped in vehicle, complaining of abdominal pain and leg pain.",
            "vitals": {"bp": "110/70", "hr": 100, "rr": 18, "spo2": "98%", "temp": "98.2°F"},
            "narrative_key_points": ["C-spine immobilization", "Extrication with KED", "Assess ABCs", "IV Access", "Pain management"],
            "difficulty": "Advanced",
            "category": "Trauma"
        },
        # Add more scenarios here to reach 25
        {
            "title": "65yo Female - Cardiac Arrest",
            "dispatch_info": "Priority 1 - 65-year-old female found unconscious by family. Witness reports patient clutching chest then collapsed.",
            "vitals": {"bp": "0/0", "hr": 0, "rr": 0, "spo2": "0%", "temp": "96.8°F"},
            "narrative_key_points": ["Start CPR immediately", "AED application", "Advanced airway", "IV Access", "Epinephrine 1mg IV q3-5min"],
            "difficulty": "Nightmare",
            "category": "Medical"
        },
        {
            "title": "18mo Female - Febrile Seizure",
            "dispatch_info": "Priority 2 - 18-month-old female having seizure. Mother reports high fever and child stopped breathing for a moment.",
            "vitals": {"bp": "85/50", "hr": 160, "rr": 30, "spo2": "95%", "temp": "103.5°F"},
            "narrative_key_points": ["Support ABCs", "Monitor seizure activity", "Cooling measures", "Acetaminophen 15mg/kg PR", "Transport to ED"],
            "difficulty": "Basic",
            "category": "Pediatric"
        },
        {
            "title": "55yo Male - Respiratory Distress",
            "dispatch_info": "Priority 1 - 55-year-old male with severe shortness of breath. Patient has history of COPD and ran out of medications.",
            "vitals": {"bp": "140/85", "hr": 115, "rr": 32, "spo2": "88%", "temp": "99.1°F"},
            "narrative_key_points": ["Albuterol 2.5mg + Ipratropium 0.5mg neb", "Oxygen to maintain SpO2 88-92%", "IV Access", "Methylprednisolone 125mg IV"],
            "difficulty": "Advanced",
            "category": "Medical"
        },
        {
            "title": "28yo Male - Gunshot Wound",
            "dispatch_info": "Priority 1 - 28-year-old male with gunshot wound to abdomen. Patient conscious but in severe pain.",
            "vitals": {"bp": "90/60", "hr": 120, "rr": 24, "spo2": "94%", "temp": "98.4°F"},
            "narrative_key_points": ["Direct pressure to wound", "C-spine precautions", "Large bore IV x2", "Fluid bolus", "Pain control"],
            "difficulty": "Advanced",
            "category": "Trauma"
        },
        {
            "title": "72yo Male - Altered Mental Status",
            "dispatch_info": "Priority 2 - 72-year-old male found confused and wandering. Family reports patient has diabetes and may have missed insulin dose.",
            "vitals": {"bp": "135/80", "hr": 95, "rr": 16, "spo2": "97%", "temp": "97.5°F"},
            "narrative_key_points": ["Blood glucose check", "IV Access", "D50W if hypoglycemic", "Assess for stroke signs", "Monitor mental status"],
            "difficulty": "Basic",
            "category": "Medical"
        },
        {
            "title": "12yo Male - Asthma Attack",
            "dispatch_info": "Priority 1 - 12-year-old male with severe asthma exacerbation. Child unable to speak full sentences.",
            "vitals": {"bp": "125/75", "hr": 135, "rr": 35, "spo2": "90%", "temp": "98.9°F"},
            "narrative_key_points": ["Albuterol 2.5mg neb q20min", "Ipratropium 0.5mg neb", "Oxygen 6L NC", "Methylprednisolone 2mg/kg IV", "Monitor peak flow"],
            "difficulty": "Intermediate",
            "category": "Pediatric"
        },
        {
            "title": "40yo Female - Pregnancy Complications",
            "dispatch_info": "Priority 1 - 40-year-old female, 32 weeks pregnant, complaining of severe abdominal pain and vaginal bleeding.",
            "vitals": {"bp": "95/55", "hr": 110, "rr": 22, "spo2": "96%", "temp": "98.7°F"},
            "narrative_key_points": ["Left lateral recumbent position", "IV Access", "Monitor fetal heart rate if possible", "Control bleeding", "Rapid transport"],
            "difficulty": "Advanced",
            "category": "Medical"
        },
        # Add more to reach 25...
        {
            "title": "19yo Male - Overdose",
            "dispatch_info": "Priority 2 - 19-year-old male unresponsive after taking unknown pills. Empty bottle of prescription opioids found.",
            "vitals": {"bp": "100/65", "hr": 60, "rr": 8, "spo2": "92%", "temp": "97.2°F"},
            "narrative_key_points": ["Naloxone 0.4mg IN", "Support ABCs", "IV Access", "Monitor for withdrawal", "Activated charcoal if indicated"],
            "difficulty": "Intermediate",
            "category": "Medical"
        },
        {
            "title": "58yo Female - Stroke",
            "dispatch_info": "Priority 1 - 58-year-old female with sudden onset weakness on right side and slurred speech.",
            "vitals": {"bp": "180/95", "hr": 85, "rr": 18, "spo2": "98%", "temp": "98.5°F"},
            "narrative_key_points": ["Assess NIHSS score", "Oxygen if needed", "IV Access", "Blood glucose check", "Cincinnati Prehospital Stroke Scale"],
            "difficulty": "Basic",
            "category": "Medical"
        },
        {
            "title": "8yo Female - Burns",
            "dispatch_info": "Priority 1 - 8-year-old female with burns to arms and torso from hot water spill. Approximately 15% BSA burned.",
            "vitals": {"bp": "110/70", "hr": 130, "rr": 25, "spo2": "97%", "temp": "98.3°F"},
            "narrative_key_points": ["Stop burning process", "Cover with clean sheet", "Pain management", "IV Access", "Parkland formula calculation"],
            "difficulty": "Intermediate",
            "category": "Trauma"
        },
        {
            "title": "67yo Male - Hip Fracture",
            "dispatch_info": "Priority 2 - 67-year-old male fell and cannot get up. Complaining of severe hip pain and unable to bear weight.",
            "vitals": {"bp": "140/85", "hr": 95, "rr": 20, "spo2": "96%", "temp": "98.1°F"},
            "narrative_key_points": ["Immobilize injured extremity", "Pain control", "Check distal pulses", "IV Access", "Monitor for shock"],
            "difficulty": "Basic",
            "category": "Trauma"
        },
        {
            "title": "35yo Male - Electrical Injury",
            "dispatch_info": "Priority 1 - 35-year-old male shocked by live wire while working on house. Entry wound on hand, exit on foot.",
            "vitals": {"bp": "120/80", "hr": 100, "rr": 22, "spo2": "98%", "temp": "98.8°F"},
            "narrative_key_points": ["Ensure scene safety", "ABC assessment", "Treat entry/exit wounds", "ECG monitoring", "Pain management"],
            "difficulty": "Advanced",
            "category": "Trauma"
        },
        {
            "title": "22yo Female - Psychiatric Emergency",
            "dispatch_info": "Priority 2 - 22-year-old female threatening suicide. Patient has razor blade and appears agitated.",
            "vitals": {"bp": "130/85", "hr": 105, "rr": 24, "spo2": "97%", "temp": "98.6°F"},
            "narrative_key_points": ["Ensure safety", "De-escalate situation", "Remove weapons", "Verbal restraint", "Transport for evaluation"],
            "difficulty": "Intermediate",
            "category": "Medical"
        },
        {
            "title": "50yo Male - Drowning",
            "dispatch_info": "Priority 1 - 50-year-old male pulled from lake unconscious. Bystander CPR in progress for 5 minutes.",
            "vitals": {"bp": "0/0", "hr": 0, "rr": 0, "spo2": "0%", "temp": "89.2°F"},
            "narrative_key_points": ["Continue CPR", "Advanced airway", "Defibrillation if indicated", "Warming measures", "Transport to appropriate facility"],
            "difficulty": "Nightmare",
            "category": "Trauma"
        },
        {
            "title": "14yo Male - Diabetic Emergency",
            "dispatch_info": "Priority 1 - 14-year-old male with altered mental status. Parent reports child is diabetic and missed lunch.",
            "vitals": {"bp": "110/65", "hr": 115, "rr": 28, "spo2": "96%", "temp": "98.4°F"},
            "narrative_key_points": ["Blood glucose check", "D50W 25g IV if hypoglycemic", "Oral glucose if conscious", "Monitor mental status", "Reassess frequently"],
            "difficulty": "Basic",
            "category": "Pediatric"
        },
        {
            "title": "61yo Female - Pulmonary Embolism",
            "dispatch_info": "Priority 1 - 61-year-old female with sudden onset shortness of breath and chest pain. Recent hip surgery.",
            "vitals": {"bp": "135/80", "hr": 110, "rr": 26, "spo2": "92%", "temp": "99.0°F"},
            "narrative_key_points": ["Oxygen to maintain SpO2 >94%", "12-lead ECG", "IV Access", "Consider CPAP", "Pain management"],
            "difficulty": "Advanced",
            "category": "Medical"
        },
        {
            "title": "9yo Male - Foreign Body Airway",
            "dispatch_info": "Priority 1 - 9-year-old male choking on piece of candy. Child unable to speak or cough effectively.",
            "vitals": {"bp": "120/70", "hr": 140, "rr": 0, "spo2": "85%", "temp": "98.5°F"},
            "narrative_key_points": ["Heimlich maneuver", "Back blows if infant", "Visualize and remove if possible", "CPR if unconscious", "Transport"],
            "difficulty": "Intermediate",
            "category": "Pediatric"
        },
        {
            "title": "43yo Male - Active Shooter Incident",
            "dispatch_info": "Priority 1 - Multiple victims from active shooter. 43-year-old male with gunshot wound to thigh.",
            "vitals": {"bp": "100/60", "hr": 115, "rr": 24, "spo2": "95%", "temp": "98.2°F"},
            "narrative_key_points": ["Ensure scene safety", "Direct pressure to wound", "Tourniquet application", "Multiple casualty triage", "Rapid transport"],
            "difficulty": "Nightmare",
            "category": "Trauma"
        },
        {
            "title": "76yo Female - Hypothermia",
            "dispatch_info": "Priority 2 - 76-year-old female found outside in cold weather. Patient confused and shivering.",
            "vitals": {"bp": "110/70", "hr": 50, "rr": 12, "spo2": "94%", "temp": "91.8°F"},
            "narrative_key_points": ["Remove wet clothing", "Passive rewarming", "Warm blankets", "Warm IV fluids", "Monitor for arrhythmias"],
            "difficulty": "Intermediate",
            "category": "Medical"
        },
        {
            "title": "25yo Female - Eclampsia",
            "dispatch_info": "Priority 1 - 25-year-old female, 38 weeks pregnant, having seizures. BP elevated, protein in urine.",
            "vitals": {"bp": "170/110", "hr": 120, "rr": 26, "spo2": "95%", "temp": "99.2°F"},
            "narrative_key_points": ["Magnesium sulfate 4g IV", "Control seizures", "Left lateral position", "IV Access", "Immediate transport"],
            "difficulty": "Advanced",
            "category": "Medical"
        },
        {
            "title": "30yo Male - Heat Stroke",
            "dispatch_info": "Priority 1 - 30-year-old male working outdoors in heat. Patient confused, skin hot and dry.",
            "vitals": {"bp": "130/85", "hr": 125, "rr": 30, "spo2": "97%", "temp": "105.5°F"},
            "narrative_key_points": ["Rapid cooling", "IV fluids", "Remove clothing", "Monitor core temperature", "Transport to ED"],
            "difficulty": "Intermediate",
            "category": "Medical"
        },
        {
            "title": "16yo Female - Eating Disorder",
            "dispatch_info": "Priority 3 - 16-year-old female with severe bradycardia. Parent reports child has been restricting food intake.",
            "vitals": {"bp": "90/50", "hr": 45, "rr": 14, "spo2": "96%", "temp": "96.5°F"},
            "narrative_key_points": ["Monitor vital signs", "IV Access", "Glucose check", "Atropine if symptomatic bradycardia", "Mental health assessment"],
            "difficulty": "Basic",
            "category": "Pediatric"
        },
        {
            "title": "52yo Male - Aortic Aneurysm",
            "dispatch_info": "Priority 1 - 52-year-old male with sudden severe back pain. Patient pale and diaphoretic.",
            "vitals": {"bp": "80/40", "hr": 130, "rr": 28, "spo2": "93%", "temp": "98.0°F"},
            "narrative_key_points": ["IV Access x2", "Fluid resuscitation", "Pain management", "Monitor for rupture", "Rapid surgical transport"],
            "difficulty": "Nightmare",
            "category": "Medical"
        }
    ]

    return scenarios

def seed_scenarios():
    db = SessionLocal()
    try:
        existing_count = db.query(Scenario).count()
        if existing_count > 0:
            print(f"Scenarios already seeded ({existing_count} scenarios)")
            return

        scenarios = generate_scenarios()
        for scenario_data in scenarios:
            scenario = Scenario(**scenario_data)
            db.add(scenario)

        db.commit()
        print(f"Seeded {len(scenarios)} scenarios successfully")

    except Exception as e:
        print(f"Error seeding scenarios: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_scenarios()