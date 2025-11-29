export const validationsForm = (form) => {
    let errores = {};
    let regexText40 = /^.{1,40}$/;

    if (!form.nit) {
        errores.nit = "Please the field is required.";
    } else if (!regexText40.test(form.nit.trim())) {
        errores.nit = "The field accepts up to 40 characters.";
    } else {
        errores.nit = "";
    }

    if (!form.razonsocial) {
        errores.razonsocial = "Please the field is required.";
    } else if (!regexText40.test(form.razonsocial.trim())) {
        errores.razonsocial = "The field accepts up to 40 characters.";
    } else {
        errores.razonsocial = "";
    }

    if (!form.nombrecontacto) {
        errores.nombrecontacto = "Please the field is required.";
    } else if (!regexText40.test(form.nombrecontacto.trim())) {
        errores.nombrecontacto = "The field accepts up to 40 characters.";
    } else {
        errores.nombrecontacto = "";
    }

    if (!form.apellidocontacto) {
        errores.apellidocontacto = "Please the field is required.";
    } else if (!regexText40.test(form.apellidocontacto.trim())) {
        errores.apellidocontacto = "The field accepts up to 40 characters.";
    } else {
        errores.apellidocontacto = "";
    }

    let regexCorreo = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!form.correo) {
        errores.correo = "Please the field is required.";
    } else if (!regexCorreo.test(form.correo.trim())) {
        errores.correo = "The field must be a valid email address.";
    } else {
        errores.correo = "";
    }

    let regexTelefono = /^\d{7,12}$/;
    if (!form.telefono) {
        errores.telefono = "Please the field is required.";
    } else if (!regexTelefono.test(form.telefono.trim())) {
        errores.telefono = "Only numbers allowed, min 7 and max 12 digits.";
    } else {
        errores.telefono = "";
    }

    return errores;
};

const ClientesForm = {
    validationsForm,
};

export default ClientesForm;