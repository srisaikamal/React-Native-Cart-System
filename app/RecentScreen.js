import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { data } from "./Data";
import { Chip } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecentScreen = () => {
  useEffect(() => {
    getData();
  }, []);

  const [placedData, setPlacedData] = useState();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("placed");
      if (value !== null) {
        const restoredArray = JSON.parse(value);
        // value previously stored
        setPlacedData(restoredArray);
      }
    } catch (e) {
      console.error(e);
      // error reading value
    }
  };

  const RenderedCard = ({ title, image, category, price, id }) => {
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
            width: "100%",
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
              <Chip
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#2ecc7185",
                  borderColor: "#27ae60",
                  borderWidth: 2,
                }}
              >
                <Text
                  style={{ color: "#27ae60", fontWeight: "bold", fontSize: 18 }}
                >
                  SUCCESS
                </Text>
              </Chip>
            </Card.Content>
          </View>
        </Card>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <FlatList
        data={placedData}
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
    </View>
  );
};

export default RecentScreen;
