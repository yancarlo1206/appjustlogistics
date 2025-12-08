import { helpHttp } from "helpers/helpHttp";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { TYPES } from "actions/genericAction";
import { genericReducer, genericInitialState } from "../reducers/genericReducer";
import NotificationContext from "context/NotificationContext";
import LoadingContext from "context/LoadingContext";
import { useNavigate } from "react-router";

const TrackingContext = createContext();

const TrackingProvider = ({ children }) => {

    const [toDetail, setToDetail] = useState();
    const [toUpdate, setToUpdate] = useState(); // Kept for compatibility if needed, but likely unused for updates
    const [detail, setDetail] = useState({});
    const [module, setModule] = useState();

    const [proceso, setProceso] = useState();
    const [timeLine, setTimeLine] = useState([]);

    const [cliente, setCliente] = useState([]);
    const [tipoTransporte, setTipoTransporte] = useState([]);
    const [estadoProceso, setEstadoProceso] = useState([]);

    const navigate = useNavigate();
    const { REACT_APP_API_URL } = process.env;

    const { setMessage, setStatus, setType } = useContext(NotificationContext);
    const { setLoading } = useContext(LoadingContext);

    const [state, dispatch] = useReducer(genericReducer, genericInitialState);
    const { db } = state;

    let api = helpHttp();
    let url = REACT_APP_API_URL + "proceso";
    let urlline = REACT_APP_API_URL + "lineaTiempo";

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (toUpdate && toUpdate != 0) {
            fetchDataDetail();
        }
    }, [toUpdate]);

    useEffect(() => {
        if (proceso && proceso != 0) {
            getObjectProcess();
            getTimeLineProcess();
            fetchDataEstadoProceso();
        }
    }, [proceso]);

    useEffect(() => {
        if (module) {
            fetchDataCliente();
            fetchDataTipoTransporte();
            fetchDataEstadoProceso();
        }
    }, [module]);

    const fetchData = () => {
        setLoading(true);
        api.get(url).then((res) => {
            if (!res.err) {
                dispatch({ type: TYPES.READ_ALL_DATA, payload: res.data });
            } else {
                dispatch({ type: TYPES.NO_DATA });
            }
            setLoading(false);
        });
    };

    const fetchDataDetail = () => {
        setLoading(true);
        url = url + "/" + toUpdate;
        api.get(url).then((res) => {
            const detail = {
                ...res.data,
                cliente: res.data?.cliente?.id ?? null,
                tipotransporte: res.data?.tipotransporte?.id ?? null,
                estado: res.data?.estado?.id ?? null,
            };
            setDetail(detail);
            setLoading(false);
        });
    };
    const getObjectProcess = () => {
        setLoading(true);
        url = url + "/" + proceso;
        console.log("URL", url);
        api.get(url).then((res) => {
            const data = res.data;
            setDetail(data);
            setLoading(false);
        });
    };
    const getTimeLineProcess = () => {
        setLoading(true);
        urlline = urlline + "/listPorProceso/" + proceso;
        api.get(urlline).then((res) => {
            const data = res.data;
            setTimeLine(data);
            setLoading(false);
        });

    };

    const fetchDataCliente = () => {
        let urlFetch = REACT_APP_API_URL + "cliente";
        api.get(urlFetch).then((res) => {
            var data = res.data.map(function (obj) {
                obj.text = obj.text || obj.nit + " - " + obj.razonsocial;
                return obj;
            });
            setCliente(data);
        });
    };

    const fetchDataTipoTransporte = () => {
        let urlFetch = REACT_APP_API_URL + "tipoTransporte";
        api.get(urlFetch).then((res) => {
            var data = res.data.map(function (obj) {
                obj.text = obj.text || obj.id + " - " + obj.descripcion;
                return obj;
            });
            setTipoTransporte(data);
        });
    };

    const fetchDataEstadoProceso = () => {
        let urlFetch = REACT_APP_API_URL + "estado";
        api.get(urlFetch).then((res) => {
            var data = res.data.map(function (obj) {
                obj.text = obj.text || obj.id + " - " + obj.descripcion;
                return obj;
            });
            setEstadoProceso(data);
        });
    };

    // Mutation methods removed for Read-Only Context

    const data = {
        db, detail, setToDetail, setToUpdate,
        module, setModule,  // detail setters kept for view logic
        cliente, tipoTransporte, estadoProceso,
        proceso, setProceso, timeLine, setTimeLine, setDetail
    };

    return <TrackingContext.Provider value={data}>{children}</TrackingContext.Provider>;
}

export { TrackingProvider };
export default TrackingContext;
