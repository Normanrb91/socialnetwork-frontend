import React from 'react';
import { View, ActivityIndicator, StyleSheet} from 'react-native';


export const Loading = () => {
  return (
    <View style={styles.container}>
        <ActivityIndicator
            size={50} 
            color= '#fff'/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems:'center', 
        backgroundColor: '#FBA741'
    }
})
