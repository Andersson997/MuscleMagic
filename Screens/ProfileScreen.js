import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { createNativeNavigator } from "@react-navigation/native-stack";

function ProfileScreen({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={styles.userImg}
          source={require("../assets/user-8.jpg")}
        ></Image>
        <Text style={styles.userName}>Jenny Doe</Text>
        <Text style={styles.aboutUser}>
          Lorem ipsum dolor sit amet, consecteur adipiscing elit. Mauris a elit
          nisl.
        </Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity style={styles.userBtn} onPress={() => {
                  navigation.navigate('EditProfile');
                }}>
            <Text style={styles.userBtnTxt}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
            <Text style={styles.userBtnTxt}>LogOut</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoWrapper}>
            <View style={styles.userInfoItem}>
                <Text style={styles.userInfoTitle}>22</Text>
                <Text style={styles.userInfoSubTitle}>Workouts</Text>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
