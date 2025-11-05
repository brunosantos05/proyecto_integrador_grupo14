import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      password: '',
      errorMensaje: '',
    };
  }

  onSubmit() {
    const { email, password, userName } = this.state;

   
   auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection('users')
          .add({
            email: email,
            userName: userName,
            createdAt: Date.now(),
          })
          .then(() => {
            this.props.navigation.navigate('Login');
            auth.signOut();

          });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear cuenta</Text>

        <TextInput
          style={styles.field}
          placeholder='Email'
          keyboardType='email-address'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.field}
          placeholder='Nombre de usuario'
          onChangeText={text => this.setState({ userName: text })}
          value={this.state.userName}
        />

        <TextInput
          style={styles.field}
          placeholder='Contraseña'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />

    
        {this.state.errorMensaje !== '' ? (
          <Text style={styles.error}>{this.state.errorMensaje}</Text>
        ) : null}

        <Pressable style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>Registrarme</Text>
        </Pressable>

        <Pressable onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.link}>¿Ya tenés cuenta? Iniciá sesión</Text>
        </Pressable>
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  field: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1976D2',
    padding: 10,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#1976D2',
    marginTop: 15,
  },
  error: {
    color: 'red',
    marginVertical: 5,
  },
});
