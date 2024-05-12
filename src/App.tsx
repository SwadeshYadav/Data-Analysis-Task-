import React, { useEffect, useState } from 'react';
import calculateCropData from './calculateData'; // Import function to calculate crop data
import CropData from './data.json'; // Import crop data from JSON file
import CropTable from './CropTable'; // Import CropTable component
import "./App.css"

// Define interfaces for table data
interface TableData {
  year?: string;
  maxCrop?: string;
  minCrop?: string;
  cropName?: string;
  avgYield?: string;
  avgArea?: string;
}

// Define interface for crop entry
interface CropEntry {
  Country: string; 
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))"?: number | string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"?: number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))"?: number | string;
}

const App = () => {
  // State variables to store first and second table data
  const [firstTableData, setFirstTableData] = useState<TableData[]>([]);
  const [secondTableData, setSecondTableData] = useState<{ cropName: string; avgYield: string; avgArea: string; }[]>([]);

  useEffect(() => {
    // Calculate crop data when component mounts
    const { firstTableData, secondTableData } = calculateCropData(CropData as CropEntry[]);
    setFirstTableData(firstTableData);
    setSecondTableData(secondTableData);
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className='parent'>
      {/* Render first table */}
      <h2 style={{color:"purple"}}>Maximum and Minimum Production Crops</h2>
      <CropTable data={firstTableData} tableType="First Table" />
      
      {/* Render second table */}
      <h2 style={{ marginTop: "40px", color:"purple" }}>Average Yield and Cultivation Area of Crops</h2>
      <CropTable data={secondTableData} tableType="Second Table" />
    </div>
  );
}

export default App;
