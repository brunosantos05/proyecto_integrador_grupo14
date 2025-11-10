import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { db, auth } from "../firebase/config";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      comments: [],
      newComment: "",
    };
  }

  componentDidMount() {
    const postId = this.props.route.params.postId;

    db.collection("posts")
      .doc(postId)
      .onSnapshot((doc) => {
        this.setState({ post: { id: doc.id, data: doc.data() } });
      });

    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let arr = [];
        docs.forEach((doc) => arr.push(doc.data()));
        this.setState({ comments: arr });
      });
  }

  onSubmit() {
    const postId = this.props.route.params.postId;
    const comment = {
      owner: auth.currentUser.email,
      text: this.state.newComment,
      createdAt: Date.now(),
    };

    db.collection("posts").doc(postId).collection("comments").add(comment);
    this.setState({ newComment: "" });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.post ? (
          <View style={styles.postBox}>
            <Text style={styles.owner}>{this.state.post.data.owner}</Text>
            <Text style={styles.description}>{this.state.post.data.description}</Text>
            <Text style={styles.likes}>Likes: {this.state.post.data.likes.length}</Text>
          </View>
        ) : null}

        <Text style={styles.title}>Comentarios</Text>

        <FlatList
          data={this.state.comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentBox}>
              <Text style={styles.commentOwner}>{item.owner}</Text>
              <Text>{item.text}</Text>
            </View>
          )}
        />

        <TextInput
          style={styles.input}
          placeholder="Escribí un comentario..."
          onChangeText={(text) => this.setState({ newComment: text })}
          value={this.state.newComment}
        />
        <Pressable style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>Publicar comentario</Text>
        </Pressable>
      </View>
    );
  }
}

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  postBox: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  owner: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  likes: {
    fontSize: 12,
    color: "gray",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  commentBox: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    paddingVertical: 5,
  },
  commentOwner: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
    marginTop: 15,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});