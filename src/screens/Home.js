import React, {useEffect, useRef, useState} from 'react';
import { FlatList, ActivityIndicator, RefreshControl, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadPublications, refreshPublications } from '../store/actions/publications';
import { Publication } from '../components/Publication';
import { NoPublication } from '../components/NoPublication';


export const Home = ({navigation}) => {

  const dispatch = useDispatch();
  const list = useRef(null);
  const { publications, nextPage } = useSelector(state => state.publications);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
      navigation.addListener('tabPress', e => {
          if (navigation.isFocused()) 
          list.current.scrollToOffset({ y: 0, animated: true })
      })
  }, [navigation])

  const handleOnEndReached = () => {
    if(nextPage){
      dispatch(loadPublications(nextPage))
    }
  }

  const handledRefreshPublication = () => {
    setRefresh(true)
    dispatch(refreshPublications())
    setRefresh(false)
  }

  return (
    <FlatList 
      style={{ flex: 1 }}
      ref={ list } 
      data={ publications } 
      showsVerticalScrollIndicator={ false }
      keyExtractor={ (publication) => publication.id }
      renderItem={ ({item}) => <Publication props={item} /> } 
      onEndReached={ handleOnEndReached }
      ItemSeparatorComponent={ () =>  <View style={{height: 1,  backgroundColor: '#ccc', marginVertical: 10}} /> }
      ListEmptyComponent = { <NoPublication texto={'Empieza a seguir a tus amigos para ver sus publicaciones'} /> } 
      ListFooterComponent={nextPage && <ActivityIndicator style={{ height: 50 }} size={20} color="#FBA741" /> }
      refreshControl={ <RefreshControl refreshing={ refresh } onRefresh = { handledRefreshPublication } /> }
    />
  )
}
