import React, { useState } from 'react'

const TableDisplay = ({ jsonData }) => {

    const [visibleColumns, setVisibleColumns] = useState([]);

    const toggleColumnVisibility = (header) => {
        if (visibleColumns.includes(header)) {
            setVisibleColumns(visibleColumns.filter((col) => col !== header));
        } else {
            setVisibleColumns([...visibleColumns, header]);
        }
    };

    const renderTable = () => {
        if (!jsonData || !jsonData.products) {
            return null;
        }

        const productIds = Object.keys(jsonData.products);
        const firstProduct = jsonData.products[productIds[0]];
        const headers = Object.keys(firstProduct);

        if (visibleColumns.length === 0) {
            // Initially, set visibleColumns to include all headers
            setVisibleColumns(headers);
        }


        return (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
                <div style={{ padding: "5px", display: "flex", justifyContent: "start", alignContent: "center", width: "fit-content", margin: "5px", }}>
                    {headers.map((header) => (
                        <label key={header} style={{ margin: "0px 10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <input
                                type="checkbox"
                                checked={visibleColumns.includes(header)}
                                onChange={() => toggleColumnVisibility(header)}
                            />
                            {header.toUpperCase()}
                        </label>
                    ))}
                </div>
                <table style={{ width: "80%", alignContent: "center", margin: "5px"}}>
                    <thead>
                        <tr>
                            {headers
                                .filter((header) => visibleColumns.includes(header))
                                .map((header) => (
                                    <th style={{ background:"#DAE0E2" , padding:"10px"}} key={header}>{header.toLocaleUpperCase()}</th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {productIds.map((productId) => (
                            <tr key={productId} style={{  }}>
                                {headers
                                    .filter((header) => visibleColumns.includes(header))
                                    .map((header) => (
                                        <td align="center" style={{padding:"10px",}} key={header}>{jsonData.products[productId][header]}</td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return <div>{renderTable()}</div>;
};

export default TableDisplay
