import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      userData: '',
      posts: [],
    };
  }

  componentDidMount() {
    const currentUser = auth.currentUser;
    this.setState({ user: currentUser });


    db.collection('users')
      .where('email', '==', currentUser.email)
      .onSnapshot((docs) => {
        let userInfo = null;
        docs.forEach((doc) => {
          userInfo = doc.data();
        });
        this.setState({ userData: userInfo });
      });


    db.collection('posts')
      .where('owner', '==', currentUser.email)
      .orderBy('createdAt', 'desc')
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ posts: posts });
      });
  }

  logout() {
    auth.signOut();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.user && this.state.userData ? (
          <>
            <Text style={styles.userName}>{this.state.userData.userName}</Text>
            <Text style={styles.email}>{this.state.user.email}</Text>
            <Text style={styles.subtitle}>Últimos posteos</Text>

            <FlatList
              data={this.state.posts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.post}>
                  <Text style={styles.postText}>{item.data.description}</Text>
                  <Pressable style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Eliminar</Text>
                  </Pressable>
                </View>
              )}
            />
          </>
        ) : (
          <Text>Cargando perfil...</Text>
        )}

        <Pressable style={styles.logoutButton} onPress={() => this.logout()}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  post: {
    borderWidth: 1,
    borderColor: 'lightpink',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    width: '90%',
    backgroundColor: 'mistyrose',
  },
  postText: {
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  deleteText: {
    color: 'white',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    width: '70%',
    alignItems: 'center',
    marginTop: 25,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});