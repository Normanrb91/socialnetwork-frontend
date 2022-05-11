import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';

import { darLike, quitarLike } from '../store/actions/auth';

import { CarruselImage } from './CarruselImage';
import { IconProfile } from './IconProfile'
import { timeAgo } from '../libs/helpers/time';


export const Publication = ({props}) => {

    const navigation = useNavigation()
    const dispatch = useDispatch();
    const {usuario} = useSelector( state => state.auth);


    const darQuitarLike = () => {
        if(props.youLike)
            dispatch(quitarLike(props.id))
        else
            dispatch(darLike(props.id))
    }

    const irPerfil = () => {
        if(props.owner._id === usuario._id)
            navigation.navigate('ProfileUser')
        else 
            navigation.navigate('ProfileOtherUser', {id: props.owner._id, name: props.owner.name })
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.containerAvatar}>
                    <IconProfile onpress={irPerfil} image={props?.owner.avatar} width={45} height={45}/>
                </View>

                <View>
                    <Text onPress={irPerfil} style={styles.textName}>{props?.owner?.name}</Text>
                    <Text style={styles.time}>{ timeAgo(props.timestamp) }</Text>             
                </View>
            </View>

            <View style={styles.body}>
                <Text style={styles.textPubli}>{props.text}</Text>
                {
                    props.images &&
                    <CarruselImage images={props.images}/>
                }
            </View>
  
            <View style={styles.footer}>

                <TouchableOpacity activeOpacity={0.8} style={styles.containerIcon} onPress={darQuitarLike}>
                    <Image
                        style={styles.imageIcon}
                        source={props.youLike ?  require('../../assets/like_active.png') 
                            : require('../../assets/like_inactive.png')} />  
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerIcon}>
                    <Image
                        style={styles.imageIcon}
                        source={require('../../assets/comentario.png')} />
                </TouchableOpacity>

                <View style={styles.containerCount}>
                    <Text style={styles.textRatio}>{props.likes > 0 ? props.likes + ' Me gusta' :  ''}</Text>
                    <Text style={styles.textRatio}>{props.coments === 1 ? props.coments + ' comentario' :
                           props.coments > 1 ?  props.coments + ' Comentarios'  :  '37 Comentarios'}</Text>
                </View>
            </View>
        
        </View>
    )

}


const styles = StyleSheet.create({
    container:{
       flex: 1,
       paddingHorizontal: 20,
       paddingVertical: 15
    },
    header:{
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 5
    },
    containerAvatar:{
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20
    },
    textName:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    body:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textPubli:{
        color: 'black',
        fontSize: 18,
        letterSpacing: 0.5,
        alignSelf: 'flex-start',
        paddingBottom: 10
    },
    footer:{
        height: 30,
        flexDirection: 'row',
        marginTop: 5
    },
    containerIcon: {
        with: 30,
        height: 30,
        paddingRight: 20
    },
    containerCount:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5
    },
    textRatio:{
        fontSize: 16,
        fontWeight: '600'
    }

})