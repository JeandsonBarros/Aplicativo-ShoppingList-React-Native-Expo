import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import styles from './Styles';
import { setItem } from './shared/service/ItemService';

export default function AddItem({ route, navigation }) {

  //Chave da lista recebida por props de navegação
  const { keylist } = route.params;

  //Nome do item
  const [name, setName] = useState("");

  //Adiciona item a lista
  function pushFire() {
    try {

      //Novo item
      let item = {
        name: name,
        marked: "n",
        val: "",
        quantity: "1"
      };

      //Salva item
      setItem(keylist, item).then(() => {
        setName("");
        navigation.navigate("ListItems", { keylist: keylist });
      })

    } catch (error) {
      alert("Erro ao adicionar")
    }

  }


  return (
    <View style={styles.container}>

      <View style={{ paddingTop: 15, margin: 10 }}>

        <View>
          <Text style={styles.rotuloEntrada}>Nome do item:</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Nome do item aqui"
            onChangeText={setName}

          />
        </View>

        <View style={styles.botoesViewEntrada}>

          <TouchableOpacity
            style={{ backgroundColor: "#F67C7C", borderRadius: 8 }}
            onPress={() => navigation.navigate("ListItems", { keylist: keylist })}
          >
            <Text style={styles.textoBotao}> Cancelar </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: "#0CB2B2", marginLeft: 15, borderRadius: 8 }}
            onPress={pushFire}
          >
            <Text style={styles.textoBotao}> Adicionar </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

