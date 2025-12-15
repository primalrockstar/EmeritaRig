import React from 'react';
import { render } from '@testing-library/react-native';
import MedicalDisclaimer from '../MedicalDisclaimer';

describe('MedicalDisclaimer', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MedicalDisclaimer />);

    // Check main title
    expect(getByText('Medical Education Disclaimer')).toBeTruthy();

    // Check critical notice
    expect(getByText('FOR EDUCATIONAL PURPOSES ONLY')).toBeTruthy();

    // Check emergency text
    expect(getByText('IN REAL EMERGENCIES: Call 911 immediately. Never delay emergency care to consult this app.')).toBeTruthy();

    // Check acknowledgment section
    expect(getByText('User Acknowledgment')).toBeTruthy();
  });

  it('displays all required sections', () => {
    const { getByText } = render(<MedicalDisclaimer />);

    // Check section titles
    expect(getByText('Professional Use Requirements')).toBeTruthy();
    expect(getByText('Scope of Practice')).toBeTruthy();
    expect(getByText('Emergency Situations')).toBeTruthy();
    expect(getByText('Liability Limitation')).toBeTruthy();
    expect(getByText('Content Accuracy')).toBeTruthy();
  });

  it('shows warning icon', () => {
    const { getByText } = render(<MedicalDisclaimer />);

    expect(getByText('⚠️')).toBeTruthy();
  });

  it('contains critical educational content', () => {
    const { getByText } = render(<MedicalDisclaimer />);

    expect(getByText(/This application is designed exclusively for emergency medical services/)).toBeTruthy();
    expect(getByText(/Always follow your local protocols/)).toBeTruthy();
    expect(getByText(/This app does not replace formal EMT-B training/)).toBeTruthy();
  });
});