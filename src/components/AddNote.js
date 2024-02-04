import React, {useState} from 'react';
import { Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';

import { Note } from '../models';
import { styles } from '../styles';

/**
 * The modal page to add a new note. Title of note must not be empty
 * 
 * @param {function} closeAddNote function to close the current modal 
 */
export default function AddNote(props) {
    const [inputTitle, setInputTitle] = useState("");
    const [inputNote, setInputNote] = useState("");
  
    const handleSave = async () => {
      if(inputTitle) {
        const note = await DataStore.save(new Note({name: inputTitle, content: inputNote}));
        console.log('successfully saved note')
      }
      props.closeAddNote();
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
            onChangeText={setInputTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="type notes"
            onChangeText={setInputNote}
            multiline={true}
          />
        </TouchableOpacity>
  
        <Button
          onPress={handleSave}
          title='Save Note'
        />
        
      </View>
    );
  }