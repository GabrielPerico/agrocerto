import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trash2, Calendar, Droplets, Gauge } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedCalculation } from '@/types/calculator';
import { useFocusEffect } from '@react-navigation/native';

export default function DataScreen() {
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      loadSavedCalculations();
      // Scroll to top when screen gains focus
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  const loadSavedCalculations = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedCalculations');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Erro ao carregar cálculos salvos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCalculation = async (id: string) => {
    Alert.alert('Remover Cálculo', 'Tem certeza de que deseja remover este cálculo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        style: 'destructive',
        onPress: async () => {
          try {
            const updated = savedCalculations.filter((calc) => calc.id !== id);
            setSavedCalculations(updated);
            await AsyncStorage.setItem('savedCalculations', JSON.stringify(updated));
          } catch (error) {
            console.error('Erro ao deletar cálculo:', error);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Carregando cálculos salvos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (savedCalculations.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.emptyTitle}>Nenhum Cálculo Salvo</Text>
          <Text style={styles.emptyDescription}>
            Complete os cálculos na aba Cálculo para ver os cálculos salvos.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cálculos Salvos</Text>
        <Text style={styles.headerSubtitle}>{savedCalculations.length} cálculos salvos</Text>
      </View>

      <ScrollView ref={scrollViewRef} style={styles.content} showsVerticalScrollIndicator={false}>
        {savedCalculations.map((calculation, i, arr) => (
          <View
            key={calculation.id}
            style={[styles.calculationCard, i === arr.length - 1 && styles.lastCard]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>{calculation.sprayerType}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteCalculation(calculation.id)}
                >
                  <Trash2 size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
              <View style={styles.dateRow}>
                <Calendar size={16} color="#6B7280" />
                <Text style={styles.dateText}>
                  {new Date(calculation.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.dataRow}>
                <View style={styles.dataItem}>
                  <Gauge size={18} color="#22C55E" />
                  <Text style={styles.dataLabel}>Velocidade</Text>
                  <Text style={styles.dataValue}>
                    {calculation.averageSpeed.toLocaleString()} m/s
                  </Text>
                </View>
                <View style={styles.dataItem}>
                  <Droplets size={18} color="#0EA5E9" />
                  <Text style={styles.dataLabel}>Vazão</Text>
                  <Text style={styles.dataValue}>
                    {calculation.finalResult.toLocaleString()} L/min
                  </Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailText}>
                  Método:{' '}
                  {calculation.calculationMethod === 'desired_flow'
                    ? 'Vazão Desejada'
                    : 'Volume a Coletar'}
                </Text>
                <Text style={styles.detailText}>
                  Distância entre bicos: {calculation.nozzleDistance} cm
                </Text>
              </View>
            </View>
          </View>
        ))}
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
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748B',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  calculationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lastCard: {
    marginBottom: 40,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  deleteButton: {
    padding: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardContent: {
    padding: 16,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dataItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  dataLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  dataValue: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
  },
  detailsRow: {
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#64748B',
  },
});
