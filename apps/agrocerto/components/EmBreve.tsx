import { ArrowLeft } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Hourglass } from 'lucide-react-native';

export default function EmBreve({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.mainTextContainer}>
        <Hourglass size={48} color="#1d902cff" />
        <Text style={styles.mainText}>Em breve</Text>
      </View>
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
  mainTextContainer: {
    marginTop: 250,
    marginBottom: 250,
    alignItems: 'center',
  },
  mainText: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
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
