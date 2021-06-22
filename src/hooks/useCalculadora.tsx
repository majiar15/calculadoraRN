import { useState ,useRef } from 'react';

enum operadores {
    suma, resta, multiplicar,dividir
}
export const useCalculadora = () => {

    const [numero, setNumero] = useState('0');
    const [numeroAnterior, setNumeroAnterior] = useState('0');
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
        }
        setNumeroAnterior('0');
    }
    return {
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
        calcular,
    }
}
