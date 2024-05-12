 
  
interface CropEntry {
    Country: string; 
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))"?: number | string;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"?: number | string;
    "Area Under Cultivation (UOM:Ha(Hectares))"?: number | string;
  }
  
  interface TableData {
    year: string;
    maxCrop: string;
    minCrop: string;
  }
  
  interface CropStats {
    [key: string]: {
      totalYield: number;
      totalArea: number;
      count: number;
    };
  }
  
  // Function to calculate crop data
  const calculateCropData = (data: CropEntry[]) => {
    // Arrays to store first and second table data
    const firstTableData: TableData[] = [];
    const secondTableData: { cropName: string; avgYield: string; avgArea: string; }[] = [];
    
    // Function to create the first table
    const createFirstTable = (data: CropEntry[]) => {
      // Object to store crop data by year
      const table: { [key: string]: { maxCrop: { name: string; production: number; }; minCrop: { name: string; production: number; }; }; } = {};
      data.forEach(entry => {
        // Extract year from entry
        const year = entry.Year.split(',')[1].trim();
        if (!(year in table)) {
          // Initialize year if not already present
          table[year] = {
            maxCrop: { name: '', production: -Infinity },
            minCrop: { name: '', production: Infinity }
          };
        }
        if (typeof entry["Crop Production (UOM:t(Tonnes))"] === "number") {
          // Update max and min crop production for each year
          const production = entry["Crop Production (UOM:t(Tonnes))"] as number;
          if (production > table[year].maxCrop.production) {
            table[year].maxCrop = { name: entry["Crop Name"], production };
          }
          if (production < table[year].minCrop.production) {
            table[year].minCrop = { name: entry["Crop Name"], production };
          }
        }
      });
  
      // Convert table object to array
      for (const year in table) {
        firstTableData.push({
          year,
          maxCrop: table[year].maxCrop.name,
          minCrop: table[year].minCrop.name
        });
      }
    }
  
    // Function to create the second table
    const createSecondTable = (data: CropEntry[]) => {
      // Object to store crop statistics
      const cropStats: CropStats = {};
      data.forEach(entry => {
        const cropName = entry["Crop Name"];
        if (!(cropName in cropStats)) {
          // Initialize crop statistics if not already present
          cropStats[cropName] = { totalYield: 0, totalArea: 0, count: 0 };
        }
        if (typeof entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] === "number" && typeof entry["Area Under Cultivation (UOM:Ha(Hectares))"] === "number") {
          // Update total yield, total area, and count for each crop
          const yieldValue = entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] as number;
          const areaValue = entry["Area Under Cultivation (UOM:Ha(Hectares))"] as number;
          cropStats[cropName].totalYield += yieldValue;
          cropStats[cropName].totalArea += areaValue;
          cropStats[cropName].count++;
        }
      });
  
      // Calculate average yield and average area for each crop and push to second table data
      for (const cropName in cropStats) {
        const avgYield = cropStats[cropName].totalYield / cropStats[cropName].count;
        const avgArea = cropStats[cropName].totalArea / cropStats[cropName].count;
        secondTableData.push({
          cropName,
          avgYield: avgYield.toFixed(2), // Limiting to two decimal places
          avgArea: avgArea.toFixed(2)
        });
      }
    }
  
    // Call functions to create tables
    createFirstTable(data);
    createSecondTable(data);
  
    // Return first and second table data
    return { firstTableData, secondTableData };
  }
  
  // Export the function
  export default calculateCropData;
  