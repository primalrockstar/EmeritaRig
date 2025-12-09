#!/usr/bin/env python3

from backend.database import SessionLocal
from backend.models import Medication

def generate_medications():
    medications = [
        {
            "generic_name": "Aspirin",
            "brand_names": "Bayer, Ecotrin, Bufferin",
            "drug_class": "Antiplatelet",
            "action": "Irreversibly inhibits cyclooxygenase, preventing platelet aggregation",
            "indications": ["Acute coronary syndrome", "Myocardial infarction", "Unstable angina"],
            "contraindications": ["Known hypersensitivity", "Active bleeding", "Recent stroke"],
            "interactions": "Avoid concurrent use with anticoagulants (warfarin, heparin), NSAIDs (ibuprofen, naproxen), and herbal supplements like ginkgo biloba or garlic which can increase bleeding risk. Consult medical control for patients on blood thinners.",
            "dose_adult": "324mg PO (chewed)",
            "dose_ped": "Not routinely used in pediatrics",
            "route": "Oral",
            "side_effects": ["Gastrointestinal upset", "Increased bleeding risk", "Allergic reaction"]
        },
        {
            "generic_name": "Nitroglycerin",
            "brand_names": "Nitrostat, Nitrolingual",
            "drug_class": "Vasodilator",
            "action": "Relaxes vascular smooth muscle, dilating coronary arteries and reducing preload",
            "indications": ["Angina pectoris", "Acute coronary syndrome"],
            "contraindications": ["Hypotension (SBP <90)", "Recent PDE-5 inhibitor use", "Head trauma"],
            "interactions": "Contraindicated with sildenafil (Viagra), tadalafil (Cialis), or vardenafil (Levitra) within 24-48 hours. Avoid with herbal supplements like ginseng. Hypotension risk increased with antihypertensives.",
            "dose_adult": "0.4mg SL every 5 minutes up to 3 doses",
            "dose_ped": "Not indicated",
            "route": "Sublingual",
            "side_effects": ["Headache", "Hypotension", "Dizziness", "Tachycardia"]
        },
        {
            "generic_name": "Epinephrine",
            "brand_names": "Adrenalin, EpiPen",
            "drug_class": "Sympathomimetic",
            "action": "Stimulates alpha and beta receptors, causing vasoconstriction and bronchodilation",
            "indications": ["Anaphylaxis", "Cardiac arrest (VF/VT)", "Severe asthma"],
            "contraindications": ["None in life-threatening situations"],
            "interactions": "May interact with beta-blockers, MAOIs, and tricyclic antidepressants. Caution with herbal stimulants like ephedra.",
            "dose_adult": "1mg IV/IO every 3-5 minutes for cardiac arrest; 0.3-0.5mg IM for anaphylaxis",
            "dose_ped": "0.01mg/kg IM for anaphylaxis; 0.01mg/kg IV for cardiac arrest",
            "route": "IV/IO/IM",
            "side_effects": ["Tachycardia", "Hypertension", "Anxiety", "Tremor"]
        },
        {
            "generic_name": "Naloxone",
            "brand_names": "Narcan, Evzio",
            "drug_class": "Opioid antagonist",
            "action": "Competitively binds to opioid receptors, reversing opioid effects",
            "indications": ["Opioid overdose", "Respiratory depression from opioids"],
            "contraindications": ["None in opioid overdose"],
            "interactions": "May precipitate withdrawal in opioid-dependent patients. No significant OTC interactions, but monitor for interactions with other sedatives.",
            "dose_adult": "0.4-2mg IN/IV/IM; may repeat every 2-3 minutes",
            "dose_ped": "0.1mg/kg IN/IV/IM",
            "route": "IN/IV/IM",
            "side_effects": ["Opioid withdrawal symptoms", "Nausea", "Aggitation"]
        },
        {
            "generic_name": "Glucose (Dextrose)",
            "brand_names": "D50W, D25W",
            "drug_class": "Carbohydrate",
            "action": "Provides immediate glucose to treat hypoglycemia",
            "indications": ["Hypoglycemia", "Altered mental status with suspected low blood sugar"],
            "contraindications": ["Intracranial hemorrhage", "Known hyperglycemia"],
            "interactions": "Generally safe, but monitor with insulin therapy. No major OTC interactions.",
            "dose_adult": "25g (50mL D50W) IV",
            "dose_ped": "0.5-1g/kg IV (D25W preferred)",
            "route": "IV",
            "side_effects": ["Local irritation at injection site", "Hyperglycemia if overadministered"]
        },
        {
            "generic_name": "Activated Charcoal",
            "brand_names": "Actidose, Liqui-Char",
            "drug_class": "Adsorbent",
            "action": "Adsorbs toxins in the gastrointestinal tract",
            "indications": ["Oral poisoning/toxic ingestion"],
            "contraindications": ["Ingestion of caustic substances", "Unprotected airway", "Recent endoscopy"],
            "interactions": "Reduces absorption of other oral medications. Avoid with sorbitol-containing products. No major OTC interactions, but may adsorb vitamins/minerals.",
            "dose_adult": "1g/kg PO",
            "dose_ped": "1g/kg PO",
            "route": "Oral",
            "side_effects": ["Nausea", "Vomiting", "Constipation", "Black stools"]
        },
        {
            "generic_name": "Oxygen",
            "brand_names": "N/A",
            "drug_class": "Gas",
            "action": "Increases oxygen concentration in inspired air",
            "indications": ["Hypoxemia", "Respiratory distress", "Cardiac arrest"],
            "contraindications": ["None"],
            "interactions": "Generally safe, but monitor in COPD patients to avoid CO2 retention. No interactions with OTC meds.",
            "dose_adult": "2-15L/min via appropriate delivery device",
            "dose_ped": "Based on age and condition, typically 1-10L/min",
            "route": "Inhaled",
            "side_effects": ["Dry nasal passages", "CO2 retention in COPD patients"]
        },
        {
            "generic_name": "Albuterol",
            "brand_names": "Ventolin, ProAir",
            "drug_class": "Beta-2 agonist",
            "action": "Relaxes bronchial smooth muscle, causing bronchodilation",
            "indications": ["Acute asthma", "COPD exacerbation", "Bronchospasm"],
            "contraindications": ["Tachycardia", "Known hypersensitivity"],
            "interactions": "Caution with beta-blockers, theophylline, and caffeine. May interact with herbal stimulants.",
            "dose_adult": "2.5mg nebulized every 20 minutes as needed",
            "dose_ped": "0.15mg/kg nebulized (minimum 1.25mg) every 20 minutes",
            "route": "Nebulized/Inhaled",
            "side_effects": ["Tachycardia", "Tremor", "Headache", "Nausea"]
        }
    ]

    return medications

def seed_medications():
    db = SessionLocal()
    try:
        existing_count = db.query(Medication).count()
        if existing_count > 0:
            print(f"Medications already seeded ({existing_count} medications)")
            return

        medications = generate_medications()
        for med_data in medications:
            medication = Medication(**med_data)
            db.add(medication)

        db.commit()
        print(f"Seeded {len(medications)} medications successfully")

    except Exception as e:
        print(f"Error seeding medications: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_medications()