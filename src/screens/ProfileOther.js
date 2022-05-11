import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { Publication } from '../components/Publication';
import { NoPublication } from '../components/NoPublication';
import { HeaderProfile } from '../components/HeaderProfile';
import { cleanProfileOther, followUser, loadInfo, loadPublications, refreshPublications, unFollowUSer } from '../store/actions/profileOther';


export const ProfileOtherUser = ({ route, navigation }) => {
  
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState(false)
  const {usuario, followers, followings, publications, followMe, follow, nextPage, loading} = useSelector( state => state.profileOther);
  const renderItem = useMemo(() => ({item}) => <Publication props={item} />, [publications])
  const {id, name} = route.params

  useEffect(() => {
    if( id !== usuario?._id){
      dispatch(cleanProfileOther())
    }

    dispatch(loadInfo(id))

  }, [dispatch])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name
    })
  }, [])

  const handleOnEndReached = () => {
    if(nextPage){
      dispatch(loadPublications(nextPage, id))
    }
  }

  const handledRefreshPublication = () => {
    setRefresh(true)
    dispatch(refreshPublications(id))
    setRefresh(false)
  }

  const seguirDejarSeguir = () => {
    if(follow)
      dispatch(unFollowUSer(usuario._id))
    else
      dispatch(followUser(usuario._id))
  }


  if(loading) return (<ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size={50} color="#FBA741" />)

  return (
    <FlatList 
      style={{ flex: 1 }}
      data={ publications } 
      showsVerticalScrollIndicator={ false }
      keyExtractor={ (publication) => publication.id }
      renderItem={ renderItem } 
      extraData={ publications }
      onEndReached={ handleOnEndReached }
      ItemSeparatorComponent={ () =>  <View style={{height: 1,  backgroundColor: '#ccc'}} /> }
      ListHeaderComponent = { 
        <HeaderProfile 
          usuario={usuario} 
          followers={followers} 
          followings={followings}
          followMe={followMe}
          text={follow ? 'Dejar de seguir' : 'Seguir'}
          color={follow ? '#fff' : '#000'}
          backColor={follow ? '#000' : '#fff'}
          onPress={seguirDejarSeguir}
          /> }
      ListEmptyComponent = { <NoPublication texto={'Ninguna publicación realizada'} /> } 
      ListFooterComponent={ nextPage && <ActivityIndicator style={{ height: 50 }} size={20} color="#FBA741" /> }
      refreshControl={ <RefreshControl refreshing={ refresh } onRefresh = { handledRefreshPublication }/> }
    />
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
    height: 1,  
    backgroundColor: '#ccc'
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
