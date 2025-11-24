export const validationsForm = (form) => {
    let errores = {};
    let regexText40 = /^.{1,40}$/;

    if (!form.nombre) {
        errores.nombre = "Please the field is required.";
    } else if (!regexText40.test(form.nombre.trim())) {
        errores.nombre = "The field accepts up to 40 characters.";
    } else {
        errores.nombre = "";
    }

    if (!form.edificio) {
        errores.edificio = "Please the field is required.";
    } else {
        errores.edificio = "";
    }

    if (!form.precio) {
        errores.precio = "Please the field is required.";
    } else if (isNaN(form.precio) || Number(form.precio) < 0) {
        errores.precio = "The field must be a valid number.";
    } else {
        errores.precio = "";
    }

    if (!form.estado) {
        errores.estado = "Please the field is required.";
    } else {
        errores.estado = "";
    }

    return errores;
};

const ApartamentosForm = {
    validationsForm,
};

export default ApartamentosForm;