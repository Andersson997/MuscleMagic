import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { MuscleMagicAuth } from "../Database/FireBaseConfig";
import { async } from "@firebase/util";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
 initializeAuth
} from "firebase/auth";


const { height, width } = Dimensions.get("window");

function StartScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = MuscleMagicAuth;

  

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
      );
      console.log(response);
      alert("Check your email!");
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
    <KeyboardAvoidingView style={{ flex: 1 }}  behavior={Platform.OS === "ios" ? "padding" : "undefined"}>
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
            <Animated.View style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
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
          <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="white"
              style={styles.textInput}
              value={email}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
            {isRegistering && (
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="white"
                style={styles.textInput}
              />
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

    justifyContent: "center",
    height: height / 3,
    zIndex: 1
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
    marginBottom: 70,
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
