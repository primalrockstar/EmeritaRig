export interface ParsedVitals {
  systolic?: number;
  diastolic?: number;
  pulse?: number;
  respirations?: number;
  spo2?: number;
}

/**
 * Parses vital signs from narrative text using regex patterns
 * @param text - The narrative text to parse
 * @returns Partial object containing detected vital signs
 */
export function parseVitalsFromNarrative(text: string): ParsedVitals {
  const vitals: ParsedVitals = {};

  // Convert to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();

  // Blood Pressure patterns
  // Matches: "BP 120 over 80", "120/80", "Blood pressure 120 80", "BP 120/80"
  const bpRegex = /(?:blood pressure|bp|b\.p\.?)\s*(\d{2,3})\s*(?:over|\/|and|-)\s*(\d{2,3})/gi;
  const bpMatch = bpRegex.exec(lowerText);
  if (bpMatch) {
    vitals.systolic = parseInt(bpMatch[1]);
    vitals.diastolic = parseInt(bpMatch[2]);
  }

  // Pulse/Heart Rate patterns
  // Matches: "Pulse 80", "Heart rate 100", "HR 60", "Pulse rate 90"
  const pulseRegex = /(?:pulse(?:\s+rate)?|heart\s+rate|hr|h\.r\.?)\s+(\d{2,3})/gi;
  const pulseMatch = pulseRegex.exec(lowerText);
  if (pulseMatch) {
    vitals.pulse = parseInt(pulseMatch[1]);
  }

  // Respirations patterns
  // Matches: "Respirations 16", "Respiratory rate 20", "RR 18"
  const respRegex = /(?:respirations|respiratory\s+rate|rr|r\.r\.?)\s+(\d{1,2})/gi;
  const respMatch = respRegex.exec(lowerText);
  if (respMatch) {
    vitals.respirations = parseInt(respMatch[1]);
  }

  // SpO2 patterns
  // Matches: "Sats 98", "Oxygen 94", "SpO2 100", "O2 sat 96"
  const spo2Regex = /(?:sats?|oxygen|spo2|sp02|o2\s*sat|o2\s*sats?)\s+(\d{2,3})/gi;
  const spo2Match = spo2Regex.exec(lowerText);
  if (spo2Match) {
    vitals.spo2 = parseInt(spo2Match[1]);
  }

  return vitals;
}

/**
 * Validates if parsed vital signs are within reasonable ranges
 * @param vitals - The parsed vitals to validate
 * @returns Object with validation results
 */
export function validateVitals(vitals: ParsedVitals): { [key: string]: boolean } {
  const validation: { [key: string]: boolean } = {};

  if (vitals.systolic !== undefined) {
    validation.systolic = vitals.systolic >= 60 && vitals.systolic <= 250;
  }

  if (vitals.diastolic !== undefined) {
    validation.diastolic = vitals.diastolic >= 30 && vitals.diastolic <= 150;
  }

  if (vitals.pulse !== undefined) {
    validation.pulse = vitals.pulse >= 30 && vitals.pulse <= 200;
  }

  if (vitals.respirations !== undefined) {
    validation.respirations = vitals.respirations >= 4 && vitals.respirations <= 60;
  }

  if (vitals.spo2 !== undefined) {
    validation.spo2 = vitals.spo2 >= 70 && vitals.spo2 <= 100;
  }

  return validation;
}