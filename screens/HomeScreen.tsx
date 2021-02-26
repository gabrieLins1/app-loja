import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { host } from "../config/settings";
import * as SQlite from "expo-sqlite";

import { ImageBackground } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const db = SQlite.openDatabase("appvenda.db");

const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Listar Produtos" component={ListarProdutos} />
      <Stack.Screen name="Detalhes Produto" component={DetalhesProduto} />
    </Stack.Navigator>
  );
}
// ------------------------------------- tela de lista de produtos--------------------------
function ListarProdutos({ navigation }: any) {
  const [carregando, setCarregando] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  React.useEffect(() => {
    fetch(`${host}/loja/service/produto/listartelainicial.php`)
      .then((response) => response.json())
      .then((produto) => setDados(produto.saida))
      .catch((error) => console.error(`error ao carregar a api ${error}`))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/splash.png")}
      style={styles.image}
    >
      <ScrollView style={styles.ScrollView} horizontal={true}>
        {carregando ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={dados}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.txt1}> {item.nomeproduto}</Text>
                <Text style={styles.txt1}>valor R$ {item.preco}</Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Detalhes Produto", {
                      id: `${item.idproduto}`,
                    });
                  }}
                  style={styles.btnDetalhes}
                >
                  <Text style={styles.txtBtnDetalhes}> ver mais </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={({ idproduto, index }) => idproduto}
          />
        )}
      </ScrollView>
    </ImageBackground>
  );
}

// ------------------------------------- tela de detalhes de produtos--------------------------
function DetalhesProduto({ route }: any) {
  const { id } = route.params;

  const [carregando, setCarregando] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  React.useEffect(() => {
    fetch(`${host}/loja/service/produto/detalheProduto.php?idproduto=${id}`)
      .then((response) => response.json())
      .then((produto) => setDados(produto.saida))
      .catch((error) => console.error(`error ao carregar a api ${error}`))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <ScrollView style={styles.ScrollView} horizontal={true}>
      {carregando ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dados}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: `${host}/loja/img/${item.foto1}` }}
                style={styles.foto}
              />
              <Image
                source={{ uri: `${host}/loja/img/${item.foto2}` }}
                style={styles.foto}
              />
              <Image
                source={{ uri: `${host}/loja/img/${item.foto3}` }}
                style={styles.foto}
              />
              <Image
                source={{ uri: `${host}/loja/img/${item.foto4}` }}
                style={styles.foto}
              />

              <Text>nome produto {item.nomeproduto}</Text>
              <Text>Descriçao: {item.descricao}</Text>
              <Text>preço R$ {item.preco}</Text>

              <TouchableOpacity
                onPress={() => {
                  db.transaction((tx) => {
                    tx.executeSql(
                      "create table if not exists carrinho(id integer primary key, idproduto int, nomeproduto text, preco text, foto text );"
                    );
                  });

                  db.transaction((ts) => {
                    ts.executeSql(
                      "insert indo carrinho(idproduto,nomeproduto,preco,foto)values(?,?,?,?)",
                      [item.idproduto, item.nomeproduto, item.preco, item.foto]
                    );
                  });

                  db.transaction((sl) => {
                    sl.executeSql(
                      "select * from carrinho",
                      [],
                      (_, { rows }) => {
                        console.log(JSON.stringify(rows));
                      }
                    );
                  });
                }}
                style={styles.btnDetalhes}
              >
                <Text> Adicionar ao carrinho</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={({ idproduto, index }) => idproduto}
        />
      )}
    </ScrollView>
  );
}

//----------------------------- css da tela --------------------
const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,

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
