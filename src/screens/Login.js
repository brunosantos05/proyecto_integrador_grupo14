import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMensaje: '',
    };
  }


  onSubmit() {
    const { email, password } = this.state;


    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        
        this.props.navigation.navigate('Main');
      })
      .catch(error => {
        
        this.setState({ errorMensaje: error.message });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>

        <TextInput
          style={styles.field}
          placeholder='Email'
          keyboardType='email-address'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
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
          <Text style={styles.buttonText}>Ingresar</Text>
        </Pressable>

        <Pressable onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
        </Pressable>
      </View>
    );
  }

}


export default Login;

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
    marginVertical: 5,
  },
});