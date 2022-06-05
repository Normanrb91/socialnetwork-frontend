import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Image, ScrollView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { newPublication } from '../store/actions/profile';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { IconProfile } from '../components/IconProfile';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


export const New = ({navigation}) => {

    const { usuario } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [text, onChangeText] = useState('');
    const [tempUri, setTempUri] = useState([]);
    const [height, setHeight] = useState(42);
    const [disable, setDisable] = useState(true);
  
    
    useEffect(() => {
      navigation.setOptions({
        title: 'Crear publicacion',
        headerRight: () => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={disable ? {...styles.btnPublicar, backgroundColor: 'rgba(251, 167, 65, 0.6)'} : styles.btnPublicar}
              disabled={disable}
              onPress={() => createPublication()}>
              <Text style={styles.textHeader}>Publicar</Text>
            </TouchableOpacity>
          </View>
        )
      })

      if(text.length > 0 || tempUri.length > 0){
        setDisable(false)
      }else{
        setDisable(true)
      }
    }, [tempUri, text, disable]);


    const openCamera = async() => {
      const result = await launchCamera({
          mediaType: 'photo',
          quality: 0.5,
      })
      if(result.didCancel) return;

      if(result.assets.length > 0){
          setTempUri(result.assets)
      }
    }

    const openGalery = async() => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
            selectionLimit: 3
        })
        if(result.didCancel) return;

        if(result.assets.length > 0){
            setTempUri(result.assets)
        }
    }

    const deleteImage = (fileName) => {
      setTempUri(tempUri.filter(e => e.fileName !== fileName))
    }

    const createPublication = () => {
      dispatch(newPublication(text, tempUri));
      navigation.goBack();
    }


    return (
    <View style={{flex: 1}}>
    
      <View style={styles.container}>
        <IconProfile width={50} height={50} image={usuario.avatar?.secure_url} />
        <TextInput
          style={{...styles.input, height}}
          onChangeText={onChangeText}
          value={text} 
          autoCorrect={false}
          autoFocus={true}
          multiline={true}
          maxLength={300}
          textAlignVertical='top'
          placeholder={'¿Qué está pasando?'}
          placeholderTextColor='rgba(0,0,0,0.4)'
          onContentSizeChange={e => setHeight(e.nativeEvent.contentSize.height)}
        />      
      </View>


      {
        tempUri.length > 0 &&
        <ScrollView style={{flex: 1}}>
          <View style={styles.containerPhoto}>

            {
              tempUri.map((e, i) => (
                <Fragment key={i}>
                  <View style={{zIndex: 2}}>
                    <TouchableOpacity 
                      style={styles.containerClosed}
                      activeOpacity={0.8}
                      onPress={() => deleteImage(e.fileName)}>
                      <Ionicons
                        size={25}
                        color={'white'}
                        name={'close'}
                        style={{padding: 3}}/> 
                    </TouchableOpacity>
                    </View>

                  <Image
                    style={styles.photo} 
                    source={{ uri: e.uri }} /> 
                  </Fragment>
                 
              ))
            }
           
          </View>
        </ScrollView>  
      }

      <View style={styles.footer}>
        <TouchableOpacity 
          activeOpacity={0.8}
          style={{marginHorizontal: 20}} 
          onPress={() => openCamera()}>
          <Icon
            size={30}
            color={'#FBA741'}
            name={'camera-retro'}/> 
        </TouchableOpacity>

        <TouchableOpacity 
          activeOpacity={0.8}
          style={{marginHorizontal: 20}} 
          onPress={() => openGalery()}>
          <Icon
            size={30}
            color={'#FBA741'}
            name={'image'}/> 
        </TouchableOpacity>
      </View>
        
    </View>
  )
}


const styles = StyleSheet.create({
    textHeader:{
      fontSize: 18,
      fontWeight: '600',
      color: 'white'
    },
    btnPublicar:{
      backgroundColor: '#FBA741',
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 5,
      marginRight: 30
    },
    container:{
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: 'gray',
    },
    input:{
      marginLeft: 10,
      padding: 0,
      width: '80%',
      color: 'black',
      fontSize: 18,
      letterSpacing: 0.5,
      maxHeight: 250
    },
    containerPhoto:{
      alignItems: 'center', 
      marginVertical: 10, 
      marginBottom: 60,
    },
    photo:{
      width: '90%', 
      borderRadius: 20, 
      height: 300, 
      marginTop: 5,
    },
    footer:{
      borderTopWidth: 0.5,
      borderTopColor: 'gray',
      flexDirection: 'row', 
      width: '100%', 
      height: 50, 
      position: 'absolute', 
      bottom: 0,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    containerClosed:{
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', 
      borderRadius: 50,
      top: 20, 
      right: -170,  
      backgroundColor: 'black',
      zIndex: 2
    }
  })