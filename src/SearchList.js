import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { deleteLists, getLists } from './shared/service/ListsService';
import styles from './Styles';


export default function SearchList({ navigation }) {
    //Nome do que vai ser busca
    const [search, setSearch] = useState("");

    //Lista que vão ser renderizadas
    const [lists, setLists] = useState([]);

    //O que fazer depois da renderização
    useEffect(() => {

         //Obtém todas as listas
        getAllLists()

    }, [])

    //Obtém todas as listas
    function getAllLists() {
        getLists().then(data => {
            setLists(data)
        }).catch(() => console.log("Erro"))
    }

    //Deleta lista
    function delLista(key) {
        deleteLists(key).then(() => getAllLists())
    }

    //Busca lista por nome passado por parâmetro
    function searchFunction(nameSearch) {
        setSearch(nameSearch)
        if (nameSearch) {
            let newListTemp = lists.filter(data => {
                return data.name.includes(nameSearch);
            });
            setLists(newListTemp)
        } else {
            getAllLists()
        }

    }

    return (
        <View>
            <TextInput
                placeholder="Nome da lista aqui"
                value={search}
                onChangeText={nameSearch => searchFunction(nameSearch)}
                style={styles.searchInput}
            />

            <FlatList
                data={lists}
                onEndReachedThreshold={0.1}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) =>

                    <View>
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

                }
            />

        </View>
    );
}

