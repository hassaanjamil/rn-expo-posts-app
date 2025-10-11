import { MaterialIcons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';

const TAB_TITLES: Record<string, string> = {
  index: 'Home',
  favorite: 'Favorite',
  settings: 'Settings',
};

const ProfileHeaderButton: React.FC = () => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Pressable onPress={() => router.push('/profile')} style={{ paddingHorizontal: 12 }}>
      <MaterialIcons name="person" size={28} color={colors.text} />
    </Pressable>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerTitle: TAB_TITLES[route.name] ?? 'App',
        tabBarLabel: TAB_TITLES[route.name] ?? route.name,
        headerRight: () => <ProfileHeaderButton />,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favorite',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="favorite" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="settings" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
