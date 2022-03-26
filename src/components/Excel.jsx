import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export const Excel = () => {   
    const[fileName, setFileName] = useState(null);
    const[tables, setTables] = useState();

    const handleFile = async (e) => {
        
        const promise = new Promise((resolve, reject) => {

        })

        const file = e.target.files[0];
        setFileName(file.name);
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
            raw:false
        });

    };

    return (  
        <div>
            <h1>Excel Practice</h1>
            { fileName && (
                 <p>
                    FileName: <span>{ fileName }</span>
                </p> )
            }
            <input type="file" onChange={(e) => handleFile(e) }/>
            <table>
                <thead>
                    <tr>
                        <th>입고일자</th>
                        <th>재료번호</th>
                        <th>품명</th>
                        <th>중량</th>
                        <th>두께</th>
                        <th>폭</th>
                        <th>길이</th>
                        <th>구매처명</th>
                        <th>구매담당자</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
 
export default Excel;