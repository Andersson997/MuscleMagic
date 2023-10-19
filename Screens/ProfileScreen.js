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
import React, { useState, useEffect } from "react";
import { MuscleMagicAuth, MuscleMagicDb } from "../Database/FireBaseConfig";
import LoadingScreen from "../Components/LoadingComponent";
import { fetchCurrentUser } from "../Components/FetchUserData";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";
function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState(0);
  const user = MuscleMagicAuth.currentUser;
  const db = MuscleMagicDb;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCurrentUser();
      setUserData(data);
      setWorkouts(data.workouts);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!userData) {
    return <Text>Error fetching user data</Text>; // Handle error scenario
  }
  const updatedWorkoutPlus = {
    country: userData.country,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    profileImageUrl: userData.profileImageUrl,
    workouts: userData.workouts + 1,
  };
  const updatedWorkoutMinus = {
    country: userData.country,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    profileImageUrl: userData.profileImageUrl,
    workouts: userData.workouts - 1,
  };

  const updateUserProfile = async (user, updatedData) => {
    try {
      const userRef = doc(collection(db, "users"), user.uid);
      await updateDoc(userRef, updatedData);
      setWorkouts(prevWorkouts => prevWorkouts + updatedData.workouts - userData.workouts);
      console.log("Success");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
 

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
          source={{
            uri: userData.profileImageUrl,
          }}
        ></Image>
        <Text style={styles.userName}>{userData.firstName}</Text>
        <Text style={styles.aboutUser}>
          Lorem ipsum dolor sit amet, consecteur adipiscing elit. Mauris a elit
          nisl.
        </Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <Text style={styles.userBtnTxt}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
            <Text
              style={styles.userBtnTxt}
              onPress={() => MuscleMagicAuth.signOut()}
            >
              LogOut
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => {
                updateUserProfile(user, updatedWorkoutMinus);
              }}
            >
              <Text style={{ fontSize: 50 }}>-</Text>
            </TouchableOpacity>
            <Text style={styles.userInfoTitle}>{workouts}</Text>
            <TouchableOpacity
              style={styles.minusButton}
              onPress={() => {
                updateUserProfile(user, updatedWorkoutPlus);
              }}
            >
              <Text style={{ fontSize: 50 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.userInfoSubTitle}>Workouts</Text>
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 70
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
    height: 45,
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 11,
    paddingHorizontal: 40,
    marginHorizontal: 3,
    
  },
  userBtnTxt: {
    color: "#2e64e5",
    fontSize: 16,
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    flexDirection: "row",
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 5,
    marginHorizontal: 50,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 20,
    color: "#666",
    textAlign: "center",
  },
});
