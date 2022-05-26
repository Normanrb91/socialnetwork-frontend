import React from 'react';
import {Text, View, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';

import { IconProfile } from './IconProfile'

import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomButtonFollow } from './CustomButtonFollow';
import { followUser, unFollowUSer } from '../store/actions/profileOther';


export const User = ({props}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {usuario} = useSelector(state => state.auth );

    const irPerfil = () => {
        if(props.id === usuario._id)
            navigation.navigate('ProfileUser')
        else 
            navigation.navigate('ProfileOtherUser', {id: props.id, name: props.name })
    }

    const seguirDejarSeguir = () => {
        if(props.siguiendo){
            dispatch(unFollowUSer(props.id))
        }else{
            dispatch(followUser(props.id))
        }
    }
    

    if( props.id === usuario._id) return <></>

    return (
        <View style={styles.container}>

            {
                props.seguido &&
                <View style={styles.containerFollower}>
                    <Icon style={styles.follower} name='user' size={15} color={'#ccc'} />
                    <Text style={styles.textFollower}>Te sigue</Text>
                </View>
            }

            <View style={styles.subContainer}>

                <View style={styles.image}>
                    <IconProfile onpress={irPerfil} image={props.avatar} width={60} height={60}/>
                </View>

                <View style={styles.containerText}>
                    <Text style={styles.textName} onpress={irPerfil} numberOfLines={2} ellipsizeMode='tail'>{props.name}</Text>
                    {
                    props.biography&&
                    <View style={styles.description}>
                        <Text  style={styles.textDescription} numberOfLines={2} ellipsizeMode='tail'>{props.biography}</Text>
                    </View>
                }
                </View>

                <View style={styles.containerButton}>
                    <CustomButtonFollow               
                        text={ props.siguiendo ? 'Siguiendo' : 'Seguir' } 
                        color={ props.siguiendo ? '#000' : '#fff' }
                        backColor= { props.siguiendo ? '#fff' : '#000' }
                        onPress ={ seguirDejarSeguir } />
                </View>

            </View>
        
        </View>
    )

}


const styles = StyleSheet.create({
    container:{
       flex: 1,
       paddingHorizontal: 10,
       paddingVertical: 10
    },
    containerFollower: {
        flexDirection: 'row'
    },
    follower:{
        paddingLeft: 40,
    },
    textFollower:{
        fontSize: 14,
        color: '#ccc',
        marginLeft: 15
    },
    subContainer:{
        flexDirection: 'row',
        marginTop: 5
    },
    image:{
        marginRight: 10
    },
    containerText:{
        maxWidth: '50%',
    },
    containerButton:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    description:{
        flex: 1,
    },
    textName:{
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        alignSelf: 'flex-start'
    },
    textDescription:{
        color: 'black',
        fontSize: 15,
    },

})