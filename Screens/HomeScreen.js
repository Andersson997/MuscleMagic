import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { MuscleMagicAuth } from '../Database/FireBaseConfig';
function HomeScreen() {
  return (
    <View style={styles}>
    <Text>Home!</Text>
    <Button onPress={() => MuscleMagicAuth.signOut()} title="Logout" />
  </View>
  );
}

export default HomeScreen;

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