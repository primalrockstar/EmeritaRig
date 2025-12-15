// EMT-B PCR Training Scenarios Index
// This file imports scenario data from multiple JSON files and exports a combined array

const ALL_SCENARIOS = [];

// Import scenarios from 5 JSON files with error handling
const loadScenariosFromFile = (scenarios, fileName) => {
  if (Array.isArray(scenarios)) {
    ALL_SCENARIOS.push(...scenarios);
    console.log(`Loaded ${scenarios.length} scenarios from ${fileName}`);
  } else {
    console.warn(`Invalid scenario data in ${fileName}: expected array, got ${typeof scenarios}`);
  }
};

// Try to import each scenario file (will fail gracefully if files don't exist)
try {
  const basicScenarios = require('./scenarios-basic.json');
  loadScenariosFromFile(basicScenarios, 'scenarios-basic.json');
} catch (error) {
  console.warn('Could not load scenarios-basic.json:', error.message);
}

try {
  const medicalScenarios = require('./scenarios-medical.json');
  loadScenariosFromFile(medicalScenarios, 'scenarios-medical.json');
} catch (error) {
  console.warn('Could not load scenarios-medical.json:', error.message);
}

try {
  const traumaScenarios = require('./scenarios-trauma.json');
  loadScenariosFromFile(traumaScenarios, 'scenarios-trauma.json');
} catch (error) {
  console.warn('Could not load scenarios-trauma.json:', error.message);
}

try {
  const pediatricScenarios = require('./scenarios-pediatric.json');
  loadScenariosFromFile(pediatricScenarios, 'scenarios-pediatric.json');
} catch (error) {
  console.warn('Could not load scenarios-pediatric.json:', error.message);
}

try {
  const specialScenarios = require('./scenarios-special.json');
  loadScenariosFromFile(specialScenarios, 'scenarios-special.json');
} catch (error) {
  console.warn('Could not load scenarios-special.json:', error.message);
}

// Log total scenarios loaded
console.log(`Total scenarios loaded: ${ALL_SCENARIOS.length}`);

export { ALL_SCENARIOS };
export default ALL_SCENARIOS;