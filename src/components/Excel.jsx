import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export const Excel = () => {   
    const[tables, setTables] = useState([]);

    const handleFile = (file) => {
        
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload =(e) => {
                const bufferArray = e.target.result;
                const workbook = XLSX.read(bufferArray, {type: 'buffer'});
                const worksheetname = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetname];
                const data = XLSX.utils.sheet_to_json(worksheet, {raw:false});
                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            setTables(d);
        });
    };

    const handleOnExport = () => {
        var workbook = XLSX.utils.book_new(),
        worksheet = XLSX.utils.json_to_sheet(tables);
        // worksheet = XLSX.utils.json_to_sheet(array);
        // worksheet = XLSX.utils.aoa_to_sheet(tables);

        XLSX.utils.book_append_sheet(workbook, worksheet, "test");
        XLSX.writeFile(workbook, "test.xlsx");
    };

    return (  
        <div>
            <h1>Excel Practice</h1>
            <input type="file" onChange={(e) => {
                const file = e.target.files[0];
                handleFile(file);
            }}/>
            <button onClick={handleOnExport}>Export</button>
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
                    { tables.map((table) => (
                        <tr key={table.product_num}>
                            <th> { table.wear_date } </th>
                            <td>{ table.product_num }</td>
                            <td>{ table.product_name }</td>
                            <td>{ table.weight }</td>
                            <td>{ table.thickness }</td>
                            <td>{ table.width }</td>
                            <td>{ table.length }</td>
                            <td>{ table.company }</td>
                            <td>{ table.manager }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default Excel;