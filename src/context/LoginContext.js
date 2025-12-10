import React, { createContext, useContext, useState } from "react";
import { decodeToken } from "react-jwt";
import { helpHttp } from "helpers/helpHttp";
import NotificationContext from "context/NotificationContext";
import LoadingContext from "context/LoadingContext";
import { useNavigate } from "react-router";
import ReactBSAlert from "react-bootstrap-sweetalert";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {

    const [alert, setAlert] = useState(null);
    const { setMessage, setStatus, setType } = useContext(NotificationContext);
    const { setLoading } = useContext(LoadingContext);

    let api = helpHttp();
    const { REACT_APP_API_URL_LOGIN } = process.env;
    let url = REACT_APP_API_URL_LOGIN + "login";


    const navigate = useNavigate();

    const login = (data) => {
        setLoading(true);

        // Mostrar loader con ReactBSAlert
        setAlert(
            <ReactBSAlert
                info
                style={{ display: "block" }}
                title="Iniciando sesión..."
                onConfirm={() => setAlert(null)}
                showCancel={false}
                confirmBtnBsStyle="info"
                confirmBtnText="Cerrar"
            >
                Por favor, espere...
            </ReactBSAlert>
        );

        let endpoint = url;
        let newData = data;

        let options = {
            body: newData,
            headers: { "content-type": "application/json" }
        }
        api.post(endpoint, options).then((res) => {
            setAlert(null); // Cerrar el loader

            if (!res.err) {
                localStorage.setItem("token", JSON.stringify(res.data.token));

                const decoded = decodeToken(res.data.token);
                if (decoded?.tipoUsuario === "Externo") {
                    navigate('/admin/tracking');
                } else {
                    navigate('/admin/clientes/');
                }

                setType("success");
                setMessage("Inicio de sesión exitoso");
                setStatus(1);
            } else {
                setAlert(
                    <ReactBSAlert
                        danger
                        style={{ display: "block" }}
                        title="Error en el inicio de sesión"
                        onConfirm={() => setAlert(null)}
                        showCancel={false}
                        confirmBtnBsStyle="danger"
                        confirmBtnText="Cerrar"
                    >
                        {res.message?.message || "Error desconocido. Intente nuevamente."}
                    </ReactBSAlert>
                );
            }
            setLoading(false);
        })
    }

    const data = { login };
    return (
        <>
            {alert}
            <LoginContext.Provider value={data}>{children}</LoginContext.Provider>
        </>
    );
}

export { LoginProvider };
export default LoginContext;