function ExerciseSearchScreen() {
    return (
      <View style={styles.container}>
        <Text>Home!</Text>
        <Button onPress={() => MuscleMagicAuth.signOut()} title="Logout" />
      </View>
    );
  }
  
  export default ExerciseSearchScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });