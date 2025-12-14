import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CycleSnapshot } from '../types';

interface LongTermTrendsProps {
  snapshots: CycleSnapshot[];
}

export default function LongTermTrends({ snapshots }: LongTermTrendsProps) {
  if (!snapshots || snapshots.length === 0) {
    return (
      <div className="card">
        <h2>Long-term Trends Analysis</h2>
        <p style={{ color: '#666', fontStyle: 'italic' }}>No snapshot data available for trend analysis</p>
      </div>
    );
  }

  // Sort by cycle number
  const sortedSnapshots = [...snapshots].sort((a, b) => (a.cycle_number ?? 0) - (b.cycle_number ?? 0));

  // Prepare SOH degradation data (cumulative)
  let cumulativeSOHDrop = 100; // Starting at 100%
  const sohData = sortedSnapshots.map((snapshot) => {
    cumulativeSOHDrop -= snapshot.soh_drop;
    return {
      cycle: snapshot.cycle_number,
      soh: Math.max(0, cumulativeSOHDrop), // Prevent negative
      sohDrop: snapshot.soh_drop,
    };
  });

  // Average SOC trend
  const socData = sortedSnapshots.map((snapshot) => ({
    cycle: snapshot.cycle_number,
    avgSOC: snapshot.average_soc,
    minSOC: snapshot.min_soc,
    maxSOC: snapshot.max_soc,
  }));

  // Temperature trend
  const tempData = sortedSnapshots.map((snapshot) => ({
    cycle: snapshot.cycle_number,
    avgTemp: snapshot.average_temperature,
  }));

  // Distance/Speed trend
  const distanceData = sortedSnapshots
    .filter((s) => s.total_distance > 0)
    .map((snapshot) => ({
      cycle: snapshot.cycle_number,
      distance: snapshot.total_distance,
      avgSpeed: snapshot.average_speed,
    }));

  return (
    <div className="card">
      <h2>Long-term Trends Analysis</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>SOH Degradation Curve</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sohData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cycle" label={{ value: 'Cycle Number', position: 'insideBottom', offset: -5 }} />
            <YAxis 
              domain={[Math.max(0, Math.min(...sohData.map(d => d.soh)) - 5), 105]}
              label={{ value: 'SOH (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="soh"
              stroke="#d32f2f"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="State of Health"
            />
          </LineChart>
        </ResponsiveContainer>
        <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
          Cumulative SOH degradation over {sortedSnapshots.length} cycles
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Average SOC Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={socData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cycle" label={{ value: 'Cycle Number', position: 'insideBottom', offset: -5 }} />
            <YAxis domain={[0, 100]} label={{ value: 'SOC (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="avgSOC"
              stroke="#1976d2"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Average SOC"
            />
            <Line
              type="monotone"
              dataKey="minSOC"
              stroke="#ff9800"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
              name="Min SOC"
            />
            <Line
              type="monotone"
              dataKey="maxSOC"
              stroke="#4caf50"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
              name="Max SOC"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Average Temperature Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={tempData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cycle" label={{ value: 'Cycle Number', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="avgTemp"
              stroke="#9c27b0"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Average Temperature"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {distanceData.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Distance & Speed Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={distanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cycle" label={{ value: 'Cycle Number', position: 'insideBottom', offset: -5 }} />
              <YAxis yAxisId="left" label={{ value: 'Distance (km)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Speed (km/h)', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="distance"
                stroke="#4caf50"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Total Distance"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgSpeed"
                stroke="#ff9800"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Average Speed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

