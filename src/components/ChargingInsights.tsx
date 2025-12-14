import type { CycleSnapshot } from '../types';

interface ChargingInsightsProps {
  snapshot: CycleSnapshot;
}

export default function ChargingInsights({ snapshot }: ChargingInsightsProps) {
  return (
    <div className="card">
      <h2>Charging Insights</h2>
      <div className="grid grid-2">
        <div className="stat-item">
          <div className="stat-label">Charging Instances</div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>
            {snapshot.charging_instances_count}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Average Charge Start SOC</div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>
            {snapshot.average_charge_start_soc.toFixed(2)}%
          </div>
        </div>
      </div>
      
      {snapshot.charging_instances_count > 0 ? (
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Analysis:</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#666' }}>
            <li>
              Battery was charged {snapshot.charging_instances_count} time
              {snapshot.charging_instances_count > 1 ? 's' : ''} during this cycle
            </li>
            <li>
              On average, charging started when SOC was {snapshot.average_charge_start_soc.toFixed(1)}%
            </li>
            {snapshot.average_charge_start_soc < 20 && (
              <li style={{ color: '#f57c00' }}>
                ⚠ Charging often started at low SOC - consider maintaining higher charge levels
              </li>
            )}
            {snapshot.average_charge_start_soc > 80 && (
              <li style={{ color: '#2e7d32' }}>
                ✓ Good practice: Charging started at higher SOC levels
              </li>
            )}
          </ul>
        </div>
      ) : (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff3e0', borderRadius: '8px', color: '#e65100' }}>
          No charging events occurred during this cycle
        </div>
      )}
    </div>
  );
}

