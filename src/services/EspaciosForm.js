export const validationsForm = (form) => {
    let errores = {};
    let regexText40 = /^.{1,40}$/;

    if (!form.edificio) {
        errores.edificio = "Please the field is required.";
    } else{
        errores.edificio = "";
    }

    if (!form.apartamento) {
        errores.apartamento = "Please the field is required.";
    } else{
        errores.apartamento = "";
    }

    if (!form.nombre) {
        errores.nombre = "Please the field is required.";
    } else if (!regexText40.test(form.nombre.trim())) {
        errores.nombre = "The field accepts up to 40 characters.";
    } else{
        errores.nombre = "";
    }

    if (!form.alto) {
        errores.alto = "Please the field is required.";
    } else if (isNaN(form.alto) || Number(form.alto) < 0) {
        errores.alto = "The field must be a valid number (cm).";
    } else{
        errores.alto = "";
    }

    if (!form.ancho) {
        errores.ancho = "Please the field is required.";
    } else if (isNaN(form.ancho) || Number(form.ancho) < 0) {
        errores.ancho = "The field must be a valid number (cm).";
    } else{
        errores.ancho = "";
    }

    if (!form.factor) {
        errores.factor = "Please the field is required.";
    } else if (isNaN(form.factor) || Number(form.factor) < 0) {
        errores.factor = "The field must be a valid number.";
    } else{
        errores.factor = "";
    }

    if (!form.precio) {
        errores.precio = "Please the field is required.";
    } else if (isNaN(form.precio) || Number(form.precio) < 0) {
        errores.precio = "The field must be a valid number.";
    } else{
        errores.precio = "";
    }

    if (!form.estado) {
        errores.estado = "Please the field is required.";
    } else{
        errores.estado = "";
    }

    return errores;
};

const EspaciosForm = {
    validationsForm,
  };
  
  export default EspaciosForm;