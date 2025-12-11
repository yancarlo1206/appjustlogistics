export const validationsForm = (form) => {
    let errores = {};
    let regexText40 = /^.{1,100}$/;

    if (!form.nombrecontenedor) {
        errores.nombrecontenedor = "Por favor, este campo es requerido.";
    } else if (!regexText40.test(form.nombrecontenedor.trim())) {
        errores.nombrecontenedor = "El campo acepta hasta 100 caracteres.";
    } else {
        errores.nombrecontenedor = "";
    }

    if (!form.cliente) {
        errores.cliente = "Por favor, este campo es requerido.";
    } else {
        errores.cliente = "";
    }

    if (!form.tipotransporte) {
        errores.tipotransporte = "Por favor, este campo es requerido.";
    } else {
        errores.tipotransporte = "";
    }

    if (!form.estado) {
        errores.estado = "Por favor, este campo es requerido.";
    } else {
        errores.estado = "";
    }

    if (!form.fechafinalizacion) {
        errores.fechafinalizacion = "Por favor, este campo es requerido.";
    } else {
        errores.fechafinalizacion = "";
    }

    if (!form.fechainicio) {
        errores.fechainicio = "Por favor, este campo es requerido.";
    } else {
        errores.fechainicio = "";
    }

    return errores;
};

const ProcesosForm = {
    validationsForm,
};

export default ProcesosForm;
