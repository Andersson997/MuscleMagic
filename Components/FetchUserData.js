import React, { useState, useEffect } from "react";
import { MuscleMagicAuth, MuscleMagicDb } from "../Database/FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";
import LoadingScreen from "../Components/LoadingComponent";

export const fetchCurrentUser = async () => {
    try {
        const db = MuscleMagicDb; 
      const user = MuscleMagicAuth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          return userDocSnapshot.data();
        } else {
          console.log("User document does not exist.");
          return null;
        }
      } else {
        console.log("User not authenticated.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

