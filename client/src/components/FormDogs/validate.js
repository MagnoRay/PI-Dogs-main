const soloString = (n) => {
    if (/^\D+$/.test(n)) {
        return true;
      }
      return false;
}

const soloNumber = (n) => {
    if (/^\d+$/.test(n)) {
        return true;
      }
      return false;
}

const soloMimimo = (a,b) => {
    if(a<b){
        return true;
    }else if(b>a){
        return true;
    }
    return false;
}



export const validate = (input) => {
    let errors  = {}
    if(!input.name || input.name.length < 3){
        errors.name = "Por favor ingresa un nombre";
    }else if(!soloString(input.name)) errors.name = "Solo Caracteres";

    else if(!input.name.match((/^[A-Za-z]+$/))) errors.name = "No debe tener caracteres especiales";

    else if(!soloNumber(input.heightmin)) errors.heightmin = "Solo Números";

    else if(!soloMimimo(parseInt(input.heightmin), parseInt(input.heightmax))) errors.heightmin = "Debe ser menor que el máximo";

    else if(!soloNumber(input.heightmax)) errors.heightmax = "Solo Números";

    else if(!soloMimimo(parseInt(input.heightmin), parseInt(input.heightmax))) errors.heightmax = "Debe ser mayor que el mínimo"

    else if(!soloNumber(input.weightmin)) errors.weightmin = "Solo Números";

    else if(!soloMimimo(parseInt(input.weightmin), parseInt(input.weightmax))) errors.weightmin = "Debe ser menor que el máximo";

    else if(!soloNumber(input.weightmax)) errors.weightmax = "Solo Números";

    else if(!soloMimimo(parseInt(input.weightmin), parseInt(input.weightmax))) errors.weightmax = "Debe ser mayor que el mínimo";

    else if(!input.life_span) errors.life_span = "No puedo ser vacío";

    else if(!input.image) errors.image = "No puedo ser vacío";

    else if(input.temperament.length===0) errors.temperament = "Debe seleccionar al menos un temperamento";

    return errors;
}