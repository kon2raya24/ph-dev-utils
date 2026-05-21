import regionsData from '../data/regions.json' with { type: 'json' };
import provincesData from '../data/provinces.json' with { type: 'json' };
import psgcCityMunFile from '../data/psgc-cities-municipalities-2024.json' with { type: 'json' };

export interface Region {
  code: string;
  name: string;
  designation: string;
}

export interface Province {
  code: string;
  name: string;
  region: string;
}

export interface CityMunicipality {
  /** PSGC 6-digit code (region + province + city/mun ordinal). */
  code: string;
  name: string;
  /** 4-digit province code, or `null` for HUC/NCR cities not under any province. */
  province: string | null;
  /** 2-digit region code. */
  region: string;
  /** True if PSA classifies as a city (independent or component); false for municipality. */
  isCity: boolean;
  /** True if this is the capital of its province (or NCR's seat for NCR-only entries). */
  isCapital: boolean;
}

const regions: Region[] = regionsData as Region[];
const provinces: Province[] = provincesData as Province[];
const citiesMunicipalities: CityMunicipality[] = (psgcCityMunFile as {
  cities_municipalities: CityMunicipality[];
}).cities_municipalities;

export function listRegions(): Region[] {
  return regions.slice();
}

export function findRegion(query: string): Region | null {
  if (typeof query !== 'string' || !query.trim()) return null;
  const q = query.trim().toLowerCase();
  return (
    regions.find(r =>
      r.code.toLowerCase() === q ||
      r.name.toLowerCase() === q ||
      r.designation.toLowerCase() === q
    ) ?? null
  );
}

export function listProvinces(regionCode?: string): Province[] {
  if (!regionCode) return provinces.slice();
  return provinces.filter(p => p.region === regionCode);
}

export function findProvince(query: string): Province | null {
  if (typeof query !== 'string' || !query.trim()) return null;
  const q = query.trim().toLowerCase();
  return (
    provinces.find(p =>
      p.code.toLowerCase() === q ||
      p.name.toLowerCase() === q
    ) ?? null
  );
}

/**
 * List all cities and municipalities. Optionally filter by 4-digit province code
 * or 2-digit region code. Source: PSA Q4 2024 PSGC release (1,634 entries).
 *
 * @example
 *   listCitiesMunicipalities({ province: '0722' });  // → all in Cebu
 *   listCitiesMunicipalities({ region: '13' });      // → all 17 NCR cities
 *   listCitiesMunicipalities({ region: '07', isCity: true }); // → cities only
 */
export function listCitiesMunicipalities(
  filter: { province?: string; region?: string; isCity?: boolean; isCapital?: boolean } = {},
): CityMunicipality[] {
  let out = citiesMunicipalities;
  if (filter.province !== undefined) out = out.filter(c => c.province === filter.province);
  if (filter.region !== undefined) out = out.filter(c => c.region === filter.region);
  if (filter.isCity !== undefined) out = out.filter(c => c.isCity === filter.isCity);
  if (filter.isCapital !== undefined) out = out.filter(c => c.isCapital === filter.isCapital);
  return out.slice();
}

function normalizeCityName(s: string): string {
  // PSA stores "City of X"; users often type "X City" or just "X". Strip both forms.
  return s
    .trim()
    .toLowerCase()
    .replace(/^city of\s+/, '')
    .replace(/\s+city$/, '');
}

/**
 * Look up a city or municipality by PSGC 6-digit code, or by name (case-insensitive).
 *
 * Name matching normalizes both "City of X" (PSA's stored form) and "X City" (common
 * user spelling), so `findCityMunicipality('Cebu City')`, `findCityMunicipality('City of Cebu')`,
 * and `findCityMunicipality('Cebu')` all return the same entry.
 */
export function findCityMunicipality(query: string): CityMunicipality | null {
  if (typeof query !== 'string' || !query.trim()) return null;
  const q = query.trim().toLowerCase();
  const normQ = normalizeCityName(query);
  return (
    citiesMunicipalities.find(c => {
      if (c.code === q) return true;
      const name = c.name.toLowerCase();
      if (name === q) return true;
      return normalizeCityName(c.name) === normQ;
    }) ?? null
  );
}
