const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('./Seoul-Data/korea-trip-place.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let isFirstLine = true;
  let headers = [];
  const geojson = {
    type: "FeatureCollection",
    features: []
  };

  for await (const line of rl) {
    // Basic CSV parsing that handles quotes
    const regex = /(?:\"([^\"]*)\")|([^\,]+)/g;
    let match;
    let cols = [];
    
    // Better simple CSV parsing logic
    let inQuotes = false;
    let currentCell = '';
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' && line[i+1] === '"') {
            currentCell += '"';
            i++; // skip next quote
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            cols.push(currentCell.trim());
            currentCell = '';
        } else {
            currentCell += char;
        }
    }
    cols.push(currentCell.trim());

    if (isFirstLine) {
      headers = cols;
      isFirstLine = false;
      continue;
    }

    if (cols.length < 2) continue; // Skip empty lines

    const properties = {};
    headers.forEach((header, index) => {
        if (cols[index]) {
            properties[header] = cols[index];
        }
    });

    const lat = parseFloat(properties['Latitude']);
    const lng = parseFloat(properties['Longitude']);

    if (!isNaN(lat) && !isNaN(lng)) {
        geojson.features.push({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [lng, lat]
            },
            properties: properties
        });
    }
  }

  fs.writeFileSync('data.geojson', JSON.stringify(geojson, null, 2));
  console.log('Conversion complete: data.geojson created.');
}

processLineByLine();
