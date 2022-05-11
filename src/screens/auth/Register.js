import React, { useEffect } from 'react';
import {Text, View, StyleSheet, ScrollView, Alert} from 'react-native';
import {useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';

import { removeError, startSingUp } from '../../store/actions/auth';

import { EMAIL_REGEX } from '../../libs/constans/constants';



export const Register = ({navigation}) => {

    const dispatch = useDispatch();
    const { errorMessage } = useSelector(state => state.auth);

    const {control, handleSubmit, formState: {errors} } = useForm();

    useEffect(() => {
        if(errorMessage.length === 0) return;

        Alert.alert('Error Registro', errorMessage, [{
            text: 'Ok', 
            onPress: () => dispatch(removeError())
        }]);

    }, [errorMessage])

    const onRegister = async ({name, email, password, password2}) => {
        if(password !== password2) 
            return Alert.alert('Error Registro', 'Las contraseñas deben ser identicas')
            dispatch(startSingUp(name, email, password))
    }

    return (

        <ScrollView 
            keyboardShouldPersistTaps = 'handled'
            style = {{flex: 1, backgroundColor: '#fff'}}>

            <View style={styles.container}>

                <Text style={styles.title}>Crear Cuenta</Text>

                <CustomInput 
                    name="name"
                    icon={"account-outline"}
                    placeholder={"Nombre"}
                    control={control}
                    rules={{required: 'Nombre es obligatorio'}}
                />

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

                <CustomInput 
                    name="password2"
                    icon={"lock-outline"}
                    placeholder={"Confirmar Contrseña"}
                    control={control}
                    secureTextEntry={true}
                    rules={{
                        required: 'Contraseña es obligatoria',
                        minLength: {
                            value: 6,
                            message: 'Contaseña al menos 6 caracteres',
                        }
                    }}
                />

                <View style={styles.buttonContainer}>
                    <CustomButton 
                        backColor='#FBA741'
                        color='#fff' 
                        onPress={handleSubmit(onRegister)} 
                        text='Registrar' 
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>¿Ya tienes cuenta?, 
                        <Text style={styles.link} onPress={() => navigation.navigate('Login')}> Accede</Text>
                    </Text>
                </View>
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
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
        marginVertical: 20
    },
    link:{
        color: '#FBA741',
        fontWeight: 'bold'
    },
    text:{
        color: '#9b9b9b',
        fontWeight: '600'
    }
})