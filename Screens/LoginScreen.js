import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Input, Image, ButtonGroup } from 'react-native-elements';
import { auth } from '../firebase';
import { StatusBar } from "expo-status-bar";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('Home');
      }
    });
    return unsubscribe;
  }, []);

  const register = () => {
    navigation.navigate('register');
  };
  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password);
  };
  return (
    <View style={styles.container}>
    <StatusBar style="light" />
      <Image
        source={{
          uri:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/2048px-Facebook_Messenger_logo_2018.svg.png',
        }}
        style={{ width: 150, height: 150,marginBottom:50 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        style={{outlineStyle:"none"}}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
          style={{outlineStyle:"none"}}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        containerStyle={styles.button}
        type="Clear"
        onPress={register}
        title="Register"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
