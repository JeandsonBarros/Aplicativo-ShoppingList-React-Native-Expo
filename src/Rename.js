import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { putLists } from './shared/service/ListsService';
import styles from './Styles';

export default function Rename({ route, navigation }) {

  /* 
  Valores passados por rota,
  name: nome atual da lista que vai ser renomeada,
  list: lista que vai ser renomeada,
  backScreen: para qual tela deve voltar
  */
  const { name, list, backScreen} = route.params;

  //Novo nome da lista
  const [newName, setNewName] = useState(name);
  
  //Renomea nome da lista
  function rename() {
    if(newName){
      list.name = newName

      //Edita a lista
      putLists(list).then(()=>{
        navigation.navigate(backScreen)
      })
  
    }else{
      alert("Nome vazio")
    }
   
  }

  return (
    <View style={styles.container}>

      <View style={{ paddingTop: 15, margin: 10 }}>

        <TextInput
          
          placeholder="Nome do aqui"
          value={newName}
          style={{
            fontSize: 25,
            borderBottomWidth: 1,
            borderBottomColor: "#0CB2B2"
          }}
          onChangeText={setNewName}
         
        />

        <View style={styles.botoesViewEntrada}>

          <TouchableOpacity
            style={{ backgroundColor: "#F67C7C", borderRadius: 8 }}
            onPress={() => navigation.navigate(backScreen, { list: list })}
          >
            <Text style={styles.textoBotao}> Cancelar </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: "#0CB2B2", marginLeft: 15, borderRadius: 8 }}
            onPress={() => rename()}
          >
            <Text style={styles.textoBotao}> Salvar </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

