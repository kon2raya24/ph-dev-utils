import { describe, it, expect } from 'vitest';
import { listRegions, findRegion, listProvinces, findProvince } from '../src/address';

describe('regions', () => {
  it('lists 17 regions', () => {
    expect(listRegions()).toHaveLength(17);
  });
  it('finds by code', () => {
    expect(findRegion('07')?.name).toBe('Central Visayas');
  });
  it('finds by name', () => {
    expect(findRegion('Bicol Region')?.code).toBe('05');
  });
  it('finds by designation', () => {
    expect(findRegion('NCR')?.code).toBe('13');
  });
});

describe('provinces', () => {
  it('lists provinces in a region', () => {
    const cv = listProvinces('07');
    expect(cv.map(p => p.name)).toContain('Cebu');
    expect(cv.map(p => p.name)).toContain('Bohol');
  });
  it('finds by name', () => {
    expect(findProvince('Cebu')?.code).toBe('0722');
  });
  it('returns null for unknown', () => {
    expect(findProvince('Atlantis')).toBeNull();
  });
});
