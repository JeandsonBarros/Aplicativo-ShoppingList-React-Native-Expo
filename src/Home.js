import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';

import { deleteLists, getLists } from './shared/service/ListsService';
import styles from './Styles';

export default function Home({ navigation }) {

  /* Variável responsável por armazenar
   as listas que vão ser renderizadas */
  const [lists, setLists] = useState([]);

  /*  Booleano que guarda se o botão de 
   adicionar novo item está oculto ou não */
  const [add, setAdd] = useState(true);

  //O que fazer depois da renderização
  useEffect(() => {

    //Obtém todas as listas
    getAllLists()

    //O que fazer quando voltar para essa tela
    navigation.addListener('focus', () => {
      getAllLists()
    });

  }, [navigation])

  //Obtém todas as listas
  function getAllLists() {
    getLists().then(data => {
      setLists(data)
      return data;
    }).catch(() => console.log("Erro"))
  }

  /* Deletar lista, 
 Recebe como parâmetro a key(chave) da lista */
  function delLista(key) {
    deleteLists(key).then(() => getAllLists())
  }

  return (
    <View style={{ flex: 1 }}>

      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (nativeEvent.contentOffset.y > 50) {
            setAdd(false)
          } else {
            setAdd(true)
          }
        }
        }
      >
        {
          lists.map(item => {
            return (
              <View key={item.key}>
                <View style={styles.viewLista}>
                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate("ListItems", { keylist: item.key, nameList: item.name })}>
                      <Text style={styles.nomeLista}>{item.name}</Text>
                      <Text style={{ paddingLeft: 5 }}>{item.dateCreatd}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: "row", justifyContent: 'flex-end', flexWrap: "wrap" }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Rename", { backScreen: "Home", name: item.name, list: item })}
                    >
                      <Image
                        style={{ width: 40, height: 40, }}
                        source={require('./ico/rename-box.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ justifyContent: 'flex-end', paddingTop: 5, flexDirection: "row", marginRight: 5, marginLeft: 20, justifyContent: "space-between" }}
                      onPress={() => { delLista(item.key) }}
                    >
                      <Image
                        style={{ width: 30, height: 30 }}
                        source={require('./ico/lixeira.png')}
                      />
                    </TouchableOpacity>

                  </View>

                </View>

              </View>
            );
          })
        }
        <Text style={{ marginBottom: 90 }}></Text>
      </ScrollView>

      {add ? <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateList')}
      >
        <Text style={{
          color: '#fff',
          fontSize: 40,

        }}>+</Text>
      </TouchableOpacity>
        : <></>
      }
    </View>

  );

}

