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

    let regexCelular = /^\d{7,12}$/;
    if (!form.celular) {
        errores.celular = "Please the field is required.";
    } else if (!regexCelular.test(form.celular.trim())) {
        errores.celular = "Only numbers allowed, min 7 and max 12 digits.";
    } else{
        errores.celular = "";
    }

    let regexCorreo = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!form.correo) {
        errores.correo = "Please the field is required.";
    } else if (!regexCorreo.test(form.correo.trim())) {
        errores.correo = "The field must be a valid email address.";
    } else{
        errores.correo = "";
    }

    if (!form.estado) {
        errores.estado = "Please select a state.";
    } else {
        errores.estado = "";
    }

    return errores;
};

const ClientesForm = {
    validationsForm,
  };
  
  export default ClientesForm;