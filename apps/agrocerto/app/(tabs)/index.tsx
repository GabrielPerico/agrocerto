import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import StepIndicator from '@/components/StepIndicator';
import SprayerSelection from '@/components/calculator/SprayerSelection';
import CalculationType from '@/components/calculator/CalculationType';
import SpeedCalculator from '@/components/calculator/SpeedCalculator';
import NozzleConfiguration from '@/components/calculator/NozzleConfiguration';
import FinalMeasurement from '@/components/calculator/FinalMeasurement';
import EmBreve from '@/components/EmBreve';
import { CalculationData, SprayerType } from '@/types/calculator';

export default function CalculateScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const scrollViewRef = useRef<ScrollView>(null);
  const [calculationData, setCalculationData] = useState<CalculationData>({
    sprayerType: null,
    calculationMethod: null,
    averageSpeed: null,
    nozzleDistance: null,
    measurementValue: null,
    savedTimes: [],
  });

  const totalSteps = 5;

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  const updateCalculationData = (updates: Partial<CalculationData>) => {
    setCalculationData((prev) => ({ ...prev, ...updates }));
  };

  const goToNextStep = (sprayer?: SprayerType) => {
    if (checkIsSprayerTypeWithNoCalculation(sprayer)) {
      setCurrentStep(6);
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const checkIsSprayerTypeWithNoCalculation = (
    sprayer: SprayerType | null | undefined
  ): boolean => {
    return (
      !!sprayer &&
      [
        'Drone',
        'Atomizador (canhão de ar)',
        'Turbo Atomizador',
        'Pulverizador Costal Manual',
        'Pulverizador Costal Motorizado',
      ].includes(sprayer)
    );
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetCalculation = () => {
    setCurrentStep(1);
    setCalculationData({
      sprayerType: null,
      calculationMethod: null,
      averageSpeed: null,
      nozzleDistance: null,
      measurementValue: null,
      savedTimes: [],
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SprayerSelection
            selectedSprayer={calculationData.sprayerType}
            onSelect={(sprayer) => {
              updateCalculationData({ sprayerType: sprayer });
              goToNextStep(sprayer);
            }}
          />
        );
      case 2:
        return (
          <CalculationType
            selectedMethod={calculationData.calculationMethod}
            onSelect={(method) => updateCalculationData({ calculationMethod: method })}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case 3:
        return (
          <SpeedCalculator
            averageSpeed={calculationData.averageSpeed}
            savedTimes={calculationData.savedTimes}
            onSpeedCalculated={(speed) => updateCalculationData({ averageSpeed: speed })}
            onTimesUpdated={(times) => updateCalculationData({ savedTimes: times })}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case 4:
        return (
          <NozzleConfiguration
            nozzleDistance={calculationData.nozzleDistance}
            onDistanceSet={(distance) => updateCalculationData({ nozzleDistance: distance })}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case 5:
        return (
          <FinalMeasurement
            calculationMethod={calculationData.calculationMethod}
            measurementValue={calculationData.measurementValue}
            onValueSet={(value) => updateCalculationData({ measurementValue: value })}
            onBack={goToPreviousStep}
            onComplete={resetCalculation}
            calculationData={calculationData}
            onScrollToResult={() => {
              // Scroll to the bottom of the content to show the result
              scrollViewRef.current?.scrollToEnd({ animated: true });
            }}
          />
        );
      case 6:
        return (
          <EmBreve
            onBack={() => {
              setCurrentStep(1);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </View>

      <ScrollView ref={scrollViewRef} style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStep()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
