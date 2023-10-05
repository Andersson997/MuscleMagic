import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView} from 'react-native';
import React, { useState } from 'react';
import { MuscleMagicAuth } from '../Database/FireBaseConfig';
import { async } from '@firebase/util';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = MuscleMagicAuth;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        }finally{
            setLoading(false);
        }
    }
    const signUp= async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your email!');
        } catch (error) {
            console.log(error);
            alert('Sign up failed: ' + error.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            

            <TextInput value={email} style={styles.container} placeholder="email" autoCapitalize='none' onChangeText={(text) => setEmail(text)} />
            <TextInput secureTextEntry={true} value={password} style={styles.container} placeholder="password" autoCapitalize='none' onChangeText={(text) => setPassword(text)} />
            {loading ? <ActivityIndicator size="large" color="#0000ff"/>
            :<>
            <Button title='Login' onPress={signIn}/>
            <Button title='Register' onPress={signUp}/>
            </>
            }
            
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center",
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0",
    },
  });