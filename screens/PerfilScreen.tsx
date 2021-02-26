import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageBackground } from "react-native";

export default function Perfil() {
  return (
    <View style={styles.ScrollView}>
      <ImageBackground
        source={require("../assets/images/splash.png")}
        style={styles.image}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity style={styles.btnDetalhes} onPress={() => {}}>
            <Text style={styles.txtBtn}>Configuração</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnDetalhes} onPress={() => {}}>
            <Text style={styles.txtBtn}>Pomoçao</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnDetalhes} onPress={() => {}}>
            <Text style={styles.txtBtn}>Fotos</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  btnDetalhes: {
    backgroundColor: "#303f9f",
    padding: 10,
    margin: 5,
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
  },
  txtBtn: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  image: { flex: 1 },
});
