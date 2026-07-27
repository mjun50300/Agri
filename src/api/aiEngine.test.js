import { describe, it, expect } from 'vitest';
import { aiEngine } from './aiEngine';

describe('AI Decision Engine Tests', () => {
  it('should calculate risk scores correctly based on moisture content', () => {
    const lowRiskSpecs = { moisture: 11, broken: 1, foreignMatter: 0.5 };
    const highRiskSpecs = { moisture: 18, broken: 8, foreignMatter: 3.0 };

    const lowRisk = aiEngine.getRiskScore('Wheat', lowRiskSpecs);
    const highRisk = aiEngine.getRiskScore('Wheat', highRiskSpecs);

    expect(lowRisk.score).toBeLessThan(35);
    expect(lowRisk.label).toBe('Low Risk');

    expect(highRisk.score).toBeGreaterThan(65);
    expect(highRisk.label).toBe('High Risk (Quality Degraded)');
  });

  it('should forecast market price trends correctly', () => {
    const wheatPred = aiEngine.getPricePrediction('Wheat', '30D');
    const cottonPred = aiEngine.getPricePrediction('Cotton', '30D');

    expect(wheatPred.isUp).toBe(true);
    expect(cottonPred.isUp).toBe(false);
  });

  it('should suggest fair counter offers', () => {
    const offer = aiEngine.getSuggestedCounterOffer(10000, 8000, 'Seller');
    expect(offer).toBe(9200); // 10000 - 2000 * 0.4 = 9200
  });
});
