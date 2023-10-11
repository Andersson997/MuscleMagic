import { ImageBackground, StyleSheet, Text, View } from 'react-native';

function ScheduleScreen() {
 return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Schedule!</Text>
  </View>
 );
}

export default ScheduleScreen;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});