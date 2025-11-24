import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
  
import { Link, useParams } from "react-router-dom";
import CotizacionContext from "context/CotizacionContext";
import CotizacionFormValidate from "../../../services/CotizacionForm";
import { useForm } from "hooks/useForm";
import Header from "components/Headers/Header";

const initialForm = {
    cliente: "",
    edificio: "",
    apartamento: "",
    precio: "",
    tipo: "",
    observacion: "",
    estado: "",
};

const Formulario = ( ) => {

    const { 
        detail:data, updateData, saveData, setModule, module, setToDetail,setDetail, 
        setToUpdate, cliente, edificio, apartamento, tipoCotizacion, estadoCotizacion,
        setToEdificio
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

    useEffect(() => {
        if(form?.edificio) {
            setToEdificio(form.edificio);
        }
    }, [form?.edificio]);
    
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
                        <Form autoComplete="off">
                            <div className="pl-lg-4">
                            <Row>
                                <Col lg="12">
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
                                        htmlFor="input-edificio"
                                        >
                                        Edificio <span className="text-danger">*</span>
                                        </label>
                                        <Input 
                                            className="form-control"
                                            id="input-edificio"
                                            type="select"
                                            name="edificio"
                                            value={form.edificio}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            invalid={errors.edificio !== ""}
                                            >
                                            <option value="" hidden></option>
                                            {edificio.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.text}
                                                </option>
                                            ))};
                                        </Input>
                                        <div className="invalid-feedback">
                                            {errors.edificio}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-apartamento"
                                        >
                                        Apartamento <span className="text-danger">*</span>
                                        </label>
                                        <Input 
                                            className="form-control"
                                            id="input-apartamento"
                                            type="select"
                                            name="apartamento"
                                            value={form.apartamento}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            invalid={errors.apartamento !== ""}
                                            >
                                            <option value="" hidden></option>
                                            {apartamento.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.text}
                                                </option>
                                            ))};
                                        </Input>
                                        <div className="invalid-feedback">
                                            {errors.apartamento}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-precio"
                                        >
                                        Precio <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-precio"
                                        placeholder=""
                                        type="number"
                                        name="precio"
                                        required="required"
                                        invalid={errors.precio !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.precio}
                                        
                                        inputMode="numeric"
                                        min={0}
                                        step="any"
                                        />
                                        <div className="invalid-feedback">
                                            {errors.precio}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-tipo"
                                        >
                                        Tipo <span className="text-danger">*</span>
                                        </label>
                                        <Input 
                                            className="form-control"
                                            id="input-tipo"
                                            type="select"
                                            name="tipo"
                                            value={form.tipo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            invalid={errors.tipo !== ""}
                                            >
                                            <option value="" hidden></option>
                                            {tipoCotizacion.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.text}
                                                </option>
                                            ))};
                                        </Input>
                                        <div className="invalid-feedback">
                                            {errors.tipo}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
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
                                            {estadoCotizacion.map(item => (
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