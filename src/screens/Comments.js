import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator, RefreshControl, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { cleanPublicationActive, loadListComments, newComment, refreshListComments } from '../store/actions/publication'
import { Comment } from '../components/Comment';
import { IconProfile } from '../components/IconProfile';

export const Comments = ({route}) => {

    const { id } = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(false);
    const [text, onChangeText] = useState('');
    const [disable, setDisable] = useState(true);
    const { usuario } = useSelector(state => state.auth);
    const { listComments, pageComments, publicationId, loading } = useSelector(state => state.publicationActive) 


    useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Comentarios'
      })
    }, [])

    useEffect(() => {
        if( id !== publicationId){
            dispatch(cleanPublicationActive())
        }
       dispatch(loadListComments(id, 1))

    }, [dispatch, id])
    
    useEffect(() => {
        if(text.length > 0 ){
          setDisable(false)
        }else{
          setDisable(true)
        }
      }, [text, disable]);
  

    const handleOnEndReached = () => {
        if(pageComments){
          dispatch(loadListComments(id ,pageComments))
        }
    }

    const handledRefreshComments = () => {
        setRefresh(true)
        dispatch(refreshListComments(id))
        setRefresh(false)
    }

    const createComment = () => {
        dispatch(newComment(text, id))
        onChangeText('')
    }

    if(loading) return (<ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size={50} color="#FBA741" />)
        
    return (
        <View style={styles.container}>

            <FlatList 
                style={{ flex: 1 }}
                data={ listComments } 
                showsVerticalScrollIndicator={ false }
                keyExtractor={ (listComments) => listComments._id }
                renderItem={ ({item}) => <Comment props={item} /> } 
                extraData={ listComments }
                onEndReached={ handleOnEndReached }
                ListFooterComponent={ pageComments && <ActivityIndicator style={{ height: 50 }} size={20} color="#FBA741" /> }
                refreshControl={ <RefreshControl refreshing={ refresh } onRefresh = { handledRefreshComments }/> }
                />

            <View style={styles.containerInput}>
                <IconProfile width={45} height={45} image={usuario.avatar?.secure_url} />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text} 
                    autoCorrect={false}
                    autoFocus={true}
                    maxLength={300}
                    placeholder={'Añade un comentario'}
                    placeholderTextColor='rgba(0,0,0,0.4)'/>      

                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={disable ? {...styles.btnPublicar, backgroundColor: 'rgba(251, 167, 65, 0.6)'} : styles.btnPublicar}
                    disabled={disable}
                    onPress={() => createComment()}>
                    <Text style={styles.txtBtn}>Publicar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    containerInput:{
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 5,
        
    },
    input:{
        marginLeft: 15,
        padding: 0,
        flex: 1,
        color: 'black',
        fontSize: 18,
        letterSpacing: 0.5,
        maxHeight: 250,
        marginLeft: 10
      },
      txtBtn:{
        fontSize: 18,
        fontWeight: '600',
        color: 'white'
      },
      btnPublicar:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FBA741',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginLeft: 10
      },
  })