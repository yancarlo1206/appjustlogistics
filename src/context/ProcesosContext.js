import { helpHttp } from "helpers/helpHttp";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { TYPES } from "actions/genericAction";
import { genericReducer, genericInitialState } from "../reducers/genericReducer";
import NotificationContext from "context/NotificationContext";
import LoadingContext from "context/LoadingContext";
import { useNavigate } from "react-router";

const ProcesosContext = createContext();

const ProcesosProvider = ({ children }) => {

    const [toDetail, setToDetail] = useState();
    const [toUpdate, setToUpdate] = useState();
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
        urlline = urlline + "/listPorProceso/"+proceso;
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

    const saveTimeLineState = (data) => {
        setLoading(true);
        let endpoint = urlline;
        let options = {
            body: data,
            headers: { "content-type": "application/json" }
        }
        let proceso = data.proceso.id;
        api.post(endpoint, options).then((res) => {
            if (!res.err) {
                dispatch({ type: TYPES.CREATE_DATA, payload: res.data });
                setType("success");
                setMessage("El evento fue registrado con éxito en la línea de tiempo");
                setStatus(1);
                setProceso(proceso);
            } else {
                setType("danger");
                setMessage("No se pudo registrar el evento en la línea de tiempo");
                setStatus(1);
            }
            setLoading(false);
        })
       
    };
    const editTimeLineState = (data) => {
         setLoading(true);
        let endpoint = urlline + "/" + data.id;

        const newData = {
            descripcion: data.descripcion,
            fechaevento: data.fechaevento,
            estado: { id: data.estado.id },
            proceso: { id: data.proceso.id },
            ubicacion: data.ubicacion
        };

         let proceso = data.proceso.id;

        let options = {
            body: newData,
            headers: { "content-type": "application/json" }
        }
        api.put(endpoint, options).then((res) => {
            if (!res.err) {
                dispatch({ type: TYPES.UPDATE_DATA, payload: res.data });
                setType("success");
                setMessage("El evento fue actualizado con éxito en la línea de tiempo");
                setStatus(1);
                setProceso(proceso);
            } else {
                setType("danger");
                setMessage("No se pudo actualizar el evento en la línea de tiempo");
                setStatus(1);
            }
            setLoading(false);
        })
    };
     const deleteTimelineState = (id,proceso) => {
        setLoading(true);
        let endpoint = urlline + "/" + id;
        let options = {
            body: "",
            headers: { "content-type": "application/json" }
        }
        api.del(endpoint, options).then((res) => {
            if (!res.err) {
                dispatch({ type: TYPES.DELETE_DATA, payload: id });
                setType("success");
                setMessage("El evento fue eliminado con éxito en la línea de tiempo");
                setStatus(1);
                setProceso(proceso);
            } else {
                setType("danger");
                setMessage(res.message.message);
                setStatus(1);
            }
            setLoading(false);
        });
    }

    const saveData = (data) => {
        setLoading(true);
        let endpoint = url;

        const newData = {
            ...data,
            cliente: { id: data.cliente },
            tipotransporte: { id: data.tipotransporte },
            estado: { id: data.estado },
        };

        delete newData.id;

        let options = {
            body: newData,
            headers: { "content-type": "application/json" }
        }
        api.post(endpoint, options).then((res) => {
            if (!res.err) {
                dispatch({ type: TYPES.CREATE_DATA, payload: res.data });
                navigate('/admin/procesos/');
                setType("success");
                setMessage("El proceso fue registrado con éxito");
                setStatus(1);
            } else {

            }
            setLoading(false);
        })
    }

    const updateData = (data) => {
        setLoading(true);
        let endpoint = url + "/" + data.id;

        const newData = {
            ...data,
            cliente: { id: data.cliente },
            tipotransporte: { id: data.tipotransporte },
            estado: { id: data.estado },
        };

        delete newData.id;

        let options = {
            body: newData,
            headers: { "content-type": "application/json" }
        }
        api.put(endpoint, options).then((res) => {
            if (!res.err) {
                setDetail(res.data);
                dispatch({ type: TYPES.UPDATE_DATA, payload: res.data });
                navigate('/admin/procesos');
                setType("success");
                setMessage("El proceso fue actualizado con éxito");
                setStatus(1);
            } else {

            }
            setLoading(false);
        })
    }

    const deleteData = (id) => {
        setLoading(true);
        let endpoint = url + "/" + id;
        let options = {
            body: "",
            headers: { "content-type": "application/json" }
        }
        api.del(endpoint, options).then((res) => {
            if (!res.err) {
                dispatch({ type: TYPES.DELETE_DATA, payload: id });
                setType("success");
                setMessage("El proceso fue eliminado con éxito");
                setStatus(1);
            } else {
                setType("danger");
                setMessage(res.message.message);
                setStatus(1);
            }
            setLoading(false);
        });
    }

    const data = {
        db, detail, setToDetail, setToUpdate, updateData, saveData, deleteData, module,
        setModule, setDetail, cliente, setCliente, tipoTransporte, setTipoTransporte,
        estadoProceso, setEstadoProceso, proceso, setProceso, timeLine, setTimeLine,
        saveTimeLineState,editTimeLineState,deleteTimelineState
    };

    return <ProcesosContext.Provider value={data}>{children}</ProcesosContext.Provider>;
}

export { ProcesosProvider };
export default ProcesosContext;