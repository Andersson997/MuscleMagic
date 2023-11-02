import React, { useRef, useState, useCallback } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import {
  MuscleMagicAuth,
  MuscleMagicDb,
  MuscleMagicStorage,
} from "../Database/FireBaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ScrollView } from "react-native-gesture-handler";
import { doc, setDoc, collection } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { selectImage } from "../Components/SelectImageComponent";
const { height, width } = Dimensions.get("window");

function StartScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["48%"];
  const [loading, setLoading] = useState(false);
  const auth = MuscleMagicAuth;
  const db = MuscleMagicDb;
  const storage = MuscleMagicStorage;

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

  const handleImageSelection = async (useLibrary) => {
    try {
      const response = await selectImage(useLibrary); // Pass true to use the library for image selection
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const createUserProfile = async (user) => {
    try {
      if (selectedImage) {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const storageRef = ref(storage, `profileImages/${user.uid}`);

        await uploadBytes(storageRef, blob);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        // Store the download URL in Firestore along with other user data
        const userRef = doc(collection(db, "users"), user.uid);
        await setDoc(userRef, {
          country: country,
          email: email,
          firstName: firstName,
          lastName: lastName,
          profileImageUrl: downloadURL,
          workoutCounter: 0,
        });
      } else {
        // If no image is selected, store other user data in Firestore
        const userRef = doc(collection(db, "users"), user.uid);
        await setDoc(userRef, {
          country: country,
          email: email,
          firstName: firstName,
          lastName: lastName,
        });
      }

      console.log("User profile created successfully!");
    } catch (error) {
      console.error("Error creating user profile:", error);
    }
  };
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredential) => {
        const user = userCredential.user;
        return createUserProfile(user);
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );

    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });
  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });
  const handlePress = () => {
    if (isRegistering) {
      signUp();
    } else if (!isRegistering) {
      signIn();
    }
  };
  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      setIsRegistering(false);
    }
  };
  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      setIsRegistering(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "undefined"}
    >
      <BottomSheetModalProvider>
        <Animated.View style={styles.container}>
          <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
            <Svg height={height + 100} width={width}>
              <ClipPath id="clipPathId">
                <Ellipse cx={width / 2} rx={height} ry={height + 100} />
              </ClipPath>
              <Image
                href={require("../assets/bildfyra.jpg")}
                width={width + 100}
                height={height + 100}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clipPathId)"
              />
            </Svg>
            <Pressable onPress={() => (imagePosition.value = 1)}>
              <Animated.View
                style={[styles.closeButtonContainer, closeButtonContainerStyle]}
              >
                <Text>X</Text>
              </Animated.View>
            </Pressable>
          </Animated.View>
          <View style={styles.bottomContainer}>
            <Animated.View style={buttonsAnimatedStyle}>
              <Pressable style={styles.button} onPress={loginHandler}>
                <Text style={styles.buttonText}>LOG IN</Text>
              </Pressable>
            </Animated.View>
            <Animated.View style={buttonsAnimatedStyle}>
              <Pressable style={styles.button} onPress={registerHandler}>
                <Text style={styles.buttonText}>REGISTER</Text>
              </Pressable>
            </Animated.View>
            <Animated.View
              style={[styles.formInputContainer, formAnimatedStyle]}
            >
              <ScrollView>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="white"
                  style={styles.textInput}
                  value={email}
                  autoCapitalize="none"
                  onChangeText={(text) => setEmail(text)}
                />
                {isRegistering && (
                  <View>
                    <TextInput
                      placeholder="First Name"
                      placeholderTextColor="white"
                      style={styles.textInput}
                      onChangeText={(text) => setFirstName(text)}
                    />
                    <TextInput
                      placeholder="Last Name"
                      placeholderTextColor="white"
                      style={styles.textInput}
                      onChangeText={(text) => setLastName(text)}
                    />
                    <TextInput
                      placeholder="Country"
                      placeholderTextColor="white"
                      style={styles.textInput}
                      onChangeText={(text) => setCountry(text)}
                    />
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handlePresentModal}
                    >
                      <Text style={styles.buttonText}>
                        Choose profile picture
                      </Text>
                    </TouchableOpacity>
                    <BottomSheetModal
                      ref={bottomSheetModalRef}
                      index={0}
                      snapPoints={snapPoints}
                      backdropComponent={renderBackdrop}
                    >
                      <View style={styles.panel}>
                        <Text style={styles.buttonText}>Upload Photo</Text>
                        <Text style={styles.buttonText}>
                          Choose Your Profile Picture
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleImageSelection(false)}
                      >
                        <Text style={styles.buttonText}>Take Photo</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleImageSelection(true)}
                      >
                        <Text style={styles.buttonText}>
                          Choose From Library
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handleCloseModal}
                      >
                        <Text style={styles.buttonText}>Cancel</Text>
                      </TouchableOpacity>
                    </BottomSheetModal>
                  </View>
                )}
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="white"
                  style={styles.textInput}
                  secureTextEntry={true}
                  value={password}
                  autoCapitalize="none"
                  onChangeText={(text) => setPassword(text)}
                />
              </ScrollView>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <>
                  <Pressable onPress={handlePress}>
                    <Animated.View
                      style={[styles.formButton, formButtonAnimatedStyle]}
                    >
                      <Text style={styles.buttonText}>
                        {isRegistering ? "REGISTER" : "LOG IN"}
                      </Text>
                    </Animated.View>
                  </Pressable>
                </>
              )}
            </Animated.View>
          </View>
        </Animated.View>
      </BottomSheetModalProvider>
    </KeyboardAvoidingView>
  );
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "black",
  },
  button: {
    backgroundColor: "black",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.5,
  },
  bottomContainer: {
    marginBottom: 25,
    justifyContent: "center",
    height: height / 3,
    zIndex: 1,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    color: "white",
    borderColor: "white",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
  },
  formButton: {
    backgroundColor: "black",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    justifyContent: "center",
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 20,
    top: -20,
  },
});
