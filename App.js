import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addNote = () => {
    if (noteText.trim()) {
      setNotes([...notes, { id: Date.now().toString(), text: noteText }]);
      setNoteText('');
    }
  };

  const editNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setNoteText(noteToEdit.text);
    setEditingId(id);
  };

  const saveEdit = () => {
    setNotes(
      notes.map((note) =>
        note.id === editingId ? { ...note, text: noteText } : note
      )
    );
    setNoteText('');
    setEditingId(null);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Note Keeper</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter your note here'
        value={noteText}
        onChangeText={setNoteText}
      />
      {editingId ? (
        <Button title='Save Note' onPress={saveEdit} />
      ) : (
        <Button title='Add Note' onPress={addNote} />
      )}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{item.text}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editNote(item.id)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteNote(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noteText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
    fontWeight: 'bold',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});
