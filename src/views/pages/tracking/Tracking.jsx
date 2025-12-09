import React, { useContext, useEffect } from 'react'
import {
    Badge,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Alert
} from "reactstrap";

import Header from "components/Headers/Header";
import { Link, useParams } from "react-router-dom";

import TrackingContext from "context/TrackingContext";
import img1 from "assets/img/icons/timeline/1.png";
import img2 from "assets/img/icons/timeline/2.png";
import img3 from "assets/img/icons/timeline/3.png";
import img4 from "assets/img/icons/timeline/4.png";
import img5 from "assets/img/icons/timeline/5.png";
import img6 from "assets/img/icons/timeline/6.png";
import img7 from "assets/img/icons/timeline/7.png";
import img8 from "assets/img/icons/timeline/8.png";
import img9 from "assets/img/icons/timeline/9.png";
import img10 from "assets/img/icons/timeline/10.png";
import img11 from "assets/img/icons/timeline/11.png";
import img12 from "assets/img/icons/timeline/12.png";
import img13 from "assets/img/icons/timeline/13.png";
const Tracking = () => {

    const {
        setToDetail, setProceso, detail, timeLine
    } = useContext(TrackingContext);

    const { id } = useParams();


    useEffect(() => {
        if (id) {
            setToDetail(id);
            setProceso(id);
        }
    }, []);
    const images = {
        1: img1,
        2: img2,
        3: img3,
        4: img4,
        5: img5,
        6: img6,
        7: img7,
        8: img8,
        9: img9,
        10: img10,
        11: img11,
        12: img12,
        13: img13
    };

    return (
        <>
            <Header />

            <Container className="mt--7" fluid>
                {/* Additional Info Section */}
                <Row className="mt-5 mb-2">
                    <Col lg="12">
                        <Card>
                            <CardHeader className="bg-transparent">

                                <div className="align-items-center row">
                                    <div className="col-8">
                                        <h3 className="mb-0">Proceso</h3>
                                    </div>
                                    <div className="text-right col-4">
                                        <Link
                                            className="btn btn-sm btn-danger"
                                            color="default"
                                            to={"/admin/tracking"}
                                        >
                                            Volver
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
                                                <span className="timeline-step bg-default">
                                                    <Link to={`/admin/tracking/event/${event.id}`}>
                                                        <img
                                                            src={images[event.id]}
                                                            alt={event.descripcion || `evento-${event.id}`}
                                                            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '50%' }}
                                                        />
                                                    </Link>
                                                </span>
                                                <div className="timeline-content" style={{ maxWidth: "none" }}>
                                                    <small className="text-muted font-weight-bold">
                                                        {event.fechaevento}
                                                    </small>
                                                      <h5 className="text-lg mt-3 mb-0">Mensaje</h5>
                                                        <p className="text-lg mt-1 mb-0">{event.descripcion}</p>
                                                    <div className="text-xl mt-3">
                                                        <Badge color="success" pill>
                                                            {event.estado?.descripcion || event.estado}
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

export default Tracking;
