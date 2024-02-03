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

  useEffect(() => {
    fetchNote();
    const subscription = DataStore.observe(Note).subscribe(() => fetchNote())
    return () => subscription.unsubscribe()
  })

  const handleSave = async () => {
    if(inputTitle) {
      await DataStore.save(new Note({name: inputTitle, content: inputNote}));
      console.log('successfully saved note')
    }
  };

  const fetchNote = async () => {
    console.log("Begin query");
    const note = await DataStore.query(Note, '9c088fe6-8d1b-47db-94b4-b50c7588bf94');
    setInputTitle(note.name);
    setInputNote(note.content);
  };


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

      <Button
        onPress={handleSave}
        title='Save Note'
      />
      
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
