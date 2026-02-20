import { HapticTab } from '@/components/haptic-tab';
import LoginOtpDialog from '@/components/myCompo/customDialogue';
import { AuthContext } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs, useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Image } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { authToken } = useContext(AuthContext);
  const [dialogVisible, setDialogVisible] = useState(false);
  const router = useRouter();

  const handleTabPress = (e: any) => {
    if (!authToken) {
      e.preventDefault();
      setDialogVisible(true);
    }
  };

  console.log(`authToken::${authToken}`)

  return (
    <>
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
          listeners={{
            tabPress: handleTabPress,
          }}
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
          listeners={{
            tabPress: handleTabPress,
          }}
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
      <LoginOtpDialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
      />
    </>
  );
}



