#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCENARIOS_DIR = __dirname;

// Required fields for each scenario
const REQUIRED_FIELDS = [
  'title',
  'category',
  'pcr_text',
  'correct_error',
  'chaos_events',
  'stress_fto_responses',
  'options',
  'hazards'
];

// Valid categories (domains)
const VALID_CATEGORIES = [
  'Peds', 'Medical', 'Trauma', 'OB', 'Psych',
  'MCI', 'Environmental', 'Geriatric', 'Airway',
  'Breathing', 'Circulation', 'Operations'
];

function auditScenarios() {
  console.log('🔍 EMT-B Scenario Audit Report');
  console.log('================================\n');

  let totalScenarios = 0;
  const categoryCounts = {};
  const issues = [];
  const allTitles = new Set();
  const duplicateTitles = new Set();

  // Get all JSON files in the scenarios directory
  const files = fs.readdirSync(SCENARIOS_DIR)
    .filter(file => file.endsWith('.json') && file !== 'audit_scenarios.js');

  console.log(`📁 Found ${files.length} scenario files:\n`);

  files.forEach(file => {
    const filePath = path.join(SCENARIOS_DIR, file);
    console.log(`📄 Processing: ${file}`);

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const scenarios = JSON.parse(content);

      if (!Array.isArray(scenarios)) {
        issues.push(`❌ ${file}: Invalid format - expected array, got ${typeof scenarios}`);
        return;
      }

      console.log(`   ✅ Loaded ${scenarios.length} scenarios`);

      scenarios.forEach((scenario, index) => {
        totalScenarios++;

        // Check for duplicate titles
        if (allTitles.has(scenario.title)) {
          duplicateTitles.add(scenario.title);
          issues.push(`❌ Duplicate title: "${scenario.title}" (found in ${file})`);
        } else {
          allTitles.add(scenario.title);
        }

        // Count by category
        const category = scenario.category || 'Unknown';
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;

        // Check required fields
        const missingFields = REQUIRED_FIELDS.filter(field => !scenario.hasOwnProperty(field));
        if (missingFields.length > 0) {
          issues.push(`❌ ${file} scenario ${index + 1} (${scenario.title}): Missing fields: ${missingFields.join(', ')}`);
        }

        // Validate field types and content
        if (scenario.title && typeof scenario.title !== 'string') {
          issues.push(`❌ ${file} scenario ${index + 1}: Invalid title type`);
        }

        if (scenario.category && !VALID_CATEGORIES.includes(scenario.category)) {
          issues.push(`⚠️ ${file} scenario ${index + 1}: Unknown category "${scenario.category}"`);
        }

        if (!Array.isArray(scenario.chaos_events)) {
          issues.push(`❌ ${file} scenario ${index + 1}: chaos_events should be an array`);
        }

        if (!Array.isArray(scenario.stress_fto_responses)) {
          issues.push(`❌ ${file} scenario ${index + 1}: stress_fto_responses should be an array`);
        }

        if (!Array.isArray(scenario.options)) {
          issues.push(`❌ ${file} scenario ${index + 1}: options should be an array`);
        } else {
          // Validate options structure
          scenario.options.forEach((option, optIndex) => {
            if (typeof option.text !== 'string') {
              issues.push(`❌ ${file} scenario ${index + 1} option ${optIndex + 1}: missing or invalid text`);
            }
            if (typeof option.is_correct !== 'boolean') {
              issues.push(`❌ ${file} scenario ${index + 1} option ${optIndex + 1}: missing or invalid is_correct`);
            }
          });

          // Check that exactly one option is correct
          const correctCount = scenario.options.filter(opt => opt.is_correct).length;
          if (correctCount !== 1) {
            issues.push(`❌ ${file} scenario ${index + 1}: Should have exactly 1 correct option, found ${correctCount}`);
          }
        }

        if (!scenario.hazards || typeof scenario.hazards !== 'object') {
          issues.push(`❌ ${file} scenario ${index + 1}: hazards should be an object`);
        } else {
          if (!scenario.hazards.type || !scenario.hazards.action) {
            issues.push(`❌ ${file} scenario ${index + 1}: hazards missing type or action`);
          }
        }
      });

    } catch (error) {
      issues.push(`❌ ${file}: Failed to parse JSON - ${error.message}`);
    }

    console.log(''); // Empty line between files
  });

  // Print summary report
  console.log('📊 SUMMARY REPORT');
  console.log('=================');
  console.log(`📈 Total Scenarios: ${totalScenarios}`);
  console.log('');

  console.log('📂 Scenarios by Domain:');
  Object.entries(categoryCounts)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count}`);
    });
  console.log('');

  if (duplicateTitles.size > 0) {
    console.log('🔄 Duplicate Titles:');
    duplicateTitles.forEach(title => {
      console.log(`   "${title}"`);
    });
    console.log('');
  }

  if (issues.length > 0) {
    console.log('⚠️ ISSUES FOUND:');
    issues.forEach(issue => {
      console.log(`   ${issue}`);
    });
    console.log('');
  } else {
    console.log('✅ No issues found!');
  }

  console.log('🎯 Audit complete!');
}

// Run the audit
auditScenarios();