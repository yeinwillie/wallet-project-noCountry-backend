const crypto = require('crypto');

// Generar el numero de cuenta 13 numeros aleatorios
function generarNumeroAleatorio() {
    const digits = 13;
     const maxNumber = Math.pow(10, digits) - 1;
  const randomBytes = crypto.randomBytes(7); // 7 bytes para asegurar un número dentro del rango de 13 dígitos.
  const randomNumber = parseInt(randomBytes.toString('hex'), 16) % maxNumber;
  return randomNumber.toString().padStart(digits, '0');
    
  }
  
  // generar un cbu parcial de 23 digitos
  function generarCbuParcial() { 
    const numeroEntidad = "117";
    const numeroSucursal = "0001";
    const digitoInterno = Math.floor(Math.random() * 10);
  
    const cbuParcial = numeroEntidad + numeroSucursal + generarNumeroAleatorio() + digitoInterno.toString() ;
    return cbuParcial;
  }
  
  // generar el codigo verificador, ultimo digito del cbu
  function calcularDigitoVerificador(cbuBase) {
    const secuencia = [7, 1, 3, 9, 7, 1, 3, 9, 7, 1, 3, 9, 7, 1, 3, 9, 7, 1, 3, 9, 7];
    let suma = 0;
  
    for (let i = 0; i < secuencia.length; i++) {
      suma += parseInt(cbuBase[i]) * secuencia[i];
    }
  
    const resto = suma % 10;
    const digitoVerificador = resto === 0 ? 0 : (10 - resto);
  
    return digitoVerificador;
  }
  
  // Generar un CBU random 
  function generarCbuCompleto() {
    const cbuBase = generarCbuParcial();
    const digitoVerificador = calcularDigitoVerificador(cbuBase);
    const cbuCompleto = cbuBase + digitoVerificador;
    return cbuCompleto;
  }
  

  module.exports = { generarCbuCompleto };