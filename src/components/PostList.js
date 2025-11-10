import React from 'react';
import { View, FlatList } from 'react-native';
import Post from './Post';

export default function PostList(props) {
  return (
    <View style={{ width: '100%' }}>
      <FlatList
        data={props.posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post
            id={item.id}
            data={item.data}
            navigation={props.navigation}
          />
        )}
      />
    </View>
  );
}