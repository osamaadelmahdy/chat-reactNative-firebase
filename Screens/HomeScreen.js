import React, { useLayoutEffect, useEffect, useState } from 'react';
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
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { auth, db } from '../firebase';

export default function Home({ navigation }) {
  const [chats, setChats] = useState([]);
  const [chatMessages, setChatMessages] = useState('');

;

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot((snapshot) => {
      console.log(snapshot.doc);
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Messanger',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
      },
      headerTitleStyle: { color: 'black', fontWeight: 'bold', fontSize: 25 },
      headerTintColor: 'black',
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20,
          }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddChat')}
            activeOpacity={0.5}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  });

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    });
  };

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <>
          
            <ListItem
              key={id}
              onPress={() => enterChat(id, chatName)}
              buttomDivider>
              <Avatar
                rounded
                source={{
                  uri:
                    'https://png.pngtree.com/element_our/png_detail/20181229/vector-chat-icon-png_302635.jpg',
                }}
              />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '800' }}>
                  {chatName}
                </ListItem.Title>
                
              </ListItem.Content>
            </ListItem>
          </>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
