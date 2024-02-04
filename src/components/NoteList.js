import React, {useState, useEffect} from 'react';
import { Text, View, Button, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';

import { Note } from '../models';
import { styles } from '../../App';
import AddNote from './AddNote';
import ViewNote from './ViewNote';


/**
 * The overall note page that displays a list of all existing notes
 */
export default function NoteList() {
    const [notes, setNotes] = useState([]);
  const [isAddingNote, setAddVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [isViewingNote, setViewVisible] = useState(false);

  useEffect(() => {
    fetchNotes();
    const subscription = DataStore.observe(Note).subscribe(() => fetchNotes())
    return () => subscription.unsubscribe()
  })

  const fetchNotes = async () => {
    const notes = await DataStore.query(Note);
    setNotes(notes);
  };

  const openAddNote = () => {
    setAddVisible(true);
  }

  const closeAddNote = () => {
    setAddVisible(false);
  }

  const openViewNote = () => {
    setViewVisible(true);
  }

  const closeViewNote = () => {
    setViewVisible(false);
  }

  const handleViewNote = (note) => {
    setCurrentNote(note);
    openViewNote();
  }

  return (
    <View
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.container}
      > 
        {notes.map((note) => ( 
            <TouchableOpacity 
              style={styles.noteButton}
              key={note.id} 
              onPress={() => handleViewNote(note)} 
            >   
              <Text>{note.name}</Text>
            </TouchableOpacity> 
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

        <Modal
          visible={isViewingNote} 
        >
          <ViewNote 
            note = {currentNote}
            closeViewNote = {closeViewNote}
          >
          </ViewNote>
        </Modal>
      </ScrollView>

    </View>
  )
}