import React from 'react';
import {Text, View, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { IconProfile } from './IconProfile'


export const SearchUser = ({props}) => {

    const navigation = useNavigation();
    const {usuario} = useSelector(state => state.auth );

    const irPerfil = () => {
        navigation.navigate('ProfileOtherUser', {id: props._id, name: props.name })
    }

    if( props.id === usuario._id) return <></>

    return (
        <View style={styles.container}>

            <View style={styles.subContainer}>

                <View style={styles.image}>
                    <IconProfile onpress={irPerfil} image={props.avatar?.secure_url || null} width={60} height={60}/>
                </View>

                <View style={styles.containerText}>
                    <Text style={styles.textName} onpress={irPerfil} numberOfLines={2} ellipsizeMode='tail'>{props.name}</Text>
                    {
                    props.biography&&
                    <View>
                        <Text style={styles.textDescription} numberOfLines={2} ellipsizeMode='tail'>{props.biography}</Text>
                    </View>
                }
                </View>
            
            </View>

        </View>
    )

}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical:15,
        marginTop: 5
    },
    subContainer:{
        flexDirection: 'row',
        marginTop: 5
    },
    image:{
        marginRight: 10
    },
    containerText:{
        width: '80%'
    },
    textName:{
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
    },
    textDescription:{
        color: 'black',
        fontSize: 14,
    },

})