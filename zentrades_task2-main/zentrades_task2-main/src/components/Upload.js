import React, { useState } from 'react'
import TableDisplay from './TableDisplay';

const Upload = () => {
    const [jsonData, setJsonData] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const parsedData = JSON.parse(e.target.result);
                    setJsonData(parsedData);
                } catch (error) {
                    console.error('Error parsing JSON file:', error);
                }
            };

            reader.readAsText(file);
        }
    };

    return (
        <div>
            <div style={{display:"flex", justifyContent:"start", alignItems:"center", padding:"5px"}}>   
                <h3>Give us a file input (.json)</h3>
                <input type="file" onChange={handleFileUpload} style={{ padding: "5px", margin: "5px" }} />
            </div>
            <TableDisplay jsonData={jsonData} />
        </div>
    );
};

export default Upload;