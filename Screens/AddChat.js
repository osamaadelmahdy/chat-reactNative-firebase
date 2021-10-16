import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Input,
  Image,
  Text,
  Button,
  ListItem,
  Avatar,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../firebase';

export default function Home({ navigation }) {
  const [input, setInput] = useState();
  useEffect(() => {
    console.log(input);
  });

  const createChat = async () => {
    await db
      .collection('chats')
      .add({
        chatName: input,
      })
      .then(() => {
        console.log('done');
        navigation.goBack();
      })
      .catch((error) => console.log('catch'));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add Chat',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
      },
      headerTitleStyle: { color: 'black', fontWeight: 'bold', fontSize: 25 },
      headerTintColor: 'black',
    });
  });

  return (
    <SafeAreaView>
      <Input
        placeholder="Ender Chat Name "
        value={input}
        onChangeText={(val) => setInput(val)}
        leftIcon={
          <Icon name="ios-chatbubbles-outline" size={24} color="black" />
        }
        onSubmitEditing={createChat}
      />
      <Button
        disabled={!input}
        onPress={createChat}
        title="Create a New Chat"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
