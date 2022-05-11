import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { CustomButtonFollow } from './CustomButtonFollow';
import { IconProfile } from './IconProfile';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { timeInit } from '../libs/helpers/time';


export const HeaderProfile = ({usuario, followers, followings, followMe = false, text = 'Editar Perfil', color = '#000', backColor = '#fff', onPress}) => {
  return (
    <View style={{flex: 1}}>

        <View style={styles.profile}>
          <IconProfile image={usuario.avatar} width={100} height={100} />

          <TouchableOpacity style={styles.estadisticas}>
              <Text style={styles.text}>{followers}</Text>
              <Text style={styles.text}>Seguidores</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.estadisticas}>
              <Text style={styles.text}>{followings}</Text>
              <Text style={styles.text}>Siguiendo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.description}>

          <Text style={{...styles.text, fontSize: 25}}>{usuario.name}
            <Text style={styles.textOff}>{ followMe && ' - Te sigue' }</Text>
          </Text>

          {
          usuario.biography&&
          <Text style={{...styles.text, ...styles.textDescription }}>{usuario.biography}</Text>
          }
          
          <View style={styles.date}>
            <Icon name='calendar-month' size={25} />
            <Text style={{...styles.textOff, marginLeft: 5 }}>{ timeInit(usuario.createdAt) }</Text>
          </View>
          
          <View style={{ marginVertical: 10, marginTop: 20}}>
              <CustomButtonFollow
              text={ text } 
              color={ color }
              backColor= { backColor }
              onPress ={ onPress } />
          </View>

        </View>
        
        <Text style={{...styles.text, paddingLeft: 20, marginVertical: 10, fontSize: 20}}>Publicaciones</Text>
        <View style={styles.separador} />
    </View>
  )
}

const styles = StyleSheet.create({
  profile: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  description:{
    paddingHorizontal: 20,
  },
  estadisticas:{
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 35
  },
  text:{
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    letterSpacing: 0.25,
  },
  textDescription:{
    fontWeight: 'normal', 
    marginTop: 10, 
    paddingRight: 5,
    fontSize: 16
  },
  date:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  textOff:{
    fontSize: 16,
    color: '#3c3c3c',
    fontWeight: 'normal',
    letterSpacing: 0.25,
  },
  separador: {
    height: 1,  
    backgroundColor: '#ccc'
  }
})
