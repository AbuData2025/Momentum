import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import DashboardScreen from './screens/DashboardScreen';
import CalendarScreen from './screens/CalendarScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';
import TrainingScreen from './screens/TrainingScreen';
import JobSearchScreen from './screens/JobSearchScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import AddApplicationScreen from './screens/AddApplicationScreen';
import RemindersScreen from './screens/RemindersScreen';
import EditProfileScreen from './screens/EditProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabIcon({ name, focused }) {
  const icons = {
    Home: '⌂', Calendar: '📅', Progress: '📊', Profile: '👤',
  };
  return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.4 }}>{icons[name]}</Text>;
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#16161e', borderTopColor: '#2a2a3a', height: 70, paddingBottom: 10 },
        tabBarActiveTintColor: '#7c6ef5',
        tabBarInactiveTintColor: '#5a5a78',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tab.Screen name="Home" component={DashboardScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} /> }} />
      <Tab.Screen name="Calendar" component={CalendarScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="Calendar" focused={focused} /> }} />
      <Tab.Screen name="Progress" component={ProgressScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="Progress" focused={focused} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} /> }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Training" component={TrainingScreen} />
        <Stack.Screen name="JobSearch" component={JobSearchScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="AddApplication" component={AddApplicationScreen} />
        <Stack.Screen name="Reminders" component={RemindersScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}