import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import Svg, { Image} from 'react-native-svg';


const {height, width} = Dimensions.get('window');

function StartScreen () {
    return (
        <View style={styles.container}>
        <View style={StyleSheet.absoluteFill}>
        <Svg height={height} width={width}>
            <Image href={require('../assets/bildfyra.jpg')} width={width} height={height} preserveAspectRatio="xMidYMid slice"/>
            </Svg>
            <View style={styles.closeButtonContainer}>
                <Text>X</Text>
            </View>
        </View>
          <View style={styles.bottomContainer}>
            <View style={styles.button} >
              <Text style={styles.buttonText}>LOG IN</Text>
            </View>
            <View style={styles.button} >
              <Text style={styles.buttonText}>REGISTER</Text>
            </View>
            {/* <View style={styles.formInputContainer}>
                <TextInput placeholder='Email' placeholderTextColor="black" style={styles.textInput} />
                <TextInput placeholder='First Name' placeholderTextColor="black" style={styles.textInput}/>
                <TextInput placeholder='Last Name' placeholderTextColor="black" style={styles.textInput}/>
                <TextInput placeholder='Password' placeholderTextColor="black" style={styles.textInput}/>
                <View style={styles.formButton}>
                    <Text style={styles.buttonText}>LOG IN</Text>
                </View>
            </View> */}
          </View>
        </View>
    )
}

export default StartScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end'
    },
    button:{
      backgroundColor: "black",
      height: 55,
      alignItems: 'center',
      justifyContent:'center',
      borderRadius: 35,
      marginHorizontal: 20,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: 'white'
    },
    buttonText:{
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.5
    },
    bottomContainer: {
        justifyContent: 'center',
        height: height / 3,
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 25,
        paddingLeft: 10
    },
    formButton:{
        backgroundColor: "black",
        height: 55,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    formInputContainer:{
        marginBottom: 70,
    },
    closeButtonContainer:{
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 20
    }
  });
  