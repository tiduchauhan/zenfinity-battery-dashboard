import type { BatterySummary } from '../types';

interface IMEISelectorProps {
  imeis: string[];
  selectedIMEI: string;
  summaries: BatterySummary[];
  onIMEIChange: (imei: string) => void;
}

export default function IMEISelector({
  imeis,
  selectedIMEI,
  summaries,
  onIMEIChange,
}: IMEISelectorProps) {
  const getSummaryForIMEI = (imei: string) => {
    return summaries.find(s => s.imei === imei);
  };

  return (
    <div className="imei-selector">
      <label htmlFor="imei-select" style={{ marginRight: '0.5rem' }}>
        Battery IMEI:
      </label>
      <select
        id="imei-select"
        value={selectedIMEI}
        onChange={(e) => onIMEIChange(e.target.value)}
        style={{ minWidth: '200px' }}
      >
        <option value="">Select IMEI</option>
        {imeis.map((imei) => {
          const summary = getSummaryForIMEI(imei);
          return (
            <option key={imei} value={imei}>
              {imei} {summary ? `(${summary.total_cycles} cycles)` : ''}
            </option>
          );
        })}
      </select>
    </div>
  );
}

