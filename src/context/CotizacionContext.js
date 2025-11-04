import { helpHttp } from "helpers/helpHttp";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { TYPES } from "actions/genericAction";
import { genericReducer, genericInitialState } from "../reducers/genericReducer";
import NotificationContext from "context/NotificationContext";
import LoadingContext from "context/LoadingContext";
import { useNavigate } from "react-router";

const CotizacionContext = createContext();

const CotizacionProvider = ({children}) => {

    const [toDetail, setToDetail] = useState();
    const [toUpdate, setToUpdate] = useState();
    const [detail, setDetail] = useState({});
    const [module, setModule] = useState();

    const navigate = useNavigate();
    const { REACT_APP_API_URL } = process.env;

    const { setMessage, setStatus, setType } = useContext(NotificationContext);
    const { setLoading } = useContext(LoadingContext);

    const [state, dispatch] = useReducer(genericReducer, genericInitialState);
    const { db } = state;

    let api = helpHttp();
    let url = REACT_APP_API_URL+"cotizacion";

    useEffect(() => {
        //fetchData();
        fetchDataCotizacion();
    },[]);

    useEffect(() => {
        if(toUpdate && toUpdate != 0){
            fetchDataDetail();
        }
    },[toUpdate]);

    const fetchDataCotizacion = () => {
        setLoading(true);

        let data = [
            {
                id: 1,
                nombre: "La Playa",
                direccion: "Direccion 1",
                ciudad: "Ciudad 1",
                ubicacion: "Ubicacion 1",
                administrador: "Administrador 1",
                celular: "Celular 1",
                observacion: "Observacion 1"
            },
            {
                id: 2,
                nombre: "El Faro",
                direccion: "Direccion 2",
                ciudad: "Ciudad 2",
                ubicacion: "Ubicacion 2",
                administrador: "Administrador 2",
                celular: "Celular 2",
                observacion: "Observacion 2"
            },
            {
                id: 3,
                nombre: "San Agustin",
                direccion: "Direccion 3",
                ciudad: "Ciudad 3",
                ubicacion: "Ubicacion 3",
                administrador: "Administrador 3",
                celular: "Celular 3",
                observacion: "Observacion 3"
            }
        ]

        dispatch({ type: TYPES.READ_ALL_DATA, payload: data });
        setLoading(false);
    };

    const fetchData = () => {
        setLoading(true);
         api.get(url).then((res) => {
            if(!res.err){
                dispatch({ type: TYPES.READ_ALL_DATA, payload: res.data });
            }else{
                dispatch({ type: TYPES.NO_DATA });
            }
            setLoading(false);
        });
    };

    const fetchDataDetail = () => {
        setLoading(true);
        url = url+"/"+toUpdate;
        api.get(url).then((res) => {
            setDetail(res.data);
            setLoading(false);
        });
    };

    const saveData = (data) => {
        setLoading(true);
        let endpoint = url;
        let newData = data;
        delete newData.id;
        let options = {
            body: newData,
            headers: {"content-type":"application/json"}
        }
        api.post(endpoint, options).then((res) => {
            if(!res.err){
                dispatch({ type: TYPES.CREATE_DATA, payload: res.data });
                navigate('/admin/cotizacion/');
                setType("success");
                setMessage("The registry was updated correctly");
                setStatus(1);
            }else{

            }
            setLoading(false);
        })
    }

    const updateData = (data) => {
        setLoading(true);
        let endpoint = url+"/"+data.id;
        let newData = data;
        delete newData.id;
        let options = {
            body: newData,
            headers: {"content-type":"application/json"}
        }
        api.put(endpoint, options).then((res) => {
            if(!res.err){
                setDetail(res.data);
                dispatch({ type: TYPES.UPDATE_DATA, payload: res.data });
                navigate('/admin/cotizacion');
                setType("success");
                setMessage("The registry was updated correctly");
                setStatus(1);
            }else{

            }
            setLoading(false);
        })
    }

    const deleteData = (id) => {
        setLoading(true);
        let endpoint = url+"/"+id;
        let options = {
            body: "",
            headers: {"content-type":"application/json"}
        }
        api.del(endpoint, options).then((res) => {
            if(!res.err){
                dispatch({ type: TYPES.DELETE_DATA, payload: id });
                setType("success");
                setMessage("The registry was deleted correctly");
                setStatus(1);
            }else{
                setType("danger");
                setMessage(res.message.message);
                setStatus(1);
            }
            setLoading(false);
        });
    }

    const data = { 
        db, detail, setToDetail, setToUpdate, updateData, saveData, deleteData, module, 
        setModule, setDetail 
    };

    return <CotizacionContext.Provider value={data}>{children}</CotizacionContext.Provider>;
}

export { CotizacionProvider };
export default CotizacionContext;