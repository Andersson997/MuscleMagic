import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { decode } from "html-entities";
function ExerciseSearchScreen() {
  const [triviaList, setTriviaList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://wger.de/api/v2/exercise/?language=2&limit=397")
      .then((response) => response.json())
      .then((data) => {
        const initialVisibleAnswers = {};
        data.results.forEach((_, index) => {
          initialVisibleAnswers[index] = false;
        });
        setTriviaList(data.results);
        setVisibleAnswers(initialVisibleAnswers);
      });
  }, []);

  const handleToggleAnswer = (index) => {
    setVisibleAnswers((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const filteredTriviaList = triviaList.filter((trivia) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      trivia.name.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search exercises"
        placeholderTextColor="black"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Text style={styles.headerText}>
        Click an exercise for more information
      </Text>
      <ScrollView>
        {filteredTriviaList.map(
          (trivia, index) => (
            (trivia.description = trivia.description
              .replace("<p>", "")
              .replace("</p>", "")
              .replace("<ol>", "")
              .replace("</ol>", "")
              .replace("<li>", "")
              .replace("</li>", "")),
            (
              <Pressable onPress={() => handleToggleAnswer(index)} key={index}>
                <View key={index}>
                  <View style={styles.questions}>
                    <Text style={styles.text}>Exercise</Text>
                    <Text style={styles.text}>{trivia.name}</Text>
                    {visibleAnswers[index] && (
                      <View>
                        <Text style={styles.text}>Description</Text>
                        <Text style={styles.text}>
                          {decode(trivia.description, { level: "all" })}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </Pressable>
            )
          )
        )}
      </ScrollView>
    </View>
  );
}

export default ExerciseSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  headerText: {
    marginBottom: 15,
    fontSize: 17,
  },
  text: {
    color: "white",
    fontSize: 20,
    lineHeight: 35,
    fontWeight: "bold",
    textAlign: "left",
  },
  questions: {
    flex: 1,
    backgroundColor: "teal",
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    overflow: "hidden",
    width: 365
  },
  input: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
    textAlign: "center",
    fontSize: 17,
  },
});
