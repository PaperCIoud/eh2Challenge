import React from 'react';
import { Text, View, Button,} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';

import { Note } from '../models';
import { styles } from '../../App';

/**
 * The modal page that displays the contents of selected note
 * 
 * @param {function} closeViewNote function to close current modal page
 * @param {object} note the note object to be displayed
 */
export default function ViewNote(props) {
    
    return(
      <View style={styles.container}> 
        <Text>{props.note.name}</Text>
        <Text>{props.note.content}</Text>
        <Button
          style={styles.buttons}
          onPress={props.closeViewNote}
          title='back'
        />
      </View>
    )
  }