import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#004F9F',
          height: 60,
          paddingBottom: 10,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderWidth: 1,
          marginHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 4,
          marginBottom: 20,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'grey',

        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/home_tab.png")
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="equipment"
        options={{
          title: 'Equipment',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/equipment_tab.png")
              }
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />


      <Tabs.Screen
        name="amc"
        options={{
          title: 'AMC',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/amc_tab.png")
              }
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />



      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/profile_tab.png")
              }

              style={{ width: 24, height: 24, }}
            />
          ),
        }}
      />
    </Tabs>
  );
}



