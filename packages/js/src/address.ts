import regionsData from '../../../data/regions.json' with { type: 'json' };
import provincesData from '../../../data/provinces.json' with { type: 'json' };

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

const regions: Region[] = regionsData as Region[];
const provinces: Province[] = provincesData as Province[];

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
