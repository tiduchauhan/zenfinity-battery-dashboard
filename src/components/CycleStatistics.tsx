import { format, parseISO } from 'date-fns';
import type { CycleSnapshot } from '../types';

interface CycleStatisticsProps {
  snapshot: CycleSnapshot;
}

export default function CycleStatistics({ snapshot }: CycleStatisticsProps) {
  const startTime = parseISO(snapshot.cycle_start_time);
  const endTime = parseISO(snapshot.cycle_end_time);

  return (
    <div className="card">
      <h2>Cycle Statistics</h2>
      <div className="grid grid-3">
        <div className="stat-item">
          <div className="stat-label">Cycle Number</div>
          <div className="stat-value">{snapshot.cycle_number}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Start Time</div>
          <div className="stat-value">{format(startTime, 'PPpp')}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">End Time</div>
          <div className="stat-value">{format(endTime, 'PPpp')}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Duration</div>
          <div className="stat-value">
            {snapshot.cycle_duration_hours.toFixed(2)} hours
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">SOH Drop</div>
          <div className="stat-value">{snapshot.soh_drop.toFixed(3)}%</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Average Temperature</div>
          <div className="stat-value">{snapshot.average_temperature.toFixed(1)}°C</div>
        </div>
      </div>
    </div>
  );
}

