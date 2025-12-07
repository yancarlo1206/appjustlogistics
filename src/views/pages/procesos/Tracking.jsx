import React, { useContext, useEffect, useState } from 'react'
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

import Header from "components/Headers/Header";
import { Link, useParams } from "react-router-dom";
import { Alert } from "reactstrap";

import ProcesosContext from "context/ProcesosContext";

const Traking = () => {

  const {
    setToDetail, setProceso, detail,timeLine
  } = useContext(ProcesosContext);

  const { id } = useParams();


  useEffect(() => {
    if (id) {
      setToDetail(id);
      setProceso(id);
    }
  }, []);

  return (
    <>
      <Header />

      <Container className="mt--7" fluid>
        {/* Additional Info Section */}
        <Row className="mt-5 mb-2">
          <Col lg="12">
            <Card>
              <CardHeader className="bg-transparent">
                
                <div class="align-items-center row">
                    <div class="col-8">
                        <h3 class="mb-0">Proceso</h3>
                        </div>
                        <div class="text-right col-4">
                             <Link
                                className="btn btn-sm btn-danger"
                                color="default"
                                to={"/admin/procesos"}
                            >
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
                {timeLine && timeLine.length > 0 ? (
                  <div
                    className="timeline timeline-one-side"
                    data-timeline-axis-style="dashed"
                    data-timeline-content="axis"
                  >
                    {timeLine.map((event, index) => (
                      <div key={event.id} className="timeline-block">
                        <span className={`timeline-step ${event.color}`}>
                          <i className="ni ni-check-bold" />
                        </span>
                        <div className="timeline-content" style={{ maxWidth: "none" }}>
                          <small className="text-muted font-weight-bold">
                            {event.fecha}
                          </small>
                          <h5 className="mt-3 mb-0">{event.descripcion}</h5>
                          <p className="text-sm mt-1 mb-0">
                            Estado actual del proceso: {event.estado}
                          </p>
                          <div className="mt-3">
                            <Badge color={event.color.replace("badge-", "")} pill>
                              {event.estado}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Alert color="warning">
                    <i className="ni ni-bell-55 mr-2" />
                    No hay eventos en la línea de tiempo. Los eventos aparecerán aquí cuando estén disponibles.
                  </Alert>
                )}
              </CardBody>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  )
}

export default Traking