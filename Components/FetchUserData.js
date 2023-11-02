import React, { useState, useEffect } from "react";
import { MuscleMagicAuth, MuscleMagicDb } from "../Database/FireBaseConfig";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import LoadingScreen from "../Components/LoadingComponent";

export const fetchCurrentUser = () => {
  const [userState, setUserState] = useState({
    user: null,
    workouts: [],
    workoutPosts: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = MuscleMagicDb;
        const user = MuscleMagicAuth.currentUser;
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const workoutsCollectionRef = collection(
            db,
            "users",
            user.uid,
            "workouts"
          );
          const workoutPostsCollectionRef = collection(
            db,
            "users",
            user.uid,
            "workoutPosts"
          );

          const unsubscribeUser = onSnapshot(userDocRef, (userDocSnapshot) => {
            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();

              const unsubscribeWorkouts = onSnapshot(
                workoutsCollectionRef,
                (workoutsQuerySnapshot) => {
                  const workouts = workoutsQuerySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                  });
                  const unsubscribeWorkoutPosts = onSnapshot(
                    workoutPostsCollectionRef,
                    (workoutPostsQuerySnapshot) => {
                      const workoutPosts = workoutPostsQuerySnapshot.docs.map((doc) => {
                        return { id: doc.id, ...doc.data() };
                      });
                  
                  setUserState({
                    user: userData,
                    workouts: workouts,
                    workoutPosts: workoutPosts,
                    loading: false,
                    error: null,
                  });
                }
              );
              // Unsubscribe from workouts listener when component unmounts
              return () => unsubscribeWorkoutPosts();
                }
              );
              return () => unsubscribeWorkouts()
            } else {
              setUserState({
                user: null,
                workouts: [],
                workoutPosts: [],
                loading: false,
                error: "User document does not exist.",
              });
            }
          });
          // Unsubscribe from user listener when component unmounts
          return () => unsubscribeUser();
        } else {
          setUserState({
            user: null,
            workouts: [],
            workoutPosts: [],
            loading: false,
            error: "User not authenticated.",
          });
        }
      } catch (error) {
        setUserState({
          user: null,
          workouts: [],
          workoutPosts: [],
          loading: false,
          error: `Error fetching user data: ${error.message}`,
        });
      }
    };

    fetchData();

    // Clean up any subscriptions when the component unmounts
    return () => {};
  }, []);

  return userState;
};
