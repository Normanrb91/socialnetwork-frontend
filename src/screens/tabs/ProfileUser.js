import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, TouchableHighlight, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal'

import { useDispatch, useSelector } from 'react-redux';
import { loadFollowersProfile, loadFollowingsProfile, loadPublicationsProfile, refreshPublicationsProfile } from '../../store/actions/profile';
import { startLogout } from '../../store/actions/auth';

import { Publication } from '../../components/Publication';
import { NoPublication } from '../../components/NoPublication';
import { HeaderProfile } from '../../components/HeaderProfile';
import { OptionModal } from '../../components/OptionModal';

import Icon from 'react-native-vector-icons/FontAwesome';

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
  
  const renderItem = useMemo(() => ({item}) => <Publication props={item} />, [publicationsProfile])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          activeOpacity={0.8} 
          style={{marginRight: 20}}
          onPress={() => setOpenModalProfile(true)}>
          <Icon
            name={'bars'}
            color={'black'}
            size={25} />
        </TouchableOpacity>
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
    console.log('editar');
    
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
        renderItem={ renderItem } 
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
      style={styles.modalTop}>

      <View style={styles.containerModal}>
        <OptionModal icon={'gear'} onPress={editarPerfil} text={'Editar Perfil'} />
        <OptionModal icon={'sign-out'} onPress={onLogout} text={'Cerrar Sesión'} />
        <OptionModal icon={'user-times'} onPress={onLogoutAll} text={'Cerrar Todas las Sesiones'} />
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
    }
})

