import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Microscope, Clock, Zap, Satellite, AlertTriangle, CheckCircle, Calculator } from 'lucide-react';

const PrecisionExperiments = () => {
  const [selectedExperiment, setSelectedExperiment] = useState('temporal');
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Parametri teorici dalla Fase 2
  const theoreticalParams = {
    alpha: 4.88e-16,
    alpha2: 4.88e-19,
    g: 0.1,
    v: 246e9, // eV
    mu2: 1e15, // eV²
    mu3: 1e18, // eV²
    c: 2.998e8, // m/s
    hbar: 1.055e-34, // J⋅s
    quantum_correction: 1e-4 // g²/16π²
  };

  // Calcolo delle predizioni sperimentali
  const calculatePredictions = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      // Test 1: Metrologia Temporale con Orologi Atomici
      const temporalMetrology = calculateTemporalMetrology();
      
      // Test 2: Interferometria Laser di Precisione
      const laserInterferometry = calculateLaserInterferometry();
      
      // Test 3: Sincronizzazione GPS e Timing Satellitare
      const gpsTiming = calculateGPSTiming();
      
      // Test 4: Astrofisica - GRB e FRB
      const astrophysics = calculateAstrophysics();
      
      setResults({
        temporal: temporalMetrology,
        laser: laserInterferometry,
        gps: gpsTiming,
        astrophysics: astrophysics
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  // Test 1: Metrologia Temporale con Orologi Atomici
  const calculateTemporalMetrology = () => {
    const { alpha, alpha2, quantum_correction } = theoreticalParams;
    
    // Orologi atomici moderni: precisione δτ/τ ~ 10⁻¹⁹
    const clock_precision = 1e-19;
    
    // Predizione tree-level
    const tree_level_effect = 0.5 * (alpha + alpha2);
    
    // Correzioni quantistiche (Fase 2)
    const quantum_effect = tree_level_effect * quantum_correction;
    
    // Simulazione dati sperimentali per diversi orologi
    const clockData = [
      {
        clock_type: 'Cesio (NIST-F2)',
        precision: 1e-16,
        measurement_time: 1, // giorni
        predicted_deviation: tree_level_effect * 1e6, // in parti per 10⁻¹⁶
        quantum_correction: quantum_effect * 1e6,
        detectability: tree_level_effect > 1e-17 ? 'SI' : 'NO',
        snr: tree_level_effect / 1e-17
      },
      {
        clock_type: 'Stronzio (JILA)',
        precision: 5e-19,
        measurement_time: 10,
        predicted_deviation: tree_level_effect * 2e8,
        quantum_correction: quantum_effect * 2e8,
        detectability: tree_level_effect > 5e-19 ? 'SI' : 'NO',
        snr: tree_level_effect / 5e-19
      },
      {
        clock_type: 'Alluminio (NIST)',
        precision: 9.4e-19,
        measurement_time: 7,
        predicted_deviation: tree_level_effect * 1.1e8,
        quantum_correction: quantum_effect * 1.1e8,
        detectability: tree_level_effect > 9.4e-19 ? 'SI' : 'NO',
        snr: tree_level_effect / 9.4e-19
      }
    ];

    // Calcolo della sensibilità temporale
    const time_evolution = Array.from({length: 100}, (_, i) => {
      const t = i * 0.1; // ore
      const thermal_noise = Math.sqrt(t) * 1e-18;
      const signal = tree_level_effect * Math.sin(2 * Math.PI * t / 24); // modulazione giornaliera
      return {
        time: t,
        signal: signal * 1e15,
        noise: thermal_noise * 1e15,
        snr: Math.abs(signal) / thermal_noise
      };
    });

    return {
      theoretical_prediction: tree_level_effect,
      quantum_corrections: quantum_effect,
      detectability_threshold: 1e-18,
      clocks: clockData,
      time_evolution: time_evolution,
      recommended_setup: 'Array di 3 orologi Sr con correlazione incrociata per 30 giorni'
    };
  };

  // Test 2: Interferometria Laser di Precisione
  const calculateLaserInterferometry = () => {
    const { alpha, alpha2, c } = theoreticalParams;
    
    // Parametri LIGO/Virgo
    const L_arm = 4000; // lunghezza bracci (m)
    const lambda = 1064e-9; // lunghezza d'onda laser (m)
    const strain_sensitivity = 1e-23; // sensibilità a strain
    
    // Predizione: modulazione della velocità della luce
    const delta_v_over_c = alpha * (1e-6)**2 + alpha2 * (1e-9)**2; // assumendo fluttuazioni temporali
    
    // Shift di fase nell'interferometro
    const phase_shift = (4 * Math.PI * L_arm / lambda) * delta_v_over_c;
    const strain_equivalent = phase_shift * lambda / (4 * Math.PI * L_arm);
    
    // Dati per diversi esperimenti
    const interferometers = [
      {
        name: 'LIGO Hanford',
        sensitivity: 1e-23,
        arm_length: 4000,
        predicted_strain: strain_equivalent,
        integration_time: 365, // giorni
        detectability: strain_equivalent > 1e-23 ? 'SI' : 'NO'
      },
      {
        name: 'Virgo',
        sensitivity: 1e-23,
        arm_length: 3000,
        predicted_strain: strain_equivalent * 0.75,
        integration_time: 365,
        detectability: strain_equivalent * 0.75 > 1e-23 ? 'SI' : 'NO'
      }
    ];

    // Modulazione temporale del segnale
    const temporal_modulation = Array.from({length: 24}, (_, h) => {
      const hour = h;
      const modulation = Math.cos(2 * Math.PI * hour / 24); // modulazione siderale
      return {
        hour,
        strain: strain_equivalent * modulation * 1e23, // in unità 10⁻²³
        phase: phase_shift * modulation * 1e6 // microradianti
      };
    });

    return {
      predicted_strain: strain_equivalent,
      phase_shift: phase_shift,
      interferometers: interferometers,
      temporal_modulation: temporal_modulation,
      recommended_analysis: 'Cross-correlazione LIGO-Virgo con analisi siderale'
    };
  };

  // Test 3: Sincronizzazione GPS e Timing Satellitare
  const calculateGPSTiming = () => {
    const { alpha, alpha2, c } = theoreticalParams;
    
    // Parametri orbitali GPS
    const orbital_period = 12 * 3600; // 12 ore in secondi
    const orbital_velocity = 3874; // m/s
    
    // Correzione 6D: modifiche alle componenti temporali
    const correction_6d = alpha * (orbital_velocity/c)**2 + alpha2 * (orbital_velocity/c)**4;
    const timing_deviation = correction_6d * orbital_period;
    
    // Evoluzione orbitale
    const orbital_evolution = Array.from({length: 48}, (_, i) => {
      const time = i * 0.5; // ore
      const orbital_phase = (2 * Math.PI * time) / 12;
      const timing_effect = timing_deviation * Math.cos(orbital_phase) * 1e9;
      return {
        time,
        timing_deviation: timing_effect,
        cumulative_error: timing_effect * time / 12
      };
    });

    return {
      predicted_timing_error: timing_deviation * 1e9, // ns
      predicted_position_error: timing_deviation * c * 100, // cm
      orbital_evolution: orbital_evolution,
      detectability_threshold: 0.1, // nanosecondi
      recommended_analysis: 'Correlazione cross-satellite per 30 giorni orbitali'
    };
  };

  // Test 4: Astrofisica - GRB e FRB
  const calculateAstrophysics = () => {
    const { alpha, alpha2, c } = theoreticalParams;
    
    // Parametri astrofisici tipici
    const distances = [1e25, 1e26, 1e27]; // metri (1 Gpc, 10 Gpc, 100 Gpc)
    const energies = [1e12, 1e15, 1e18]; // eV (GeV, TeV, EeV)
    
    const sources = distances.map((distance, i) => {
      const energy = energies[i];
      
      // Dispersione temporale dalla teoria 6D
      const dispersion_6d = (alpha * energy**2 + alpha2 * energy**4) * distance / (c**3);
      
      // Tempo di arrivo differenziale
      const delta_t = dispersion_6d * 1e3; // millisecondi
      
      return {
        source_type: i === 0 ? 'GRB vicino' : i === 1 ? 'FRB galattico' : 'FRB cosmico',
        distance_gpc: distance / 1e25,
        energy_gev: energy / 1e9,
        time_delay_ms: delta_t,
        detectability: delta_t > 0.1 ? 'SI' : 'NO',
        required_precision: delta_t / 10 // ms
      };
    });

    return {
      sources: sources,
      detection_threshold: 0.1, // ms
      recommended_telescopes: ['Fermi-LAT', 'CHIME', 'SKA'],
      analysis_method: 'Cross-correlazione multi-energia con baseline cosmiche'
    };
  };

  useEffect(() => {
    calculatePredictions();
  }, []);

  const renderExperimentDetails = () => {
    if (!results) return null;

    const data = results[selectedExperiment];
    if (!data) return null;

    switch(selectedExperiment) {
      case 'temporal':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Clock className="mr-2 text-blue-600" />
                Metrologia Temporale - Orologi Atomici
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Predizione teorica: δτ/τ = {data.theoretical_prediction.toExponential(2)}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {data.clocks.map((clock, idx) => (
                  <div key={idx} className="bg-white p-3 rounded border">
                    <h4 className="font-medium text-sm mb-2">{clock.clock_type}</h4>
                    <p className="text-xs">Precisione: {clock.precision.toExponential(1)}</p>
                    <p className="text-xs">SNR: {clock.snr.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      {clock.detectability === 'SI' ? (
                        <CheckCircle className="text-green-500 mr-1" size={16} />
                      ) : (
                        <AlertTriangle className="text-yellow-500 mr-1" size={16} />
                      )}
                      <span className="text-xs">{clock.detectability}</span>
                    </div>
                  </div>
                ))}
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.time_evolution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" label={{ value: 'Tempo (ore)', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: 'Deviazione (×10⁻¹⁵)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="signal" stroke="#8884d8" name="Segnale 6D" />
                  <Line type="monotone" dataKey="noise" stroke="#82ca9d" name="Rumore termico" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'laser':
        return (
          <div className="space-y-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Zap className="mr-2 text-red-600" />
                Interferometria Laser di Precisione
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Strain predetto: {data.predicted_strain.toExponential(2)}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {data.interferometers.map((ifo, idx) => (
                  <div key={idx} className="bg-white p-3 rounded border">
                    <h4 className="font-medium text-sm mb-2">{ifo.name}</h4>
                    <p className="text-xs">Lunghezza: {ifo.arm_length}m</p>
                    <p className="text-xs">Strain: {ifo.predicted_strain.toExponential(1)}</p>
                    <div className="flex items-center mt-2">
                      {ifo.detectability === 'SI' ? (
                        <CheckCircle className="text-green-500 mr-1" size={16} />
                      ) : (
                        <AlertTriangle className="text-red-500 mr-1" size={16} />
                      )}
                      <span className="text-xs">{ifo.detectability}</span>
                    </div>
                  </div>
                ))}
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.temporal_modulation}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" label={{ value: 'Ora siderale', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: 'Strain (×10⁻²³)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="strain" stroke="#ff7300" name="Modulazione 6D" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'gps':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Satellite className="mr-2 text-green-600" />
                Sincronizzazione GPS e Timing Satellitare
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Errore temporale predetto: {data.predicted_timing_error.toFixed(3)} ns
              </p>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.orbital_evolution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" label={{ value: 'Tempo orbitale (ore)', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: 'Deviazione timing (ns)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="timing_deviation" stroke="#82ca9d" name="Effetto 6D" />
                  <Line type="monotone" dataKey="cumulative_error" stroke="#8884d8" name="Errore cumulativo" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'astrophysics':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Astrofisica - GRB e FRB</h3>
              
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Sorgente</th>
                      <th className="border border-gray-300 p-2">Distanza (Gpc)</th>
                      <th className="border border-gray-300 p-2">Energia (GeV)</th>
                      <th className="border border-gray-300 p-2">Ritardo (ms)</th>
                      <th className="border border-gray-300 p-2">Rilevabile?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.sources.map((source, idx) => (
                      <tr key={idx}>
                        <td className="border border-gray-300 p-2">{source.source_type}</td>
                        <td className="border border-gray-300 p-2">{source.distance_gpc.toFixed(1)}</td>
                        <td className="border border-gray-300 p-2">{source.energy_gev.toExponential(1)}</td>
                        <td className="border border-gray-300 p-2">{source.time_delay_ms.toExponential(2)}</td>
                        <td className="border border-gray-300 p-2">
                          {source.detectability === 'SI' ? (
                            <CheckCircle className="text-green-500" size={16} />
                          ) : (
                            <AlertTriangle className="text-red-500" size={16} />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Calculator className="mr-3 text-purple-600" />
          Fase 3: Predizioni di Precisione per Esperimenti
        </h1>
        <p className="text-gray-600">
          Traduzione della teoria gauge 6D in test sperimentali concreti per laboratori di alta precisione
        </p>
      </div>

      {/* Selezione esperimento */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedExperiment('temporal')}
          className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
            selectedExperiment === 'temporal' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          <Clock className="mr-2" size={18} />
          Metrologia Temporale
        </button>
        
        <button
          onClick={() => setSelectedExperiment('laser')}
          className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
            selectedExperiment === 'laser' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          <Zap className="mr-2" size={18} />
          Interferometria Laser
        </button>
        
        <button
          onClick={() => setSelectedExperiment('gps')}
          className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
            selectedExperiment === 'gps' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          <Satellite className="mr-2" size={18} />
          GPS & Satelliti
        </button>
        
        <button
          onClick={() => setSelectedExperiment('astrophysics')}
          className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
            selectedExperiment === 'astrophysics' 
              ? 'bg-purple-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Astrofisica
        </button>
      </div>

      {/* Indicatore di calcolo */}
      {isCalculating && (
        <div className="mb-6 flex items-center justify-center p-6 bg-purple-50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mr-3"></div>
          <span className="text-lg">Calcolando predizioni sperimentali...</span>
        </div>
      )}

      {/* Risultati dettagliati */}
      {results && !isCalculating && (
        <div className="mb-8">
          {renderExperimentDetails()}
        </div>
      )}

      {/* Riepilogo delle predizioni */}
      {results && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <CheckCircle className="mr-2 text-green-600" />
            Riepilogo Predizioni Sperimentali
          </h3>
          
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium mb-3">Strategia Sperimentale Ottimale</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-blue-700 mb-2">Esperimenti ad Alta Priorità:</h5>
                <ul className="space-y-1 text-xs">
                  <li>• Array di orologi atomici Sr (JILA/NIST) - 30 giorni</li>
                  <li>• Cross-correlazione LIGO-Virgo con analisi siderale</li>
                  <li>• Monitoraggio timing GPS multi-satellite</li>
                  <li>• Analisi FRB/GRB multi-energia (Fermi + CHIME)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-purple-700 mb-2">Applicazioni nei Suoi Laboratori:</h5>
                <ul className="space-y-1 text-xs">
                  <li>• Cavità risonanti con controllo ambientale preciso</li>
                  <li>• Correlazioni temporali con competenze metrologiche</li>
                  <li>• Sincronizzazione usando esperienza acustica</li>
                  <li>• Minimizzazione rumore sistematico</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
            <h4 className="font-medium mb-2">Implementazione Personalizzata:</h4>
            <p className="text-sm">
              Con la sua esperienza in <strong>analisi di precisione e controllo ambientale</strong>, 
              potrebbe implementare test di correlazione temporale nei suoi laboratori usando 
              l'expertise in <strong>metrologia acustica</strong> per la sincronizzazione di precisione.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrecisionExperiments;
