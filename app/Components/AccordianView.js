import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import { Button } from "react-native-paper";

const AccordianView = ({ title, items }) => {
  const CounterButton = ({ id }) => {
    const [counter, setCounter] = useState(0);

    return (
      <View>
        {counter === 0 ? (
          <TouchableOpacity
            style={{
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "#f39c12",
              marginLeft: 50,
              height: 35,
              width: 60,
            }}
            onPress={() => {
              setCounter(counter + 1);
            }}
          >
            <Text
              style={{ color: "#f39c12", textAlign: "center", marginTop: 5 }}
            >
              Add
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "#f39c12",
                height: 35,
                width: 60,
              }}
              onPress={() => {
                setCounter(counter - 1);
              }}
            >
              <Text
                style={{ color: "#f39c12", textAlign: "center", marginTop: 5 }}
              >
                -
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, marginHorizontal: 5 }}>{counter}</Text>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "#f39c12",
                height: 35,
                width: 60,
              }}
              onPress={() => {
                setCounter(counter + 1);
              }}
            >
              <Text
                style={{ color: "#f39c12", textAlign: "center", marginTop: 5 }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <List.AccordionGroup>
        <List.Accordion
          title={title}
          id="1"
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "black",
          }}
          left={(props) => (
            <Text
              {...props}
              style={{
                fontSize: 16,
                position: "absolute",
                right: 40,
                fontWeight: "bold",
              }}
            >
              {items.length}
            </Text>
          )}
        >
          {items.map((item, index) => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                width: "100%",
                marginVertical: 10,
              }}
            >
              <View style={{ width: "50%" }}>
                <Text style={{ fontWeight: 22, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text>$ {item.price}</Text>
              </View>
              <CounterButton key={item.id} id={item.id} />
            </View>
          ))}
        </List.Accordion>
      </List.AccordionGroup>
    </>
  );
};

export default AccordianView;
