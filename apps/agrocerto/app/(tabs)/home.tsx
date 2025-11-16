import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import DevelopersScreen from '@/components/home_subscreens/Developers';
import UserManualScreen from '@/components/home_subscreens/UserManual';

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const goToCalculatorScreen = () => {
    router.push('/(tabs)');
  };

  const goToManualScreen = () => {
    setCurrentScreen('manual');
  };

  const goToDevelopersScreen = () => {
    setCurrentScreen('developers');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'manual':
        return <UserManualScreen onBack={() => setCurrentScreen('home')} />;
      case 'developers':
        return <DevelopersScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return (
          <View style={styles.content}>
            <Image
              source={require('../../assets/images/calibra-plus-logo.png')}
              style={styles.logo}
            />

            <Text style={styles.version}>versão 0.0.1</Text>

            <TouchableOpacity style={styles.primaryButton} onPress={() => goToCalculatorScreen()}>
              <Text style={styles.primaryButtonText}>INICIAR CALIBRAÇÃO</Text>
            </TouchableOpacity>

            <View style={styles.secondaryButtonsContainer}>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => goToManualScreen()}>
                <Text style={styles.secondaryButtonText}>Manual do usuário</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => goToDevelopersScreen()}
              >
                <Text style={styles.secondaryButtonText}>Desenvolvedores</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  return <SafeAreaView style={styles.container}>{renderScreen()}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: {
    width: 300,
    height: 300,
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
    borderColor: '#0e65b5',
    backgroundColor: '#0d183d',
    alignItems: 'center',
    marginBottom: 20,
    textAlign: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  secondaryButtonsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  secondaryButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8bbf37',
    backgroundColor: '#095e23',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
});
