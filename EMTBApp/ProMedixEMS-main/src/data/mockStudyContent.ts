export interface StudyModule {
  id: string;
  title: string;
  description: string;
  chapters: StudyChapter[];
}

export interface StudyChapter {
  id: string;
  title: string;
  objectives: string[];
  content: string;
  keyPoints: string[];
  clinicalPearls: string[];
}

// Foundations of EMS Practice Module
export const foundationsModule: StudyModule = {
  id: 'mod-1',
  title: 'Foundations of EMS Practice',
  description: 'Essential EMS systems, professional responsibilities, legal and ethical considerations, and wellness and safety principles that form the foundation of emergency medical services.',
  chapters: [
    {
      id: 'ch-1',
      title: 'EMS System Fundamentals',
      objectives: [
        'Describe the components and functions of the EMS system',
        'Explain the roles and responsibilities of EMTs within the healthcare system',
        'Understand quality improvement processes in EMS',
        'Identify the impact of EMS on public health'
      ],
      content: `
# EMS System Fundamentals

## Overview
Emergency Medical Services (EMS) represents a critical component of the healthcare system, providing immediate medical care and transportation for patients experiencing medical emergencies. The EMS system is designed to deliver timely, quality care to those in need, bridging the gap between the incident scene and definitive medical care.

## Components of the EMS System

### 1. Public Access
- **9-1-1 System**: Universal emergency access number providing immediate connection to emergency services
- **Emergency Medical Dispatch (EMD)**: Trained professionals who provide pre-arrival instructions and prioritize responses
- **Public Education**: Community awareness programs teaching CPR, AED use, and emergency recognition

### 2. Communication Systems
- **Radio Communications**: Primary method for field communications between ambulances, hospitals, and dispatch
- **Computer-Aided Dispatch (CAD)**: Digital system for call processing, resource allocation, and documentation
- **Medical Direction**: Online and offline medical oversight ensuring quality patient care

### 3. Clinical Care
- **Basic Life Support (BLS)**: EMT-level care including airway management, CPR, and basic interventions
- **Advanced Life Support (ALS)**: Paramedic-level care including advanced airway, medications, and cardiac interventions
- **Critical Care Transport**: Specialized teams for inter-facility transfers of critical patients

### 4. Integration with Healthcare System
- **Emergency Departments**: Receiving facilities equipped to handle emergency patients
- **Trauma Centers**: Specialized hospitals designated for major trauma care
- **Rehabilitation Services**: Post-acute care facilities for recovery and rehabilitation

## EMT Roles and Responsibilities

### Direct Patient Care
- Assessment and treatment of medical emergencies
- Safe transportation to appropriate facilities
- Patient advocacy and emotional support
- Documentation of care provided

### System Responsibilities
- Resource allocation and utilization
- Quality improvement participation
- Public education and injury prevention
- Professional development and continuing education

### Legal and Ethical Obligations
- Duty to act in emergencies
- Standard of care requirements
- Confidentiality (HIPAA compliance)
- Scope of practice adherence

## Quality Improvement in EMS

### Continuous Quality Improvement (CQI)
- Regular review of patient care and outcomes
- Identification of system improvements
- Implementation of evidence-based practices
- Staff education and training

### Performance Measures
- Response times and scene times
- Patient outcomes and satisfaction
- Protocol compliance rates
- Equipment and vehicle maintenance

## Public Health Impact

### Injury Prevention
- Community education programs
- Safety campaigns and initiatives
- Data collection and analysis
- Partnership with public health agencies

### Health Promotion
- CPR and first aid training
- AED placement programs
- Wellness and disease prevention education
- Chronic disease management support
      `,
      keyPoints: [
        'EMS systems integrate public access, communications, clinical care, and healthcare facilities',
        'EMTs have direct patient care responsibilities and broader system obligations',
        'Quality improvement ensures ongoing enhancement of EMS services',
        'EMS plays a vital role in public health through injury prevention and health promotion'
      ],
      clinicalPearls: [
        'The EMS system is only as strong as its weakest link - all components must function effectively',
        'EMTs often serve as the first point of contact with the healthcare system for many patients',
        'Quality improvement is not about finding fault but improving patient outcomes',
        'Public education and injury prevention can significantly reduce EMS call volume'
      ]
    },
    {
      id: 'ch-2',
      title: 'Responder Safety & Resilience',
      objectives: [
        'Identify hazards and risks in the EMS environment',
        'Apply principles of personal protective equipment (PPE)',
        'Understand stress management and critical incident stress',
        'Develop strategies for maintaining physical and mental wellness'
      ],
      content: `
# Responder Safety & Resilience

## Overview
EMS responders work in dynamic, unpredictable environments where safety risks are ever-present. Maintaining personal safety while providing care requires constant vigilance, proper equipment use, and ongoing training. Beyond physical safety, responders must also address the psychological toll of emergency work through resilience-building strategies.

## Hazard Recognition and Mitigation

### Scene Safety Assessment
- **Traffic Hazards**: Operating in live traffic environments requires awareness of vehicle movement and proper vehicle positioning
- **Environmental Hazards**: Weather conditions, unstable structures, hazardous materials, and wildlife
- **Violence and Aggression**: Dealing with combative patients, family members, or bystanders
- **Infectious Diseases**: Bloodborne pathogens, airborne diseases, and emerging infectious threats

### Personal Protective Equipment (PPE)
- **Standard Precautions**: Gloves, masks, eye protection, and gowns for all patient contacts
- **Scene-Specific PPE**: Turnout gear for fires, chemical suits for hazmat incidents
- **Respiratory Protection**: N95 masks for airborne pathogens, SCBA for IDLH environments
- **PPE Maintenance**: Regular inspection, cleaning, and replacement of damaged equipment

## Physical Wellness and Injury Prevention

### Ergonomics and Body Mechanics
- **Proper Lifting Techniques**: Bend at knees, keep loads close to body, use team lifting
- **Patient Movement**: Use appropriate equipment and techniques to prevent back injuries
- **Vehicle Safety**: Proper securing of equipment and safe vehicle operations

### Health Maintenance
- **Immunizations**: Required vaccinations for hepatitis B, MMR, varicella, and annual flu shots
- **Fitness Requirements**: Maintaining physical fitness for demanding job requirements
- **Rest and Recovery**: Adequate sleep, nutrition, and recovery time between shifts

## Psychological Wellness and Resilience

### Critical Incident Stress
- **Acute Stress Reactions**: Normal responses to traumatic events including anxiety, irritability, and sleep disturbances
- **Cumulative Stress**: Build-up of stress over time leading to compassion fatigue and burnout
- **Critical Incident Stress Management (CISM)**: Structured interventions to process traumatic events

### Stress Management Strategies
- **Debriefing**: Post-incident discussions to process emotions and experiences
- **Peer Support**: Confidential discussions with colleagues who understand the unique stresses of EMS work
- **Professional Counseling**: Access to mental health professionals when needed
- **Work-Life Balance**: Maintaining boundaries between work and personal life

## Building Resilience

### Personal Strategies
- **Self-Care Practices**: Regular exercise, healthy eating, adequate sleep, and relaxation techniques
- **Social Support**: Strong relationships with family, friends, and colleagues
- **Hobbies and Interests**: Activities outside of work to maintain balance and perspective
- **Professional Development**: Continuing education and skill development to maintain confidence

### Organizational Support
- **Supervisor Support**: Regular check-ins and recognition of good work
- **Team Building**: Activities that strengthen unit cohesion and mutual support
- **Resource Access**: Employee assistance programs and mental health resources
- **Culture of Wellness**: Organizational commitment to responder wellness and safety

## Legal and Ethical Considerations

### Duty to Respond vs. Personal Safety
- **Imminent Danger**: Right to refuse unsafe responses when personal safety is threatened
- **Risk Assessment**: Balancing patient needs with responder safety
- **Documentation**: Proper reporting of safety concerns and incidents

### Professional Boundaries
- **Patient Interactions**: Maintaining appropriate professional relationships
- **Colleague Support**: Recognizing signs of stress in fellow responders
- **Self-Advocacy**: Speaking up about unsafe conditions or excessive workloads
      `,
      keyPoints: [
        'Scene safety assessment is the first priority at every EMS response',
        'Proper PPE use is essential for protection against infectious and environmental hazards',
        'Physical wellness requires ongoing attention to ergonomics and injury prevention',
        'Psychological resilience is built through self-care, support systems, and professional resources'
      ],
      clinicalPearls: [
        'The most dangerous EMS call is the routine one - complacency leads to injuries',
        'PPE only protects if it\'s properly fitted, maintained, and actually worn',
        'Mental health is as important as physical health in EMS work',
        'Speaking up about safety concerns protects both you and your patients'
      ]
    },
    {
      id: 'ch-3',
      title: 'EMS Law & Ethical Practice',
      objectives: [
        'Understand legal responsibilities and liabilities in EMS practice',
        'Apply ethical decision-making frameworks',
        'Maintain patient confidentiality and privacy rights',
        'Navigate scope of practice limitations and expansions'
      ],
      content: `
# EMS Law & Ethical Practice

## Overview
EMS providers operate within a complex legal and ethical framework that balances patient rights, provider responsibilities, and public safety. Understanding these principles is essential for providing care that is both clinically appropriate and legally defensible.

## Legal Responsibilities

### Duty to Act
- **Good Samaritan Laws**: Protection for volunteers providing emergency care
- **Implied Consent**: Adults are assumed to consent to emergency care when incapacitated
- **Expressed Consent**: Patient must be competent and informed to provide consent
- **Refusal of Care**: Patients have the right to refuse treatment, but must be competent

### Standard of Care
- **Reasonable Person Standard**: Care that a reasonable provider would provide in similar circumstances
- **Scope of Practice**: Limitations defined by training and certification level
- **Protocols and Standing Orders**: Pre-approved treatment guidelines for EMTs
- **Medical Direction**: Physician oversight and consultation availability

## Patient Rights and Confidentiality

### HIPAA and Privacy
- **Protected Health Information (PHI)**: Any information that identifies a patient and relates to health
- **Minimum Necessary Rule**: Share only information required for patient care
- **Business Associate Agreements**: Contracts ensuring privacy compliance
- **Emergency Exceptions**: Limited disclosure allowed in emergencies

### Consent and Capacity
- **Decision-Making Capacity**: Patient's ability to understand treatment options and consequences
- **Emancipated Minors**: Minors who can consent independently (marriage, military service, etc.)
- **Legal Guardians**: Authority to consent for incapacitated patients
- **Advance Directives**: Living wills and DNR orders that must be honored

## Ethical Decision Making

### Core Ethical Principles
- **Beneficence**: Acting in the best interest of the patient
- **Non-Maleficence**: "First, do no harm" - avoiding actions that could cause harm
- **Autonomy**: Respecting patient self-determination and decision-making
- **Justice**: Fair and equitable distribution of healthcare resources

### Ethical Dilemmas in EMS
- **Resource Allocation**: Limited ambulance availability and hospital capacity
- **End-of-Life Care**: Balancing aggressive treatment with patient wishes
- **Cultural Competence**: Respecting diverse cultural beliefs and practices
- **Professional Boundaries**: Maintaining appropriate relationships with patients

## Scope of Practice and Medical Direction

### EMT-B Scope of Practice
- **Assessment Skills**: Scene size-up, primary and secondary surveys
- **Airway Management**: Basic airway maneuvers and oxygen administration
- **Circulatory Support**: CPR, AED use, hemorrhage control
- **Medication Administration**: Limited to EMT-B approved medications

### Medical Direction Requirements
- **Online Medical Direction**: Real-time consultation with physicians
- **Offline Medical Direction**: Pre-approved protocols and standing orders
- **Quality Assurance**: Regular review of care provided
- **Continuing Education**: Mandatory training and skill maintenance

## Documentation and Legal Protection

### Patient Care Reports (PCRs)
- **Accurate and Complete**: All assessments, treatments, and patient responses
- **Objective Language**: Factual descriptions without personal opinions
- **Timely Completion**: Documentation completed as soon as possible after care
- **Chain of Custody**: Proper transfer of reports to receiving facilities

### Legal Protection Strategies
- **Thorough Documentation**: Detailed PCRs provide legal protection
- **Protocol Adherence**: Following approved protocols reduces liability
- **Continuing Education**: Staying current with best practices
- **Professional Liability Insurance**: Coverage for potential lawsuits

## Special Legal Situations

### Child Abuse and Neglect
- **Mandatory Reporting**: All suspected abuse must be reported to authorities
- **Assessment Guidelines**: Recognizing signs of physical, emotional, and sexual abuse
- **Documentation Requirements**: Detailed descriptions of injuries and circumstances

### Elder Abuse
- **Vulnerable Population**: Elderly patients may be unable to report abuse
- **Assessment Considerations**: Recognizing neglect, financial exploitation, and physical abuse
- **Reporting Obligations**: Mandatory reporting to adult protective services

### Domestic Violence
- **Identification**: Recognizing signs of intimate partner violence
- **Safety Planning**: Connecting victims with resources and support
- **Mandatory Reporting**: In some jurisdictions, domestic violence must be reported

### Mental Health Holds
- **Involuntary Commitment**: Criteria for emergency psychiatric evaluation
- **Patient Rights**: Due process and appeal rights for involuntary holds
- **Documentation**: Clear rationale for mental health interventions
      `,
      keyPoints: [
        'EMS providers have a duty to act in emergencies but must balance this with personal safety',
        'Patient consent can be implied in emergencies but expressed consent is preferred when possible',
        'HIPAA protects patient privacy but allows necessary disclosures for patient care',
        'Ethical decision making requires balancing beneficence, non-maleficence, autonomy, and justice'
      ],
      clinicalPearls: [
        'When in doubt about patient capacity, err on the side of treating the patient',
        'Documentation is your best legal protection - if it\'s not documented, it didn\'t happen',
        'Scope of practice violations can result in license suspension or criminal charges',
        'Cultural competence improves patient outcomes and reduces liability risks'
      ]
    },
    {
      id: 'ch-4',
      title: 'Emergency Communication Protocols',
      objectives: [
        'Master radio communication techniques and protocols',
        'Understand medical terminology and abbreviations',
        'Apply effective communication with patients and healthcare team',
        'Navigate language and cultural communication barriers'
      ],
      content: `
# Emergency Communication Protocols

## Overview
Effective communication is the foundation of quality EMS care. Clear, concise communication ensures that patient information is accurately transmitted, resources are properly allocated, and care is coordinated across the healthcare continuum.

## Radio Communication Fundamentals

### Communication Protocols
- **Standard Phraseology**: Clear, concise language avoiding slang and jargon
- **Call Signs**: Unique identifiers for ambulances, hospitals, and dispatch
- **Radio Discipline**: One person speaks at a time, clear transmission
- **Read-Back Verification**: Critical information must be repeated back for confirmation

### Radio Report Structure
- **Unit Identification**: "Ambulance 1 to Main Hospital"
- **Patient Information**: Age, gender, chief complaint, level of consciousness
- **Vital Signs**: Current assessment findings
- **Treatment Provided**: Interventions performed en route
- **ETA and Special Requirements**: Estimated arrival time and any special needs

## Medical Terminology and Documentation

### Common EMS Abbreviations
- **ABC**: Airway, Breathing, Circulation
- **AVPU**: Alert, Verbal, Pain, Unresponsive
- **DCAP-BTLS**: Deformities, Contusions, Abrasions, Punctures, Burns, Tenderness, Lacerations, Swelling
- **OPQRST**: Onset, Provocation/Palliation, Quality, Radiation, Severity, Timing
- **SAMPLE**: Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events

### Documentation Standards
- **Objective Language**: Factual observations without personal interpretation
- **Complete Information**: All assessments, treatments, and patient responses
- **Legible Writing**: Clear, readable documentation
- **Timely Completion**: Reports completed before leaving facility

## Patient Communication

### Communication Techniques
- **Active Listening**: Giving full attention and acknowledging patient concerns
- **Empathy**: Understanding and relating to patient emotions
- **Clear Language**: Avoiding medical jargon when speaking with patients
- **Non-Verbal Communication**: Body language, eye contact, and touch

### Special Communication Situations
- **Language Barriers**: Use of interpreters, translation services, or picture-based communication
- **Hearing Impaired**: Written communication, sign language interpreters
- **Visually Impaired**: Verbal descriptions, tactile communication
- **Developmental Disabilities**: Adapted communication strategies for cognitive impairments

## Interprofessional Communication

### Healthcare Team Coordination
- **Report Formats**: Standardized handoff formats (SBAR, I-PASS)
- **Information Transfer**: Complete patient information to receiving providers
- **Follow-Up Communication**: Updates on patient status and outcomes
- **Conflict Resolution**: Professional handling of disagreements

### SBAR Communication Tool
- **Situation**: What is happening with the patient right now?
- **Background**: What is the patient's baseline and relevant history?
- **Assessment**: What do I think is going on?
- **Recommendation**: What do I think should be done?

## Cultural Competence in Communication

### Cultural Awareness
- **Cultural Differences**: Variations in pain expression, decision-making, and healthcare beliefs
- **Religious Considerations**: Impact of religious beliefs on treatment decisions
- **Family Dynamics**: Role of family in healthcare decisions
- **Health Beliefs**: Cultural variations in understanding illness and treatment

### Building Cultural Competence
- **Self-Assessment**: Recognizing personal cultural biases and assumptions
- **Education**: Learning about different cultural groups and their healthcare practices
- **Language Services**: Access to professional interpreters
- **Community Partnerships**: Working with cultural organizations and leaders

## Communication in Challenging Situations

### Difficult Patients
- **Anxiety and Fear**: Reassurance and clear explanations
- **Anger and Aggression**: Calm, professional de-escalation techniques
- **Confusion and Dementia**: Simple language, repetition, and validation
- **Pain and Discomfort**: Clear communication about pain management

### Family Communication
- **Information Sharing**: Keeping family informed about patient status
- **Emotional Support**: Providing comfort and addressing concerns
- **Decision Making**: Including family in care decisions when appropriate
- **Cultural Sensitivity**: Respecting family dynamics and communication preferences

## Technology and Communication

### Electronic Communication
- **Electronic PCRs**: Digital documentation systems
- **GPS and Navigation**: Real-time location and routing information
- **Mobile Apps**: Communication tools for coordination
- **Video Communication**: Telemedicine consultations

### Data Security
- **HIPAA Compliance**: Protecting patient information in electronic systems
- **Secure Transmission**: Encrypted communication channels
- **Access Controls**: Limiting access to authorized personnel
- **Audit Trails**: Tracking access to patient information

## Communication Training and Improvement

### Ongoing Education
- **Communication Skills Training**: Regular practice and feedback
- **Cultural Competence Training**: Building awareness and skills
- **Technology Training**: Proficiency with communication tools
- **Quality Improvement**: Regular review and improvement of communication processes

### Performance Evaluation
- **Communication Audits**: Review of radio communications and documentation
- **Patient Feedback**: Surveys and feedback on communication effectiveness
- **Peer Review**: Colleague evaluation of communication skills
- **Continuing Education**: Advanced communication training opportunities
      `,
      keyPoints: [
        'Clear, concise communication is essential for patient safety and quality care',
        'Radio communications require standard phraseology and read-back verification',
        'Patient communication should be empathetic, clear, and culturally competent',
        'Documentation must be accurate, objective, and complete'
      ],
      clinicalPearls: [
        'In radio communications, "say again" is better than "what?" when you miss transmission',
        'When communicating with patients, explain what you\'re doing before you do it',
        'Cultural competence improves patient outcomes and satisfaction',
        'Poor communication is a leading cause of medical errors'
      ]
    }
  ]
};

// Export the module for use in components
export const mockStudyContent = {
  foundationsModule
};