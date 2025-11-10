import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      miLike: false,
    };
  }

  componentDidMount() {
    const email = auth.currentUser.email;
    const likes = this.props.data.likes;

    if (likes && likes.includes(email)) {
      this.setState({ miLike: true });
    }
  }

  actualizarLikes() {
    const email = auth.currentUser.email;

    db.collection("posts")
      .doc(this.props.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data.likes.includes(email)) {
            db.collection("posts")
              .doc(this.props.id)
              .update({
                likes: firebase.firestore.FieldValue.arrayRemove(email),
              })
              .then(() => {
                this.setState({ miLike: false });
              });
          } else {
            db.collection("posts")
              .doc(this.props.id)
              .update({
                likes: firebase.firestore.FieldValue.arrayUnion(email),
              })
              .then(() => {
                console.log("Se dio like");
                this.setState({ miLike: true });
              });
          }
        }
      })
      .catch((error) => (error));
  }

  render() {
    const { owner, description, likes } = this.props.data;
    const cantidadLikes = likes ? likes.length : 0;

    return (
      <View style={styles.card}>
        <Text style={styles.owner}>{owner}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.footer}>
          <Text style={styles.likes}>Likes: {cantidadLikes}</Text>

          <Pressable onPress={() => this.actualizarLikes()}>
            <Text style={this.state.miLike ? styles.liked : styles.likeButton}>
              {this.state.miLike ? "Ya no me gusta" : "Me gusta"}
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              this.props.navigation.navigate("Comments", {
                postId: this.props.id,
              })
            }
          >
            <Text style={styles.commentButton}>Comentar</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

export default Post;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "lightgray",
    marginVertical: 8,
    marginHorizontal: 10,
    padding: 10,
  },
  owner: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  likes: {
    fontSize: 12,
  },
  likeButton: {
    color: "blue",
    fontWeight: "bold",
  },
  liked: {
    color: "red",
    fontWeight: "bold",
  },
  commentButton: {
    color: "blue",
    fontWeight: "bold"
  },
});