
import AsyncStorage from '@react-native-async-storage/async-storage';

//Obtém todas as listas.
export async function getLists() {
  try {

    //Obtém todas as listas.
    let list = await AsyncStorage.getItem('list')

    //Se não tiver listas, uma lista vazia é retornada.
    if (list === null) {
      return [];

      //Retrona todas as lista.
    } else {
      return JSON.parse(list)

    }

  } catch (e) {
    alert("Erro ao listar");
  }
}

/* Salva uma lista,
  Recebe como parâmetro uma nova lista.
*/
export async function setLists(value) {
  try {

    //Obtém todas as listas.
    let list = await AsyncStorage.getItem("list");

    //Obtém uma nova chave para a nova lista.
    let keyConut = await AsyncStorage.getItem('keyConut')

   /*  Verifica se a lista de listas e a nova chave está vazia,
     e define o que fazer caso seja verdade. */
    if (list == null && keyConut == null) {

      //A nova lista que vai ser salva recebe uma chave.
      value = { key: 'l' + 1, ...(value) }

      //Nova lista de listas
      const newArray = [value]

      /* Salva uma nova chave que vai ser usada na próxima vez
       que uma lista for salva. */
      await AsyncStorage.setItem('keyConut', JSON.stringify(2));

      //Salva a lista de listas
      await AsyncStorage.setItem("list", JSON.stringify(newArray));

    } 
    /*  
     Define o que fazer caso a lista de listas e a nova chave 
     não estejam vazias. 
     */
    else {

      //Listas
      list = JSON.parse(list);

      //Nova chave
      keyConut = JSON.parse(keyConut);

      //A nova lista que vai ser salva recebe uma chave.
      value = { key: 'l' + keyConut, ...(value) }

      //A nova lista é inserida na lista de listas
      list.push(value)

       //Salva a lista de listas
      await AsyncStorage.setItem('list', JSON.stringify(list))

       /* Salva uma nova chave que vai ser usada na próxima vez
       que uma lista for salva. */
      await AsyncStorage.setItem('keyConut', JSON.stringify(keyConut + 1));

    }

  } catch (e) {
    alert("Erro ao salvar");
  }
}

 
//Edita lista
export async function putLists(value) {
  try {
    //Obtém todas as listas.
    let list = await AsyncStorage.getItem("list");
    list = JSON.parse(list)

    //Retorna o índex da lista que vai ser alterada
    let index = list.findIndex(element => {
      return element.key == value.key;
    })

    //Altera a lista que foi passada por parâmetro
    list[index] = value

    //Salva a lista de listas
    await AsyncStorage.setItem('list', JSON.stringify(list))

  } catch (e) {
    alert("Erro ao editar");
  }
}

//Deleta lista
export async function deleteLists(key) {

  try {
    //Obtém todas as listas.
    let list = await AsyncStorage.getItem("list");
    list = JSON.parse(list)

    //Retorna o índex da lista que vai ser alterada
    let index = list.findIndex(element => {
      return element.key == key;
    })

    //Deleta a lista passada por parâmetro
    list.splice(index, 1);

    //Salva a lista de listas
    await AsyncStorage.setItem('list', JSON.stringify(list))

  } catch (e) {
    alert("Erro ao editar");
  }

}