import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export const IconProfile = ({focused = false, image, width = 35, height = 35, onpress = undefined}) => {
    return (

        <View onTouchStart={onpress} style={[
            {...styles.container, height, width},
            focused && {borderColor: '#FBA741', borderWidth: 2}
        ]}>

            {
                (image) ? 
                <Image
                    style={{...styles.image, resizeMode: 'center'}}
                    source={{ uri: image }}  /> 
                :
                <Image
                    style={{...styles.image, width, resizeMode: 'center'}}
                    source={require('../../assets/noimage.png')}/>
            }
            
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 500,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        borderRadius: 100,
        margin: 2,
    }
})