import React, { useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Info, Calculator, Droplets, Gauge, Target } from 'lucide-react-native';

export default function InformationScreen() {
  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to top when screen gains focus
  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Guias e Informações</Text>
        <Text style={styles.headerSubtitle}>Aprenda como usar o Agrocerto de forma eficaz</Text>
      </View>

      <ScrollView ref={scrollViewRef} style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calculator size={24} color="#22C55E" />
            <Text style={styles.sectionTitle}>Como Usar a Calculadora</Text>
          </View>
          <Text style={styles.sectionText}>
            O Agrocerto ajuda a determinar a velocidade média e as configurações de aplicação para o
            seu equipamento de pulverizador. Siga o processo de 5 passos para obter cálculos
            precisos.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color="#0EA5E9" />
            <Text style={styles.sectionTitle}>Tipos de Pulverizador</Text>
          </View>
          <View style={styles.sprayerList}>
            <Text style={styles.sprayerItem}>
              • <Text style={styles.bold}>Pulverizador de Barra:</Text> Cobertura ampla para grandes
              áreas
            </Text>
            <Text style={styles.sprayerItem}>
              • <Text style={styles.bold}>Atomizador (canhão de ar):</Text> Atomização de alta
              pressão
            </Text>
            <Text style={styles.sprayerItem}>
              • <Text style={styles.bold}>Turbo Atomizador:</Text> Pulverização dirigida a pomares e
              cultivos densos
            </Text>
            <Text style={styles.sprayerItem}>
              • <Text style={styles.bold}>Pulverizador Costal Manual:</Text> Pulverização para
              pequenas aplicações
            </Text>
            <Text style={styles.sprayerItem}>
              • <Text style={styles.bold}>Pulverizador Costal Motorizado:</Text> Potente e prático
              para áreas maiores
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Droplets size={24} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Métodos de Cálculo</Text>
          </View>
          <Text style={styles.methodText}>
            <Text style={styles.bold}>Vazão Desejada:</Text> Cálcula o volume a ser coletado com
            base na vazão desejada.
          </Text>
          <Text style={styles.methodText}>
            <Text style={styles.bold}>Volume a Ser Coletado:</Text> Determina a vazão com base no
            volume coletado em 1 minuto.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Gauge size={24} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Dicas de Medição de Velocidade</Text>
          </View>
          <View style={styles.tipsList}>
            <Text style={styles.tip}>
              • Medir a velocidade em terreno similar às condições de pulverização reais
            </Text>
            <Text style={styles.tip}>• Faça múltiplas medições para obter uma precisão melhor</Text>
            <Text style={styles.tip}>• Mantenha a velocidade consistente durante a condução</Text>
            <Text style={styles.tip}>
              • Utilize a funcionalidade do cronómetro para medir a distância percorrida
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Info size={24} color="#EF4444" />
            <Text style={styles.sectionTitle}>Notas Importantes</Text>
          </View>
          <View style={styles.notesList}>
            <Text style={styles.note}>• Sempre calibrar o pulverizador antes de usá-lo</Text>
            <Text style={styles.note}>• Verifique a condição do bico regularmente</Text>
            <Text style={styles.note}>
              • As condições meteorológicas afetam os padrões de pulverização
            </Text>
            <Text style={styles.note}>• Siga as recomendações do fabricante químico</Text>
            <Text style={styles.note}>
              • Equipamentos de segurança apropriados devem ser usados
            </Text>
          </View>
        </View>

        <View style={styles.formulaSection}>
          <Text style={styles.formulaTitle}>Fórmula-chave</Text>
          <View style={styles.formulaBox}>
            <Text style={styles.formulaText}>Vazão (L/min) = </Text>
            <Text style={styles.formulaText}>
              (Velocidade × Distância entre os bicos × Taxa de aplicação) / 600
            </Text>
          </View>
        </View>
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
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  sectionText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },
  sprayerList: {
    gap: 8,
  },
  sprayerItem: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },
  bold: {
    fontWeight: '600',
    color: '#1E293B',
  },
  methodText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 8,
  },
  tipsList: {
    gap: 8,
  },
  tip: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },
  notesList: {
    gap: 8,
  },
  note: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },
  formulaSection: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  formulaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#15803D',
    marginBottom: 12,
  },
  formulaBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  formulaText: {
    fontSize: 16,
    color: '#166534',
    fontWeight: '500',
    textAlign: 'center',
  },
});
