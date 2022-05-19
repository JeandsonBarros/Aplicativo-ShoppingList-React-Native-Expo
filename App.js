import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Home from './src/Home';
import AddItem from './src/AddItem';
import CreateList from './src/CreateList';
import ListItems from './src/ListItems';
import Rename from './src/Rename';
import RenameItem from './src/RenameItem';
import SearchList from './src/SearchList';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen
          name="Home"
          component={Home}

          options={({ navigation, route }) => ({
            headerLeft: null,
            headerTitle: "Listas de compras",
            headerStyle: {
              backgroundColor: '#0CB2B2'
            },
            headerTintColor: '#fff',
            headerRight: () => (
              <View style={{ flexDirection: "row", justifyContent: 'flex-end', flexWrap: "wrap" }}>

                <TouchableOpacity
                  onPress={() => navigation.navigate('SearchList')}
                  color="#fff"
                >
                  <Image
                    style={{ width: 30, height: 30, }}
                    source={require('./src/ico/magnify.png')}
                  />
                </TouchableOpacity>

              </View>

            ),
          })}
        />

        <Stack.Screen
          name="ListItems"
          component={ListItems}
          options={{
            title: "Itens da lista:",
            headerStyle: {
              backgroundColor: '#0CB2B2',
            },
            headerTintColor: '#fff',

          }}
        />

        <Stack.Screen
          name="RenameItem"
          component={RenameItem}
          options={{
            title: "Renomear item:",
            headerStyle: {
              backgroundColor: '#0CB2B2',
            },
            headerTintColor: '#fff',

          }}
        />

        <Stack.Screen
          name="SearchList"
          component={SearchList}
          options={{
            title: "Buscar lista",
            headerStyle: {
              backgroundColor: '#0CB2B2',
            },
            headerTintColor: '#fff',

          }}
        />


        <Stack.Screen
          name="CreateList"
          component={CreateList}
          options={{
            title: "Criar lista",
            headerStyle: {
              backgroundColor: '#0CB2B2',
            },
            headerTintColor: '#fff',

          }} />



        <Stack.Screen
          name="AddItem"
          component={AddItem}
          options={{
            title: "Adicionar item",
            headerStyle: {
              backgroundColor: '#0CB2B2',
            },
            headerTintColor: '#fff',

          }}
        />

        <Stack.Screen
          name="Rename"
          component={Rename}
          options={{
            title: "Renomear",
            headerStyle: {
              backgroundColor: '#0CB2B2',
            },
            headerTintColor: '#fff',

          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
