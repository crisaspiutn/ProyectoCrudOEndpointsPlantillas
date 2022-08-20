function formatea_fecha(f) {
    return rehace_dia(f.getDay()) + " " + f.getDate() + "/" + (rehace_mes(f.getMonth())) + "/" + f.getFullYear() + "  " + f.getHours() + ":" + zfill(f.getMinutes(),2)
}

function rehace_dia(f) {
    switch (f) {
        case 0:
            return "domingo"
        case 1:
            return "lunes"
        case 2:
            return "martes"
        case 3:
            return "miercoles"
        case 4:
            return "jueves"
        case 5:
            return "viernes"
        case 6:
            return "sabado"
    }
}

function rehace_mes(f) {
    switch (f) {
        case 0:
            return "enero"
        case 1:
            return "febrero"
        case 2:
            return "marzo"
        case 3:
            return "abril"
        case 4:
            return "mayo"
        case 5:
            return "junio"
        case 6:
            return "julio"
        case 7:
            return "agosto"
        case 8:
            return "septiembre"
        case 9:
            return "octubre"
        case 10:
            return "noviembre"
        case 11:
            return "diciembre"
    }
}

function zfill(number, width) {// usado para completar el minuto con 0
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}