import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, Droplets, FlaskConical } from 'lucide-react-native';
import { CalculationMethod } from '@/types/calculator';

interface CalculationTypeProps {
  selectedMethod: CalculationMethod | null;
  onSelect: (method: CalculationMethod) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function CalculationType({
  selectedMethod,
  onSelect,
  onNext,
  onBack,
}: CalculationTypeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Método de Cálculo</Text>

      <View style={styles.methodsContainer}>
        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'desired_flow' && styles.selectedCard]}
          onPress={() => onSelect('desired_flow')}
        >
          <View
            style={[styles.methodIcon, selectedMethod === 'desired_flow' && styles.selectedIcon]}
          >
            <Droplets size={32} color={selectedMethod === 'desired_flow' ? '#FFFFFF' : '#22C55E'} />
          </View>
          <Text
            style={[
              styles.methodTitle,
              selectedMethod === 'desired_flow' && styles.selectedMethodTitle,
            ]}
          >
            Vazão desejada (L/ha)
          </Text>
          <Text
            style={[
              styles.methodDescription,
              selectedMethod === 'desired_flow' && styles.selectedMethodDescription,
            ]}
          >
            Calcule o volume de vazão desejada
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'volume_collect' && styles.selectedCard]}
          onPress={() => onSelect('volume_collect')}
        >
          <View
            style={[styles.methodIcon, selectedMethod === 'volume_collect' && styles.selectedIcon]}
          >
            <FlaskConical
              size={32}
              color={selectedMethod === 'volume_collect' ? '#FFFFFF' : '#0EA5E9'}
            />
          </View>
          <Text
            style={[
              styles.methodTitle,
              selectedMethod === 'volume_collect' && styles.selectedMethodTitle,
            ]}
          >
            Volume a ser coletado (L/min)
          </Text>
          <Text
            style={[
              styles.methodDescription,
              selectedMethod === 'volume_collect' && styles.selectedMethodDescription,
            ]}
          >
            Determine o volume a ser coletado por ponta em 1 minuto
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={20} color="#64748B" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextButton, !selectedMethod && styles.disabledButton]}
          onPress={onNext}
          disabled={!selectedMethod}
        >
          <Text style={[styles.nextButtonText, !selectedMethod && styles.disabledButtonText]}>
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
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 40,
    textAlign: 'center',
  },
  methodsContainer: {
    gap: 20,
    marginBottom: 40,
  },
  methodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#22C55E',
    backgroundColor: '#22C55E',
  },
  methodIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedIcon: {
    backgroundColor: '#0EA5E9',
  },
  methodTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  selectedMethodTitle: {
    color: '#FFFFFF',
  },
  methodDescription: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  selectedMethodDescription: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
  buttonContainer: {
    flex: 1,
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
