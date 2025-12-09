// Chapter 3: Medical, Legal, and Ethical Principles - EMT-B Flashcards
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: string;
  tags: string[];
}

export const chapter3Flashcards: Flashcard[] = [
  {
    id: "ch3-001",
    front: "What are the three types of consent in emergency medical care?",
    back: "**1. Expressed Consent:** Patient clearly says or shows they want care (verbal 'yes' or nodding)\n\n**2. Implied Consent:** Assumed for unconscious patients in life-threatening emergencies (emergency doctrine)\n\n**3. Involuntary Consent:** For mentally incompetent adults or situations involving law enforcement custody\n\n**Key Point:** For expressed consent to be valid, it must be **informed consent** - explaining treatment, risks, benefits, and alternatives.",
    category: "Legal",
    difficulty: "Beginner",
    tags: ["consent", "patient rights", "legal principles"]
  },
  {
    id: "ch3-002", 
    front: "A 16-year-old patient is conscious and refusing treatment after a car accident. Their parents are not present. What should you do?",
    back: "**For minors, parent/guardian consent is usually required, BUT:**\n\n• **Emergency exception:** In life-threatening situations, provide care without delay\n• **Emancipated minors:** Can consent if married, in military, or parents themselves\n• **School officials:** Can act 'in loco parentis' for school emergencies\n\n**Never delay life-saving care** waiting for parental consent in true emergencies.\n\n**Best practice:** Attempt to contact parents while providing necessary emergency care.",
    category: "Legal", 
    difficulty: "Intermediate",
    tags: ["minors", "consent", "emergency care"]
  },
  {
    id: "ch3-003",
    front: "What are the four elements required to prove negligence against an EMT?",
    back: "**The Four Elements of Negligence:**\n\n**1. Duty:** You had a legal obligation to provide care\n**2. Breach of Duty:** You failed to meet the standard of care\n**3. Damages:** Patient suffered physical or psychological harm\n**4. Causation:** Your breach directly caused the patient's harm\n\n**Example:** Dropping a patient during transfer causing a fracture = negligence\n\n**Key:** ALL four elements must be present to prove negligence.",
    category: "Legal",
    difficulty: "Intermediate", 
    tags: ["negligence", "legal liability", "standard of care"]
  },
  {
    id: "ch3-004",
    front: "A conscious adult patient is refusing transport after a serious accident. What steps must you take?",
    back: "**Steps for Treatment Refusal:**\n\n1. **Assess decision-making capacity** (mental state, injury, intoxication)\n2. **Explain clearly:** Condition, recommended treatment, risks of refusal\n3. **Document thoroughly:** All efforts made to obtain consent\n4. **Get signed refusal form** with witness (family or police)\n5. **Encourage alternative:** 'Call if condition worsens'\n\n**Remember:** Competent adults can refuse care even if it may result in death.\n\n**Critical:** If capacity is questionable, contact medical control.",
    category: "Legal",
    difficulty: "Advanced",
    tags: ["refusal", "patient autonomy", "documentation"]
  },
  {
    id: "ch3-005",
    front: "What is HIPAA and what information can EMTs legally share?",
    back: "**HIPAA:** Health Insurance Portability and Accountability Act - protects patient privacy\n\n**Protected Health Information:** All patient history, exam findings, and treatment details\n\n**Legal sharing allowed for:**\n• **Treatment:** Medical information to receiving hospital\n• **Payment:** Insurance/billing purposes  \n• **Operations:** Quality improvement, training\n\n**NEVER share on social media** - serious HIPAA violation\n\n**Rule:** When in doubt, don't share without written patient consent or court order.",
    category: "Legal",
    difficulty: "Beginner",
    tags: ["HIPAA", "confidentiality", "patient privacy"]
  },
  {
    id: "ch3-006",
    front: "What is the difference between abandonment and negligence?",
    back: "**Abandonment:** Stopping patient care without consent or proper transfer to equally qualified provider\n• Leaving patient with untrained person\n• Failing to give proper report to hospital\n• Once you start care, you MUST continue until proper transfer\n\n**Negligence:** Failing to provide standard care that results in patient harm\n• Acting outside scope of practice\n• Not following protocols\n• Substandard care causing injury\n\n**Key difference:** Abandonment = stopping care; Negligence = poor care",
    category: "Legal",
    difficulty: "Intermediate",
    tags: ["abandonment", "negligence", "legal liability"]
  },
  {
    id: "ch3-007",
    front: "A patient has a valid DNR order but is conscious and experiencing severe chest pain. What care should you provide?",
    back: "**DNR applies ONLY to resuscitation efforts, NOT comfort care:**\n\n**Provide:**\n• Oxygen therapy for comfort\n• Pain management/medications\n• Emotional support\n• Position for comfort\n• Monitor vital signs\n\n**Do NOT provide if in cardiac arrest:**\n• CPR\n• Defibrillation\n• Advanced airway management\n\n**Key:** DNR means 'Do Not Resuscitate' - not 'Do Not Treat'. Provide supportive comfort measures until/unless cardiac arrest occurs.",
    category: "Ethical",
    difficulty: "Advanced",
    tags: ["DNR", "advanced directives", "end-of-life care"]
  },
  {
    id: "ch3-008",
    front: "What are the definitive signs of death that would allow you to not start resuscitation?",
    back: "**Definitive Signs of Death (obvious and clear):**\n\n**1. Obvious mortal damage** (decapitation, massive trauma)\n**2. Dependent lividity** (blood pooling/skin discoloration)\n**3. Rigor mortis** (muscle stiffening 2-12 hours post-death)\n**4. Algor mortis** (body cooling)\n**5. Putrefaction** (tissue decomposition 40-96+ hours)\n\n**Important:** If NO clear signs present and NO valid DNR → START resuscitation\n\n**Remember:** Only a physician can determine cause of death.",
    category: "Ethical",
    difficulty: "Intermediate",
    tags: ["death determination", "resuscitation", "medical examiner"]
  },
  {
    id: "ch3-009",
    front: "When might forcible restraint be necessary and what precautions must you take?",
    back: "**When restraint may be needed:**\n• Combative patient danger to self/others\n• Mental illness, drugs, head injury, hypoxia\n\n**Before restraining:**\n1. **Try verbal de-escalation first**\n2. **Get medical control/law enforcement approval**\n3. **Use minimum force necessary**\n\n**During restraint:**\n• **Continuously monitor breathing/circulation**\n• Position to maintain airway\n• Check pulse and skin color frequently\n\n**Consider chemical restraint** (ALS backup) as safer alternative.",
    category: "Clinical",
    difficulty: "Advanced", 
    tags: ["restraints", "combative patients", "safety"]
  },
  {
    id: "ch3-010",
    front: "What is the difference between assault, battery, and false imprisonment in EMS?",
    back: "**Assault:** Threatening harm to someone\n• 'I'm going to hurt you if you don't cooperate'\n\n**Battery:** Unlawful touching without consent\n• Applying splint without permission\n• Giving EpiPen without consent\n• Any treatment without proper consent\n\n**False Imprisonment:** Transporting someone against their will\n• More likely EMS charge than kidnapping\n• Taking competent refusing patient to hospital\n\n**Prevention:** Always obtain proper consent before touching or treating patients.",
    category: "Legal",
    difficulty: "Intermediate",
    tags: ["assault", "battery", "false imprisonment", "consent"]
  },
  {
    id: "ch3-011", 
    front: "What is your scope of practice and how does it relate to standard of care?",
    back: "**Scope of Practice:** Legal limits of care you're allowed to provide\n• Set by state law and medical director\n• Specific skills/procedures you can perform\n• CANNOT be exceeded\n\n**Standard of Care:** How a reasonably trained EMT would act in similar situation\n• Based on training, protocols, textbooks\n• Local protocols take precedence\n• Must follow both scope AND standard\n\n**Key:** Performing outside scope = negligence/criminal offense\n\n**Remember:** You must stay within your scope while meeting the standard.",
    category: "Professional",
    difficulty: "Beginner",
    tags: ["scope of practice", "standard of care", "legal limits"]
  },
  {
    id: "ch3-012",
    front: "You're off-duty and witness a car accident. Do you have a duty to act?",
    back: "**Off-duty duty to act depends on situation:**\n\n**Generally NO legal duty** when completely off-duty\n\n**BUT if you choose to help:**\n• Must provide competent care\n• Cannot abandon once started\n• Must continue until equal/higher authority takes over\n• Good Samaritan laws may provide protection\n\n**On-duty:** Clear duty to act from employment\n\n**Key decision:** If you start helping, you create a duty to continue proper care until appropriate transfer.",
    category: "Legal",
    difficulty: "Intermediate",
    tags: ["duty to act", "off-duty", "Good Samaritan"]
  },
  {
    id: "ch3-013",
    front: "What situations require mandatory reporting by EMTs?",
    back: "**Mandatory Reporting Requirements:**\n\n**Must report:**\n• **Child abuse** and elder/at-risk adult abuse\n• **Felony-related injuries** (gunshot, stab wounds)\n• **Drug-related injuries** (varies by state)\n• **Births outside** licensed medical facilities\n• **Dog bites**, communicable diseases\n• **Attempted suicide**, domestic violence\n• **Sexual assault**\n\n**State-specific variations** - know your local requirements\n\n**Documentation:** Report to appropriate authorities and document thoroughly.",
    category: "Legal",
    difficulty: "Advanced",
    tags: ["mandatory reporting", "child abuse", "felony injuries"]
  },
  {
    id: "ch3-014",
    front: "A patient has medical identification jewelry. How should this affect your care?",
    back: "**Medical ID importance:**\n\n**Always check for:**\n• Medical alert bracelets/necklaces\n• Medical ID cards in wallet\n• Phone medical ID settings\n\n**Provides crucial information:**\n• Medical conditions (diabetes, seizures)\n• Current medications\n• Drug allergies\n• Emergency contacts\n• DNR/advanced directive status\n\n**Impact on care:** Guides treatment decisions and alerts to potential complications or contraindications.\n\n**Document:** Record all medical ID information found.",
    category: "Clinical",
    difficulty: "Beginner",
    tags: ["medical identification", "patient history", "allergies"]
  },
  {
    id: "ch3-015",
    front: "A patient is a potential organ donor but needs immediate life-saving treatment. How should this affect your care?",
    back: "**Organ donor treatment principles:**\n\n**Treat like ANY other patient** needing urgent care\n• Use ALL available life-saving measures\n• Do NOT withhold any treatment\n• Provide aggressive care to preserve life\n\n**Special considerations:**\n• **High-flow oxygen** to protect organs\n• Maintain blood pressure and circulation\n• Continue full resuscitation efforts\n\n**Goal:** Keep patient alive - organ procurement is secondary concern\n\n**Remember:** Your job is to save the living patient, not to preserve organs.",
    category: "Ethical",
    difficulty: "Intermediate", 
    tags: ["organ donation", "life support", "ethical care"]
  }
];
