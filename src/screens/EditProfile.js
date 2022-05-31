import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { useSelector } from 'react-redux';

import { IconProfile } from '../components/IconProfile';
import { CustomInput } from '../components/CustomInput';
import { OptionModal } from '../components/OptionModal';

import Oticons from 'react-native-vector-icons/Octicons';


export const EditProfile = ({navigation}) => {

    const { usuario } = useSelector(state => state.auth);
    const [openModal, setOpenModal] = useState(false)
    const {control, handleSubmit, formState: {errors} } = useForm();
    
    useEffect(() => {
        navigation.setOptions({
            title: 'Editar perfil',
            headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        style={{marginRight: 30}}
                        onPress={handleSubmit(onUpdate)} >
                        <Text style={styles.textHeader}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }, []);

    const onUpdate = ({name, byography}) => {
        console.log('dispacth actualizar perfil', name, byography);
    }

    const deleteAvatar = () => {

    }

    const openGalery = () => {

    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center'}}>
                <IconProfile width={120} height={120} image={usuario?.avatar}/>
                <TouchableOpacity style={{marginTop: 15}} activeOpacity={0.8} onPress={() => setOpenModal(true)}>
                    <Text style={{...styles.textHeader, color: '#FBA741'}}>Cambiar foto de perfil</Text>
                </TouchableOpacity>
                <View style={{marginTop: 30}}>
                    <CustomInput
                        name="name"
                        placeholder={"Nombre"}
                        control={control}
                        rules={{
                            required: 'Nombre obligatorio',
                            minLength: {
                                value: 2,
                                message: 'Nombre al menos 2 caracteres',
                            },
                            maxLength: {
                                value: 25,
                                message: 'Demasiado largo, maximo 25 caracteres',
                            },
                        }}/>
                </View>
                <View style={{marginTop: 20}}>
                    <CustomInput
                        name="byography"
                        placeholder={"Biografía"}
                        control={control}
                        rules={{
                            maxLength: {
                                value: 80,
                                message: 'Demasiado largo, maximo 80 caracteres',
                            },
                        }}/>
                </View>
                
            </View>
        
            <Modal
                backdropOpacity={0.4} 
                isVisible={openModal} 
                onBackdropPress={() => setOpenModal(false)} 
                onSwipeComplete={() => setOpenModal(false)}
                swipeDirection ="down"
                style={styles.modalTop}>

                <View style={styles.containerModal}>
                    <View style={styles.dash}>
                        <Oticons
                            size={40}
                            color={'black'}
                            name={'dash'} /> 
                    </View>
                    
                    <OptionModal icon={'camera-retro'} onPress={openGalery} text={'Nueva foto de perfil'} />
                    {
                        !usuario?.avatar &&
                        <OptionModal icon={'eraser'} onPress={deleteAvatar}  text={'Eliminar foto de perfil'} />
                    }
                </View>
        
            </Modal>
            
        </View>
    )
}


const styles = StyleSheet.create({
    textHeader:{
        fontSize: 18,
        fontWeight: '600',
        color: 'black'
    },
    container:{
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 35,
        alignItems: 'center',
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