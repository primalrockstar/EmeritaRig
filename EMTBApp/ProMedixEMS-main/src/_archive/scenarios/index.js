// DEPRECATED: Scenarios now loaded from API via useScenarioSync hook
// This file is kept for reference but no longer used in production
// EMT-B PCR Training Scenarios Engine
// Comprehensive scenario management system with data fusion and helper functions

const ALL_SCENARIOS = [];

// Import scenarios from all populated JSON files with error handling
const loadScenariosFromFile = (scenarios, fileName) => {
  if (Array.isArray(scenarios)) {
    ALL_SCENARIOS.push(...scenarios);
    console.log(`Loaded ${scenarios.length} scenarios from ${fileName}`);
  } else {
    console.warn(`Invalid scenario data in ${fileName}: expected array, got ${typeof scenarios}`);
  }
};

// Load all populated scenario files
try {
  const operationsScenarios = require('./operations.json');
  loadScenariosFromFile(operationsScenarios, 'operations.json');
} catch (error) {
  console.warn('Could not load operations.json:', error.message);
}

try {
  const primaryAssessmentScenarios = require('./primary_assessment.json');
  loadScenariosFromFile(primaryAssessmentScenarios, 'primary_assessment.json');
} catch (error) {
  console.warn('Could not load primary_assessment.json:', error.message);
}

try {
  const traumaTransportScenarios = require('./trauma_transport.json');
  loadScenariosFromFile(traumaTransportScenarios, 'trauma_transport.json');
} catch (error) {
  console.warn('Could not load trauma_transport.json:', error.message);
}

try {
  const sceneSafetyScenarios = require('./scene_safety.json');
  loadScenariosFromFile(sceneSafetyScenarios, 'scene_safety.json');
} catch (error) {
  console.warn('Could not load scene_safety.json:', error.message);
}

try {
  const medicalSecondaryScenarios = require('./medical_secondary.json');
  loadScenariosFromFile(medicalSecondaryScenarios, 'medical_secondary.json');
} catch (error) {
  console.warn('Could not load medical_secondary.json:', error.message);
}

try {
  const medicalGeneralScenarios = require('./medical_general.json');
  loadScenariosFromFile(medicalGeneralScenarios, 'medical_general.json');
} catch (error) {
  console.warn('Could not load medical_general.json:', error.message);
}

// Helper Functions
/**
 * Get scenarios filtered by domain
 * @param {string} domain - The domain to filter by (e.g., 'Medical', 'Trauma', 'Peds')
 * @returns {Array} Array of scenarios for the specified domain
 */
export const getScenariosByDomain = (domain) => {
  return ALL_SCENARIOS.filter(scenario => scenario.category === domain);
};

/**
 * Get a specific scenario by ID (index in the flattened array)
 * @param {number} id - The scenario ID (0-based index)
 * @returns {Object|null} The scenario object or null if not found
 */
export const getScenarioById = (id) => {
  return ALL_SCENARIOS[id] || null;
};

/**
 * Get all unique domains available
 * @returns {Array} Array of unique domain strings
 */
export const getAvailableDomains = () => {
  return Array.from(new Set(ALL_SCENARIOS.map(s => s.category))).sort();
};

/**
 * Get scenario statistics
 * @returns {Object} Statistics object with counts by domain and totals
 */
export const getScenarioStats = () => {
  const stats = {
    total: ALL_SCENARIOS.length,
    byDomain: {}
  };

  ALL_SCENARIOS.forEach(scenario => {
    stats.byDomain[scenario.category] = (stats.byDomain[scenario.category] || 0) + 1;
  });

  return stats;
};

// Sanity check log for system startup
console.log(`[System] Loaded ${ALL_SCENARIOS.length} scenarios successfully.`);

// Log total scenarios loaded
console.log(`Total scenarios loaded: ${ALL_SCENARIOS.length}`);

export { ALL_SCENARIOS };
export default ALL_SCENARIOS;