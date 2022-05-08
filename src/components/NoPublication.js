import React from 'react';
import {Text, View, StyleSheet, Image } from 'react-native';

export const NoPublication = ({texto}) => {
  return (
    <View style={styles.container}>

        <Text style={styles.texto}>{texto}</Text>
        <Image
            style={styles.image}
            source={require('../../assets/triste.png')}/>

    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto:{
        fontSize: 20,
        fontWeight: '600',
        color: '#ccc',
        marginVertical: 20,
        paddingHorizontal: 20
    },
    image:{
        width: 200,
        height: 200,
        opacity: 0.5,

    }
})