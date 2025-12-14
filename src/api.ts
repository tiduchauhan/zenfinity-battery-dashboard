import type { BatterySummary, CycleSnapshot } from './types';

// Use proxy in development, direct URL in production
const API_BASE_URL = import.meta.env.DEV 
  ? '' // Use relative URLs in dev (Vite proxy will handle it)
  : 'https://zenfinity-intern-api-104290304048.europe-west1.run.app';

function buildUrl(path: string, params?: Record<string, string>): string {
  const baseUrl = API_BASE_URL ? `${API_BASE_URL}${path}` : path;
  
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value);
      }
    });
    return `${baseUrl}?${searchParams.toString()}`;
  }
  
  return baseUrl;
}

export async function fetchBatterySummary(imei?: string): Promise<BatterySummary[]> {
  const params = imei ? { imei } : undefined;
  const url = buildUrl('/api/snapshots/summary', params);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      throw new Error(`Failed to fetch summary (${response.status}): ${errorText}`);
    }
    const data = await response.json();
    console.log('API Response (summary):', data);
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else if (data && Array.isArray(data.results)) {
      return data.results;
    } else if (data && typeof data === 'object') {
      // If it's a single object, wrap it in an array
      return [data];
    }
    
    console.error('Unexpected response format:', data);
    throw new Error(`Invalid response format: expected array, got ${typeof data}`);
  } catch (error) {
    if (error instanceof TypeError) {
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        throw new Error('CORS/Network error: The API may be blocking requests from this origin. This could be a CORS issue or network connectivity problem. Please check the browser console for more details.');
      }
    }
    throw error;
  }
}

export async function fetchCycleSnapshots(
  imei: string,
  limit: number = 100,
  offset: number = 0
): Promise<CycleSnapshot[]> {
  const url = buildUrl('/api/snapshots', {
    imei,
    limit: limit.toString(),
    offset: offset.toString(),
  });
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      throw new Error(`Failed to fetch snapshots (${response.status}): ${errorText}`);
    }
    const data = await response.json();
    console.log('API Response (snapshots):', data);
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else if (data && Array.isArray(data.results)) {
      return data.results;
    } else if (data && Array.isArray(data.snapshots)) {
      return data.snapshots;
    } else if (data && typeof data === 'object') {
      // If it's a single object, wrap it in an array
      return [data];
    }
    
    console.error('Unexpected response format:', data);
    throw new Error(`Invalid response format: expected array, got ${typeof data}`);
  } catch (error) {
    if (error instanceof TypeError) {
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        throw new Error('CORS/Network error: The API may be blocking requests from this origin. This could be a CORS issue or network connectivity problem. Please check the browser console for more details.');
      }
    }
    throw error;
  }
}

export async function fetchLatestSnapshot(imei: string): Promise<CycleSnapshot> {
  const url = buildUrl(`/api/snapshots/${imei}/latest`);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      throw new Error(`Failed to fetch latest snapshot (${response.status}): ${errorText}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        throw new Error('CORS/Network error: Unable to connect to the API. Please check the browser console for more details.');
      }
    }
    throw error;
  }
}

export async function fetchCycleDetails(
  imei: string,
  cycleNumber: number
): Promise<CycleSnapshot> {
  const url = buildUrl(`/api/snapshots/${imei}/cycles/${cycleNumber}`);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      throw new Error(`Failed to fetch cycle details (${response.status}): ${errorText}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        throw new Error('CORS/Network error: Unable to connect to the API. Please check the browser console for more details.');
      }
    }
    throw error;
  }
}

