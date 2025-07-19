import { categorizeEvent } from './categorizationService';

describe('categorizeEvent with Weighted Scoring', () => {
    it('should categorize as "Work" for strong work keywords', () => {
        expect(categorizeEvent('Final project deadline')).toBe('Work');
    });

    it('should categorize as "Personal" for strong personal keywords', () => {
        expect(categorizeEvent("Mimi's birthday celebration")).toBe('Personal');
    });

    it('should choose "Work" when a strong work keyword outweighs a regular personal keyword', () => {
        expect(categorizeEvent('Party for a new client')).toBe('Work');
    });

    it('should choose "Personal" when a strong personal keyword outweighs a regular work keyword', () => {
        expect(categorizeEvent('Meeting about a wedding')).toBe('Personal');
    });

    it('should default to "Work" in case of a tie', () => {
        expect(categorizeEvent('Team meeting and party')).toBe('Work');
    });

    it('should categorize as "Other" when no keywords match', () => {
        expect(categorizeEvent('Go to the grocery store')).toBe('Other');
    });
});