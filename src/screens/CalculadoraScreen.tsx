import React, { useRef, useState } from 'react'
import { View, Text } from 'react-native';
import { styles } from '../theme/AppTheme';
import { Boton } from '../components/Boton';

enum operadores {
    suma, resta, multiplicar,dividir
}
export const CalculadoraScreen = () => {
    const [numero, setNumero] = useState('100');
    const [numeroAnterior, setNumeroAnterior] = useState('100');
    const ultimaOperacion = useRef<operadores>(1);
    const limpiar = ()=>{
        setNumero('0');
        setNumeroAnterior('0');
    }
    const armarNumero = (numeroTexto: string)=>{    
        if(numero.includes('.') && numeroTexto == '.') return;
        if(numero.startsWith("0") || numero.startsWith("-0")) {
            if(numeroTexto === '.'){
                setNumero(numero + numeroTexto);
            }else if(numeroTexto === '0' && numero.includes('.')){
                setNumero(numero + numeroTexto);
            }else if(numeroTexto != '0' && numero === '0'){
                setNumero(numeroTexto);
            }else if(numero === '0' && !numero.includes('.')){
                setNumero(numeroTexto);
            }else{
                setNumero(numero+numeroTexto);
            }
        }else{
            setNumero(numero+numeroTexto);
        }    
    }
    const positivoNegativo = () =>{
        if(numero.includes('-')){
            setNumero(numero.replace('-',''));
        }else{
            if(numero === '0') return;
            
            setNumero('-'+numero);
        }
    }
    const del = () =>{
        if(numero.length === 1){
            setNumero('0');
        }else if(numero.length === 2){
            if(numero.includes('-')){
                setNumero('0');
            }
            else{
                setNumero('0');
            }
        }else{
            setNumero(numero.substring(0,numero.length -1))
        }
    }
    const historial = ()=>{
        if(numero.endsWith('.')){
            setNumeroAnterior(numero.slice(0,-1));
            setNumero('0');
        }else{   
            setNumeroAnterior(numero);
            setNumero('0');
        }
    }
    const dividir = ()=>{
        historial();
        ultimaOperacion.current = operadores.dividir;
    }
    const multiplicar = ()=>{
        historial();
        ultimaOperacion.current = operadores.multiplicar;
    }
    const restar = ()=>{
        historial();
        ultimaOperacion.current = operadores.resta;
    }
    const sumar = ()=>{
        historial();
        ultimaOperacion.current = operadores.suma;
    }
    const calcular = () =>{
        const numeroUno = Number(numero);
        const numeroDos = Number(numeroAnterior);
        switch (ultimaOperacion.current) {
            case operadores.suma:
                setNumero(`${numeroUno + numeroDos}`);
                break;
            case operadores.resta:
                setNumero(`${numeroDos - numeroUno}`);
                break;
            case operadores.multiplicar:
                setNumero(`${numeroUno * numeroDos}`);
                break;
            case operadores.dividir:
                setNumero(`${numeroDos / numeroUno}`);
                break;

            default:
                break;
        }
        setNumeroAnterior('0');
    }
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
