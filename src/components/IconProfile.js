import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

export const IconProfile = ({focused, image, width = 35, height = 35}) => {
    return (

        <View style={[
            {...styles.container, width, height},
            focused && {borderColor: '#FBA741', borderWidth: 2}
        ]}>
            <Image
                style={styles.image}
                source={{
                    uri: image,
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        borderRadius: 35,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 31
    }
})