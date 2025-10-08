import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { ArrowLeft, Play, Pause, RotateCcw, Save, Trash2, Clock } from 'lucide-react-native';
import { SavedTime } from '@/types/calculator';

interface SpeedCalculatorProps {
  averageSpeed: number | null;
  savedTimes: SavedTime[];
  onSpeedCalculated: (speed: number | null) => void;
  onTimesUpdated: (times: SavedTime[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SpeedCalculator({
  averageSpeed,
  savedTimes,
  onSpeedCalculated,
  onTimesUpdated,
  onNext,
  onBack,
}: SpeedCalculatorProps) {
  const multiplierToConvertMStoKMH = 3.6;

  const [distance, setDistance] = useState('50');
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [error, setError] = useState('');
  const [manualSpeed, setManualSpeed] = useState('');
  const [useManualSpeed, setUseManualSpeed] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const initialDateRef = useRef<Date | null>(null);
  const previousTimeRef = useRef<number>(0);

  const calculateAverageSpeed = (times = savedTimes) => {
    if (useManualSpeed && manualSpeed.trim()) {
      const speedNum = parseFloat(manualSpeed);
      if (!isNaN(speedNum) && speedNum > 0) {
        onSpeedCalculated(Number(speedNum.toFixed(2)));
        return;
      }
    }

    if (times.length > 0) {
      const speeds = times.map((t) => t.distance / (t.time / 1000));
      const avgSpeed = (speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length) * multiplierToConvertMStoKMH;
      onSpeedCalculated(Number(avgSpeed.toFixed(2)));
    } else {
      onSpeedCalculated(null);
    }
  };

  const handleManualSpeedChange = (value: string) => {
    setManualSpeed(value);
    setError('');

    if (value.trim()) {
      const speedNum = parseFloat(value);
      if (!isNaN(speedNum) && speedNum > 0) {
        setUseManualSpeed(true);
        onSpeedCalculated(Number(speedNum.toFixed(2)));
      } else {
        setUseManualSpeed(false);
        calculateAverageSpeed();
      }
    } else {
      setUseManualSpeed(false);
      calculateAverageSpeed();
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = milliseconds % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  };

  const startStopwatch = () => {
    setError('');
    setIsRunning(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!initialDateRef.current) {
      initialDateRef.current = new Date();
    }

    intervalRef.current = setInterval(() => {
      setTime(previousTimeRef.current + Date.now() - initialDateRef.current!.getTime());
    }, 10);
  };

  const pauseStopwatch = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    initialDateRef.current = null;
    previousTimeRef.current = time;
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    initialDateRef.current = null;
    previousTimeRef.current = 0;
  };

  const saveTime = () => {
    if (!distance.trim()) {
      setError('Por favor insira a distância percorrida');
      return;
    }

    const distanceNum = parseFloat(distance);
    if (isNaN(distanceNum) || distanceNum <= 0) {
      setError('Por favor insira uma distância válida maior que 0');
      return;
    }

    if (time === 0) {
      setError('Por favor grave um tempo primeiro');
      return;
    }

    const newTime: SavedTime = {
      id: Date.now().toString(),
      time,
      distance: distanceNum,
    };

    const updatedTimes = [...savedTimes, newTime];
    onTimesUpdated(updatedTimes);
    calculateAverageSpeed(updatedTimes);

    // Reset for next measurement
    resetStopwatch();
    setDistance('50');
    setError('');
  };

  const deleteTime = (id: string) => {
    Alert.alert('Remover Tempo', 'Tem certeza de que deseja remover este tempo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        style: 'destructive',
        onPress: () => {
          const updatedTimes = savedTimes.filter((t) => t.id !== id);
          onTimesUpdated(updatedTimes);
          calculateAverageSpeed(updatedTimes);
        },
      },
    ]);
  };

  const canProceed = (savedTimes.length > 0 || useManualSpeed) && averageSpeed !== null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Velocidade Média</Text>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Distância a percorrer (metros)</Text>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={distance}
          onChangeText={setDistance}
          placeholder="Insira a distância em metros"
          keyboardType="numeric"
          placeholderTextColor="#94A3B8"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Ou insira a velocidade manualmente (km/h)</Text>
        <TextInput
          style={styles.input}
          value={manualSpeed}
          onChangeText={handleManualSpeedChange}
          placeholder="Insira a velocidade em km/h"
          keyboardType="numeric"
          placeholderTextColor="#94A3B8"
        />
        <Text style={styles.helpText}>
          {useManualSpeed
            ? '✓ Usando velocidade manual'
            : 'Deixe vazio para calcular automaticamente'}
        </Text>
      </View>

      <View style={styles.stopwatchSection}>
        <View style={styles.timeDisplay}>
          <Clock size={24} color="#22C55E" />
          <Text style={styles.timeText}>{formatTime(time)}</Text>
        </View>

        <View style={[styles.stopwatchControls, { marginBottom: 8 }]}>
          <TouchableOpacity
            style={[styles.controlButton, styles.startButton]}
            onPress={startStopwatch}
            disabled={isRunning}
          >
            <Play size={20} color="#FFFFFF" />
            <Text style={styles.controlButtonText}>Iniciar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.pauseButton]}
            onPress={pauseStopwatch}
            disabled={!isRunning}
          >
            <Pause size={20} color="#FFFFFF" />
            <Text style={styles.controlButtonText}>Parar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.stopwatchControls}>
          <TouchableOpacity
            style={[styles.controlButton, styles.resetButton]}
            onPress={resetStopwatch}
          >
            <RotateCcw size={20} color="#FFFFFF" />
            <Text style={styles.controlButtonText}>Reiniciar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.controlButton, styles.saveButton]} onPress={saveTime}>
            <Save size={20} color="#FFFFFF" />
            <Text style={styles.controlButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {savedTimes.length > 0 && (
        <View style={styles.savedTimesSection}>
          <Text style={styles.sectionTitle}>Tempos Registrados</Text>
          <ScrollView style={styles.timesList} showsVerticalScrollIndicator={false}>
            {savedTimes.map((savedTime) => (
              <View key={savedTime.id} style={styles.timeItem}>
                <View style={styles.timeInfo}>
                  <Text style={styles.timeDistance}>{savedTime.distance}m</Text>
                  <Text style={styles.timeValue}>{formatTime(savedTime.time)}</Text>
                  <Text style={styles.timeSpeed}>
                    {(savedTime.distance / (savedTime.time / 1000) * multiplierToConvertMStoKMH).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}{' '}
                    km/h
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteTime(savedTime.id)}
                >
                  <Trash2 size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {averageSpeed !== null && (
        <View style={styles.averageSpeedSection}>
          <Text style={styles.averageSpeedLabel}>Velocidade Média</Text>
          <Text style={styles.averageSpeedValue}>
            {averageSpeed.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}{' '}
            km/h
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={20} color="#64748B" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextButton, !canProceed && styles.disabledButton]}
          onPress={onNext}
          disabled={!canProceed}
        >
          <Text style={[styles.nextButtonText, !canProceed && styles.disabledButtonText]}>
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 32,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1E293B',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 4,
  },
  helpText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    fontStyle: 'italic',
  },
  stopwatchSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  timeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    fontFamily: 'monospace',
  },
  stopwatchControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 12,
    borderRadius: 8,
  },
  startButton: {
    backgroundColor: '#22C55E',
  },
  pauseButton: {
    backgroundColor: '#F59E0B',
  },
  resetButton: {
    backgroundColor: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#0EA5E9',
  },
  controlButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  savedTimesSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  timesList: {
    maxHeight: 200,
  },
  timeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  timeInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeDistance: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  timeValue: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'monospace',
  },
  timeSpeed: {
    fontSize: 14,
    fontWeight: '500',
    color: '#22C55E',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 12,
  },
  averageSpeedSection: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  averageSpeedLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#15803D',
    marginBottom: 4,
  },
  averageSpeedValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#15803D',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
  },
  backButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748B',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#E2E8F0',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disabledButtonText: {
    color: '#94A3B8',
  },
});
