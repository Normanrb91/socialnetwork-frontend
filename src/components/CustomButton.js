import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native'

export const CustomButton = ({ backColor = "#ccc", color, onPress, text }) => {
    return (
        <TouchableOpacity activeOpacity={0.8}
            onPress = {onPress}>

            <View style={{
                ...styles.button,
                backgroundColor: backColor,
            }}>
                <Text style={{
                    ...styles.text,
                    color: color
                }}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        width: 130,
        height: 45,
        borderRadius: 10,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        lineHeight: 40
    }
});
  