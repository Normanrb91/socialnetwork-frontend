import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { useDispatch, useSelector } from 'react-redux';
import { startUpdateProfile } from '../store/actions/auth';

import { IconProfile } from '../components/IconProfile';
import { CustomInput } from '../components/CustomInput';
import { OptionModal } from '../components/OptionModal';

import Oticons from 'react-native-vector-icons/Octicons';
const noImage = '../../assets/noimage.png';

export const EditProfile = ({navigation}) => {

    const { usuario } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false)
    const [tempUri, setTempUri] = useState(null);
  
    const {control, handleSubmit, formState: {errors} } = useForm({
        defaultValues: {
            name: usuario.name,
            byography: usuario.biography
        }
    });
    
    useEffect(() => {
        navigation.setOptions({
            title: 'Editar perfil',
            headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        style={styles.guardar}
                        onPress={handleSubmit(onUpdate)} >
                        <Text style={styles.textHeader}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [tempUri]);

    const onUpdate = ({name, byography}) => {
        dispatch(startUpdateProfile(name, byography, tempUri))
        navigation.goBack();
    }

    const deleteAvatar = () => {
        setOpenModal(false)
        setTempUri(noImage);
    }

    const openCamera = async() => {
        setOpenModal(false)

        const result = await launchCamera({
            mediaType: 'photo',
            quality: 0.5
        })
        if(result.didCancel) return;

        if(result.assets[0].uri){
            setTempUri(result.assets[0])
        }
    }

    const openGalery = async() => {
        setOpenModal(false)

        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5
        })
        if(result.didCancel) return;

        if(result.assets[0].uri){
            setTempUri(result.assets[0])
        }
    }

    return (
        <View style={styles.container}>
        
            <View style={{ alignItems: 'center'}}>
                {
                    
                    tempUri ? 
                    <IconProfile width={120} height={120} image={tempUri?.uri } />
                    :
                    usuario?.avatar ?
                    <IconProfile width={120} height={120} image={ usuario?.avatar?.secure_url } />
                    :
                    <IconProfile width={120} height={120} image={ null } />
                }
                <TouchableOpacity style={{marginTop: 15}} activeOpacity={0.8} onPress={() => setOpenModal(true)}>
                    <Text style={{...styles.textHeader, color: '#FBA741'}}>Cambiar foto de perfil</Text>
                </TouchableOpacity>
                <View style={{marginTop: 30}}>
                    <CustomInput
                        name="name"
                        placeholder={"Nombre"}
                        control={control}
                        setValue={usuario.name}
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
                    
                    <OptionModal icon={'camera-retro'} onPress={() => openCamera()} text={'Abrir cámara'} />
                    <OptionModal icon={'image'} onPress={() => openGalery()} text={'Abrir galería'} />
                    {
                        tempUri !== noImage && usuario?.avatar  &&
                        <OptionModal icon={'eraser'} onPress={() => deleteAvatar()}  text={'Eliminar foto de perfil'} />
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
        color: 'white'
    },
    guardar:{
      backgroundColor: '#FBA741',
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 5,
      marginRight: 30
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