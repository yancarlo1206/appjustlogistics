export const validationsForm = (form) => {
    let errores = {};
    let regexText40 = /^.{1,40}$/;

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

    if (!form.ubicacion) {
        errores.ubicacion = "Please the field is required.";
    } else if (!regexText40.test(form.ubicacion.trim())) {
        errores.ubicacion = "The field accepts up to 40 characters.";
    } else{
        errores.ubicacion = "";
    }

    if (!form.administrador) {
        errores.administrador = "Please the field is required.";
    } else if (!regexText40.test(form.administrador.trim())) {
        errores.administrador = "The field accepts up to 40 characters.";
    } else{
        errores.administrador = "";
    }

    if (!form.celular) {
        errores.celular = "Please the field is required.";
    } else if (!regexText40.test(form.celular.trim())) {
        errores.celular = "The field accepts up to 40 characters.";
    } else{
        errores.celular = "";
    }

    if (!form.observacion) {
        errores.observacion = "Please the field is required.";
    } else if (!regexText40.test(form.observacion.trim())) {
        errores.observacion = "The field accepts up to 40 characters.";
    } else{
        errores.observacion = "";
    }

    return errores;
};

const EdificiosForm = {
    validationsForm,
  };
  
  export default EdificiosForm;