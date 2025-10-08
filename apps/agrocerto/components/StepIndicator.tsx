import React from 'react';
import { View, StyleSheet } from 'react-native';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <View key={stepNumber} style={styles.stepContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  isCompleted && styles.completedFill,
                  isActive && styles.activeFill,
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '0%',
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  completedFill: {
    width: '100%',
    backgroundColor: '#22C55E',
  },
  activeFill: {
    width: '100%',
    backgroundColor: '#22C55E',
  },
});
