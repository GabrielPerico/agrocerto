import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ArrowLeft, CircleCheck as CheckCircle, Droplets, FlaskConical } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalculationMethod, CalculationData, SavedCalculation } from '@/types/calculator';

interface FinalMeasurementProps {
  calculationMethod: CalculationMethod | null;
  measurementValue: number | null;
  onValueSet: (value: number) => void;
  onBack: () => void;
  onComplete: () => void;
  calculationData: CalculationData;
  onScrollToResult?: () => void;
}

export default function FinalMeasurement({
  calculationMethod,
  measurementValue,
  onValueSet,
  onBack,
  onComplete,
  calculationData,
  onScrollToResult,
}: FinalMeasurementProps) {
  const [valorInformado, setValorInformado] = useState(measurementValue?.toString() || '');
  const [error, setError] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleValueChange = (text: string) => {
    setValorInformado(text);
    setError('');
    setResult(null);
  };

  const calculateResult = () => {
    if (!valorInformado.trim()) {
      setError('Por favor insira um valor de medição');
      return;
    }

    const valorNum = parseFloat(valorInformado.replace(',', '.'));
    if (isNaN(valorNum) || valorNum <= 0) {
      setError('Por favor insira um valor válido maior que 0');
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      let calculatedResult: number;

      if (calculationMethod === 'vazao_desejada') {
        calculatedResult =
          (valorNum * 60000) / (calculationData.nozzleDistance! * calculationData.averageSpeed!);
      } else {
        calculatedResult =
          (valorNum * calculationData.nozzleDistance! * calculationData.averageSpeed!) / 60000;
      }

      setResult(calculatedResult);
      onValueSet(valorNum);
      setIsCalculating(false);

      setTimeout(() => {
        onScrollToResult?.();
      }, 200);
    }, 150);
  };

  const saveCalculation = async () => {
    if (!result || !calculationData.sprayerType) return;

    try {
      const calculation: SavedCalculation = {
        id: Date.now().toString(),
        sprayerType: calculationData.sprayerType,
        calculationMethod: calculationMethod!,
        averageSpeed: calculationData.averageSpeed!,
        nozzleDistance: calculationData.nozzleDistance!,
        measurementValue: parseFloat(valorInformado),
        finalResult: result,
        createdAt: new Date().toISOString(),
      };

      const existing = await AsyncStorage.getItem('savedCalculations');
      const savedCalculations = existing ? JSON.parse(existing) : [];
      savedCalculations.push(calculation);

      await AsyncStorage.setItem('savedCalculations', JSON.stringify(savedCalculations));

      Alert.alert('Cálculo salvo', 'Seu cálculo foi salvo com sucesso!', [
        {
          text: 'Iniciar novo cálculo',
          onPress: onComplete,
        },
      ]);
    } catch (error) {
      console.error('Erro ao salvar cálculo:', error);
      Alert.alert('Erro', 'Falha ao salvar o cálculo. Por favor, tente novamente.');
    }
  };

  const getInputLabel = () => {
    return calculationMethod === 'vazao_desejada'
      ? 'Vazão do bico (L/min)'
      : 'Volume de pulverização (L/ha)';
  };

  const getInputPlaceholder = () => {
    return calculationMethod === 'vazao_desejada'
      ? 'Insira o volume coletado por bico'
      : 'Insira o volume de pulverização';
  };

  const getResultLabel = () => {
    return calculationMethod === 'vazao_desejada'
      ? 'Volume de pulverização'
      : 'Volume a ser coletado por bico';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Medição final</Text>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>Resumo do cálculo</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tipo:</Text>
          <Text style={styles.summaryValue}>{calculationData.sprayerType}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Velocidade Média:</Text>
          <Text style={styles.summaryValue}>
            {calculationData.averageSpeed?.toLocaleString()} km/h
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Distância entre os bicos:</Text>
          <Text style={styles.summaryValue}>
            {calculationData.nozzleDistance?.toLocaleString()} cm
          </Text>
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>{getInputLabel()}</Text>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={valorInformado}
          onChangeText={handleValueChange}
          placeholder={getInputPlaceholder()}
          keyboardType="numeric"
          placeholderTextColor="#94A3B8"
          editable={!isCalculating && result === null}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {result === null && (
          <TouchableOpacity
            style={[styles.calculateButton, isCalculating && styles.calculatingButton]}
            onPress={calculateResult}
            disabled={isCalculating}
          >
            <Text style={styles.calculateButtonText}>
              {isCalculating ? 'Calculando...' : 'Calcular'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {result !== null && (
        <View style={styles.resultSection}>
          <View style={styles.resultHeader}>
            <CheckCircle size={24} color="#22C55E" />
            <Text style={styles.resultTitle}>Cálculo concluído</Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>{getResultLabel()}</Text>
            <Text style={styles.resultValue}>
              {result.toLocaleString(undefined, {
                maximumFractionDigits: 3,
                minimumFractionDigits: 3,
              })}{' '}
              {calculationMethod === 'vazao_desejada' ? 'L/ha' : 'L/min'}
            </Text>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveCalculation}>
            <Text style={styles.saveButtonText}>Salvar e iniciar novo cálculo</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={20} color="#64748B" />
          <Text style={styles.backButtonText}>Voltar</Text>
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
  summarySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#64748B',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  inputSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
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
    marginBottom: 12,
    textAlign: 'center',
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
    marginBottom: 16,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  calculateButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  calculatingButton: {
    backgroundColor: '#94A3B8',
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resultSection: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#15803D',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  resultLabel: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#15803D',
  },
  saveButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  backButton: {
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
});
