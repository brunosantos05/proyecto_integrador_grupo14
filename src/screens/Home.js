import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import PostList from '../components/PostList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: posts,
          loading: false,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <PostList
            posts={this.state.posts}
            navigation={this.props.navigation}
          />
        )}
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 10,
  },
});