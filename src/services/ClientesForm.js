export const validationsForm = (form) => {
    let errores = {};
    let regexText40 = /^.{1,60}$/;
    let regexText100 = /^.{1,100}$/;

    if (!form.nit) {
        errores.nit = "Por favor, este campo es requerido.";
    } else if (!regexText100.test(form.nit.trim())) {
        errores.nit = "El campo acepta hasta 40 caracteres.";
    } else {
        errores.nit = "";
    }

    if (!form.razonsocial) {
        errores.razonsocial = "Por favor, este campo es requerido.";
    } else if (!regexText100.test(form.razonsocial.trim())) {
        errores.razonsocial = "El campo acepta hasta 40 caracteres.";
    } else {
        errores.razonsocial = "";
    }

    if (!form.nombrecontacto) {
        errores.nombrecontacto = "Por favor, este campo es requerido.";
    } else if (!regexText40.test(form.nombrecontacto.trim())) {
        errores.nombrecontacto = "El campo acepta hasta 40 caracteres.";
    } else {
        errores.nombrecontacto = "";
    }

    if (!form.apellidocontacto) {
        errores.apellidocontacto = "Por favor, este campo es requerido.";
    } else if (!regexText40.test(form.apellidocontacto.trim())) {
        errores.apellidocontacto = "El campo acepta hasta 40 caracteres.";
    } else {
        errores.apellidocontacto = "";
    }

    let regexCorreo = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!form.correo) {
        errores.correo = "Por favor, este campo es requerido.";
    } else if (!regexCorreo.test(form.correo.trim())) {
        errores.correo = "El campo debe ser una dirección de correo válida.";
    } else {
        errores.correo = "";
    }

    let regexTelefono = /^\d{7,12}$/;
    if (!form.telefono) {
        errores.telefono = "Por favor, este campo es requerido.";
    } else if (!regexTelefono.test(form.telefono.trim())) {
        errores.telefono = "Solo se permiten números, mínimo 7 y máximo 12 dígitos.";
    } else {
        errores.telefono = "";
    }

    return errores;
};

const ClientesForm = {
    validationsForm,
};

export default ClientesForm;