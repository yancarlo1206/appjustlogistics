import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
  
import { Link, useParams } from "react-router-dom";
import CotizacionContext from "context/CotizacionContext";
import CotizacionFormValidate from "../../../services/CotizacionForm";
import { useForm } from "hooks/useForm";
import Header from "components/Headers/Header";

const initialForm = {
    nombre: "",
    direccion: "",
    ciudad: "",
    ubicacion: "",
    administrador: "",
    celular: "",
    observacion: "",
};

const Formulario = ( ) => {

    const { 
        detail:data, updateData, saveData, setModule, module, setToDetail,setDetail, 
        setToUpdate
    } = useContext(CotizacionContext);

    const {
        validateInit,
        validate,
        form,
        errors,
        setValidateInit,
        setValidate,
        setForm,
        setErrors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm(initialForm, CotizacionFormValidate.validationsForm);

    const { id } = useParams();

    useEffect(() => {
        if(id){
            setToDetail(id);
            setToUpdate(id);
            setModule("actualizar");
        }else{
            setModule("agregar");
        }
    },[]);

    useEffect(() => {
        setForm(data);
        setErrors(initialForm);
    },[data]);
    
    const handleUpdate = (e) => {
        e.preventDefault();
        let valid = handleSubmit(e);
        if(valid){
            updateData(form);
        }
    }

    const handleSave = (e) => {
        e.preventDefault();
        let valid = handleSubmit(e);
        if(valid){
            saveData(form);
        }
    }

    return (
      <>
        <Header />
            <Container className="mt--7" fluid>
              <Row>
                <div className="col">
                  <Card className="shadow">
                    <CardHeader className="">
                      <div className="align-items-center row">
                        <div className="col-11">
                          <h3 className="mb-0">{module?.toUpperCase()} COTIZACION</h3>
                          <p className="text-sm mb-0">
                            Formulario de gestion de cotizaciones
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <div className="pl-lg-4">
                            <Row>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-nombre"
                                        >
                                        Nombre <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-nombre"
                                        placeholder=""
                                        type="text"
                                        name="nombre"
                                        required="required"
                                        invalid={errors.nombre !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.nombre}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.nombre}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-direccion"
                                        >
                                        Direccion <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-direccion"
                                        placeholder=""
                                        type="text"
                                        name="direccion"
                                        required="required"
                                        invalid={errors.direccion !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.direccion}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.direccion}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-ciudad"
                                        >
                                        Ciudad <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-ciudad"
                                        placeholder=""
                                        type="text"
                                        name="ciudad"
                                        required="required"
                                        invalid={errors.ciudad !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.ciudad}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.ciudad}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-ubicacion"
                                        >
                                        Ubicacion <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-ubicacion"
                                        placeholder=""
                                        type="text"
                                        name="ubicacion"
                                        required="required"
                                        invalid={errors.ubicacion !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.ubicacion}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.ubicacion}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-administrador"
                                        >
                                        Administrador <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-administrador"
                                        placeholder=""
                                        type="text"
                                        name="administrador"
                                        required="required"
                                        invalid={errors.administrador !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.administrador}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.administrador}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-celular"
                                        >
                                        Celular <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-celular"
                                        placeholder=""
                                        type="text"
                                        name="celular"
                                        required="required"
                                        invalid={errors.celular !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.celular}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.celular}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-observacion"
                                        >
                                        Observacion <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-observacion"
                                        placeholder=""
                                        type="text"
                                        name="observacion"
                                        required="required"
                                        invalid={errors.observacion !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.observacion}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.observacion}
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="col justify-content-end">
                                {module == "actualizar" ? (
                                    <Button
                                        color="primary"
                                        href=""
                                        onClick={handleUpdate}
                                        >
                                        Actualizar
                                    </Button>
                                ) : (
                                    <Button
                                        color="primary"
                                        href=""
                                        onClick={handleSave}
                                        >
                                        Guardar 
                                    </Button>
                                )}
                                <Link
                                    className="btn btn-danger"
                                    color="default"
                                    to={"/admin/cotizacion"}
                                    >
                                    Cancelar
                                </Link>
                            </Row>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                </div>
            </Row>
        </Container>
      </>
    );
  };
  
  export default Formulario;