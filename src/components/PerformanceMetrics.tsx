import type { CycleSnapshot } from '../types';

interface PerformanceMetricsProps {
  snapshot: CycleSnapshot;
}

export default function PerformanceMetrics({ snapshot }: PerformanceMetricsProps) {
  return (
    <div className="card">
      <h2>Performance Metrics</h2>
      <div className="grid grid-3">
        <div className="stat-item">
          <div className="stat-label">Average Speed</div>
          <div className="stat-value">{snapshot.average_speed.toFixed(2)} km/h</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Maximum Speed</div>
          <div className="stat-value">{snapshot.max_speed.toFixed(2)} km/h</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Total Distance</div>
          <div className="stat-value">{snapshot.total_distance.toFixed(2)} km</div>
        </div>
      </div>
      {snapshot.total_distance === 0 && (
        <p style={{ marginTop: '1rem', color: '#666', fontStyle: 'italic' }}>
          Note: GPS/Distance data may have gaps. This cycle shows no distance traveled.
        </p>
      )}
    </div>
  );
}

