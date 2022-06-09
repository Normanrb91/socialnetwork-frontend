import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { cleanProfileOther, followUser, loadInfoOther, loadPublications, refreshPublicationsOther, unFollowUSer } from '../store/actions/profileOther';

import { Publication } from '../components/Publication';
import { NoPublication } from '../components/NoPublication';
import { HeaderProfile } from '../components/HeaderProfile';


export const ProfileOtherUser = ({ route, navigation }) => {
  
  const dispatch = useDispatch()
  const isMounted = useRef(true)
  const [refresh, setRefresh] = useState(false)
  const {usuarioOther, 
    followMe, 
    follow, 
    followersOther, 
    followingsOther, 
    publicationsProfileOther, 
    nextPageProfileOther, 
    loadingProfileOther} = useSelector( state => state.profileOther);
  
  const {id, name} = route.params

  useEffect(() => {

    if(!isMounted.current) return

    if( id !== usuarioOther?._id){
      dispatch(cleanProfileOther())
    }
    dispatch(loadInfoOther(id))

    return () => {
      isMounted.current = false
    }
  }, [dispatch, id])

  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: name
    })
  }, [name])
  

  const handleOnEndReached = () => {
    if(nextPageProfileOther){
      dispatch(loadPublications(nextPageProfileOther, id))
    }
  }

  const handledRefreshPublication = () => {
    setRefresh(true)
    dispatch(refreshPublicationsOther(id))
    setRefresh(false)
  }

  const seguirDejarSeguir = () => {
    if(follow)
      dispatch(unFollowUSer(usuarioOther._id))
    else
      dispatch(followUser(usuarioOther._id))
  }

  const renderItem = useMemo( () =>
    ({item}) => <Publication props={item} />, 
    [publicationsProfileOther]
  );

  if(loadingProfileOther) return (<ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size={50} color="#FBA741" />)

  return (
    <FlatList 
      style={{ flex: 1 }}
      data={ publicationsProfileOther } 
      extraData={ publicationsProfileOther }
      showsVerticalScrollIndicator={ false }
      keyExtractor={ (publication) => publication.id }
      renderItem={ renderItem } 
      onEndReached={ handleOnEndReached }
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ () =>  <View style={{height: 1,  backgroundColor: '#ccc'}} /> }
      ListHeaderComponent = { 
        <HeaderProfile 
          usuario={usuarioOther} 
          followers={followersOther} 
          followings={followingsOther}
          followMe={followMe}
          text={follow ? 'Siguiendo' : 'Seguir'}
          color={follow ? '#000' : '#fff'}
          backColor={follow ? '#fff' : '#000'}
          onPress={seguirDejarSeguir}
          /> }
      ListEmptyComponent = { <NoPublication texto={'Ninguna publicación realizada'} /> } 
      ListFooterComponent={ nextPageProfileOther && <ActivityIndicator style={{ height: 50 }} size={20} color="#FBA741" /> }
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
