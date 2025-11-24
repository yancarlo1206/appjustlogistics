export const validationsForm = (form) => {
    let errores = {};
    let regexText40 = /^.{1,40}$/;

    if (!form.cliente) {
        errores.cliente = "Please the field is required.";
    } else{
        errores.cliente = "";
    }

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

    if (!form.precio) {
        errores.precio = "Please the field is required.";
    } else if (isNaN(form.precio) || Number(form.precio) < 0) {
        errores.precio = "The field must be a valid number.";
    } else{
        errores.precio = "";
    }

    if (!form.tipo) {
        errores.tipo = "Please the field is required.";
    } else{
        errores.tipo = "";
    }

    if (!form.estado) {
        errores.estado = "Please the field is required.";
    } else{
        errores.estado = "";
    }

    return errores;
};

const CotizacionForm = {
    validationsForm,
  };
  
  export default CotizacionForm;