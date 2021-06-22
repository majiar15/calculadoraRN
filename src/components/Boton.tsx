import React, { Props } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../theme/AppTheme';

interface botonI {
    texto: string,
    color?: string,
    ancho?: boolean,
    accion?: () => void,
}

export const Boton = ({texto, color = '#2D2D2D',ancho= false, accion}: botonI) => {

    return (
        <TouchableOpacity
            onPress={accion}
        >
            <View style={{
                ...styles.boton,
                backgroundColor: color,
                width: (ancho) ? 180 : 80
                }
            }>
                    <Text style={{
                        ...styles.botonTexto,
                        color: (color === '#9b9b9b') ? 'black' : 'white',
                        }} > {texto} </Text>
                </View>
        </TouchableOpacity>

    )
}
