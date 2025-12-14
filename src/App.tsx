import { useState, useEffect } from 'react';
import { fetchBatterySummary, fetchCycleSnapshots } from './api';
import type { BatterySummary, CycleSnapshot } from './types';
import IMEISelector from './components/IMEISelector';
import CycleNavigation from './components/CycleNavigation';
import CycleStatistics from './components/CycleStatistics';
import PerformanceMetrics from './components/PerformanceMetrics';
import TemperatureDistribution from './components/TemperatureDistribution';
import BatteryHealth from './components/BatteryHealth';
import AlertsSafety from './components/AlertsSafety';
import ChargingInsights from './components/ChargingInsights';
import AdditionalInsights from './components/AdditionalInsights';
import LongTermTrends from './components/LongTermTrends';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const ALLOWED_IMEIS = ['865044073967657', '865044073949366'];

function App() {
  const [selectedIMEI, setSelectedIMEI] = useState<string>('');
  const [summaries, setSummaries] = useState<BatterySummary[]>([]);
  const [snapshots, setSnapshots] = useState<CycleSnapshot[]>([]);
  const [currentCycleIndex, setCurrentCycleIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function loadSummaries() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchBatterySummary();
        // fetchBatterySummary now handles format conversion internally
        setSummaries(data);
        if (data.length > 0 && !selectedIMEI) {
          setSelectedIMEI(data[0].imei);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load battery summaries';
        console.error('Error loading summaries:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    loadSummaries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function loadSnapshots() {
      if (!selectedIMEI) return;
      
      try {
        setLoading(true);
        setError('');
        const data = await fetchCycleSnapshots(selectedIMEI, 1000, 0);
        // fetchCycleSnapshots now handles format conversion internally
        setSnapshots(data);
        setCurrentCycleIndex(data.length > 0 ? data.length - 1 : 0);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load cycle snapshots';
        console.error('Error loading snapshots:', err);
        setError(errorMessage);
        setSnapshots([]);
      } finally {
        setLoading(false);
      }
    }
    loadSnapshots();
  }, [selectedIMEI]);

  const currentSnapshot = snapshots[currentCycleIndex] || null;
  const handleIMEIChange = (imei: string) => {
    setSelectedIMEI(imei);
    setSnapshots([]);
    setCurrentCycleIndex(0);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Zenfinity Energy</h1>
            <p className="subtitle">Battery Analytics Dashboard</p>
          </div>
          <IMEISelector
            imeis={ALLOWED_IMEIS}
            selectedIMEI={selectedIMEI}
            summaries={summaries}
            onIMEIChange={handleIMEIChange}
          />
        </div>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
            <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              <p>If this is a CORS error, try:</p>
              <ul style={{ textAlign: 'left', display: 'inline-block', marginTop: '0.5rem' }}>
                <li>Check if the dev server is running with the proxy configuration</li>
                <li>Restart the dev server: <code>npm run dev</code></li>
                <li>Check the browser console for more details</li>
              </ul>
              <button 
                onClick={() => window.location.reload()} 
                style={{ marginTop: '1rem', background: '#c33', color: 'white' }}
              >
                Reload Page
              </button>
            </div>
          </div>
        )}

        {loading && snapshots.length === 0 ? (
          <div className="loading">Loading battery data...</div>
        ) : !selectedIMEI ? (
          <div className="no-selection">Please select a battery IMEI to begin</div>
        ) : snapshots.length === 0 ? (
          <div className="no-data">No cycle data available for the selected battery</div>
        ) : (
          <>
            <CycleNavigation
              currentIndex={currentCycleIndex}
              totalCycles={snapshots.length}
              onCycleChange={setCurrentCycleIndex}
            />

            {currentSnapshot ? (
              <>
                <ErrorBoundary>
                  <CycleStatistics snapshot={currentSnapshot} />
                </ErrorBoundary>
                <ErrorBoundary>
                  <PerformanceMetrics snapshot={currentSnapshot} />
                </ErrorBoundary>
                
                <div className="grid grid-2">
                  <ErrorBoundary>
                    <TemperatureDistribution snapshot={currentSnapshot} />
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <BatteryHealth snapshot={currentSnapshot} />
                  </ErrorBoundary>
                </div>

                <div className="grid grid-2">
                  <ErrorBoundary>
                    <AlertsSafety snapshot={currentSnapshot} />
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <ChargingInsights snapshot={currentSnapshot} />
                  </ErrorBoundary>
                </div>

                <ErrorBoundary>
                  <AdditionalInsights snapshot={currentSnapshot} />
                </ErrorBoundary>
              </>
            ) : null}

            {snapshots.length > 1 && (
              <ErrorBoundary>
                <LongTermTrends snapshots={snapshots} />
              </ErrorBoundary>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;

