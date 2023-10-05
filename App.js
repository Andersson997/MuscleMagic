
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ScheduleScreen from './Screens/ScheduleScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <View style={styles.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={{tabBarStyle:{ backgroundColor:'#000000'}}}>
        <Tab.Screen name='Schedule' title="Schedule" component={ScheduleScreen}
        options={{
          title: "Schedule",
          tabBarIcon: () => {
            return (
              <Image
              style={{width: 30, height: 30}}
              source={{
                uri: 'https://img.icons8.com/ios/50/FFFFFF/overtime--v1.png'
              }}
              />
              );
            },
            headerShown: false,
          }}/>
          <Tab.Screen name="Home" component={HomeScreen}
          options={{
                title: "Home",
                tabBarIcon: () => {
                  return (
                    <Image
                    style={{width: 30, height: 30}}
                    source={{
                      uri: 'https://img.icons8.com/fluency-systems-regular/48/FFFFFF/home--v1.png'
                    }}
                    />
                  );
                },
                headerShown: false,
              }}
              />
          <Tab.Screen name='Profile' title="Profile" component={ProfileScreen}
          options={{
            title: "Profile",
            tabBarIcon: () => {
              return (
                <Image
                style={{width: 30, height: 30}}
                source={{
                  uri: 'https://img.icons8.com/ios/50/FFFFFF/administrator-male--v1.png'
                }}
                />
              );
            },
            headerShown: false,
          }}/>
      </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

