import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useParams } from "react-router-dom";

const Place = () => {
    const { name } = useParams()
    return (
        <DashboardLayout>
            <section className="section">
                <h1>{name}</h1>

            </section>
        </DashboardLayout>);
};

export default Place;
