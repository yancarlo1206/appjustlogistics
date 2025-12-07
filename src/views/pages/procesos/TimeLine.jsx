import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

import Header from "components/Headers/Header";
import { Link, useParams } from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";

import ProcesosContext from "context/ProcesosContext";

const TimeLine = () => {
  const { setToDetail, 
    setProceso, 
    detail, 
    timeLine, 
    setTimeLine, 
    estadoProceso, 
    saveTimeLineState, 
    editTimeLineState,deleteTimelineState } = useContext(ProcesosContext);
  const { id } = useParams();

  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ fechaevento: "", descripcion: "", estado: "" });

  useEffect(() => setEvents(Array.isArray(timeLine) ? timeLine : []), [timeLine]);

  useEffect(() => {
    if (id) {
      setToDetail(id);
      setProceso(id);
    }
  }, [id]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const openNew = () => {
    setForm({ fechaevento: "", descripcion: "", estado: "" });
    setEditingId(null);
    setModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!form.fechaevento || !form.estado) {
      window.alert("Por favor complete la fecha y el estado.");
      return;
    }

    if (editingId) {
      const updatedEvent = {
        id: editingId,
        descripcion: form.descripcion,
        fechaevento: form.fechaevento,
        estado:{ id: form.estado },
        proceso: { id: detail.id },
        ubicacion:"SIN DEFINIR"
      };
      editTimeLineState(updatedEvent);

      setEditingId(null);
    } else {
      const newEvent = {
        descripcion: form.descripcion,
         fechaevento: form.fechaevento, 
         estado: { id: form.estado },
         proceso: { id: detail.id },
         ubicacion:"SIN DEFINIR" };
      
      saveTimeLineState(newEvent);
    }

    setForm({ fechaevento: "", descripcion: "", estado: "" });
    setModalOpen(false);
  };

  const handleEdit = (event) => {
    setForm({ fechaevento: event.fechaevento || "", descripcion: event.descripcion || "", estado: event.estado ? event.estado.id : "" });
    setEditingId(event.id);
    setModalOpen(true);
  };

  const handleCancelEdit = () => {
    setForm({ fechaevento: "", descripcion: "", estado: "" });
    setEditingId(null);
    setModalOpen(false);
  };

  const handleDelete = (event) => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: "block" }}
        title={`¿Estás seguro de eliminar el evento: ${event.descripcion}?`}
        onCancel={() => setAlert(null)}
        onConfirm={() => {
          deleteTimelineState(event.id,detail.id);
         setAlert(null);
        }}
        showCancel
        confirmBtnBsStyle="primary"
        confirmBtnText="Si, eliminar"
        cancelBtnBsStyle="danger"
        cancelBtnText="Cancelar"
      >
        Esta acción no se puede revertir.
      </ReactBSAlert>
    );
  };

  return (
    <>
      {alert}
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-5 mb-2">
          <Col lg="12">
            <Card>
              <CardHeader className="bg-transparent">
                <div className="align-items-center row">
                  <div className="col-6">
                    <h3 className="mb-0">Proceso</h3>
                  </div>
                  <div className="text-right col-6">
                    <Button color="primary" onClick={openNew} className="btn btn-sm btn-primary">
                      <i className="fas fa-plus mr-2" aria-hidden="true" />Estado
                    </Button>
                    <Link className="btn btn-sm btn-danger ml-2" to={"/admin/procesos"}>
                      Cancelar
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="3">
                    <div className="mb-4">
                      <p className="text-uppercase text-muted small">Nombre</p>
                      <span className="h4">{detail?.nombrecontenedor || "N/A"}</span>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-4">
                      <p className="text-uppercase text-muted small">Cliente</p>
                      <span className="h4">{detail?.cliente?.nombrecontacto || "N/A"}</span>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-4">
                      <p className="text-uppercase text-muted small">Transporte</p>
                      <span className="h4">{detail?.tipotransporte?.descripcion || "N/A"}</span>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-4">
                      <p className="text-uppercase text-muted small">Estado</p>
                      <span className="h4">{detail?.estado?.descripcion || "N/A"}</span>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="12">
            <Card>
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Linea de Tiempo</h3>
              </CardHeader>
              <CardBody>
                <div className="timeline timeline-one-side" data-timeline-axis-style="dashed" data-timeline-content="axis">
                  {events && events.length > 0 ? (
                    events.map((event) => {
                      const fecha = event.fechaevento || "";
                      const badgeColor = "success"; // forced color
                      return (
                        <div key={event.id} className="timeline-block">
                          <span className={`timeline-step bg-${badgeColor}`}>
                            <i className="ni ni-check-bold" />
                          </span>
                          <div className="timeline-content" style={{ maxWidth: "none" }}>
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1">
                                <small className="text-muted font-weight-bold">{fecha}</small>
                                <h5 className="mt-3 mb-0">Mensaje</h5>
                                <p className="text-sm mt-1 mb-0">{event.descripcion}</p>
                                <div className="mt-3">
                                  <Badge color={badgeColor} pill>
                                    {event.estado.descripcion}
                                  </Badge>
                                </div>
                              </div>
                              <div className="ml-3 d-flex align-items-end">
                                <Button size="sm" color="primary" className="mb-2" onClick={() => handleEdit(event)}>
                                  <i className="fas fa-edit mr-1" aria-hidden="true" />Editar
                                </Button>
                                <Button size="sm" color="danger" className="mb-2" onClick={() => handleDelete(event)}>
                                  <i className="fas fa-trash mr-1" aria-hidden="true" />Eliminar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <Alert color="info">
                      <i className="ni ni-bell-55 mr-2" />No hay eventos en la línea de tiempo.
                    </Alert>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modalOpen} toggle={handleCancelEdit} size="lg">
        <ModalHeader toggle={handleCancelEdit}>{editingId ? "Actualizar Estado" : "Registrar Estado"}</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmitForm}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="fechaevento">Fecha <span className="text-danger">*</span></Label>
                  <Input id="fechaevento" name="fechaevento" type="date" value={form.fechaevento} onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="estado">Estado <span className="text-danger">*</span></Label>
                  <Input id="estado" name="estado" type="select" value={form.estado} onChange={handleChange}>
                    <option value="">Seleccione...</option>
                    {Array.isArray(estadoProceso) && estadoProceso.map((st) => (
                      <option key={st.id} value={st.id}>{st.descripcion}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label for="descripcion">Descripción <span className="text-danger">*</span></Label>
                  <Input id="descripcion" name="descripcion" type="textarea" value={form.descripcion} onChange={handleChange} rows="4" placeholder="Descripción del evento" />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleCancelEdit}>Cancelar</Button>
          <Button color="primary" onClick={handleSubmitForm}><i className={`fas fa-${editingId ? "edit" : "save"} mr-1`} aria-hidden="true" />{editingId ? "Actualizar" : "Guardar"}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TimeLine;

