import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { loadPublicationsUser, refreshPublicationsUser } from '../../store/actions/auth';

import { Publication } from '../../components/Publication';
import { NoPublication } from '../../components/NoPublication';
import { HeaderProfile } from '../../components/HeaderProfile';


export const ProfileUser = ({navigation}) => {
  
  const dispatch = useDispatch();
  const list = useRef(null);
  const [refresh, setRefresh] = useState(false)
  const {usuario, followers, followings, publicationsUser, nextPageUser, loadingUser} = useSelector( state => state.auth);
  const renderItem = useMemo(() => ({item}) => <Publication props={item} />, [publicationsUser])

  useEffect(() => {
    if(publicationsUser.length === 0){
      dispatch(loadPublicationsUser(1))
    }
  }, [dispatch])

  useEffect(() => {
    navigation.addListener('tabPress', e => {
        if (navigation.isFocused() && list.current !== null) 
        list.current.scrollToOffset({ y: 0, animated: true })
    })
  }, [navigation])

   
  const handleOnEndReached = () => {
    if(nextPageUser){
      dispatch(loadPublicationsUser(nextPageUser))
    }
  }

  const handledRefreshPublication = () => {
    setRefresh(true)
    dispatch(refreshPublicationsUser())
    setRefresh(false)
  }

  const editarPerfil = () => {
    console.log('editar');
  }

  
  if(loadingUser) return (<ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size={50} color="#FBA741" />)
  
  return (
    <FlatList 
      style={{ flex: 1 }}
      ref={ list } 
      data={ publicationsUser } 
      showsVerticalScrollIndicator={ false }
      keyExtractor={ (publication) => publication.id }
      renderItem={ renderItem } 
      extraData={ publicationsUser }
      onEndReached={ handleOnEndReached }
      ItemSeparatorComponent={ () =>  <View style={{height: 1,  backgroundColor: '#ccc'}} /> }
      ListHeaderComponent = { <HeaderProfile usuario={usuario} followers={followers} followings={followings} onPress={editarPerfil} />}
      ListEmptyComponent = { <NoPublication texto={'Ninguna publicación realizada'} /> } 
      ListFooterComponent={ nextPageUser && <ActivityIndicator style={{ height: 50 }} size={20} color="#FBA741" /> }
      refreshControl={ <RefreshControl refreshing={ refresh } onRefresh = { handledRefreshPublication }/> }
    />
  )
}


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
