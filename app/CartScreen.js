import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = ({ navigation }) => {
  const [tempData, setTempData] = useState();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("data");
      if (value !== null) {
        const restoredArray = JSON.parse(value);
        console.log(restoredArray);
        setTempData(restoredArray);
      }
    } catch (e) {
      // error reading value
    }
  };

  const [cartItemsLoaded, setCartItemsLoaded] = useState(false);
  const selectHandler = (index, value) => {
    const newItems = [...tempData]; // clone the array
    newItems[index]["checked"] = value == 1 ? 0 : 1; // set the new value
    setTempData(newItems); // set new state
  };

  const deleteHandler = (index) => {
    Alert.alert(
      "Are you sure you want to delete this item from your cart?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            let updatedCart = tempData; /* Clone it first */
            updatedCart.splice(
              index,
              1
            ); /* Remove item from the cloned cart state */
            setTempData(updatedCart); /* Update the state */
          },
        },
      ],
      { cancelable: false }
    );
  };

  const quantityHandler = (action, index) => {
    const newItems = [...tempData]; // clone the array

    let currentQty = newItems[index]["qty"];

    if (action == "more") {
      newItems[index]["qty"] = currentQty + 1;
    } else if (action == "less") {
      newItems[index]["qty"] = currentQty > 1 ? currentQty - 1 : 1;
    }

    console.log(newItems);
    setTempData(newItems); // set new state
  };

  const subtotalPrice = () => {
    if (tempData) {
      return tempData.reduce(
        (sum, item) =>
          sum + (item.checked == 1 ? item.qty * item.salePrice : 0),
        0
      );
    }
    return 0;
  };

  const styles = StyleSheet.create({
    centerElement: { justifyContent: "center", alignItems: "center" },
  });

  const onPlaceOrder = async () => {
    try {
      const jsonValue = JSON.stringify({});

      await AsyncStorage.setItem("data", jsonValue);
    } catch (e) {
      // saving error
    }

    try {
      const jsonValue = JSON.stringify(tempData);

      await AsyncStorage.setItem("placed", jsonValue);

      navigation.navigate("Orders");
    } catch (e) {
      // saving error
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          marginBottom: 10,
        }}
      >
        <View style={[styles.centerElement, { width: 50, height: 50 }]}>
          <Ionicons name="ios-cart" size={25} color="#000" />
        </View>
        <View style={[styles.centerElement, { height: 50 }]}>
          <Text style={{ fontSize: 18, color: "#000" }}>Shopping Cart</Text>
        </View>
      </View>

      {cartItemsLoaded ? (
        <View style={[styles.centerElement, { height: 300 }]}>
          <ActivityIndicator size="large" color="#ef5739" />
        </View>
      ) : (
        <ScrollView>
          {tempData &&
            tempData.map((item, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  marginBottom: 2,
                  height: 120,
                }}
              >
                <View style={[styles.centerElement, { width: 60 }]}>
                  <TouchableOpacity
                    style={[styles.centerElement, { width: 32, height: 32 }]}
                    onPress={() => selectHandler(i, item.checked)}
                  >
                    <Ionicons
                      name={
                        item.checked == 1
                          ? "ios-checkmark-circle"
                          : "ios-checkmark-circle-outline"
                      }
                      size={25}
                      color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexGrow: 1,
                    flexShrink: 1,
                    alignSelf: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      /*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/
                    }}
                    style={{ paddingRight: 10 }}
                  >
                    <Image
                      source={{ uri: item.thumbnailImage }}
                      style={[
                        styles.centerElement,
                        { height: 60, width: 60, backgroundColor: "#eeeeee" },
                      ]}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexGrow: 1,
                      flexShrink: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text numberOfLines={1} style={{ fontSize: 15 }}>
                      {item.name}
                    </Text>
                    <Text numberOfLines={1} style={{ color: "#8f8f8f" }}>
                      {item.color ? "Variation: " + item.color : ""}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{ color: "#333333", marginBottom: 10 }}
                    >
                      ${item.qty * item.salePrice}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => quantityHandler("less", i)}
                        style={{ borderWidth: 1, borderColor: "#cccccc" }}
                      >
                        <MaterialIcons
                          name="remove"
                          size={22}
                          color="#cccccc"
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderColor: "#cccccc",
                          paddingHorizontal: 7,
                          paddingTop: 3,
                          color: "#bbbbbb",
                          fontSize: 13,
                        }}
                      >
                        {item.qty}
                      </Text>
                      <TouchableOpacity
                        onPress={() => quantityHandler("more", i)}
                        style={{ borderWidth: 1, borderColor: "#cccccc" }}
                      >
                        <MaterialIcons name="add" size={22} color="#cccccc" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={[styles.centerElement, { width: 60 }]}>
                  <TouchableOpacity
                    style={[styles.centerElement, { width: 32, height: 32 }]}
                    onPress={() => deleteHandler(i)}
                  >
                    <Ionicons name="md-trash" size={25} color="#ee4d2d" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
      )}

      {!cartItemsLoaded && (
        <View
          style={{
            backgroundColor: "#fff",
            borderTopWidth: 2,
            borderColor: "#f6f6f6",
            paddingVertical: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                flexGrow: 1,
                flexShrink: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingRight: 20,
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text style={{ color: "#8f8f8f", marginLeft: 20 }}>
                  SubTotal:{" "}
                </Text>
                <Text>${subtotalPrice().toFixed(2)}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              height: 32,
              paddingRight: 20,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={[
                styles.centerElement,
                {
                  backgroundColor: "#0faf9a",
                  width: 100,
                  height: 40,
                  borderRadius: 5,
                  marginTop: -20,
                },
              ]}
              onPress={onPlaceOrder}
            >
              <Text style={{ color: "#ffffff" }}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
