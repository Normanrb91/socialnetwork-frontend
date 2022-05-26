import React, {useEffect, useMemo, useRef, useState} from 'react';
import { FlatList, ActivityIndicator, RefreshControl, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { loadPublicationsHome, refreshPublicationsHome } from '../../store/actions/home';

import { Publication } from '../../components/Publication';
import { NoPublication } from '../../components/NoPublication';


export const Home = ({navigation}) => {

  const dispatch = useDispatch();
  const list = useRef(null);
  const { publicationsHome, nextPageHome, loadingHome } = useSelector(state => state.home);
  const [refresh, setRefresh] = useState(false);
  const renderItem = useMemo(() => ({item}) => <Publication props={item} />, [publicationsHome])
  
  useEffect(() => {
    if(publicationsHome.length === 0){
      dispatch(loadPublicationsHome(1))
    }
  }, [dispatch])

  useEffect(() => {
      navigation.addListener('tabPress', e => {
        if (navigation.isFocused() && list.current !== null) 
          list.current.scrollToOffset({ y: 0, animated: true })
      })
  }, [navigation])

  const handleOnEndReached = () => {
    if(nextPageHome){
      dispatch(loadPublicationsHome(nextPageHome))
    }
  }

  const handledRefreshPublication = () => {
    setRefresh(true)
    dispatch(refreshPublicationsHome())
    setRefresh(false)
  }

  if(loadingHome) return (<ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size={50} color="#FBA741" />)
  
  return (
      <FlatList 
        style={{ flex: 1 }}
        ref={ list } 
        data={ publicationsHome } 
        showsVerticalScrollIndicator={ false }
        keyExtractor={ (publication) => publication.id }
        renderItem={ renderItem } 
        extraData={ publicationsHome }
        onEndReached={ handleOnEndReached }
        ItemSeparatorComponent={ () =>  <View style={{height: 1,  backgroundColor: '#ccc', marginVertical: 10}} /> }
        ListEmptyComponent = { <NoPublication texto={'Empieza a seguir a tus amigos para ver sus publicaciones'} /> } 
        ListFooterComponent={nextPageHome && <ActivityIndicator style={{ height: 50 }} size={20} color="#FBA741" /> }
        refreshControl={ <RefreshControl refreshing={ refresh } onRefresh = { handledRefreshPublication } /> }
      />
  )
}
