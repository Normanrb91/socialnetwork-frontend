import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export const OptionModal = ({icon, onPress, text, color='black', size = 25}) => {
  return (
    <TouchableHighlight underlayColor="#ddd" style={styles.optionsModal}  
        onPress={() => onPress()}>
        <>
        <Icon
            size={size}
            color={color}
            name={icon}
            style={{width: 30}}/> 
        <Text style={styles.textModal} numberOfLines={1} ellipsizeMode='tail'>{text}</Text>
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
        marginLeft: 15,
        color: 'black',
        marginRight: 20
    }
  
  })