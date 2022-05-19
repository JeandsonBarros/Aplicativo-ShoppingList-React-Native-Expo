import { StyleSheet } from 'react-native';



export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)',

    },
    navBar: {
        backgroundColor: "#dbdbdb",
        height: 60,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textoNavBar: {
        fontSize: 39,
        paddingLeft: 10,
        color: "#444",
    },


    textoBotaoRenomea: {
        color: "#fff",
        fontSize: 20,
        justifyContent: 'center',
        alignContent: 'center'
    },
    marca: {
        borderWidth: 2,
        borderRadius: 40,
        borderColor: '#007676',
        width: 30,
        height: 30,
        backgroundColor: "rgb(240,240,255)",
        justifyContent: "center",
        alignItems: "center"
    },
    botaoRenomea: {
        borderRadius: 18,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: "#4ebbf3",
        width: 110,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    exit: {
        backgroundColor: "#4ebbf3",
        height: 40,
        width: 'auto',
        borderRadius: 20,
        margin: 5,
        justifyContent: 'center'


    },
    addList: {
        backgroundColor: "#4ebbf3",
        width: 60,
        height: 60,
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',

        right: 20,
        bottom: 40,
        elevation: 8,
        shadowColor: '#000'


    },
    totalValue: {
        paddingTop: 15,
        paddingLeft: 10,
        fontSize: 23,
        backgroundColor: "#33B7B7",
        color: '#fff',

        fontWeight: '300',

        bottom: 0,
        width: '100%',
        borderTopWidth: 10,
        borderColor: '#FFF',

        elevation: 25,
        shadowColor: '#000'

    },
    searchInput: {
        fontSize: 25,
        borderBottomWidth: 1,
        borderBottomColor: "#0CB2B2",
        padding: 10
    },
    valuesItems: {
        height: 40,
        width: 65,
        fontSize: 18,
        justifyContent: 'center',
        borderBottomColor: '#0CB2B2',
        borderBottomWidth: 1,
        backgroundColor: '#0001',
        textAlign: 'center'
    },
    fab: {
        position: 'absolute',
        bottom: 0,
        right: 0,

        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',

        height: 80,
        width: 80,

        borderRadius: 30,
        borderWidth: 10,

        elevation: 8,
        backgroundColor: '#0CB2B2',
        borderColor: '#fff',
        shadowColor: '#000'
    },
    addText: {
        color: '#fff',
        fontSize: 50,
        textAlign: 'center',
        margin: 10

    },

    textoBotao: {
        fontSize: 28,
        color: '#fff',
        textAlign: 'center',
        margin: 10
    },
    intemsLista: {
        fontSize: 20,
        paddingLeft: 5,
        color: "#444",
        width: 160


    },
    nomeLista: {
        fontSize: 25,
        paddingLeft: 5,
        color: "#444",
        width: 160
    },
    viewLista: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingTop: 5,
        marginTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#7eaaab'
    },
    viewListaItems: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingTop: 5,
        marginTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#7eaaab'
    },

    entrada: {


        fontSize: 20,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#555',
        paddingTop: 20

    },
    rotuloEntrada: {
        fontSize: 20,
        color: "#444",
    },
    botoesViewEntrada: {
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: 'flex-end',
    },
    imageLista: {
        width: 40,
        height: 30,
        margin: 5,

    }

});