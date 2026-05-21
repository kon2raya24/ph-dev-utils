import { describe, it, expect } from 'vitest';
import {
  listRegions,
  findRegion,
  listProvinces,
  findProvince,
  listCitiesMunicipalities,
  findCityMunicipality,
} from '../src/address';

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

describe('cities/municipalities (PSGC Q4 2024)', () => {
  it('total ~1,634 entries', () => {
    expect(listCitiesMunicipalities().length).toBeGreaterThanOrEqual(1600);
    expect(listCitiesMunicipalities().length).toBeLessThanOrEqual(1700);
  });

  it('filters by province (Cebu = 0722)', () => {
    const cebu = listCitiesMunicipalities({ province: '0722' });
    expect(cebu.length).toBeGreaterThan(40);
    expect(cebu.every(c => c.province === '0722')).toBe(true);
  });

  it('filters by region (NCR = 13) → 17 cities', () => {
    const ncr = listCitiesMunicipalities({ region: '13' });
    expect(ncr).toHaveLength(17);
  });

  it('isCity filter excludes municipalities', () => {
    const cities = listCitiesMunicipalities({ region: '07', isCity: true });
    expect(cities.every(c => c.isCity)).toBe(true);
    const munis = listCitiesMunicipalities({ region: '07', isCity: false });
    expect(munis.every(c => !c.isCity)).toBe(true);
  });

  it('finds by PSGC code', () => {
    const batac = findCityMunicipality('012805');
    expect(batac?.name).toContain('Batac');
    expect(batac?.isCity).toBe(true);
  });

  it('finds by exact name', () => {
    expect(findCityMunicipality('Adams')?.code).toBe('012801');
  });

  it('finds "Manila" via "City of " prefix stripping', () => {
    const manila = findCityMunicipality('Manila');
    expect(manila).not.toBeNull();
    expect(manila?.region).toBe('13');
    expect(manila?.province).toBeNull(); // HUC under NCR
  });

  it('case-insensitive', () => {
    expect(findCityMunicipality('CEBU CITY')?.code).toBeDefined();
  });

  it('returns null for unknown', () => {
    expect(findCityMunicipality('Atlantis')).toBeNull();
  });

  it('HUC entries have province: null (and include 1 municipality — Pateros)', () => {
    const hucs = listCitiesMunicipalities().filter(c => c.province === null);
    expect(hucs.length).toBe(19);
    const cities = hucs.filter(c => c.isCity);
    const munis = hucs.filter(c => !c.isCity);
    expect(cities.length).toBe(18);
    expect(munis.length).toBe(1);
    expect(munis[0].name).toBe('Pateros');
  });
});
