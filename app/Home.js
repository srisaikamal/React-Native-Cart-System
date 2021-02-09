import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
} from "react-native-paper";
import { data } from "./Data";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const [disabledButton, setDisabledButton] = useState(0);

  let array = [];
  const RenderedCard = ({ title, image, category, price, id }) => {
    useEffect(() => {
      getData();
    }, []);
    const [addedToCard, setAddedToCard] = useState(false);
    const [asyncItems, setAsyncItems] = useState();
    const storeData = async (value) => {
      try {
        array.push(value);
        const jsonValue = JSON.stringify(array);

        await AsyncStorage.setItem("data", jsonValue);

        getData();
      } catch (e) {
        // saving error
      }
    };

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("data");
        if (value !== null) {
          const restoredArray = JSON.parse(value);

          // value previously stored
          console.log(restoredArray);
          setAsyncItems(restoredArray);
          restoredArray &&
            restoredArray.map((data) => {
              if (data.itemId === id.itemId) {
                setAddedToCard(true);
              }
            });
        }
      } catch (e) {
        // error reading value
      }
    };

    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            width: "90%",
            marginVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Card.Cover
              style={{ height: 125, width: 125, marginLeft: 20 }}
              source={{ uri: image }}
            />
            <Card.Content style={{ marginLeft: 20 }}>
              <Title style={{ fontSize: 15 }}>{title}</Title>
              <Paragraph>{category}</Paragraph>
              <Paragraph>$ {price}</Paragraph>
              <Button
                icon="cart"
                mode="contained"
                onPress={() => storeData(id)}
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
                disabled={addedToCard}
              >
                <Text style={{ fontSize: 10 }}>
                  {addedToCard ? "Added" : "Add to cart"}
                </Text>
              </Button>
            </Card.Content>
          </View>
        </Card>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item.itemId}
        renderItem={({ item }) => {
          return (
            <RenderedCard
              title={item.name}
              image={item.thumbnailImage}
              category={item.category}
              price={item.salePrice}
              id={item}
            />
          );
        }}
      />
      <Button
        mode="contained"
        style={{ height: 50 }}
        onPress={() => navigation.navigate("Cart")}
      >
        Proceed to cart
      </Button>
    </>
  );
};

export default Home;
