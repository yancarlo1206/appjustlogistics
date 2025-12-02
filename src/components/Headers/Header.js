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

  useEffect(() => {
    if (status) {
      Notification.viewNotification(type, message, notificationAlertRef);
      setStatus(0);
    }
  }, [status, type, message, setStatus]);

  return (
    <>
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      {loading ? <Loading /> : ""}
      <div className="header bg-gradient-default pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}

          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
