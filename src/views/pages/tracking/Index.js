import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import List from "./List";
import Tracking from "./Tracking";

import { TrackingProvider } from "context/TrackingContext";

const Index = () => {

    return (
        <>
            <TrackingProvider>
                <Routes>
                    <Route exact path="/" element={<List />} />
                    <Route exact path="/view/:id" element={<Tracking />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </TrackingProvider>
        </>
    );
}

export default Index;
