// screens/HomeScreen.tsx
import React from "react";
import { FlatList, TouchableOpacity, Text, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { useStories } from "../queries/useStories";
import { useNavigation } from "@react-navigation/native";
import { useRefreshByUser } from "../hooks/useRefreshByUser";

const Item = styled(TouchableOpacity)`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const ItemTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

const HomeScreen = ({ type }: { type: string }) => {
  const navigation = useNavigation();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useStories(type);

  console.log('data',data?.pages.flat().length);
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const onListItemPress = React.useCallback(
    (id: any) => {
      navigation.navigate("Details", { id });
    },
    [navigation]
  );

  const renderItem = React.useCallback(
    ({ item }) => {
      return (
        <Item onPress={() => onListItemPress(item.id)}>
          <ItemTitle>{item.title}</ItemTitle>
        </Item>
      );
    },
    [onListItemPress]
  );

  return (
    <FlatList
      data={data?.pages.flat()}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? <Text>Loading more...</Text> : null
      }
    />
  );
};

export default HomeScreen;
