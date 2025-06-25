import { Tabs } from 'expo-router';
import { Calculator, Database, Info } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#22C55E',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cálculo',
          tabBarIcon: ({ size, color }) => <Calculator size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          title: 'Ver Dados',
          tabBarIcon: ({ size, color }) => <Database size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="information"
        options={{
          title: 'Informações',
          tabBarIcon: ({ size, color }) => <Info size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
