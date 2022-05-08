import React, { useState } from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { darLike, quitarLike } from '../store/actions/publications';
import { CarruselImage } from './CarruselImage';

import {IconProfile} from './IconProfile'
import { cleanProfile } from '../store/actions/profile';

export const Publication = ({props}) => {

    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [like, setLike] = useState(props.youLike)
    const [contador, setContador] = useState(props.likes)

    const darQuitarLike = () => {
        if(like){
            dispatch(quitarLike(props.id))
            setLike(!like)
            setContador(() => contador - 1 )
        }else{
            dispatch(darLike(props.id))
            setLike(!like)
            setContador(() => contador + 1 )
        }
    }

    const irPerfil = () => {
        // navigation.navigate('Profile', {id: props.owner._id})
    }

    return (

        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.containerAvatar}>
                    <IconProfile onpress={irPerfil} image={props.owner.avatar} width={45} height={45}/>
                </View>

                <View>
                    <Text style={styles.textName}>{props.owner.name}</Text>
                    <Text style={styles.time}>{props.timestamp}</Text>             
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
                        source={like ?  require('../../assets/like_active.png') 
                            : require('../../assets/like_inactive.png')} />  
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerIcon}>
                    <Image
                        style={styles.imageIcon}
                        source={require('../../assets/comentario.png')} />
                </TouchableOpacity>

                <View style={styles.containerCount}>
                    <Text style={styles.textRatio}>{contador > 0 ? contador + ' Me gusta' :  ''}</Text>
                    <Text style={styles.textRatio}>{props.coments === 1 ? props.coments + ' comentario' :
                           props.coments > 1 ?  props.coments + ' Comentarios'  :  '3700 Comentarios'}</Text>
                </View>
            </View>
        
        </View>
    )

}


const styles = StyleSheet.create({
    container:{
       flex: 1,
       padding: 15,
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
        fontSize: 22,
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