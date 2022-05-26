import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export const OptionModal = ({icon, onPress, text, color='black'}) => {
  return (
    <TouchableHighlight underlayColor="#ddd" style={styles.optionsModal}  
        onPress={() => onPress()}>
        <>
        <Icon
            size={25}
            color={color}
            name={icon}/> 
        <Text style={styles.textModal}>{text}</Text>
        </>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    optionsModal:{
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 15, 
        paddingVertical: 15
    },
    textModal:{
        fontSize: 22, 
        marginLeft: 10,
        color: 'black'
    }
  
  })