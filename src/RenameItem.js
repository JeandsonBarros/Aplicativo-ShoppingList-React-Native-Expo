import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { putItem } from './shared/service/ItemService';
import styles from './Styles';

export default function RenameItem({ route, navigation }) {

  /* 
  ***Valores passados por rota***
  name: nome atual do item,
  keylist: chave da lista a qual pentece o item,
  backScreen: para qual tela deve voltar ,
  item: item que vai ser renomeado
   */
  const { name, keylist, backScreen, item} = route.params;

  //Novo nome do item
  const [newName, setNewName] = useState(name);
  
  //Renomea nome do item da lista
  function rename() {
    if(newName){
      item.name = newName
      
      //Altera item
      putItem(keylist, item).then(()=>{
        navigation.navigate(backScreen, { keylist: keylist})
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
            onPress={() => navigation.navigate(backScreen, { keylist: keylist })}
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

