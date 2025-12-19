// EMT Skills Flow Drills and Scenario Library
// Multi-choice driven practice to reinforce psychomotor sequencing without restricted wording

export interface SkillFlowChoice {
  id: string;
  text: string;
  explanation: string;
  isCorrect: boolean;
}

export interface SkillFlowQuestion {
  id: string;
  prompt: string;
  focus: string;
  timeLimitSeconds: number;
  choices: SkillFlowChoice[];
  reinforcement?: string;
}

export interface SkillFlowModule {
  id: string;
  skill: string;
  tagline: string;
  description: string;
  flowHighlights: string[];
  cautionNotes: string[];
  questions: SkillFlowQuestion[];
}

export const EMT_SKILL_FLOWS: SkillFlowModule[] = [
  {
    id: 'manual-bvm-flow',
    skill: 'Manual Ventilation Workflow (Apneic Adult)',
    tagline: 'Clear the airway, seal the mask, and deliver steady breaths.',
    description:
      'Rehearse the coordinated steps for assisting an apneic adult using a bag-valve-mask while protecting the airway and working in tandem with your partner.',
    flowHighlights: [
      'Open with PPE confirmation and a rapid plan so the crew moves in sync.',
      'Assess responsiveness, breathing, and carotid pulse in under ten seconds.',
      'Remove contaminants, insert an airway adjunct, and ventilate within half a minute of clearing the airway.',
      'Use a two-person technique to maintain a mask seal and monitor tidal volume.'
    ],
    cautionNotes: [
      'Lingering suction beyond ten seconds can worsen hypoxia.',
      'Skipping airway clearance risks forcing fluids into the lungs.',
      'Overzealous squeezing of the bag can inflate the stomach and reduce lung compliance.'
    ],
    questions: [
      {
        id: 'manual-bvm-q1',
        prompt:
          'You reach an unresponsive adult displaying agonal gasps. What action properly launches the ventilation workflow?',
        focus: 'Scene launch',
        timeLimitSeconds: 60,
        choices: [
          {
            id: 'a',
            text: 'State PPE in use and brief your partner on roles before touching the patient.',
            explanation: 'Declaring safety and crew roles keeps everyone protected and aligned prior to airway contact.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Deliver two test ventilations to gauge chest rise.',
            explanation: 'Ventilations before clearing the airway or assigning roles risk aspiration and confusion.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Insert an oropharyngeal airway immediately and postpone the pulse check.',
            explanation: 'Adjuncts follow after a rapid breathing and pulse assessment so you know whether compressions are required.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Check blood pressure to establish perfusion trends.',
            explanation: 'Blood pressure can wait; initial seconds are reserved for airway, breathing, and pulse evaluation.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'manual-bvm-q2',
        prompt: 'After suction removes emesis from the airway, when should the first assisted ventilation be delivered?',
        focus: 'Airway timing',
        timeLimitSeconds: 55,
        choices: [
          {
            id: 'a',
            text: 'Within 30 seconds of completing airway clearance.',
            explanation: 'A prompt ventilation window keeps the patient oxygenated once the airway is patent.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'After two full minutes of pulse reassessments.',
            explanation: 'Long delays after suction leave the patient hypoxic and contradict evidence-based practice.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'After finishing a full head-to-toe exam.',
            explanation: 'The detailed exam can wait; ventilations take priority once the airway is clear.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Only when ALS arrives with advanced airway tools.',
            explanation: 'BLS crews must begin ventilations immediately—ALS backup is not required to start breathing support.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'manual-bvm-q3',
        prompt: 'Which observation best confirms that your ventilations are effective?',
        focus: 'Quality check',
        timeLimitSeconds: 50,
        choices: [
          {
            id: 'a',
            text: 'Visible chest rise with easy bag squeeze and improving pulse oximetry.',
            explanation: 'Consistent chest rise and rising SpO2 confirm adequate tidal volumes and oxygenation.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'The bag feels progressively harder to squeeze each breath.',
            explanation: 'Increasing resistance suggests poor airway positioning or gastric inflation, not success.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'You hear air leaking around the mask seal with each ventilation.',
            explanation: 'Air leaks reduce delivered volume and signal the seal needs correction.',
            isCorrect: false
          },
          {
            id: 'd',
            text: "The patient's stomach visibly inflates after several breaths.",
            explanation: 'Gastric distention means air is missing the lungs and requires immediate adjustment.',
            isCorrect: false
          }
        ]
      }
    ]
  },
  {
    id: 'hemorrhage-shock-flow',
    skill: 'Bleeding Control & Shock Sequence',
    tagline: 'Stop the bleed, stabilize perfusion, and plan the exit.',
    description:
      'Use this drill to rehearse escalating hemorrhage control while supporting perfusion and preparing for rapid transport.',
    flowHighlights: [
      'Initiate with PPE and direct pressure as the first mechanical control.',
      'Escalate to a tourniquet or wound packing when direct pressure fails to slow the bleed.',
      'Position the patient, conserve heat, and deliver high-flow oxygen to support perfusion.',
      'Document critical times and call for transport early while reassessing en route.'
    ],
    cautionNotes: [
      'Do not remove a tourniquet once bleeding is controlled.',
      'Failing to document the application time complicates hospital care.',
      'Skipping hypothermia prevention accelerates shock progression.'
    ],
    questions: [
      {
        id: 'hemorrhage-q1',
        prompt:
          'A farm worker continues to hemorrhage despite firm direct pressure. What is the next best step in the flow?',
        focus: 'Escalation',
        timeLimitSeconds: 55,
        choices: [
          {
            id: 'a',
            text: 'Apply a tourniquet proximal to the wound and tighten until bleeding stops.',
            explanation: 'Escalating to a tourniquet rapidly controls life-threatening extremity bleeding.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Remove the dressing every 30 seconds to inspect the wound.',
            explanation: 'Peeking breaks the clot and worsens hemorrhage; maintain steady pressure or escalate properly.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Wait for ALS to bring hemostatic gauze before changing tactics.',
            explanation: 'BLS crews should escalate immediately; delaying for ALS prolongs uncontrolled bleeding.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Elevate the limb above the heart and observe for five minutes.',
            explanation: 'Elevation alone does not control arterial bleeding and wastes critical time.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'hemorrhage-q2',
        prompt: 'Once bleeding is controlled, which supportive action best preserves perfusion?',
        focus: 'Perfusion support',
        timeLimitSeconds: 50,
        choices: [
          {
            id: 'a',
            text: 'Lay the patient supine, apply blankets, and deliver high-flow oxygen.',
            explanation: 'Positioning, warmth, and oxygen protect perfusion during early shock.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Offer small sips of water to maintain hydration.',
            explanation: 'Oral intake is contraindicated during shock and prior to transport.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Have the patient sit upright to relieve anxiety.',
            explanation: 'Sitting reduces core perfusion and can worsen hypotension.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Allow the wound to remain uncovered so clotting can air-dry.',
            explanation: 'Exposed wounds lose heat, increasing bleeding and shock progression.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'hemorrhage-q3',
        prompt: 'During documentation, which detail is essential for the receiving team?',
        focus: 'Documentation',
        timeLimitSeconds: 45,
        choices: [
          {
            id: 'a',
            text: 'Exact time and location of the tourniquet application.',
            explanation: 'Tourniquet time and placement guide definitive care and potential reperfusion decisions.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Weather conditions encountered during transport.',
            explanation: 'Weather rarely alters immediate hospital interventions for hemorrhage control.',
            isCorrect: false
          },
          {
            id: 'c',
            text: "The patient's favorite music for calming purposes.",
            explanation: 'Personal preferences do not inform emergent hemorrhage management.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Exact brand name of the gauze utilized.',
            explanation: 'Hospitals focus on treatment times and responses rather than supply branding.',
            isCorrect: false
          }
        ]
      }
    ]
  },
  {
    id: 'long-bone-stabilization-flow',
    skill: 'Long Bone Stabilization Flow',
    tagline: 'Capture the limb, pad well, and protect distal function.',
    description:
      'Practice the deliberate sequence for stabilizing long bone injuries, preserving neurovascular status, and preparing for safe movement.',
    flowHighlights: [
      'Begin with manual stabilization of the injured extremity and confirm PPE.',
      'Check distal circulation, sensation, and motor function before splinting.',
      'Pad voids, secure joints above and below, and immobilize the entire limb.',
      'Reassess distal status after securing to confirm perfusion.'
    ],
    cautionNotes: [
      'Avoid gross repositioning unless distal pulses are absent and medical control approves.',
      'Leaving voids beneath the limb invites pressure sores and instability.',
      'Never skip the post-splint neurovascular check.'
    ],
    questions: [
      {
        id: 'long-bone-q1',
        prompt: 'On arrival you see an angulated tib-fib fracture. What is the first priority after scene safety?',
        focus: 'Initial control',
        timeLimitSeconds: 50,
        choices: [
          {
            id: 'a',
            text: 'Manual stabilization of the injured leg while a partner readies the splint.',
            explanation: 'Hands-on stabilization prevents further injury before equipment is placed.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Apply traction immediately without assessment.',
            explanation: 'Traction requires specific indications and assessment of distal function first.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Cut away clothing and start irrigating the wound.',
            explanation: 'Cleansing is secondary to stabilizing the fracture and assessing perfusion.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Have the patient attempt to stand to gauge pain.',
            explanation: 'Movement risks further injury and is contraindicated.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'long-bone-q2',
        prompt: 'After the splint is secured, what reassessment is mandatory before moving the patient?',
        focus: 'Reassessment',
        timeLimitSeconds: 45,
        choices: [
          {
            id: 'a',
            text: 'Check distal pulse, movement, and sensation compared with baseline.',
            explanation: 'Comparing before-and-after neurovascular status verifies the splint is not compromising perfusion.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Obtain a full set of vitals for documentation.',
            explanation: 'Vital signs are important but do not confirm limb perfusion post-splint.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Re-tighten the straps beyond patient comfort to prevent movement.',
            explanation: 'Over-tightening risks compressing vessels and nerves.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Have the patient actively flex the ankle to ensure immobilization.',
            explanation: 'Active movement is unnecessary and may disrupt alignment.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'long-bone-q3',
        prompt: 'Which padding strategy best protects the limb within the splint?',
        focus: 'Padding',
        timeLimitSeconds: 40,
        choices: [
          {
            id: 'a',
            text: 'Fill gaps with soft padding so the limb rests evenly in the device.',
            explanation: 'Padding voids minimizes pressure points and maintains alignment.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Leave gaps to allow ventilation around the injury.',
            explanation: 'Unpadded gaps permit movement and create painful pressure areas.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Use rigid blocks to force a perfectly straight alignment.',
            explanation: 'Rigid forcing may worsen the fracture and is unnecessary if pulses are intact.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Skip padding so transport is faster.',
            explanation: 'Comfort and stability suffer without padding, increasing injury risk.',
            isCorrect: false
          }
        ]
      }
    ]
  },
  {
    id: 'seated-spinal-flow',
    skill: 'Seated Spinal Motion Restriction Flow',
    tagline: 'Lock the head, secure the torso, and maintain alignment throughout.',
    description:
      'Practice the seated spinal restriction sequence so manual stabilization, device placement, and strap order become muscle memory.',
    flowHighlights: [
      'Direct a partner to stabilize the head the moment you arrive.',
      'Apply a properly sized collar while manual stabilization is maintained.',
      'Secure the torso before the head so the device will not shift.',
      'Reassess distal circulation, motor function, and sensation after immobilization.'
    ],
    cautionNotes: [
      'Releasing manual stabilization too early invites spinal movement.',
      'Securing the head before the torso can cause the device to ride up.',
      'Overtightening straps may impair breathing.'
    ],
    questions: [
      {
        id: 'spinal-q1',
        prompt: 'On a seated collision victim, what directive should be given immediately after confirming PPE?',
        focus: 'Initial command',
        timeLimitSeconds: 45,
        choices: [
          {
            id: 'a',
            text: 'Instruct a partner to take manual head stabilization and hold neutral alignment.',
            explanation: 'Early manual control protects the spine while the device is prepared.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Apply torso straps first so the device stays in place.',
            explanation: 'Torso straps come later; manual control must be established first.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Ask the patient to shrug to test shoulder movement.',
            explanation: 'Movement checks are deferred until immobilization is secure.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Remove the patient from the seat before stabilizing.',
            explanation: 'Movement prior to stabilization increases injury risk.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'spinal-q2',
        prompt: 'What is the correct order when securing the patient to the seated spinal device?',
        focus: 'Sequence',
        timeLimitSeconds: 40,
        choices: [
          {
            id: 'a',
            text: 'Torso straps first, then lap belt, then head support.',
            explanation: 'Securing the torso before the head prevents the device from shifting upward.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Head straps first, then chest and lap straps.',
            explanation: 'Locking the head before the torso can force flexion or extension if the device moves.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Lap belt first, then head straps, then torso.',
            explanation: 'This sequence fails to control the torso adequately before the head is secured.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'It does not matter as long as all straps are tight.',
            explanation: 'Order matters to maintain alignment and patient comfort.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'spinal-q3',
        prompt: 'After immobilization, which check confirms the patient remains neurovascularly intact?',
        focus: 'Reassessment',
        timeLimitSeconds: 35,
        choices: [
          {
            id: 'a',
            text: 'Verify distal motor function, sensation, and circulation in all extremities.',
            explanation: 'Comparing neurological status before and after confirms the device did not compromise function.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Ensure the patient can nod “yes” slowly.',
            explanation: 'Neck movement undermines immobilization and is unnecessary.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Tighten the head straps until the patient cannot speak.',
            explanation: 'Overtightening is unsafe and does not assess neurological function.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Loosen the torso straps to improve comfort.',
            explanation: 'Loosening straps risks motion and offers no neurological insight.',
            isCorrect: false
          }
        ]
      }
    ]
  },
  {
    id: 'oxygen-nrb-flow',
    skill: 'High-Flow Oxygen Delivery Routine',
    tagline: 'Build the system, test for leaks, coach the patient.',
    description:
      'Walk through the sequence for assembling and delivering high-flow oxygen via a nonrebreather mask without cutting corners.',
    flowHighlights: [
      'Briefly crack the cylinder to clear debris before attaching the regulator.',
      'Open the cylinder fully, check pressure, and listen for leaks.',
  'Prefill the reservoir bag before placing the mask.',
  'Set flow to at least 12-15 LPM and coach the patient on breathing cues.'
    ],
    cautionNotes: [
      'Failing to prefill the reservoir delivers lower oxygen concentration.',
      'Partially opened cylinders can leak or underdeliver flow.',
      'A poor mask seal wastes oxygen and reduces effectiveness.'
    ],
    questions: [
      {
        id: 'oxygen-q1',
        prompt: 'Why is “cracking” the cylinder valve before attaching the regulator an important step?',
        focus: 'Cylinder prep',
        timeLimitSeconds: 40,
        choices: [
          {
            id: 'a',
            text: 'It clears dust or moisture to protect the regulator seal.',
            explanation: 'Clearing debris prevents damage and ensures a tight seal.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'It quickly cools the regulator to prevent overheating.',
            explanation: 'Cooling the device is unnecessary; debris removal is the true reason.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'It shows the patient how loud the oxygen will be.',
            explanation: 'The patient does not need a demonstration of cylinder noise.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'It empties leftover oxygen so the tank starts fresh.',
            explanation: 'Purging the entire cylinder is wasteful and unnecessary.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'oxygen-q2',
        prompt: 'When should the reservoir bag be filled during the delivery sequence?',
        focus: 'Reservoir prep',
        timeLimitSeconds: 35,
        choices: [
          {
            id: 'a',
            text: "Before the mask is placed on the patient's face.",
            explanation: 'A full reservoir ensures the first breaths deliver high-concentration oxygen.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'After the mask is on to prevent wasting oxygen.',
            explanation: 'Waiting leaves the initial breaths at room air concentration.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Only if the patient requests more oxygen.',
            explanation: 'The reservoir bag should always be inflated before application.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'It is optional for adult patients who can breathe deeply.',
            explanation: 'Regardless of patient effort, the reservoir must be inflated for proper delivery.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'oxygen-q3',
        prompt: 'Which coaching cue helps patients tolerate the nonrebreather mask?',
        focus: 'Patient coaching',
        timeLimitSeconds: 35,
        choices: [
          {
            id: 'a',
            text: 'Encourage slow, deep breaths through the nose and reassure about the snug fit.',
            explanation: 'Coaching reduces anxiety and promotes effective oxygenation.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Tell the patient to remove the mask if it feels warm.',
            explanation: 'Removing the mask disrupts oxygen delivery and should be avoided.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Allow them to talk continuously to monitor mentation.',
            explanation: 'Continuous talking interrupts effective breathing with the mask on.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Advise them to breathe through their mouth only.',
            explanation: 'Either nasal or oral breathing may be needed; the focus is on calm, deep breaths.',
            isCorrect: false
          }
        ]
      }
    ]
  },
  {
    id: 'trauma-assessment-flow',
    skill: 'Trauma Assessment Decision Pathway',
    tagline: 'Identify life threats, decide on load-and-go, and stay systematic.',
    description:
      'Reinforce a rapid trauma survey that balances scene size-up, primary assessment, and decisive transport decisions.',
    flowHighlights: [
      'Conduct a structured scene size-up before touching the patient.',
      'Address airway, breathing, and circulation life threats immediately.',
      'Rapidly determine transport priority based on mechanism, findings, and mental status.',
      'Perform focused or rapid secondary exams only after life threats are controlled.'
    ],
    cautionNotes: [
      'Skipping the scene size-up can expose rescuers to hazards.',
      'Delaying transport decisions past the ten-minute mark risks the golden hour.',
      'Completing detailed exams before treating life threats wastes time.'
    ],
    questions: [
      {
        id: 'trauma-q1',
        prompt: 'What triggers an immediate “load-and-go” decision during the primary survey?',
        focus: 'Transport priority',
        timeLimitSeconds: 45,
        choices: [
          {
            id: 'a',
            text: 'Uncontrolled hemorrhage with dropping mental status.',
            explanation: 'Life threats paired with altered LOC mandate rapid transport.',
            isCorrect: true
          },
          {
            id: 'b',
            text: "Stable vitals but a request for the patient's wallet.",
            explanation: 'Personal items do not dictate transport urgency.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Minor abrasions and a complaint of hunger.',
            explanation: 'Minor findings do not require emergent transport.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Normal airway and breathing with localized pain only.',
            explanation: 'Without life threats, a full assessment can be completed on scene.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'trauma-q2',
        prompt: 'During scene size-up you identify an unstable vehicle and leaking fuel. What should happen before patient contact?',
        focus: 'Scene safety',
        timeLimitSeconds: 40,
        choices: [
          {
            id: 'a',
            text: 'Request fire suppression resources and secure the hazard zone.',
            explanation: 'Addressing hazards protects rescuers and patients from secondary injury.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Ignore the leak to save time and start the exam.',
            explanation: 'Ignoring hazards endangers everyone on scene.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Ask the patient to self-extricate to a safe area.',
            explanation: 'Self-extrication without stabilization risks spinal and further trauma.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Take a quick social media video to document conditions.',
            explanation: 'Documenting via video is inappropriate and delays care.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'trauma-q3',
        prompt: 'When should a focused secondary exam occur during trauma care?',
        focus: 'Assessment flow',
        timeLimitSeconds: 35,
        choices: [
          {
            id: 'a',
            text: 'After life threats are addressed and transport decisions are made.',
            explanation: 'Secondary exams follow stabilization of airway, breathing, and circulation.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Before the primary survey to gather baseline data.',
            explanation: 'Primary assessments precede any detailed exam.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Only if the patient is unconscious.',
            explanation: 'Both conscious and unconscious trauma patients benefit from targeted exams at the correct time.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'It is optional because vitals reveal everything needed.',
            explanation: 'Secondary exams reveal injuries not identified by vitals alone.',
            isCorrect: false
          }
        ]
      }
    ]
  },
  {
    id: 'medical-assessment-flow',
    skill: 'Medical Assessment Decision Pathway',
    tagline: 'Stabilize first, then uncover the story.',
    description:
      'Practice a methodical medical assessment that stabilizes urgent issues before capturing a detailed history.',
    flowHighlights: [
      'Scene size-up and PPE set the stage for a safe approach.',
      'Primary survey focuses on airway, breathing, circulation, and disability.',
  "OPQRST and SAMPLE history clarify the patient's current story.",
      'Focused exams and reassessments track response to interventions.'
    ],
    cautionNotes: [
      'Do not delay oxygen or ventilation while searching for history details.',
      'Skipping the chief complaint narrative blinds later decision making.',
      'Failure to reassess after interventions hides changing conditions.'
    ],
    questions: [
      {
        id: 'medical-q1',
        prompt: 'During the primary survey you find a conscious patient with inadequate respirations. What takes priority?',
        focus: 'Primary survey',
        timeLimitSeconds: 45,
        choices: [
          {
            id: 'a',
            text: 'Provide assisted ventilations while monitoring airway patency.',
            explanation: 'Stabilizing breathing supersedes gathering detailed histories.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'Begin a full SAMPLE interview before touching the patient.',
            explanation: 'History gathering follows stabilization of life threats.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Take a manual blood pressure to trend perfusion first.',
            explanation: 'Ventilations must occur before secondary vital sign gathering.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Request family members leave the room to reduce noise.',
            explanation: 'While crowd control helps, it does not outrank correcting inadequate respirations.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'medical-q2',
        prompt: 'Which OPQRST question explores “quality” of the symptom?',
        focus: 'History',
        timeLimitSeconds: 35,
        choices: [
          {
            id: 'a',
            text: '“Can you describe what the discomfort feels like?”',
            explanation: "Quality captures the patient's description of the sensation.",
            isCorrect: true
          },
          {
            id: 'b',
            text: '“When did this start today?”',
            explanation: 'That question explores time, not quality.',
            isCorrect: false
          },
          {
            id: 'c',
            text: '“Does anything make it better or worse?”',
            explanation: 'That probes provocation and palliation.',
            isCorrect: false
          },
          {
            id: 'd',
            text: '“Have you taken any medications for this?”',
            explanation: 'Medication usage appears in SAMPLE, not OPQRST quality.',
            isCorrect: false
          }
        ]
      },
      {
        id: 'medical-q3',
        prompt: 'After administering a bronchodilator, when should you reassess the patient?',
        focus: 'Reassessment',
        timeLimitSeconds: 35,
        choices: [
          {
            id: 'a',
            text: 'Within a few minutes to document breathing changes and side effects.',
            explanation: 'Timely reassessment verifies effectiveness and safety of the intervention.',
            isCorrect: true
          },
          {
            id: 'b',
            text: 'At the end of transport to avoid distracting the driver.',
            explanation: 'Delaying reassessment risks missing deterioration.',
            isCorrect: false
          },
          {
            id: 'c',
            text: 'Only if the patient complains of new symptoms.',
            explanation: 'Waiting for complaints misses subtle but important changes.',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Reassessment is optional because the medicine usually works.',
            explanation: 'Every intervention needs follow-up to confirm results.',
            isCorrect: false
          }
        ]
      }
    ]
  }
];

export interface SkillScenario {
  id: string;
  title: string;
  focusSkill: string;
  environment: string;
  patientPresentation: string;
  summary: string;
  keyFindings: string[];
  trainingTakeaways: string[];
}

export const EMT_SKILL_SCENARIOS: SkillScenario[] = [
  {
    id: 'scenario-manual-01',
    title: 'Warehouse Collapse Airway Emergency',
    focusSkill: 'Manual Ventilation Workflow (Apneic Adult)',
    environment: 'Industrial warehouse floor',
    patientPresentation: '48-year-old male pulled from debris, unresponsive with agonal gasps.',
    summary: 'Coordinate suction, adjunct placement, and two-person BVM technique amid loud equipment and dust.',
    keyFindings: ['Soot and dust coating airway', 'Weak carotid pulse at 58 bpm', 'No spontaneous respirations'],
  trainingTakeaways: ['Assign roles before entry', 'Limit suction to under ten seconds per pass', 'Monitor chest rise and SpO2 continuously']
  },
  {
    id: 'scenario-manual-02',
    title: 'Post-Seizure Respiratory Arrest',
    focusSkill: 'Manual Ventilation Workflow (Apneic Adult)',
    environment: 'Residential bedroom',
    patientPresentation: '42-year-old found supine, gurgling respirations that quickly stop.',
    summary: 'Manage airway contamination from emesis while initiating prompt ventilations and coordinating ALS intercept.',
    keyFindings: ['Tongue bite noted', 'Oral secretions pooling', 'Pulse 64 and irregular'],
    trainingTakeaways: ['Prepare suction before BVM', 'Insert adjunct when no gag reflex is present', 'Document ventilation timeline for the handoff']
  },
  {
    id: 'scenario-hemo-01',
    title: 'Farm Equipment Laceration',
    focusSkill: 'Bleeding Control & Shock Sequence',
    environment: 'Rural barn in winter conditions',
    patientPresentation: '50-year-old with arterial forearm bleed after auger injury.',
    summary: 'Transition from direct pressure to tourniquet while preventing hypothermia on a cold concrete floor.',
    keyFindings: ['Bright red spurting blood', 'Skin cool and pale', 'Systolic trending down'],
    trainingTakeaways: ['Record tourniquet time visibly', 'Layer blankets over and under patient', 'Announce transport priority early']
  },
  {
    id: 'scenario-hemo-02',
    title: 'Downtown Stabbing Response',
    focusSkill: 'Bleeding Control & Shock Sequence',
    environment: 'Sidewalk outside nightlife venue',
    patientPresentation: '27-year-old with deep thigh laceration, soaked dressings, anxious and tachycardic.',
    summary: 'Control extremity hemorrhage in a crowd, coordinate police for scene safety, and prepare for quick transport.',
    keyFindings: ['Continued bleeding despite pressure', 'Heart rate 132', 'Clammy skin'],
    trainingTakeaways: ['Use high-and-tight tourniquet placement', 'Request additional units for crowd management', 'Provide oxygen and warmth while packaging']
  },
  {
    id: 'scenario-longbone-01',
    title: 'Motorcycle Crash Femur Fracture',
    focusSkill: 'Long Bone Stabilization Flow',
    environment: 'Highway shoulder at dusk',
    patientPresentation: '35-year-old with obvious mid-shaft femur deformity and severe pain.',
    summary: 'Stabilize the limb, monitor distal pulses, and coordinate packaging on a busy roadway.',
    keyFindings: ['Exposed bone fragments', 'Foot cool but pulses present', 'Patient anxious and diaphoretic'],
    trainingTakeaways: ['Maintain manual stabilization until splint secure', 'Pad voids extensively', 'Reassess CMS before and after splinting']
  },
  {
    id: 'scenario-longbone-02',
    title: 'Soccer Field Tib-Fib Fracture',
    focusSkill: 'Long Bone Stabilization Flow',
    environment: 'Community sports field',
    patientPresentation: 'Teenage athlete with angulated lower leg, pulses weak but present.',
    summary: 'Immobilize a lower leg fracture while calming teammates and preparing for transport.',
    keyFindings: ['Swelling and deformity mid-shaft', 'Capillary refill sluggish', 'Severe pain with movement'],
    trainingTakeaways: ['Explain each step to reduce anxiety', 'Immobilize joints above and below injury', 'Check perfusion after securing splint']
  },
  {
    id: 'scenario-spinal-01',
    title: 'Seated MVC with Neck Pain',
    focusSkill: 'Seated Spinal Motion Restriction Flow',
    environment: 'Urban intersection',
    patientPresentation: 'Driver alert, complaining of neck pain after rear-end collision.',
    summary: 'Apply seated spinal device while coordinating with fire for vehicle stabilization.',
    keyFindings: ['Midline cervical tenderness', 'No neurological deficits initially', 'Vehicle stable but confined space'],
    trainingTakeaways: ['Assign manual stabilization immediately', 'Measure and apply collar before device placement', 'Secure torso before head restraints']
  },
  {
    id: 'scenario-spinal-02',
    title: 'Roller Coaster Seat Extraction',
    focusSkill: 'Seated Spinal Motion Restriction Flow',
    environment: 'Theme park loading platform',
    patientPresentation: '20-year-old complaining of paresthesia after abrupt stop, still seated.',
    summary: 'Perform seated spinal restriction in a confined harnessed seat with loud distractions.',
    keyFindings: ['Tingling in hands', 'Anxious but oriented', 'Difficult access around shoulders'],
    trainingTakeaways: ['Communicate calm, clear instructions', 'Pad gaps behind head and shoulders', 'Confirm CMS after immobilization']
  },
  {
    id: 'scenario-oxygen-01',
    title: 'Wildfire Smoke Exposure',
    focusSkill: 'High-Flow Oxygen Delivery Routine',
    environment: 'Subdivision near active wildfire',
    patientPresentation: '64-year-old with labored breathing and soot around nares.',
    summary: 'Deliver high-flow oxygen while assessing for airway burns and coordinating evacuation.',
  keyFindings: ['Hoarse voice', 'SpO2 88% on room air', 'Singeing of nasal hair'],
    trainingTakeaways: ['Inspect cylinder seal for debris', 'Prefill reservoir before mask placement', 'Coach patient through anxiety related to mask']
  },
  {
    id: 'scenario-oxygen-02',
    title: 'High-Rise Carbon Monoxide Alarm',
    focusSkill: 'High-Flow Oxygen Delivery Routine',
    environment: 'Apartment hallway during evacuation',
    patientPresentation: 'Family of three with headache and dizziness; one adult visibly fatigued.',
    summary: 'Deploy nonrebreather masks rapidly while coordinating additional resources and ventilation.',
  keyFindings: ['All patients with mild confusion', 'SpO2 readings unreliable due to CO exposure', 'Fire department ventilating building'],
    trainingTakeaways: ['Ensure fresh cylinders available', 'Check for leaks after regulator attachment', 'Explain the need to keep masks on during movement']
  },
  {
    id: 'scenario-trauma-01',
    title: 'Construction Site Collapse',
    focusSkill: 'Trauma Assessment Decision Pathway',
    environment: 'Downtown construction pit',
    patientPresentation: 'Worker struck by falling beam, responsive but disoriented.',
    summary: 'Perform rapid trauma assessment while hazards persist and initiate early transport.',
    keyFindings: ['Altered mental status', 'Labored breathing', 'Uncontrolled bleeding from scalp'],
    trainingTakeaways: ['Initiate load-and-go decision quickly', 'Coordinate additional units for hazard control', 'Complete secondary exam en route']
  },
  {
    id: 'scenario-trauma-02',
    title: 'Rural ATV Rollover',
    focusSkill: 'Trauma Assessment Decision Pathway',
    environment: 'Wooded trail',
    patientPresentation: 'Teen rider found 15 feet from ATV with shallow respirations.',
    summary: 'Balance scene safety with rapid primary survey and swift transport from remote location.',
    keyFindings: ['Possible chest wall instability', 'Weak radial pulses', 'Mechanism suggesting high energy'],
    trainingTakeaways: ['Delegate hazard control to partners', 'Prioritize airway and breathing support', 'Limit on-scene time to under ten minutes']
  },
  {
    id: 'scenario-medical-01',
    title: 'Midday Asthma Crisis',
    focusSkill: 'Medical Assessment Decision Pathway',
    environment: 'Office conference room',
    patientPresentation: '34-year-old seated upright, speaking in short phrases with wheezes.',
    summary: 'Stabilize breathing, gather focused history, and coordinate bronchodilator administration.',
  keyFindings: ['Accessory muscle use', 'SpO2 90% on room air', 'History of asthma with rescue inhaler nearby'],
    trainingTakeaways: ['Assist ventilations if effort worsens', 'Use OPQRST to clarify triggers', 'Reassess after medication delivery within minutes']
  },
  {
    id: 'scenario-medical-02',
    title: 'Nocturnal Chest Pressure',
    focusSkill: 'Medical Assessment Decision Pathway',
    environment: 'Residential living room',
    patientPresentation: '58-year-old male awakened by chest pressure radiating to jaw.',
    summary: 'Perform primary survey, gather detailed OPQRST/SAMPLE data, and prepare for cardiac transport.',
    keyFindings: ['Skin cool and clammy', 'Blood pressure 162/94', 'Pain 7/10 lasting 20 minutes'],
    trainingTakeaways: ['Prioritize oxygen and aspirin per protocol', 'Capture direct patient quotes in documentation', 'Reassess vital trends every five minutes']
  }
];
