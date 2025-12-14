import type { CycleSnapshot } from '../types';

interface AdditionalInsightsProps {
  snapshot: CycleSnapshot;
}

export default function AdditionalInsights({ snapshot }: AdditionalInsightsProps) {
  const socRange = snapshot.max_soc - snapshot.min_soc;
  const voltageRange = snapshot.voltage_max - snapshot.voltage_min;
  const voltageVariation = ((voltageRange / snapshot.voltage_avg) * 100).toFixed(2);
  
  const insights = [];

  // SOC Analysis
  if (socRange > 80) {
    insights.push({
      type: 'info',
      title: 'Deep Discharge Cycle',
      message: `SOC dropped from ${snapshot.max_soc.toFixed(1)}% to ${snapshot.min_soc.toFixed(1)}% (${socRange.toFixed(1)}% range)`,
    });
  }

  if (snapshot.min_soc < 10) {
    insights.push({
      type: 'warning',
      title: 'Low SOC Warning',
      message: 'Battery reached very low SOC levels - may impact longevity',
    });
  }

  // Temperature Analysis
  if (snapshot.average_temperature > 45) {
    insights.push({
      type: 'warning',
      title: 'High Operating Temperature',
      message: `Average temperature of ${snapshot.average_temperature.toFixed(1)}°C is elevated`,
    });
  } else if (snapshot.average_temperature < 10) {
    insights.push({
      type: 'info',
      title: 'Low Operating Temperature',
      message: `Average temperature of ${snapshot.average_temperature.toFixed(1)}°C may affect performance`,
    });
  }

  // Voltage Analysis
  if (parseFloat(voltageVariation) > 10) {
    insights.push({
      type: 'info',
      title: 'Significant Voltage Variation',
      message: `Voltage varied by ${voltageVariation}% during cycle`,
    });
  }

  // SOH Analysis
  if (snapshot.soh_drop > 0.1) {
    insights.push({
      type: 'warning',
      title: 'Accelerated Health Degradation',
      message: `SOH dropped by ${snapshot.soh_drop.toFixed(3)}% this cycle`,
    });
  }

  // Speed/Distance Analysis
  if (snapshot.total_distance > 0 && snapshot.average_speed > 0) {
    const avgSpeedKmh = snapshot.average_speed;
    if (avgSpeedKmh > 60) {
      insights.push({
        type: 'info',
        title: 'High-Speed Operation',
        message: `Average speed of ${avgSpeedKmh.toFixed(1)} km/h indicates highway usage`,
      });
    }
  }

  if (insights.length === 0) {
    insights.push({
      type: 'success',
      title: 'Normal Operation',
      message: 'No significant patterns or issues detected in this cycle',
    });
  }

  return (
    <div className="card">
      <h2>Additional Insights</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {insights.map((insight, index) => {
          const bgColors = {
            warning: '#fff3e0',
            info: '#e3f2fd',
            success: '#e8f5e9',
          };
          const borderColors = {
            warning: '#f57c00',
            info: '#1976d2',
            success: '#2e7d32',
          };
          const textColors = {
            warning: '#e65100',
            info: '#1565c0',
            success: '#1b5e20',
          };

          return (
            <div
              key={index}
              style={{
                padding: '1rem',
                background: bgColors[insight.type as keyof typeof bgColors],
                borderRadius: '8px',
                borderLeft: `4px solid ${borderColors[insight.type as keyof typeof borderColors]}`,
              }}
            >
              <h3
                style={{
                  fontSize: '1rem',
                  margin: '0 0 0.5rem 0',
                  color: textColors[insight.type as keyof typeof textColors],
                }}
              >
                {insight.title}
              </h3>
              <p style={{ margin: 0, color: textColors[insight.type as keyof typeof textColors] }}>
                {insight.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

