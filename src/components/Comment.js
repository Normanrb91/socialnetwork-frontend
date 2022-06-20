import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComent } from '../store/actions/publication';
import { timeAgo } from '../libs/helpers/time';

import { IconProfile } from './IconProfile';
import { OptionModal } from './OptionModal';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Oticons from 'react-native-vector-icons/Octicons';


export const Comment = ({props}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {usuario} = useSelector( state => state.auth);
    const [openModal, setOpenModal] = useState(false);

    const irPerfil = () => {
        if(props.owner._id === usuario._id)
            navigation.navigate('ProfileUser')
        else 
            navigation.navigate('ProfileOtherUser', {id: props.owner._id, name: props.owner.name })
    }


    const ModalComponent = () => (
        <Modal
            backdropOpacity={0.4} 
            isVisible={openModal} 
            onBackdropPress={() => setOpenModal(false)} 
            onSwipeComplete={() => setOpenModal(false)}
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
                    icon={'trash'} 
                    onPress={ () => { setOpenModal(false); eliminarComentario()} } 
                    text={ 'Eliminar comentario' } />
            </View>

        </Modal> 
    )

    const eliminarComentario = ()=> {
        Alert.alert(
            'Eliminar comentario',
            '¿Estas seguro que deseas eliminar este comentario?',
            [
              { text: "Cancel", style: "cancel" },
              { text: "OK", onPress: () => dispatch(deleteComent(props._id)) }
            ]
        );
    }


    return (
        <View style={styles.container}>

            <View style={styles.body}>
                
                <View style={styles.containerAvatar}>
                    <IconProfile onpress={irPerfil} image={props.owner.avatar?.secure_url ||null} width={45} height={45}/>
                </View>

                <View style={styles.containerText}>
                    <Text onPress={irPerfil} style={styles.textName} numberOfLines={2} ellipsizeMode='tail'>{props.owner.name}</Text>
                    <Text style={styles.comment}>{props.text}</Text>       
                </View>

                {
                    props.owner._id === usuario._id &&
                    <TouchableHighlight 
                    underlayColor="#ddd" 
                    style={styles.iconContainer}  
                    onPress={() => setOpenModal(true)}>
                        <View style={styles.ionicon}>
                            <Ionicons 
                                size={25}
                                name={'ellipsis-vertical'}
                                color={'black'}
                                />
                        </View>
                    </TouchableHighlight>
                }   

            </View>

            <View style={styles.footer}>
                <Text style={styles.textTime}>{ timeAgo(props.timestamp) }</Text>  
            </View>

            <ModalComponent /> 
        </View>
    )
}

 
const styles = StyleSheet.create({
    container:{
       flex: 1,
       paddingHorizontal: 15
    },
    body:{
        flex: 1,
        flexDirection: 'row'
    },
    containerAvatar:{
        alignItems: 'center',
        marginRight: 10
    },
    containerText:{
        maxWidth: '80%',
        backgroundColor: '#EEEDED',
        padding: 15,
        borderRadius: 20
    },
    textName:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    comment:{
        marginTop: 2,
        fontSize: 18,
        color: 'black',
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
    footer:{
        height: 30,
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 70
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
    },
    textTime:{
        color: '#ccc'
    }
})
