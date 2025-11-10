import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      error: '',
    };
  }

  onSubmit() {
    const { description } = this.state;
    const email = auth.currentUser ? auth.currentUser.email : null;

    if (description === '') {
      this.setState({ error: 'El campo no puede estar vacío.' });
      return;
    }

    db.collection('posts')
      .add({
        owner: email,
        description: description,
        createdAt: Date.now(),
        likes: [], 
      })
      .then(() => {
        console.log('Posteo creado correctamente');
        this.setState({ description: '', error: '' });
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log('Error al crear el post:', error);
        this.setState({ error: 'Hubo un problema al crear el post.' });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo Post</Text>

        <TextInput
          style={styles.input}
          placeholder="Postea lo que quieras bro..."
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.description}
          multiline={true}
        />

        {this.state.error !== '' ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}

        <Pressable style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>Publicar</Text>
        </Pressable>
      </View>
    );
  }
}

export default NewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});