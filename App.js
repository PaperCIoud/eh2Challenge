import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Keyboard, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

import React, {useState, useEffect} from 'react';
import { DataStore } from '@aws-amplify/datastore';
import {Note} from './src/models';


export default function App() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputNote, setInputNote] = useState("");



  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
        
      >
        <Text>Enter Notes</Text>
        <TextInput
          style={styles.input}
          placeholder="title"
          onChangeText={newText => setInputTitle(newText)}
          defaultValue={inputTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="type notes"
          onChangeText={newText => setInputNote(newText)}
          defaultValue={inputNote}
          multiline={true}
        />
      </TouchableOpacity>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  input: {
    borderWidth: 1,
    width: 350,
    marginBottom: 10
  }
});
