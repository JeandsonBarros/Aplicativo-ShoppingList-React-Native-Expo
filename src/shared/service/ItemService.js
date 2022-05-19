import AsyncStorage from '@react-native-async-storage/async-storage';

/* Obtém todas os itens
   da lista da chave passada por parâmetro.
*/
export async function getItemsByList(keyList) {
    try {
        //Obtém todas as listas.
        let lists = await AsyncStorage.getItem("list");
        lists = JSON.parse(lists);

        //Retorna o índex da lista da key passada por parâmetro.
        let list = lists.find(element => {
            return element.key == keyList;
        })

        //Retorna os itens da lista da key passada por parâmetro.
        return list.items;

    } catch (error) {
        alert("Erro ao listar itens 1")
    }
}

//Altera item
export async function setItem(keyList, item) {
    try {
        //Obtém todas as listas.
        let list = await AsyncStorage.getItem("list");
        list = JSON.parse(list);

        //Obtém uma nova chave para a nova lista.
        let keyConut = await AsyncStorage.getItem('keyConut')
        keyConut = JSON.parse(keyConut);

        //O novo item que vai ser salvo recebe uma chave.
        item = { key: 'i' + keyConut, ...(item) }

        //Retorna o índex da lista da key passada por parâmetro.
        let index = list.findIndex(element => {
            return element.key == keyList;
        })

        /* 
        O novo item é inserido na
        lista da key passada por parâmetro.
        */
        list[index].items.push(item);

        //Salva a lista de listas.
        await AsyncStorage.setItem('list', JSON.stringify(list))

        /* Salva uma nova chave que vai ser usada na próxima vez.*/
        await AsyncStorage.setItem('keyConut', JSON.stringify(keyConut + 1));

        /*  Retorna a lista de itens da 
         lista da key passada por parâmetro. */
        return list[indexList].items;

    } catch (error) {

    }

}


/* 
Edita item,
Recebe como parâmetro o item e a 
chave da lista a qual o item pertence.
*/
export async function putItem(keyList, item) {

    try {
        //Obtém todas as listas.
        let list = await AsyncStorage.getItem("list");
        list = JSON.parse(list)

        //Retorna o índex da lista da key passada por parâmetro.
        let indexList = list.findIndex(element => {
            return element.key == keyList;
        })

        //Retorna o índex do item.
        let indexItem = list[indexList].items.findIndex(element => {
            return element.key == item.key;
        })

        //Altera o item.
        list[indexList].items[indexItem] = item;

        //Salva a lista de listas.
        await AsyncStorage.setItem('list', JSON.stringify(list))

        /*  Retorna a lista de itens da 
        lista da key passada por parâmetro. */
        return list[indexList].items;

    } catch (error) {
        alert("Erro")
    }
}

/* 
Deleta item,
recebe por parâmetro as chaves da lista e do item . 
*/
export async function deleteItem(keyList, keyItem) {

    try {
        //Obtém todas as listas.
        let list = await AsyncStorage.getItem("list");
        list = JSON.parse(list);

        //Retorna o índex da lista da key passada por parâmetro.
        let indexList = list.findIndex(element => {
            return element.key == keyList;
        })

        //Retorna o índex do item.
        let indexItem = list[indexList].items.findIndex(element => {
            return element.key == keyItem;
        })

        //Deleta o item.
        list[indexList].items.splice(indexItem, 1);

        //Salva a lista de listas.
        await AsyncStorage.setItem('list', JSON.stringify(list))

        /*  Retorna a lista de itens da 
       lista da key passada por parâmetro. */
        return list[indexList].items;

    } catch (error) {
        alert("Erro")
    }
}