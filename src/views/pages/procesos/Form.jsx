import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";

import { Link, useParams } from "react-router-dom";
import ProcesosContext from "context/ProcesosContext";
import ProcesosFormValidate from "../../../services/ProcesosForm";
import { useForm } from "hooks/useForm";
import Header from "components/Headers/Header";

const initialForm = {
    cliente: "",
    nombrecontenedor: "",
    tipotransporte: "",
    estado: "",
    fechafinalizacion: "",
    fechainicio: "",
};

const Formulario = () => {

    const {
        detail: data, updateData, saveData, setModule, module, setToDetail, setDetail,
        setToUpdate, cliente, tipoTransporte
    } = useContext(ProcesosContext);

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
    } = useForm(initialForm, ProcesosFormValidate.validationsForm);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setToDetail(id);
            setToUpdate(id);
            setModule("actualizar");
        } else {
            setModule("agregar");
        }
    }, []);

    useEffect(() => {
        setForm(data);
        setErrors(initialForm);
    }, [data]);

    const handleUpdate = (e) => {
        e.preventDefault();
        let valid = handleSubmit(e);
        if (valid) {
            updateData(form);
        }
    }

    const handleSave = (e) => {
        e.preventDefault();
        let valid = handleSubmit(e);
        if (valid) {
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
                                        <h3 className="mb-0">{module?.toUpperCase()} PROCESO</h3>
                                        <p className="text-sm mb-0">
                                            Formulario de gestion de procesos
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
                                                        htmlFor="input-cliente"
                                                    >
                                                        Cliente <span className="text-danger">*</span>
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-cliente"
                                                        type="select"
                                                        name="cliente"
                                                        required="required"
                                                        value={form.cliente}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        invalid={errors.cliente !== ""}
                                                    >
                                                        <option value="" hidden></option>
                                                        {cliente.map(item => (
                                                            <option key={item.id} value={item.id}>
                                                                {item.text}
                                                            </option>
                                                        ))};
                                                    </Input>
                                                    <div className="invalid-feedback">
                                                        {errors.cliente}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-nombrecontenedor"
                                                    >
                                                        Nombre Contenedor <span className="text-danger">*</span>
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-nombrecontenedor"
                                                        placeholder=""
                                                        type="text"
                                                        name="nombrecontenedor"
                                                        required="required"
                                                        invalid={errors.nombrecontenedor !== ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        defaultValue={data.nombrecontenedor}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.nombrecontenedor}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-fechainicio"
                                                    >
                                                        Fecha Inicio <span className="text-danger">*</span>
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-fechainicio"
                                                        placeholder=""
                                                        type="date"
                                                        name="fechainicio"
                                                        required="required"
                                                        invalid={errors.fechainicio !== ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        defaultValue={data.fechainicio}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.fechainicio}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-fechafinalizacion"
                                                    >
                                                        Fecha Finalización <span className="text-danger">*</span>
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-fechafinalizacion"
                                                        placeholder=""
                                                        type="date"
                                                        name="fechafinalizacion"
                                                        required="required"
                                                        invalid={errors.fechafinalizacion !== ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        defaultValue={data.fechafinalizacion}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.fechafinalizacion}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-tipotransporte"
                                                    >
                                                        Tipo de Transporte <span className="text-danger">*</span>
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-tipotransporte"
                                                        type="select"
                                                        name="tipotransporte"
                                                        required="required"
                                                        value={form.tipotransporte}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        invalid={errors.tipotransporte !== ""}
                                                    >
                                                        <option value="" hidden></option>
                                                        {tipoTransporte.map(item => (
                                                            <option key={item.id} value={item.id}>
                                                                {item.text}
                                                            </option>
                                                        ))};
                                                    </Input>
                                                    <div className="invalid-feedback">
                                                        {errors.tipotransporte}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
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
                                                        placeholder=""
                                                        type="text"
                                                        name="estado"
                                                        required="required"
                                                        invalid={errors.estado !== ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        defaultValue={data.estado}
                                                    />
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
                                                to={"/admin/apartamentos"}
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