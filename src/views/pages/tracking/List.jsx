import React, { useContext, useEffect, useState } from "react";
import TrackingContext from "../../../context/TrackingContext";
import Header from "components/Headers/Header.js";
import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FormGroup, Label, Input } from "reactstrap";

function List({ tab }) {

    const {
        db: data, setDetail, setToDetail, setToUpdate
    } = useContext(TrackingContext);

    const [filter, setFilter] = useState("");

    const filteredData = data.filter(item =>
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(filter.toLowerCase())
    );

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: "100px" },
        { name: "Cliente", selector: row => row.cliente.nit + " - " + row.cliente.razonsocial, sortable: true },
        { name: "Nombre", selector: row => row.nombrecontenedor, sortable: true },
        { name: "Tipo Transporte", selector: row => row.tipotransporte.descripcion, sortable: true },
        { name: "Estado", selector: row => row.estado.descripcion, sortable: true },
        {
            name: "Acciones", width: "150px", cell: row => (
                <>
                    <Link className='btn btn-info btn-sm'
                        color="info"
                        to={"/admin/tracking/view/" + row.id}
                    >
                        Ver Tracking
                    </Link>
                </>
            )
        }
    ];

    useEffect(() => {
        setDetail({});
        setToUpdate(0);
    }, []);

    return (
        <>
            <Header brandText="Tracking" />
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader >

                                <div className="align-items-center row">
                                    <div className="col-12">
                                        <h3 className="mb-0">Tracking</h3>
                                        <p className="text-sm mb-0">
                                            Listado de procesos para seguimiento
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label for="buscar">Buscar</Label>
                                    <Input
                                        id="buscar"
                                        type="text"
                                        placeholder="Buscar..."
                                        value={filter}
                                        onChange={e => setFilter(e.target.value)}
                                    />
                                </FormGroup>
                                <DataTable
                                    columns={columns}
                                    data={filteredData}
                                    pagination
                                    highlightOnHover
                                    noDataComponent={<div className="text-center p-4"><p className="text-muted">No hay registros para mostrar</p></div>}
                                />

                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default List;
