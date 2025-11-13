import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import React, { useCallback, useRef } from 'react';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

interface UserManualScreenProps {
  onBack: () => void;
}

export default function UserManualScreen({ onBack }: UserManualScreenProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manual do usuário</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.content}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Como calibrar o pulverizador de barra</Text>
          </View>
          <Text style={styles.sectionSubtitle}>1. Determine a velocidade de deslocamento</Text>
          <Text style={styles.sectionText}>
            Se essa informação não estiver disponível, use a função para medir a velocidade
            disponível no aplicativo e realize a medição em campo. Na etapa de medição da
            velocidade, o aplicativo disponibilizará um cronômetro para auxiliar no cálculo.
          </Text>
          <Text style={styles.sectionText}>Como medir a velocidade:</Text>
          <View style={styles.notesList}>
            <Text style={styles.note}>• Marque 50 metros no terreno</Text>
            <Text style={styles.note}>
              • Conduza o trator engatado ao pulverizador contendo água utilizando a marcha de
              trabalho e a aceleração necessária para atingir 540 rpm na tomada de força (TDP).
            </Text>
            <Text style={styles.note}>
              • Inicie o deslocamento do trator pelo menos 5 metros antes do ponto inicial
              demarcado.
            </Text>
            <Text style={styles.note}>
              • Registre o tempo gasto (em segundos) para percorrer os 50 metros.
            </Text>
            <Text style={styles.note}>
              • Repita o procedimento algumas vezes e calcule a média dos tempos obtidos,
              especialmente se o terreno apresentar irregularidades.
            </Text>
          </View>

          <Text style={styles.sectionSubtitle}>
            2. Informe a distância entre os bicos de pulverização
          </Text>

          <Text style={styles.sectionSubtitle}>3. Defina a vazão desejada</Text>

          <Text style={styles.sectionSubtitle}>4. Verifique o resultado</Text>

          <Text style={styles.sectionText}>
            O aplicativo fornecerá o volume de líquido que deve ser coletado em 1 minuto referente a
            apenas um bico do pulverizador.
          </Text>
          <Text style={styles.sectionText}>
            Para garantir maior precisão, realize a medição em diversos bicos e utilize a média dos
            valores obtidos.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Como calibrar o drone pulverizador</Text>
          </View>
          <Text style={[styles.sectionSubtitle, { textAlign: 'center' }]}>Em breve</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Como calibrar o atomizador (canhão de ar)</Text>
          </View>
          <Text style={[styles.sectionSubtitle, { textAlign: 'center' }]}>Em breve</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Como calibrar o turbo atomizador</Text>
          </View>
          <Text style={[styles.sectionSubtitle, { textAlign: 'center' }]}>Em breve</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Como calibrar o pulverizador costal manual</Text>
          </View>
          <Text style={[styles.sectionSubtitle, { textAlign: 'center' }]}>Em breve</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Como calibrar o pulverizador costal motorizado</Text>
          </View>
          <Text style={[styles.sectionSubtitle, { textAlign: 'center' }]}>Em breve</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <ArrowLeft size={20} color="#64748B" />
        <Text>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  content: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    marginBottom: 10,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#64748B',
    backgroundColor: '#e7e7e7ff',
  },
  section: {
    backgroundColor: '#e9e9e9ff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 38,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '95%',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  sectionSubtitle: {
    fontSize: 17,
    fontWeight: '500',
    marginVertical: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  notesList: {
    gap: 8,
  },
  note: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },
});
