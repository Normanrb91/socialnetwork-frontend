import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';

import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import socialNetworkApi from '../libs/api/socialNetwork';

import { darLike, quitarLike } from '../store/actions/home';
import { followUser, unFollowUSer } from '../store/actions/profileOther';
import { deletePublication } from '../store/actions/profile';

import { timeAgo } from '../libs/helpers/time';
import { CarruselImage } from './CarruselImage';
import { IconProfile } from './IconProfile';
import { OptionModal } from './OptionModal';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Oticons from 'react-native-vector-icons/Octicons';


export const Publication = ({props}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {usuario} = useSelector( state => state.auth);
    const [openModalPubli, setOpenModalPubli] = useState(false);
    const [follow, setFollow] = useState(null);


    useEffect(() => {
        if(props.owner._id !== usuario._id){
            getInfoOwnerPublication()
        }
    }, [])
    

    const getInfoOwnerPublication =  async ()=> {
        try {
            const {data} = await socialNetworkApi.get(`/user/${props.owner._id}`)
            setFollow(data.siguiendo);
        } catch (error) {
            console.log(error);
        }
    }


    const darQuitarLike = () => {
        if(props.youLike)
            dispatch(quitarLike(props.id))
        else
            dispatch(darLike(props.id))
    }

    
    const seguirDejarSeguir = () => {
        if(follow){
            dispatch(unFollowUSer(props.owner._id))
            setFollow(false)
        }else{
            dispatch(followUser(props.owner._id))
            setFollow(true)
        }
    }
    

    const irPerfil = () => {
        if(props.owner._id === usuario._id)
            navigation.navigate('ProfileUser')
        else 
            navigation.navigate('ProfileOtherUser', {id: props.owner._id, name: props.owner.name })
    }


    const eliminarPublicacion = ()=> {
        dispatch(deletePublication(props.id))
    }


    const ModalComponent = () => (
        <Modal 
            backdropOpacity={0.4} 
            isVisible={openModalPubli} 
            onBackdropPress={() => setOpenModalPubli(false)} 
            onSwipeComplete={() => setOpenModalPubli(false)}
            swipeDirection="down"
            style={styles.modalTop}>

            <View style={styles.containerModal}>
                <View style={styles.dash}>
                    <Oticons
                        size={40}
                        color={'black'}
                        name={'dash'} /> 
                </View>
            
                <OptionModal 
                    icon={'heart'} 
                    onPress={ () => { setOpenModalPubli(false); darQuitarLike()} } 
                    text={ props.youLike ? 'Quitar Me gusta' : 'Dar Me gusta' } />

                {
                    props.owner._id === usuario._id ?
                    <OptionModal 
                        icon={'trash'} 
                        onPress={() => { setOpenModalPubli(false); eliminarPublicacion()} } 
                        text={'Eliminar Publicación'} />
                    :
                    <OptionModal 
                        icon={follow ? 'user-times' : 'user-plus'} 
                        onPress={ () => {setOpenModalPubli(false); seguirDejarSeguir()} } 
                        text={follow ? 'Dejar de Seguir a ' + props.owner.name : 'Seguir a ' + props.owner.name} />
                }

            </View>

        </Modal> 
    )

    return (
        
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.containerAvatar}>
                    <IconProfile onpress={irPerfil} image={props.owner.avatar?.secure_url ||null} width={45} height={45}/>
                </View>

                <View style={styles.containerName}>
                    <Text onPress={irPerfil} style={styles.textName} numberOfLines={2} ellipsizeMode='tail'>{props?.owner?.name}</Text>
                    <Text style={styles.time}>{ timeAgo(props.timestamp) }</Text>             
                </View>

                <TouchableHighlight 
                    underlayColor="#ddd" 
                    style={styles.iconContainer}  
                    onPress={() => setOpenModalPubli(true)}>
                    <View style={styles.ionicon}>
                        <Ionicons 
                            size={25}
                            name={'ellipsis-vertical'}
                        />
                    </View>
                </TouchableHighlight>

            </View>

            <View style={styles.body}>
                {
                    props.text !== '' &&     
                    <Text style={styles.textPubli}>{props.text}</Text>
                }
                {
                    props.images &&
                    <CarruselImage images={props.images}/>
                }
            </View>
  
            <View style={styles.footer}>

                <TouchableOpacity activeOpacity={0.6} style={styles.containerIcon} onPress={darQuitarLike}>
                    <Icon 
                        name={props.youLike ? 'heart' : 'heart-o'} 
                        color={props.youLike ? 'red': 'black'} 
                        size={28} />
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

            <ModalComponent />
        </View>
    
    )

}


const styles = StyleSheet.create({
    container:{
       flex: 1,
       paddingHorizontal: 20,
       paddingVertical: 10
    },
    header:{
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 5,
    },
    containerAvatar:{
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    containerName:{
        marginRight: 90
    },
    textName:{
        fontSize: 18,
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
        fontSize: 16,
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
        paddingRight: 20
    },
    containerCount:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5
    },
    textRatio:{
        fontSize: 14,
        fontWeight: '600'
    },
    iconContainer: {
        position: 'absolute',
        right: -10,
        top: 5,
        borderRadius: 500
    },
    ionicon:{
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerModal:{
        backgroundColor: 'white',
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30, 
        paddingVertical:30
    },
    modalTop:{
        justifyContent: 'flex-end',
        margin: 0
    },
    dash:{
        position: 'absolute',
        alignSelf: 'center',
        top: 0
    }

})