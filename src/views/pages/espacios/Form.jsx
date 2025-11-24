import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
  
import { Link, useParams } from "react-router-dom";
import EspaciosContext from "context/EspaciosContext";
import EspaciosFormValidate from "../../../services/EspaciosForm";
import { useForm } from "hooks/useForm";
import Header from "components/Headers/Header";

const initialForm = {
    edificio: "",
    apartamento: "",
    nombre: "",
    alto: "",
    ancho: "",
    factor: "",
    precio: "",
    estado: "",
    observacion: "",
};

const Formulario = ( ) => {

    const { 
        detail:data, updateData, saveData, setModule, module, setToDetail,setDetail, 
        setToUpdate, edificio, apartamento, estadoEspacio, setToEdificio
    } = useContext(EspaciosContext);

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
    } = useForm(initialForm, EspaciosFormValidate.validationsForm);

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
                          <h3 className="mb-0">{module?.toUpperCase()} ESPACIO</h3>
                          <p className="text-sm mb-0">
                            Formulario de gestion de espacios
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
                                        htmlFor="input-edificio"
                                        >
                                        Edificio <span className="text-danger">*</span>
                                        </label>
                                        <Input 
                                            className="form-control"
                                            id="input-edificio"
                                            type="select"
                                            name="edificio"
                                            required="required"
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
                                            required="required"
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
                                <Col lg="4">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-alto"
                                        >
                                        Alto (cm) <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-alto"
                                        placeholder=""
                                        type="number"
                                        name="alto"
                                        required="required"
                                        invalid={errors.alto !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.alto}
                                        autoComplete="off"
                                        inputMode="numeric"
                                        min={0}
                                        step="any"
                                        />
                                        <div className="invalid-feedback">
                                            {errors.alto}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-ancho"
                                        >
                                        Ancho (cm) <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-ancho"
                                        placeholder=""
                                        type="number"
                                        name="ancho"
                                        required="required"
                                        invalid={errors.ancho !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.ancho}
                                        autoComplete="off"
                                        inputMode="numeric"
                                        min={0}
                                        step="any"
                                        />
                                        <div className="invalid-feedback">
                                            {errors.ancho}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-factor"
                                        >
                                        Factor <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                        className="form-control"
                                        id="input-factor"
                                        placeholder=""
                                        type="number"
                                        name="factor"
                                        required="required"
                                        invalid={errors.factor !== ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={data.factor}
                                        autoComplete="off"
                                        inputMode="numeric"
                                        min={0}
                                        step="any"
                                        />
                                        <div className="invalid-feedback">
                                            {errors.factor}
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
                                        autoComplete="off"
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
                                            {estadoEspacio.map(item => (
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
                                    to={"/admin/espacios"}
                                    >
                                    Cancelar
                                </Link>
                            </Row>
                            </div>
                        </Form >
                    </CardBody>
                </Card>
                </div>
            </Row>
        </Container>
      </>
    );
  };
  
  export default Formulario;