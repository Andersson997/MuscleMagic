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
import React, { useRef, useState } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

function EditProfileScreen() {
    
    
//     const renderInner = () => <Text>Hello</Text>;
    
//     const renderHeader = () => (
//         <View style={styles.header}>
//       <View style={styles.panelHeader}>
//         <View style={styles.panelHandle}></View>
//       </View>
//     </View>
//   );
  
//   const bs = useRef(null);
//   const fall = useState(new Animated.Value(1))[0];

  return (
    <View style={styles.container}>
      {/* <BottomSheet
          ref={bs}
          snapPoints={[330, -5]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
      /> */}
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={require("../assets/user-8.jpg")}
                style={{ height: 100, width: 100 }}
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
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            Jenny Doe
          </Text>
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            style={styles.textInput}
          ></TextInput>
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            style={styles.textInput}
          ></TextInput>
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" size={20} />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#666666"
            style={styles.textInput}
          ></TextInput>
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            style={styles.textInput}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => this.bs.current.snapTo(0)}
        >
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
