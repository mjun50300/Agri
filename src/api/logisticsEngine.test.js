import { describe, it, expect } from 'vitest';
import { logisticsEngine } from './logisticsEngine';

describe('Logistics Dispatch & ETA Engine Tests', () => {
  it('should calculate freight charges correctly', () => {
    const localFreight = logisticsEngine.calculateFreight('Sahiwal', 'Sahiwal', 10);
    const longHaulFreight = logisticsEngine.calculateFreight('Sahiwal', 'Karachi', 10);

    expect(localFreight.totalFreight).toBe(4000); // 10 tons * 400
    expect(longHaulFreight.totalFreight).toBe(45000); // 10 tons * 4500
  });

  it('should deliver correct transit times', () => {
    const localETA = logisticsEngine.getETA('Lahore', 'Lahore');
    const portETA = logisticsEngine.getETA('Lahore', 'Karachi');

    expect(localETA).toContain('Same Day');
    expect(portETA).toContain('36 to 48 Hours');
  });

  it('should filter warehousing storage capacity', () => {
    const multanStorage = logisticsEngine.getStorageAvailability('Multan');
    expect(multanStorage[0].name).toContain('Multan');
  });
});
