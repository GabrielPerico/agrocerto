import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface DevelopersScreenProps {
  onBack: () => void;
}

export default function DevelopersScreen({ onBack }: DevelopersScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.devsContainer}>
        <Text style={styles.title}>Desenvolvedores</Text>
        <Text style={styles.developerName}>
          Gabriel Périco <Text style={styles.developerRole}>(Acadêmico)</Text>
        </Text>
        <Text style={styles.developerName}>
          João Paulo Gregolon Paludo <Text style={styles.developerRole}>(Acadêmico)</Text>
        </Text>
        <Text style={styles.developerName}>
          Roberson Junior Fernandes Alves <Text style={styles.developerRole}>(Orientador)</Text>
        </Text>
        <Text style={styles.developerName}>
          Diego Fernando Daniel <Text style={styles.developerRole}>(Professor consultor)</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <ArrowLeft size={20} color="#64748B" />
        <Text>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  devsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 30 },
  developerName: { fontSize: 17, color: '#374151' },
  developerRole: { fontSize: 15, color: '#6b7280', fontStyle: 'italic' },
  backButton: {
    marginBottom: 25,
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
});
