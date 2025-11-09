import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../assets/images/calibra-plus-logo.png')} style={styles.logo} />

        <Text style={styles.version}>versão 0.0.1</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => console.log('Iniciar Calibração Pressed')}
        >
          <Text style={styles.primaryButtonText}>iniciar calibração</Text>
        </TouchableOpacity>

        <View style={styles.secondaryButtonsContainer}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => console.log('Manual do Usuário Pressed')}
          >
            <Text style={styles.secondaryButtonText}>Manual do Usuário</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => console.log('Desenvolvedores Pressed')}
          >
            <Text style={styles.secondaryButtonText}>Desenvolvedores</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  logo: {
    resizeMode: 'center',
    width: 200,
    height: 200,
  },
  version: {
    fontSize: 16,
    color: '#666',
    marginBottom: 50,
  },
  primaryButton: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    fontSize: 18,
  },
  secondaryButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  secondaryButton: {
    width: '45%',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
  },
});
