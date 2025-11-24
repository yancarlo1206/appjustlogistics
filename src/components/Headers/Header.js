/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useRef, useContext, useEffect } from "react";
import ClientesContext from "context/ClientesContext";
import CotizacionContext from "context/CotizacionContext";
import ApartamentosContext from "context/ApartamentosContext";
import EdificiosContext from "context/EdificiosContext";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import NotificationAlert from "react-notification-alert";
import Notification from "../../services/notification";

import NotificationContext from "context/NotificationContext";
import LoadingContext from "context/LoadingContext";

import Loading from "components/Loading/Loading.js";

const Header = () => {


  const notificationAlertRef = useRef(null);
  const { status, type, message, setStatus } = useContext(NotificationContext);
  const { loading } = useContext(LoadingContext);


  // Contextos para datos reales con fallback si el contexto es undefined
  const { db: clientesDb = [] } = useContext(ClientesContext) || {};
  const { db: cotizacionesDb = [] } = useContext(CotizacionContext) || {};
  const { db: apartamentosDb = [] } = useContext(ApartamentosContext) || {};
  const { db: edificiosDb = [] } = useContext(EdificiosContext) || {};

  const totalClientes = clientesDb?.length || 0;
  const totalCotizaciones = cotizacionesDb?.length || 0;
  const totalApartamentos = apartamentosDb?.length || 0;
  const totalEdificios = edificiosDb?.length || 0;

  useEffect(() => {
    if(status){
        Notification.viewNotification(type, message, notificationAlertRef);
        setStatus(0);
    }
  },[status, type, message, setStatus]);

  return (
    <>
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      {loading ? <Loading />:""}
      <div className="header bg-gradient-purple pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          # Cotizaciones
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalCotizaciones}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fa fa-file-invoice" style={{ color: "white" }} />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          # Clientes
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalClientes}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fa fa-users" style={{ color: "white" }} />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          # Apartamentos
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalApartamentos}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="ni ni-building" style={{ color: "white" }} />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          # Edificios
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalEdificios}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fa fa-city text-white" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              {/*<Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Articulos
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Desde la fecha</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>*/}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
