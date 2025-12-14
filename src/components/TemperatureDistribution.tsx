import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CycleSnapshot, TemperatureSamplingRate } from '../types';

interface TemperatureDistributionProps {
  snapshot: CycleSnapshot;
}

export default function TemperatureDistribution({ snapshot }: TemperatureDistributionProps) {
  const [samplingRate, setSamplingRate] = useState<TemperatureSamplingRate>(5);

  if (!snapshot) {
    return (
      <div className="card">
        <h2>Temperature Distribution</h2>
        <p style={{ color: '#666', fontStyle: 'italic' }}>No snapshot data available</p>
      </div>
    );
  }

  const getDistributionKey = (rate: TemperatureSamplingRate) => {
    return `temperature_dist_${rate}deg` as const;
  };

  const distribution = (snapshot as any)[getDistributionKey(samplingRate)] || {};

  const chartData = Object.entries(distribution)
    .map(([range, minutes]) => ({
      range: `${range}°C`,
      minutes: Number(minutes),
    }))
    .sort((a, b) => {
      const aMin = parseInt(a.range.split('-')[0]);
      const bMin = parseInt(b.range.split('-')[0]);
      return aMin - bMin;
    });

  const totalMinutes = chartData.reduce((sum, item) => sum + item.minutes, 0);

  return (
    <div className="card">
      <h2>Temperature Distribution</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="sampling-rate" style={{ marginRight: '0.5rem' }}>
          Sampling Rate:
        </label>
        <select
          id="sampling-rate"
          value={samplingRate}
          onChange={(e) => setSamplingRate(Number(e.target.value) as TemperatureSamplingRate)}
        >
          <option value={5}>5°C</option>
          <option value={10}>10°C</option>
          <option value={15}>15°C</option>
          <option value={20}>20°C</option>
        </select>
      </div>
      {chartData.length > 0 ? (
        <>
          <div style={{ marginBottom: '1rem', color: '#666' }}>
            Total time: {totalMinutes.toFixed(1)} minutes
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="minutes" fill="#8884d8" name="Time (minutes)" />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        <p style={{ color: '#666', fontStyle: 'italic' }}>No temperature distribution data available</p>
      )}
    </div>
  );
}

