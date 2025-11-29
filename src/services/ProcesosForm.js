export const validationsForm = (form) => {
    let errores = {};
    let regexText40 = /^.{1,40}$/;

    if (!form.nombrecontenedor) {
        errores.nombrecontenedor = "Please the field is required.";
    } else if (!regexText40.test(form.nombrecontenedor.trim())) {
        errores.nombrecontenedor = "The field accepts up to 40 characters.";
    } else {
        errores.nombrecontenedor = "";
    }

    if (!form.tipotransporte) {
        errores.tipotransporte = "Please the field is required.";
    } else if (!regexText40.test(form.tipotransporte.trim())) {
        errores.tipotransporte = "The field accepts up to 40 characters.";
    } else {
        errores.tipotransporte = "";
    }

    if (!form.cliente) {
        errores.cliente = "Please the field is required.";
    } else {
        errores.cliente = "";
    }

    if (!form.estado) {
        errores.estado = "Please the field is required.";
    } else {
        errores.estado = "";
    }

    if (!form.fechafinalizacion) {
        errores.fechafinalizacion = "Please the field is required.";
    } else {
        errores.fechafinalizacion = "";
    }

    if (!form.fechainicio) {
        errores.fechainicio = "Please the field is required.";
    } else {
        errores.fechainicio = "";
    }

    return errores;
};

const ProcesosForm = {
    validationsForm,
};

export default ProcesosForm;
