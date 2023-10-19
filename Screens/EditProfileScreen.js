import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Button,
  TextInput,
} from "react-native";
import React, { useRef, useState, useEffect, useCallback } from "react";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import Animated from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import LoadingScreen from "../Components/LoadingComponent";
import { fetchCurrentUser } from "../Components/FetchUserData";
import { MuscleMagicAuth, MuscleMagicDb } from "../Database/FireBaseConfig";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from 'firebase/storage';

function EditProfileScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["48%"];
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const user = MuscleMagicAuth.currentUser;
  const db = MuscleMagicDb;

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }
  function handleCloseModal() {
    bottomSheetModalRef.current?.close();
  }
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    []
  );
  const selectImage = function (useLibrary) {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    };

    if (useLibrary) {
      return new Promise(function (resolve, reject) {
        ImagePicker.launchImageLibraryAsync(options)
          .then(function (response) {
            if (
              !response.canceled &&
              response.assets &&
              response.assets.length > 0
            ) {
              resolve(response);
            } else {
              reject("Image selection cancelled");
            }
          })
          .then(function () {
            handleCloseModal();
          })
          .catch(function (error) {
            reject(error);
          });
      });
    } else {
      return new Promise(function (resolve, reject) {
        ImagePicker.requestCameraPermissionsAsync()
          .then(function () {
            return ImagePicker.launchCameraAsync(options);
          })
          .then(function (response) {
            if (
              !response.canceled &&
              response.assets &&
              response.assets.length > 0
            ) {
              resolve(response);
            } else {
              reject("Camera operation cancelled");
            }
          })
          .then(function () {
            handleCloseModal();
          })
          .catch(function (error) {
            reject(error);
          });
      });
    }
  };
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCurrentUser();
      setUserData(data);
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
  const updatedData = {
    country: country,
    email: email,
    firstName: firstName,
    lastName: lastName,
  };
  
  const updateUserProfile = async (user, updatedData) => {
    try {
      const userRef = doc(collection(db, "users"), user.uid);
      await updateDoc(userRef, updatedData);
      console.log("User profile updated successfully!");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={handlePresentModal}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  marginTop: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageBackground
                 source={{
                    uri: userData.profileImageUrl,
                  }}
                  style={{ height: 150, width: 150 }}
                  imageStyle={{ borderRadius: 15 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#fff",
                        borderRadius: 10,
                      }}
                    ></Icon>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 30 }}>
              <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
                {userData.firstName}
              </Text>
            </View>
            <View style={styles.action}>
              <FontAwesome name="user-o" size={20} />
              <TextInput
                placeholder="Firstname"
                placeholderTextColor="#666666"
                style={styles.textInput}
                onChangeText={(text) => setFirstName(text)}
              >{userData.firstName}</TextInput>
            </View>
            <View style={styles.action}>
              <FontAwesome name="user-o" size={20} />
              <TextInput
                placeholder="Lastname"
                placeholderTextColor="#666666"
                style={styles.textInput}
                onChangeText={(text) => setLastName(text)}
              >{userData.lastName}</TextInput>
            </View>
            <View style={styles.action}>
              <FontAwesome name="envelope-o" size={20} />
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#666666"
                style={styles.textInput}
                onChangeText={(text) => setEmail(text)}
              >{userData.email}</TextInput>
            </View>
            <View style={styles.action}>
              <FontAwesome name="globe" size={20} />
              <TextInput
                placeholder="Country"
                placeholderTextColor="#666666"
                style={styles.textInput}
                onChangeText={(text) => setCountry(text)}
              >{userData.country}</TextInput>
            </View>
            <TouchableOpacity
              style={styles.commandButton}
              onPress={() => {
                updateUserProfile(user, updatedData);
              }}
            >
              <Text style={styles.panelButtonTitle}>Submit</Text>
            </TouchableOpacity>
          </View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
          >
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Upload Photo</Text>
              <Text style={styles.panelSubtitle}>
                Choose Your Profile Picture
              </Text>
            </View>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={() => selectImage(false)}
            >
              <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={() => selectImage(true)}
            >
              <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
          </BottomSheetModal>
        </View>
      </View>
    </BottomSheetModalProvider>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    margin: 20,
    marginTop: 90,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    width: "100%",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#2e64e5",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#333333",
  },
});
