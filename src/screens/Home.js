import React, {useEffect, useRef, useState} from 'react';
import {Text, FlatList, ActivityIndicator, RefreshControl} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { startPublication, startCleanPublication } from '../store/actions/publication'


export const Home = ({navigation}) => {

  const dispatch = useDispatch();
  const list = useRef(null);
  const { publications, nextPage } = useSelector(state => state.publication);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
      navigation.addListener('tabPress', e => {
          if (navigation.isFocused()) 
          list.current.scrollToOffset({ y: 0, animated: true })
      })
  }, [navigation])


  useEffect(() => {
      dispatch(startPublication({ page: 1 }))
  }, [dispatch])


  const handleOnEndReached = () => {
    if(nextPage){
      dispatch(startPublication({ page: nextPage }))
    }
  }

  const refreshPublication = () => {
    setRefresh(true)
    dispatch(startCleanPublication())
    dispatch(startPublication({ page: 1 }))
    setRefresh(false)
  }
  
  return (
    <FlatList 
        style={{ flex: 1 }}
        ref={ list } 
        data={ publications } 
        showsVerticalScrollIndicator={ false }
        keyExtractor={ (publication) => publication._id }
        renderItem={ ({item}) => <Text style={{fontSize: 50}}>{ item.text }</Text> } 
        onEndReached={ handleOnEndReached }
        ListFooterComponent={
            nextPage &&
            <ActivityIndicator 
                style={{ height: 50 }}
                size={20}
                color="#FBA741"
            />
        }
        refreshControl={
            <RefreshControl 
                refreshing={ refresh }
                onRefresh = { refreshPublication }
            />
        }
    />
  )
}
