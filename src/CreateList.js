import React, { useState } from 'react';
import { Text, TouchableOpacity, View , TextInput} from 'react-native';
import styles from './Styles';
import {setLists} from './shared/service/ListsService';


export default function CreateList({ navigation }) {

  //Pega a data do dia da criação da lista
  var date = new Date();

  // Data do dia da criação
  const [dateCreatd, setDateCreatd] = useState(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());

  //Nome da lista
  const [name, setName] = useState("");

  //Cria nova lista
  function pushFire() {
   
    if (name) {
      try {

        //Nova lista
        const value = {
          name: name,
          dateCreatd: dateCreatd,
          items: []
        }

        //Salva nova lista
        setLists(value).then(()=> navigation.navigate("Home", {list: value}))
           

      } catch (error) {
        alert("Erro ao criar lista")

      } finally {
        setName("");
        setDateCreatd("");

      }
    } else {
      alert("Nome Vazio")
    }

  }

  return (

    <View style={styles.container}>

      <View style={{ paddingTop: 15, margin: 10 }}>


        <TextInput
         
          placeholder="Nome da lista aqui"
          value={name}
          onChangeText={setName}
          style={{
            fontSize: 25,
            borderBottomWidth: 1,
            borderBottomColor: "#0CB2B2"
          }}
        />
       

        <View style={styles.botoesViewEntrada}>
          <TouchableOpacity
            style={{ backgroundColor: "#F67C7C", borderRadius: 8 }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.textoBotao}> Cancelar </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: "#0CB2B2", marginLeft: 15, borderRadius: 8 }}
            onPress={pushFire}
          >
            <Text style={styles.textoBotao}> Criar </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

