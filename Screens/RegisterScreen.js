import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Button, StyleSheet, Alert } from 'react-native';
import { View, KeyboardAvoidingView } from 'react-native';
import { Input, Text } from 'react-native-elements';
import { auth } from '../firebase';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('Home');
      }
    });
    return unsubscribe;
  }, []);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Whatsapp Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autofocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
          style={{outlineStyle:"none"}}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{outlineStyle:"none"}}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={{outlineStyle:"none"}}
        />
        <Input
          placeholder="Image (optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
          style={{outlineStyle:"none"}}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        onPress={register}
        title="Register"
      />
    </KeyboardAvoidingView>
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
