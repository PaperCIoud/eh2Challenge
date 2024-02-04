import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Keyboard, Text, View, TextInput, Button, TouchableOpacity, ScrollView, Modal } from 'react-native';

import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

import React, {useState, useEffect} from 'react';
import { DataStore } from '@aws-amplify/datastore';
import {Note} from './src/models';



export default function App() {
  const [notes, setNotes] = useState([]);
  const [isAddingNote, setAddNoteVis] = useState(false);

  useEffect(() => {
    fetchNotes();
    const subscription = DataStore.observe(Note).subscribe(() => fetchNotes())
    return () => subscription.unsubscribe()
  })

  const fetchNotes = async () => {
    //console.log("Begin query");
    const notes = await DataStore.query(Note);
    setNotes(notes);
  };

  const openAddNote = () => {
    setAddNoteVis(true);
  }

  const closeAddNote = () => {
    setAddNoteVis(false);
  }

  return (
    <View
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.container}
      > 
        {notes.map((note) => ( 
            <Button 
              style={styles.noteButton}
              key={note.id} 
              //onPress={() => handleViewNote()} 
              title={note.name}
            >   
            </Button> 
        ))} 
        <Button 
          style={styles.noteButton}
          onPress={() => openAddNote()} 
          title="Add Note"
        /> 

        <Modal
          visible={isAddingNote} 
        >
          <AddNote closeAddNote = {closeAddNote}></AddNote>
        </Modal>
      </ScrollView>

    </View>
  )
}






const AddNote = (props) => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputNote, setInputNote] = useState("");

  const handleSave = async () => {
    if(inputTitle) {
      const note = await DataStore.save(new Note({name: inputTitle, content: inputNote}));
      console.log('successfully saved note')
    }
    props.closeAddNote();
  };

  const handleUpdate = async () => {
    updateNote();
  }

  

  const updateNote = async () => {
    const currentNote = await DataStore.query(Note, "9c088fe6-8d1b-47db-94b4-b50c7588bf94");

    await DataStore.save(
      Note.copyOf(currentNote, newNote => {
        newNote.name = inputTitle;
        newNote.content = inputNote;
      })
    );
  }


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
          defaultValue={inputTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="type notes"
          onChangeText={setInputNote}
          defaultValue={inputNote}
          multiline={true}
        />
      </TouchableOpacity>

      <Button
        onPress={handleSave}
        title='Save Note'
      />
      <Button
        onPress={handleUpdate}
        title='update Note'
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
  },
  noteButton: {
    alignItems: "center", 
    justifyContent: "center", 
    color: "#007BFF", 
    paddingVertical: 12, 
    borderRadius: 5, 
    marginTop: 10,
  }
});
