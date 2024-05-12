

import React from 'react';

// Define interfaces for table data
interface FirstTableData {
  year?: string;
  maxCrop?: string;
  minCrop?: string;
}

interface SecondTableData {
  cropName?: string;
  avgYield?: string;
  avgArea?: string;
}

// Define props interface for the CropTable component
interface TableProps {
  data: (FirstTableData | SecondTableData)[]; // Array of either FirstTableData or SecondTableData objects
  tableType: string; // Indicates whether it's the "First Table" or "Second Table"
}

// Define CropTable component as a functional component
const CropTable: React.FC<TableProps> = ({ data, tableType }) => {

  return (
    <div className="table-container">
      <div className="crop-table-wrapper">
        {/* Render the table */}
        <table className="crop-table">
          <thead>
            <tr>
              {/* Conditional rendering of table headers based on tableType */}
              <th>{tableType === "First Table" ? "Year" : "Crop"}</th>
              <th>{tableType === "First Table" ? "Max Crop" : "Average Yield"}</th>
              <th>{tableType === "First Table" ? "Min Crop" : "Average Cultivation Area"}</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through data array and render table rows */}
            {data.map((item, index) => (
              <tr key={index}>
                {/* Conditional rendering of table cell data based on tableType */}
                <td>{tableType === "First Table" ? (item as FirstTableData).year : (item as SecondTableData).cropName}</td>
                <td>{tableType === "First Table" ? (item as FirstTableData).maxCrop : (item as SecondTableData).avgYield}</td>
                <td>{tableType === "First Table" ? (item as FirstTableData).minCrop : (item as SecondTableData).avgArea}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CropTable;
