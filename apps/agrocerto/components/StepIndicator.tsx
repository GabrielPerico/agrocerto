import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <React.Fragment key={stepNumber}>
            <View
              style={[
                styles.step,
                isActive && styles.activeStep,
                isCompleted && styles.completedStep,
              ]}
            >
              {isCompleted ? (
                <Check size={16} color="#FFFFFF" />
              ) : (
                <Text
                  style={[
                    styles.stepText,
                    isActive && styles.activeStepText,
                    isCompleted && styles.completedStepText,
                  ]}
                >
                  {stepNumber}
                </Text>
              )}
            </View>
            {stepNumber < totalSteps && (
              <View
                style={[styles.connector, stepNumber < currentStep && styles.completedConnector]}
              />
            )}
          </React.Fragment>
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
  },
  step: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  activeStep: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  completedStep: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  stepText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  activeStepText: {
    color: '#FFFFFF',
  },
  completedStepText: {
    color: '#FFFFFF',
  },
  connector: {
    width: 24,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  completedConnector: {
    backgroundColor: '#22C55E',
  },
});
