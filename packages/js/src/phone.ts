import prefixes from '../../../data/network-prefixes.json' with { type: 'json' };

export type Network = 'Globe' | 'Smart' | 'Sun' | 'DITO';

export interface MobileParse {
  e164: string;
  national: string;
  network: Network | null;
}

export interface LandlineParse {
  e164: string;
  national: string;
  areaCode: string;
  area: string | null;
}

const NETWORK_MAP: Record<string, Network> = (() => {
  const map: Record<string, Network> = {};
  for (const [network, list] of Object.entries(prefixes)) {
    if (network.startsWith('_')) continue;
    for (const p of list as string[]) map[p] = network as Network;
  }
  return map;
})();

const AREA_CODES: Record<string, string> = {
  '2': 'Metro Manila',
  '32': 'Cebu',
  '33': 'Iloilo',
  '34': 'Bacolod / Negros Occidental',
  '35': 'Dumaguete / Negros Oriental',
  '36': 'Aklan / Capiz',
  '38': 'Bohol',
  '42': 'Quezon',
  '43': 'Batangas',
  '44': 'Bulacan',
  '45': 'Pampanga / Tarlac',
  '46': 'Cavite',
  '47': 'Zambales / Bataan',
  '48': 'Palawan',
  '49': 'Laguna',
  '52': 'Albay',
  '53': 'Leyte',
  '54': 'Camarines Sur',
  '55': 'Northern Samar',
  '56': 'Samar',
  '62': 'Zamboanga City',
  '63': 'Lanao del Norte',
  '64': 'Cotabato',
  '65': 'Marawi / Lanao del Sur',
  '68': 'Zamboanga del Sur',
  '74': 'Baguio / Benguet',
  '75': 'Pangasinan',
  '77': 'Ilocos',
  '78': 'Cagayan',
  '82': 'Davao',
  '83': 'General Santos',
  '84': 'Tagum / Davao del Norte',
  '85': 'Butuan / Agusan',
  '86': 'Surigao',
  '87': 'Davao Occidental',
  '88': 'Cagayan de Oro / Misamis Oriental'
};

function digits(s: string): string {
  return (s ?? '').replace(/\D/g, '');
}

export function parseMobile(input: string): MobileParse | null {
  if (typeof input !== 'string') return null;
  let d = digits(input);

  // Normalize: strip +63/63 country code, restore leading 0 for 10-digit forms
  if (d.startsWith('63') && d.length === 12) d = '0' + d.slice(2);
  if (d.length === 10 && /^[89]/.test(d)) d = '0' + d;

  // PH mobile numbers are 11 digits starting with 08 (DITO) or 09 (Globe/Smart/Sun)
  if (d.length !== 11 || !/^0[89]/.test(d)) return null;

  const prefix = d.slice(0, 4);
  const network = NETWORK_MAP[prefix] ?? null;

  return {
    e164: '+63' + d.slice(1),
    national: d,
    network
  };
}

export function parseLandline(input: string): LandlineParse | null {
  if (typeof input !== 'string') return null;
  let d = digits(input);

  // Strip country code if present
  if (d.startsWith('63')) d = d.slice(2);
  // Strip trunk prefix
  if (d.startsWith('0')) d = d.slice(1);

  if (d.length < 8 || d.length > 10) return null;

  // Try area codes longest-first (2-digit, then 1-digit)
  for (const len of [2, 1]) {
    const area = d.slice(0, len);
    if (AREA_CODES[area]) {
      const subscriber = d.slice(len);
      if (subscriber.length < 6 || subscriber.length > 8) continue;
      return {
        e164: '+63' + d,
        national: '(0' + area + ') ' + subscriber,
        areaCode: area,
        area: AREA_CODES[area]
      };
    }
  }
  return null;
}
