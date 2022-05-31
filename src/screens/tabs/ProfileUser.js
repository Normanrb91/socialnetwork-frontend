import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, TouchableHighlight, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import { useDispatch, useSelector } from 'react-redux';
import { loadFollowersProfile, loadFollowingsProfile, loadPublicationsProfile, refreshPublicationsProfile } from '../../store/actions/profile';
import { startLogout } from '../../store/actions/auth';

import { Publication } from '../../components/Publication';
import { NoPublication } from '../../components/NoPublication';
import { HeaderProfile } from '../../components/HeaderProfile';
import { OptionModal } from '../../components/OptionModal';

import Icon from 'react-native-vector-icons/FontAwesome';
import Oticons from 'react-native-vector-icons/Octicons';

export const ProfileUser = ({navigation}) => {
  
  const dispatch = useDispatch();
  const list = useRef(null);
  const [refresh, setRefresh] = useState(false)
  const [openModalProfile, setOpenModalProfile] = useState(false)
  const {usuario} = useSelector( state => state.auth);
  const {publicationsProfile, 
    followers, 
    followings, 
    nextPageProfile, 
    loadingProfile} = useSelector( state => state.profile);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>

          <TouchableOpacity 
            activeOpacity={0.8} 
            style={{marginRight: 40}}
            onPress={()=> navigation.navigate('New')}>
            <Icon
              name={'plus-square-o'}
              color={'black'}
              size={28} />
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={0.8} 
            style={{marginRight: 30}}
            onPress={() => setOpenModalProfile(true)}>
            <Icon
              name={'bars'}
              color={'black'}
              size={25} />
          </TouchableOpacity>

        </View>
      )
    })
  }, [])
  

  useEffect(() => {
    if(loadingProfile){
      dispatch(loadPublicationsProfile(1))
      dispatch(loadFollowersProfile())
      dispatch(loadFollowingsProfile())
    }
  }, [dispatch])


  useEffect(() => {
    navigation.addListener('tabPress', e => {
        if (navigation.isFocused() && list.current !== null) 
        list.current.scrollToOffset({ y: 0, animated: true })
    })
  }, [navigation])

   
  const handleOnEndReached = () => {
    if(nextPageProfile){
      dispatch(loadPublicationsProfile(nextPageProfile))
    }
  }

  const handledRefreshPublication = () => {
    setRefresh(true)
    dispatch(refreshPublicationsProfile())
    setRefresh(false)
  }

  const editarPerfil = () => {
    setOpenModalProfile(false)
    navigation.navigate('EditProfile');
    
  }

  const onLogout = () => {
    dispatch(startLogout('logout'))
  }

  const onLogoutAll = () => {
    dispatch(startLogout('logoutAll'))
    
  }

  
  if(loadingProfile) return (<ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size={50} color="#FBA741" />)
  
  return (
    <>
      <FlatList 
        style={{ flex: 1 }}
        ref={ list } 
        data={ publicationsProfile } 
        showsVerticalScrollIndicator={ false }
        keyExtractor={ (publication) => publication.id }
        renderItem={ ({item}) => <Publication props={item} /> } 
        extraData={ publicationsProfile }
        onEndReached={ handleOnEndReached }
        ItemSeparatorComponent={ () =>  <View style={{height: 1,  backgroundColor: '#ccc'}} /> }
        ListHeaderComponent = { <HeaderProfile usuario={usuario} followers={followers} followings={followings} onPress={editarPerfil} />}
        ListEmptyComponent = { <NoPublication texto={'Ninguna publicación realizada'} /> } 
        ListFooterComponent={ nextPageProfile && <ActivityIndicator style={{ height: 50 }} size={20} color="#FBA741" /> }
        refreshControl={ <RefreshControl refreshing={ refresh } onRefresh = { handledRefreshPublication }/> }
      />

    <Modal 
      backdropOpacity={0.4} 
      isVisible={openModalProfile} 
      onBackdropPress={() => setOpenModalProfile(false)} 
      onSwipeComplete={() => setOpenModalProfile(false)}
      swipeDirection ="down"
      style={styles.modalTop}>

      <View style={styles.containerModal}>
        <View style={styles.dash}>
          <Oticons
              size={40}
              color={'black'}
              name={'dash'} /> 
        </View>
        <OptionModal icon={'plus-square'} onPress={()=> navigation.navigate('New')} text={'Nueva Publicación'} />
        <OptionModal icon={'gear'} onPress={editarPerfil} text={'Editar Perfil'} />
        <OptionModal icon={'sign-out'} onPress={onLogout} text={'Cerrar Sesión'} />
        <OptionModal icon={'sign-out'} onPress={onLogoutAll} text={'Cerrar Todas las Sesiones'} />
      </View>
    
    </Modal>
  </>
  )
}

const styles = StyleSheet.create({
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

