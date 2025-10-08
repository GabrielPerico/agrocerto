import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SprayerType } from '@/types/calculator';
import { Droplets, Wind, Zap, User, Settings } from 'lucide-react-native';

interface SprayerSelectionProps {
  selectedSprayer: SprayerType | null;
  onSelect: (sprayer: SprayerType) => void;
}

const sprayerOptions: { type: SprayerType; icon: React.ReactNode; description: string }[] = [
  {
    type: 'Pulverizador de Barra',
    icon: <Settings size={24} color="#22C55E" />,
    description: 'Cobertura ampla para grandes áreas',
  },
  {
    type: 'Atomizador (canhão de ar)',
    icon: <Wind size={24} color="#0EA5E9" />,
    description: 'Atomização de alta pressão',
  },
  {
    type: 'Turbo Atomizador',
    icon: <Zap size={24} color="#8B5CF6" />,
    description: 'Pulverização dirigida a pomares e cultivos densos',
  },
  {
    type: 'Pulverizador Costal Manual',
    icon: <User size={24} color="#F59E0B" />,
    description: 'Pulverização para pequenas aplicações',
  },
  {
    type: 'Pulverizador Costal Motorizado',
    icon: <Droplets size={24} color="#EF4444" />,
    description: 'Potente e prático para áreas maiores',
  },
];

export default function SprayerSelection({ selectedSprayer, onSelect }: SprayerSelectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tipo de Pulverizador</Text>

      <View style={styles.optionsContainer}>
        {sprayerOptions.map((option) => (
          <TouchableOpacity
            key={option.type}
            style={[styles.optionCard, selectedSprayer === option.type && styles.selectedCard]}
            onPress={() => onSelect(option.type)}
          >
            <View style={styles.optionHeader}>
              {option.icon}
              <Text
                style={[
                  styles.optionTitle,
                  selectedSprayer === option.type && styles.selectedOptionTitle,
                ]}
              >
                {option.type}
              </Text>
            </View>
            <Text
              style={[
                styles.optionDescription,
                selectedSprayer === option.type && styles.selectedOptionDescription,
              ]}
            >
              {option.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
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
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
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
    backgroundColor: '#F0FDF4',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  selectedOptionTitle: {
    color: '#15803D',
  },
  optionDescription: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 36,
  },
  selectedOptionDescription: {
    color: '#166534',
  },
  nextButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
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
