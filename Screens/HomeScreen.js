import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { doc, collection, setDoc, deleteDoc } from "firebase/firestore";
import { MuscleMagicAuth, MuscleMagicDb } from "../Database/FireBaseConfig";
import { fetchCurrentUser } from "../Components/FetchUserData";
import LoadingScreen from "../Components/LoadingComponent";
function HomeScreen() {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["50%"];
  const [name, setName] = useState("");
  const { user, workouts, workoutPosts, loading, error } = fetchCurrentUser();
  const currentUser = MuscleMagicAuth.currentUser;
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
  const date = new Date(Date.now());
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [{ value: month }, , { value: day }, , { value: year }] =
    formatter.formatToParts(date);
  const formattedDate = `${year}-${month}-${day}`;
  const updatedData = {
    name: name,
    date: formattedDate,
  };

  const userRef = doc(db, "users", currentUser.uid);

  const workoutPostsCollectionRef = collection(userRef, "workoutPosts");
  const saveWorkoutPost = () => {
    setDoc(doc(workoutPostsCollectionRef), updatedData)
      .then(() => {
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error adding workout plan:", error);
      });
  };
  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    return alert("Error fetching data " + error);
  }

  async function deleteWorkoutPost(workoutId) {
    try {
      const workoutPostsCollectionRef = collection(
        db,
        "users",
        currentUser.uid,
        "workoutPosts"
      );
      const workoutPostRef = doc(workoutPostsCollectionRef, workoutId);
      await deleteDoc(workoutPostRef);
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  }
  function handleDeleteWorkoutPost(workoutPostId) {
    deleteWorkoutPost(workoutPostId);
  }
  const areYouSurePrompt = (workoutPostId) =>
    Alert.alert(
      "Are you sure you want to delete this post?",
      "This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => handleDeleteWorkoutPost(workoutPostId) },
      ]
    );
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <LinearGradient
          style={styles.background}
          colors={["#0F0264", "#0F3362", "#030D01"]}
        />
        <TouchableOpacity onPress={handlePresentModal}>
          <Text
            style={{
              fontSize: 40,
              textAlign: "center",
              color: "white",
              paddingBottom: 7,
              marginTop: 50,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "white" }}>Add workout Post</Text>
        {workoutPosts.map((workoutPost) => (
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              marginBottom: 7,
              width: "100%",
              paddingHorizontal: 30,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            key={workoutPost.id}
          >
            <Text style={{ marginBottom: 10, fontSize: 20, color: "#C5C5CD" }}>
              {workoutPost.name}
            </Text>
            <Text style={{ marginBottom: 10, fontSize: 20, color: "#C5C5CD" }}>
              {workoutPost.date}
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => areYouSurePrompt(workoutPost.id)}
              >
                <Text style={{ color: "red", fontSize: 20 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
        >
          <View style={styles.ModalContainer}>
            <Text>How did your workout feel?</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setName(text)}
            ></TextInput>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={saveWorkoutPost}
            >
              <Text
                style={{
                  color: "red",
                  fontSize: 17,
                  marginBottom: 20,
                  marginTop: 10,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={handleCloseModal}
            >
              <Text style={{ color: "red", fontSize: 17 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  background: {
    ...StyleSheet.absoluteFill,
  },
  textInput: {
    width: 350,
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  ModalContainer: {
    alignItems: "center",
  },
});
