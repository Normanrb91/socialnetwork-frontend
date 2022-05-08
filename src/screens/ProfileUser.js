import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../store/actions/auth';
import { loadInfoUser, loadNumberFollowers, loadPublicationsUSer, refreshPublicationsUSer } from '../store/actions/profile';

import { IconProfile } from '../components/IconProfile';
import { CustomButtonFollow } from '../components/CustomButtonFollow';
import { Publication } from '../components/Publication';
import { NoPublication } from '../components/NoPublication';

export const ProfileUser = ({route, navigation}) => {

  const dispatch = useDispatch()
  const list = useRef(null);
  const [refresh, setRefresh] = useState(false)

  const {user, followers, followings, follow, followMe, publications, nextPage, loading} = useSelector( state => state.profile);
  const {usuario} = useSelector( state => state.auth);

  useEffect(() => {
    dispatch(loadInfoUser(route.params.id))
    dispatch(loadPublicationsUSer(1, route.params.id))
    dispatch(loadNumberFollowers(route.params.id))
  }, [dispatch])

  useEffect(() => {
    navigation.addListener('tabPress', e => {
        if (navigation.isFocused()) 
        list.current.scrollToOffset({ y: 0, animated: true })
    })
  }, [navigation])


  const handleOnEndReached = () => {
    if(nextPage){
      dispatch(loadPublicationsUSer(nextPage))
    }
  }

  const handledRefreshPublication = () => {
    setRefresh(true)
    dispatch(refreshPublicationsUSer(user._id))
    setRefresh(false)
  }


  const editarPerfil = () => {
    console.log('editar');
  }

  const seguirDejarSeguir = () => {
    console.log('seguir');
  }

  const onLogout = () => {
    dispatch(startLogout('logout'))
  }

  const onLogoutAll = () => {
    dispatch(startLogout('logoutAll'))
  }

  const listHeaderComponent = () => {
    return (
      <>
        <View style={styles.profile}>
          <IconProfile image={user.avatar} width={100} height={100} />

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
        
          <Text style={{...styles.text, fontSize: 25}}>{user.name}
            <Text style={styles.textOff}>{ user._id === usuario?._id ? '' : followMe && ' - Te sigue' }</Text>
          </Text>

          <Text style={{...styles.text, fontWeight: 'normal'}}>{user.biography}</Text>

          <View style={{ marginVertical: 10,}}>
            <CustomButtonFollow 
              text={ user._id === usuario?._id ? 'Editar Perfil' :  follow ? 'Siguiendo' : 'Seguir'} 
              color={user._id === usuario?._id ? '#000' : follow ? '#000' : '#fff'}
              backColor= {user._id === usuario?._id ? '#fff' : follow ? '#fff' : '#000'}
              onPress ={user._id === usuario?._id ? editarPerfil : seguirDejarSeguir} />
          </View>

        </View>

        <Text style={[styles.text, styles.separador]}>Publicaciones</Text>
      </>
    )
  }

  return (
    <View style={styles.container}>

      <View style={styles.publications}>
      {
        loading ? 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={20} color="#FBA741" /> 
          </View>
          : 
        <FlatList 
          style={{ flex: 1 }}
          ref={ list } 
          data={ publications } 
          showsVerticalScrollIndicator={ false }
          keyExtractor={ (publication) => publication.id }
          renderItem={ ({item}) => <Publication props={item} /> } 
          onEndReached={ handleOnEndReached }
          ItemSeparatorComponent={ () =>  <View style={{height: 1,  backgroundColor: '#ccc'}} /> }
          ListHeaderComponent = {listHeaderComponent}
          ListEmptyComponent = { <NoPublication texto={'Ninguna publicación realizada'} /> } 
          ListFooterComponent={ nextPage && <ActivityIndicator style={{ height: 50 }} size={20} color="#FBA741" /> }
          refreshControl={ <RefreshControl refreshing={ refresh } onRefresh = { handledRefreshPublication }/> }
        />
      }
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  profile: {
 
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  description:{
    paddingHorizontal: 20,
  },
  publications: {
    flex: 1,
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
  textOff:{
    fontSize: 16,
    color: '#3c3c3c',
    fontWeight: 'normal',
    letterSpacing: 0.25,
  },
  separador: {
    fontSize: 20, 
    paddingHorizontal: 20, 
    marginTop: 20, 
    borderBottomWidth: 3, 
    borderBottomColor: '#FBA741'
  }
})


{/* <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
<CustomButton 
    backColor='#FBA741' 
    color='#fff' 
    onPress={onLogout}
    text='Logout' 
/>

<CustomButton 
    backColor='#FBA741' 
    color='#fff' 
    onPress={onLogoutAll}
    text='Logout All' 
/>
</View> */}
