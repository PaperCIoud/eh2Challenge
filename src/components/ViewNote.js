import React from 'react';
import { Text, TextInput, View, Button,Keyboard, TouchableOpacity} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';

import { Note } from '../models';
import { styles } from '../styles';
import { useState, useEffect } from 'react';

/**
 * The modal page that displays the contents of selected note
 * 
 * @param {function} closeViewNote function to close current modal page
 * @param {object} note the note object to be displayed
 */
export default function ViewNote(props) {
    const [inputTitle, setInputTitle] = useState(props.note.name);
    const [inputNote, setInputNote] = useState(props.note.content);

    

    const handleUpdate = async() => {
        await DataStore.save(
            Note.copyOf(props.note, newNote => {
                newNote.name = inputTitle;
                newNote.content = inputNote;
            })
        );
    }
    
    return(
      <View style={styles.container}> 
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}
          
        >
          <Text>Edit Notes</Text>
          <TextInput
            style={styles.input}
            placeholder="title"
            onChangeText={setInputTitle}
            defaultValue={props.note.name}
          />
          <TextInput
            style={styles.input}
            placeholder="type notes"
            onChangeText={setInputNote}
            defaultValue={props.note.content}
            multiline={true}
          />
        </TouchableOpacity>
        
        <Button
          style={styles.buttons}
          onPress={handleUpdate}
          title='Update'
        />

        <Button
          style={styles.buttons}
          onPress={props.closeViewNote}
          title='Back'
        />
      </View>
    )
  }