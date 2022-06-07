import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../store/actions/search';

import { SearchBar } from '../../components/SearchBar';
import { SearchUser } from '../../components/SearchUser';

export const Search = ({navigation}) => {

  const list = useRef(null);
  const dispatch = useDispatch();
  const { users, page } = useSelector(state => state.search);
  const [text, onChangeText] = useState('');

  useEffect(() => {
    navigation.addListener('tabPress', e => {
      if (navigation.isFocused() && list.current !== null) 
        list.current.scrollToOffset({ y: 0, animated: true })
    })
}, [navigation])


  const handleOnEndReached = () => {
    if(page){
      dispatch(searchUser(text, page))
    }
  }


  return (
    <View style={{flex: 1}}>

      <SearchBar 
        onChangeText={onChangeText} 
        text={text} />

      <View style={styles.container}>

        <FlatList 
          style={{ flex: 1 }}
          ref={ list } 
          data={ users } 
          showsVerticalScrollIndicator={ false }
          keyExtractor={ (users) => users._id }
          renderItem={ ({item}) => <SearchUser props={item} /> } 
          onEndReached={ handleOnEndReached }
          ItemSeparatorComponent={ () =>  <View style={{height: 1,  backgroundColor: '#ccc', marginVertical: 10}} /> }
          ListFooterComponent={page && <ActivityIndicator style={{ height: 50 }} size={20} color="#FBA741" /> }
          />

      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    marginTop: 10, 
    marginHorizontal: 10,
    flex: 1
  },

})
