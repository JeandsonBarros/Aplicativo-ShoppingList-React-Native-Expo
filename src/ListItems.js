import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { deleteItem, getItemsByList, putItem } from './shared/service/ItemService';
import styles from './Styles';


export default function ListItems({ route, navigation }) {

  //Chave e nome da lista recebida por props de navegação
  const { keylist, nameList } = route.params;

  /* Variável responsável por armazenar
   a lista de itens que vai ser renderizada */
  const [items, setItems] = useState([]);

  //Soma do valor de todos os itens
  const [total, setTotal] = useState(0.0);

  //Nome da lista dos itens
  const [listName, setListName] = useState(nameList)

  //Nome do item que vai ser buscado
  const [search, setSearch] = useState("");

  /*  Booleano que guarda se o botão de 
   adicionar novo item está oculto ou não */
  const [add, setAdd] = useState(true);

  /* Booleano que guarda se o campo
   de buscar novo item está oculto ou não */
  const [show, setShow] = useState(false);

  //O que fazer depois da renderização
  useEffect(() => {

    //Obtém todos os item da lista
    getItems()

    //O que fazer quando voltar para essa tela
    navigation.addListener('focus', () => {
      getItems()
    });

  }, [navigation])

  //Obtém todos os item da lista
  async function getItems() {
    let listItems = await getItemsByList(keylist);
    setItems(listItems);

    //Variável temporária do total.
    let tot = 0

    //Soma o total
    listItems.forEach(item => {

      if (item.val && item.quantity > 0) {
        let value = item.val.replace(',', '.');
        let quantity = item.quantity.replace(',', '.');
        tot += (parseFloat(value) * parseFloat(quantity))
      }
    })

    //Insere o total.
    setTotal(tot)
    tot = 0
  }

  /* Deletar item, 
  Recebe como parâmetro a key(chave) do item */
  function delItem(key) {
    deleteItem(keylist, key).then(data => {
      setItems(data);

    })
  }

  /* Salvar o valor do item,
  Recebe como parâmetro e valor do item e o item */
  function sum(valueItem, item) {

    try {
      if (valueItem) {

        item.val = valueItem
        putItem(keylist, item).then(data => {
          setItems(data);
          getItems()
        })

      } else {
        item.val = ""
        putItem(keylist, item).then(data => {
          setItems(data);
          getItems()
        })

      }
    } catch (error) {
      alert("Erro ao mudar valor")
    }

  }

  /* Marcar se o item já está ok,
  Recebe como parâmetro o item */
  function marked(item) {
    try {
      item.marked = item.marked == 's' ? 'n' : 's'

      putItem(keylist, item).then(data => {
        setItems(data);
      })

    } catch (error) {
      alert("error")
    }

  }

  /* Salvar a quantidade do item,
  Recebe como parâmetro a quantidade e o item */
  function quantity(quantityItem, item) {

    try {
      if (quantityItem) {
        item.quantity = quantityItem
        putItem(keylist, item).then(data => {
          setItems(data);
          getItems()
        })

      } else {
        item.quantity = ""
        putItem(keylist, item).then(data => {
          setItems(data);
          getItems()
        })

      }
    } catch (error) {
      alert("Erro ao mudar quantidade")
    }

  }

  //Função responsável por ocultar e mostrar o campo de busca
  function find() {

    if (show) {
      return (
        <TextInput
          placeholder="Buscar"
          onChangeText={nameItem => searchItem(nameItem)}
          value={search}
          style={styles.searchInput}
        />);

    } else {
      return null;
    }
  }

  //Buscar o item por nome
  function searchItem(nameItem) {
    setSearch(nameItem)

    if (nameItem) {
      let newListTemp = items.filter(data => {
        return data.name.includes(nameItem);
      });
      setItems(newListTemp)
    } else {
      getItems()
    }

  }

  return (

    <View style={{ flex: 1 }}>

      <View style={styles.navBar}>
        <Text style={styles.textoNavBar}>{listName}</Text>
        <TouchableOpacity
          onPress={() => setShow(!show)}
          color="#fff"
        >
          {show ? <Image
            style={{ width: 30, height: 30, marginRight: 10 }}
            source={require('./ico/close.png')}
          /> :
            <Image
              style={{ width: 30, height: 30, marginRight: 10 }}
              source={require('./ico/magnify-black.png')}
            />}
        </TouchableOpacity>
      </View>

      {find()}

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
          items.map(item => {
            return (
              <View key={item.key}>

                <View style={styles.viewListaItems}>

                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.marca}
                      onPress={() => marked(item)}
                    >
                      <Text>{item.marked == "s" ? "✔️" : ""}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity

                      style={{ justifyContent: "center", width: '100%' }}
                      onPress={() => navigation.navigate("RenameItem",
                        { keylist: keylist, item: item, backScreen: "ListItems", name: item.name })}>
                      <Text style={{
                        fontSize: 20,
                        paddingLeft: 5,
                        color: "#444",

                      }}>{item.name} </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 15 }}>

                    <View style={{ flexDirection: "row", alignItems: 'center', marginRight: 10, height: 40 }}>
                      <Text style={{ fontSize: 19, marginRight: 10 }}>R$:</Text>
                      <TextInput
                        style={styles.valuesItems}
                        defaultValue={item.val}
                        keyboardType="numeric"
                        onChangeText={val => sum(val, item)}

                      />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: 'center', marginRight: 10, height: 40 }}>
                      <Text style={{ fontSize: 19, marginRight: 10 }}>Quant.</Text>
                      <TextInput
                        style={styles.valuesItems}
                        keyboardType="numeric"

                        defaultValue={item.quantity}
                        onChangeText={quant => quantity(quant, item)}

                      />
                    </View>

                    <TouchableOpacity
                      style={{ marginRight: 5 }}
                      onPress={() => delItem(item.key)}
                    >
                      <Image
                        style={{ width: 30, height: 40 }}
                        source={require('./ico/lixeira.png')}
                      />
                    </TouchableOpacity>

                  </View>
                </View>

              </View>
            );
          })
        }
      <Text style={{marginBottom: 90}}></Text> 
      </ScrollView>

      < Text
        style={styles.totalValue}
      >Valor total: R${total.toFixed(2)}
      </Text>

      {add ? <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddItem", { keylist: keylist })}
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


