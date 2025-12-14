import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { CycleSnapshot } from '../types';

interface BatteryHealthProps {
  snapshot: CycleSnapshot;
}

export default function BatteryHealth({ snapshot }: BatteryHealthProps) {
  if (!snapshot) {
    return (
      <div className="card">
        <h2>Battery Health (SOC & Voltage)</h2>
        <p style={{ color: '#666', fontStyle: 'italic' }}>No snapshot data available</p>
      </div>
    );
  }

  // Create data points showing SOC range and average
  const socData = [
    { label: 'Min SOC', value: snapshot.min_soc ?? 0 },
    { label: 'Average SOC', value: snapshot.average_soc ?? 0 },
    { label: 'Max SOC', value: snapshot.max_soc ?? 0 },
  ];

  const voltageData = [
    { label: 'Min Voltage', value: snapshot.voltage_min ?? 0 },
    { label: 'Average Voltage', value: snapshot.voltage_avg ?? 0 },
    { label: 'Max Voltage', value: snapshot.voltage_max ?? 0 },
  ];

  return (
    <div className="card">
      <h2>Battery Health (SOC & Voltage)</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>State of Charge (SOC)</h3>
        <div className="grid grid-3" style={{ marginBottom: '1rem' }}>
          <div className="stat-item">
            <div className="stat-label">Min SOC</div>
            <div className="stat-value">{snapshot.min_soc.toFixed(2)}%</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Average SOC</div>
            <div className="stat-value">{snapshot.average_soc.toFixed(2)}%</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Max SOC</div>
            <div className="stat-value">{snapshot.max_soc.toFixed(2)}%</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={socData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis domain={[0, 100]} label={{ value: 'SOC (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Pack Voltage</h3>
        <div className="grid grid-3" style={{ marginBottom: '1rem' }}>
          <div className="stat-item">
            <div className="stat-label">Min Voltage</div>
            <div className="stat-value">{snapshot.voltage_min.toFixed(2)} V</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Average Voltage</div>
            <div className="stat-value">{snapshot.voltage_avg.toFixed(2)} V</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Max Voltage</div>
            <div className="stat-value">{snapshot.voltage_max.toFixed(2)} V</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={voltageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis label={{ value: 'Voltage (V)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

