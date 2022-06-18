import React, { useEffect } from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';

import { removeError, startSingIn } from '../../store/actions/auth';

import { EMAIL_REGEX } from '../../libs/constans/constants';


export const Login = ({navigation}) => {

    const dispatch = useDispatch();
    const { errorMessage } = useSelector(state => state.auth);

    const {control, handleSubmit, formState: {errors} } = useForm();
    
    useEffect(() => {
        if(errorMessage.length === 0) return;

        Alert.alert('Error Login', errorMessage, [{
            text: 'Ok', 
            onPress: () => dispatch(removeError())
        }]);

    }, [errorMessage])
    

    const onLogin = async ({email, password}) => {
        dispatch(startSingIn(email, password))
    }

    return (
        
        <View style={styles.container} >

            <Text style={styles.title}>Login</Text>

            <CustomInput 
                name="email"
                icon={"email-outline"}
                placeholder={"Email"}
                control={control}
                rules={{
                    required: 'Email es obligatorio',
                    pattern: {value: EMAIL_REGEX, message: 'Email no valido'},
                }}
            />
            
            <CustomInput 
                name="password"
                icon={"lock-outline"}
                placeholder={"Contrseña"}
                control={control}
                secureTextEntry={true}
                rules={{
                    required: 'Contraseña es obligatoria',
                    minLength: {
                      value: 6,
                      message: 'Contaseña al menos 6 caracteres',
                    },
                }}
            />

            <View style={styles.buttonContainer}>
                <CustomButton 
                    backColor='#FBA741' 
                    color='#fff' 
                    onPress={handleSubmit(onLogin)} 
                    text='Acceder' 
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>¿No tienes cuenta?, 
                    <Text style={styles.link} onPress={()=> navigation.navigate('Register')}> Registrate</Text>
                </Text>
            </View>

        </View>
       
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 50,
        paddingTop: 100
    },
    title:{
        alignSelf: 'flex-start',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20
    },
    buttonContainer:{
        alignSelf: 'flex-end',
        marginTop: 30
    },
    textContainer:{
        alignSelf: 'flex-end',
        marginTop: 20
    },
    link:{
        color: '#FBA741',
        fontWeight: 'bold'
    },
    text:{
        color: 'black',
        fontWeight: '600'
    }
})
