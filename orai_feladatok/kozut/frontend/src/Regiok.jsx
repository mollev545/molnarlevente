import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Regiok = () => {
    const [regiok, setRegiok] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/regiok")
            .then(res => res.json())
            .then(data => setRegiok(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="container mt-4">
            <div className="table-responsive">
            <h1 class="f4 bold center mw5">Régiók</h1>
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Régió Név</th>
                            <th>Régió Típusa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regiok.map(({ Rid, regionev, regio_tipusa }) => (
                            <tr key={Rid}>
                                <td>{Rid}</td>
                                <td>{regionev}</td>
                                <td>{regio_tipusa}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Regiok;
