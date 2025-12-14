import type { CycleSnapshot } from '../types';

interface AlertsSafetyProps {
  snapshot: CycleSnapshot;
}

export default function AlertsSafety({ snapshot }: AlertsSafetyProps) {
  const { warnings, protections } = snapshot.alert_details || { warnings: [], protections: [] };
  const hasAlerts = warnings.length > 0 || protections.length > 0;

  return (
    <div className="card">
      <h2>Alerts & Safety</h2>
      
      {!hasAlerts ? (
        <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '8px', color: '#2e7d32' }}>
          ✓ No warnings or protections triggered during this cycle
        </div>
      ) : (
        <>
          {warnings.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#f57c00', marginBottom: '0.5rem' }}>
                ⚠ Warnings ({warnings.length})
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {warnings.map((warning, index) => (
                  <li
                    key={index}
                    style={{
                      padding: '0.75rem',
                      background: '#fff3e0',
                      borderRadius: '6px',
                      marginBottom: '0.5rem',
                      borderLeft: '4px solid #f57c00',
                    }}
                  >
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {protections.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#d32f2f', marginBottom: '0.5rem' }}>
                🛡️ Protections ({protections.length})
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {protections.map((protection, index) => (
                  <li
                    key={index}
                    style={{
                      padding: '0.75rem',
                      background: '#ffebee',
                      borderRadius: '6px',
                      marginBottom: '0.5rem',
                      borderLeft: '4px solid #d32f2f',
                    }}
                  >
                    {protection}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

