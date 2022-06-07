import React, { useEffect, useState } from 'react';
import {TouchableOpacity, View, StyleSheet, TextInput, ActivityIndicator} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { cleanSearch, searchUser } from '../store/actions/search';

import Icon from 'react-native-vector-icons/MaterialIcons';


export const SearchBar = ({text, onChangeText}) => {

    const dispactch = useDispatch();
    const { loading } = useSelector(state => state.search);
    const [showClose, setShowClose] = useState(false);

    useEffect(() => {
        if(text !== ''){
            setShowClose(true)
        }else{
            setShowClose(false)
        }
    }, [text])
    

    const search = () => {
        dispactch(searchUser(text, 1))
    }

    const clearInput = () => {
        onChangeText('');
        dispactch(cleanSearch())
    }

    return (
        <View style={styles.container}>

            {   
                loading ?
                <ActivityIndicator style={styles.iconSearch} size={25} color="#FBA741" />
                :
                <TouchableOpacity 
                    activeOpacity={0.6} 
                    style={styles.iconSearch}
                    onPress={ () => search() }>
                    <Icon
                        size={25}
                        color={'black'}
                        name={'search'}/> 
                </TouchableOpacity>
            }

            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text} 
                autoCorrect={false}
                autoFocus={true}
                placeholder={'Buscar'}
                placeholderTextColor='rgba(0,0,0,0.4)' />

            {
                showClose &&
                <TouchableOpacity 
                    activeOpacity={0.6} 
                    style={styles.iconClose}
                    onPress={ () => clearInput() }>
                    <Icon
                        size={25}
                        color={'gray'}
                        name={'close'}/> 
                </TouchableOpacity>
            }

        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10

    },
    input:{
        marginLeft: 5,
        color: 'black',
        fontSize: 18,
        width:'70%',
        letterSpacing: 0.5,
        paddingVertical: 8
    },
    iconSearch:{
        borderRightWidth: 1, 
        borderRightColor: 'gray', 
        paddingHorizontal: 5 
    },
    iconClose:{
        position: 'absolute', 
        right: 10
    }
})