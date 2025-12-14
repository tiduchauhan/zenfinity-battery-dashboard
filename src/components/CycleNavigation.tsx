interface CycleNavigationProps {
  currentIndex: number;
  totalCycles: number;
  onCycleChange: (index: number) => void;
}

export default function CycleNavigation({
  currentIndex,
  totalCycles,
  onCycleChange,
}: CycleNavigationProps) {
  const cycleNumber = currentIndex + 1;

  return (
    <div className="card cycle-navigation">
      <h2>Cycle Navigation</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => onCycleChange(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>
        
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label htmlFor="cycle-slider" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Cycle: {cycleNumber} of {totalCycles}
          </label>
          <input
            id="cycle-slider"
            type="range"
            min="0"
            max={Math.max(0, totalCycles - 1)}
            value={currentIndex}
            onChange={(e) => onCycleChange(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <select
          value={currentIndex}
          onChange={(e) => onCycleChange(parseInt(e.target.value))}
          style={{ minWidth: '150px' }}
        >
          {Array.from({ length: totalCycles }, (_, i) => (
            <option key={i} value={i}>
              Cycle {i + 1}
            </option>
          ))}
        </select>

        <button
          onClick={() => onCycleChange(Math.min(totalCycles - 1, currentIndex + 1))}
          disabled={currentIndex === totalCycles - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

