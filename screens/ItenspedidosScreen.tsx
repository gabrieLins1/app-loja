import * as React from "react";
import { View, Text } from "react-native";
import { ImageBackground } from "react-native";
import { StyleSheet } from "react-native";

export default function Itenspedidos() {
  return (
    <View style={styles.ScrollView}>
      <ImageBackground
        source={require("../assets/images/splash.png")}
        style={styles.image}
      ></ImageBackground>
    </View>
  );
}
//----------------------------- css da tela --------------------
const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  btnDetalhes: {
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    width: 200,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
  },
  txtBtnDetalhes: {
    fontSize: 19,
    color: "black",
    textAlign: "center",
  },
  foto: {
    flex: 1,
    margin: 10,
    resizeMode: `cover`,
    width: "auto",
    borderRadius: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  txt1: {
    color: "white",

    fontSize: 20,
  },
});
