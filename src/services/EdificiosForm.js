export const validationsForm = (form) => {
    let errores = {};
    let regexText40 = /^.{1,40}$/;
    let regexCelular = /^\d{1,12}$/;

    if (!form.nombre) {
        errores.nombre = "Please the field is required.";
    } else if (!regexText40.test(form.nombre.trim())) {
        errores.nombre = "The field accepts up to 40 characters.";
    } else{
        errores.nombre = "";
    }

    if (!form.direccion) {
        errores.direccion = "Please the field is required.";
    } else if (!regexText40.test(form.direccion.trim())) {
        errores.direccion = "The field accepts up to 40 characters.";
    } else{
        errores.direccion = "";
    }

    if (!form.ciudad) {
        errores.ciudad = "Please the field is required.";
    } else if (!regexText40.test(form.ciudad.trim())) {
        errores.ciudad = "The field accepts up to 40 characters.";
    } else{
        errores.ciudad = "";
    }

    if (!form.celular) {
        errores.celular = "Please the field is required.";
    } else if (!regexCelular.test(form.celular.trim())) {
        errores.celular = "Only numbers allowed, min 7 max 12 digits.";
    } else{
        errores.celular = "";
    }
 
    if (!form.estado) {
        errores.estado = "Please the field is required.";
    } else if (!regexText40.test(form.estado)) {
        errores.estado = "The field accepts up to 40 characters.";
    } else{
        errores.estado = "";
    }

    return errores;
};

const EdificiosForm = {
    validationsForm,
  };
  
  export default EdificiosForm;