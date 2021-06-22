import React, { useRef, useState } from 'react'
import { View, Text } from 'react-native';
import { styles } from '../theme/AppTheme';
import { Boton } from '../components/Boton';
import { useCalculadora } from '../hooks/useCalculadora';


export const CalculadoraScreen = () => {
    const {
        numero,
        numeroAnterior,
        armarNumero,
        limpiar,
        positivoNegativo,
        del,
        dividir,
        multiplicar,
        restar,
        sumar,
        calcular} = useCalculadora()
    return (
        <View style={styles.calculadoraContainer}>
            {
                numeroAnterior === '0'
                ? null
                : <Text style={styles.resultadoPequeno}> {numeroAnterior}</Text>
            }
            
            <Text 
                style={styles.resultado}
                numberOfLines={1}
                adjustsFontSizeToFit
            > {numero}</Text>
            
            {/* fila de botones */}
            <View style={styles.fila}>
                <Boton texto="C"  color="#9b9b9b" accion={limpiar} />
                <Boton texto="+/-" color="#9b9b9b" accion={positivoNegativo}/>
                <Boton texto="del" color="#9b9b9b" accion={del}/>
                <Boton texto="/" color="#ff9427" accion={dividir} />
            </View>


            {/* fila de botones del 7 al 9*/}
            <View style={styles.fila}>
                <Boton texto="7"  accion={ () => armarNumero("7")} />
                <Boton texto="8"  accion={ () => armarNumero("8")}/>
                <Boton texto="9"  accion={ () => armarNumero("9")}/>
                <Boton texto="X" color="#ff9427" accion={multiplicar} />
            </View>

            {/* fila de botones del 4 al 6*/}
            <View style={styles.fila}>
                <Boton texto="4"  accion={ () => armarNumero("4")} />
                <Boton texto="5"  accion={ () => armarNumero("5")}/>
                <Boton texto="6"  accion={ () => armarNumero("6")}/>
                <Boton texto="-" color="#ff9427" accion={restar} />
            </View>

            {/* fila de botones del 1 al 3*/}
            <View style={styles.fila}>
                <Boton texto="1"  accion={ () => armarNumero("1")} />
                <Boton texto="2"  accion={ () => armarNumero("2")}/>
                <Boton texto="3"  accion={ () => armarNumero("3")}/>
                <Boton texto="+" color="#ff9427" accion={sumar}  />
            </View>

            {/* fila de botones del 0 */}
            <View style={styles.fila}>
                <Boton texto="0" accion={ () => armarNumero("0")} ancho/>
                <Boton texto="." accion={ () => armarNumero(".")} />
                <Boton texto="=" color="#ff9427" accion={calcular}/>
            </View>


                {/* <Boton texto="4"/>
                <Boton texto="5"/>
                <Boton texto="6"/>
                <Boton texto="7"/>
                <Boton texto="8"/>
                <Boton texto="9"/>
                <Boton texto="0"/> */}
        </View>
    )
}
