import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ArrowLeft, Settings } from 'lucide-react-native';

interface NozzleConfigurationProps {
  nozzleDistance: number | null;
  onDistanceSet: (distance: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function NozzleConfiguration({
  nozzleDistance,
  onDistanceSet,
  onNext,
  onBack,
}: NozzleConfigurationProps) {
  const [distance, setDistance] = useState(nozzleDistance?.toString() || '');
  const [error, setError] = useState('');

  const handleDistanceChange = (text: string) => {
    let formattedText = text.replace('.', ',');

    const validDecimal = /^\d*(,\d*)?$/;

    if (validDecimal.test(formattedText) || formattedText === '') {
      setDistance(formattedText);
      setError('');
    }
  };

  const handleNext = () => {
    if (!distance.trim()) {
      setError('Por favor insira a distância dos bicos');
      return;
    }

    const distanceNum = parseFloat(distance.replace(',', '.'));
    if (isNaN(distanceNum) || distanceNum <= 0) {
      setError('Por favor insira uma distância válida maior que 0');
      return;
    }

    if (distanceNum > 500) {
      setError('A distância parece ser muito grande. Por favor verifique a distância informada');
      return;
    }

    onDistanceSet(distanceNum);
    onNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Configuração do bico</Text>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Distância entre os bicos (cm)</Text>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={distance}
          onChangeText={handleDistanceChange}
          placeholder="Insira a distância em centímetros"
          keyboardType="numeric"
          placeholderTextColor="#94A3B8"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>💡 Dicas para a medição</Text>
          <Text style={styles.helpText}>
            • Medir a distância entre o centro de um bico até o centro do bico ao lado
          </Text>
          <Text style={styles.helpText}>
            • Utilize uma régua ou trena para maior precisão
          </Text>
          <Text style={styles.helpText}>
            • As distâncias normais entre os bicos variam entre 25, 40 e 50cm
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={20} color="#64748B" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Continuar</Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  inputSection: {
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
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    color: '#1E293B',
    textAlign: 'center',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 8,
    textAlign: 'center',
  },
  helpSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0369A1',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#0369A1',
    lineHeight: 20,
    marginBottom: 4,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 20,
  },
  nozzleRepresentation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nozzle: {
    width: 12,
    height: 20,
    backgroundColor: '#22C55E',
    borderRadius: 6,
  },
  distanceLine: {
    width: 40,
    height: 2,
    backgroundColor: '#94A3B8',
    marginHorizontal: 8,
  },
  distanceLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    paddingHorizontal: 8,
  },
  guideDescription: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
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
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
