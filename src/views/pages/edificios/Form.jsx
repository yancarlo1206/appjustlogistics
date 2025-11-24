import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
  
import { Link, useParams } from "react-router-dom";
import EdificiosContext from "context/EdificiosContext";
import EdificiosFormValidate from "../../../services/EdificiosForm";
import { useForm } from "hooks/useForm";
import Header from "components/Headers/Header";

const initialForm = {
    nombre: "",
    direccion: "",
    ciudad: "",
    ubicacion: "",
    administrador: "",
    celular: "",
    fecha: "",
    estado: "",
    observacion: "",
};

const Formulario = ( ) => {

    const { 
        detail:data, updateData, saveData, setModule, module, setToDetail,setDetail, 
        setToUpdate, estadoEdificio
    } = useContext(EdificiosContext);

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
    } = useForm(initialForm, EdificiosFormValidate.validationsForm);

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
                                                    <h3 className="mb-0">{module?.toUpperCase()} EDIFICIO</h3>
                                                    <p className="text-sm mb-0">
                                                        Formulario de gestion de edificios
                                                    </p>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                                <Form autoComplete="off">
                            <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
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
                                <Col lg="6">
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
                                <Col lg="6">
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
                                        autoComplete="off"
                                        inputMode="numeric"
                                        maxLength={12}
                                        pattern="[0-9]*"
                                        />
                                        <div className="invalid-feedback">
                                            {errors.celular}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
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
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-ubicacion"
                                        >
                                        Ubicacion
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-ubicacion"
                                        placeholder=""
                                        type="text"
                                        name="ubicacion"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.ubicacion}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-administrador"
                                        >
                                        Administrador
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-administrador"
                                        placeholder=""
                                        type="text"
                                        name="administrador"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.administrador}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-observacion"
                                        >
                                        Observacion
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-observacion"
                                        placeholder=""
                                        type="textarea"
                                        rows="3"
                                        name="observacion"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.observacion}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-estado"
                                        >
                                        Estado <span className="text-danger">*</span>
                                        </label>
                                        <Input 
                                            className="form-control"
                                            id="input-estado"
                                            type="select"
                                            name="estado"
                                            value={form.estado}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            invalid={errors.estado !== ""}
                                            >
                                            <option value="" hidden></option>
                                            {estadoEdificio.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.text}
                                                </option>
                                            ))};
                                        </Input>
                                        <div className="invalid-feedback">
                                            {errors.estado}
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
                                    to={"/admin/edificios"}
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