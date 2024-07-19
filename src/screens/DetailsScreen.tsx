// screens/DetailsScreen.tsx
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useItem } from "../queries/useItem";

const DetailsScreen = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const { data, isLoading, error } = useItem(id);
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading item.</Text>;

  return (
    <ScrollView>
      <Text style={{color: '#000'}}>{data.title}</Text>
      <Text >{data.text}</Text>
      {data.kids?.map((commentId: number) => (
        <Comment key={commentId} id={commentId} />
      ))}
    </ScrollView>
  );
};

const Comment = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useItem(id);

  if (isLoading) return <Text>Loading comment...</Text>;
  if (error) return <Text>Error loading comment.</Text>;

  return (
    <View>
      <Text>{data.text}</Text>
    </View>
  );
};

export default DetailsScreen;
