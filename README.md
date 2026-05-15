# Seoul Heritage & KDrama Tourism WebGIS

A professional, aesthetic, and interactive WebGIS dashboard visualizing the intersection of cultural heritage and popular KDrama filming locations in Seoul.

## 🚀 Features

- **Modern Glassmorphism UI**: A sleek, responsive interface built with Tailwind CSS, featuring smooth transitions and beautiful micro-animations.
- **Dark/Light Mode Toggle**: Instantly switch between themes. The application intelligently syncs the UI theme with the Leaflet basemap (CartoDB DarkMatter & Positron).
- **Responsive Layout**: Full-screen interactive map on desktop with a collapsible sidebar. On mobile, it transforms seamlessly into a bottom-sheet.
- **Advanced Spatial Analysis**:
  - **Dynamic Buffering**: Visualizes the density of tourism spots using colored, transparent 500m radius buffers around each point. Overlapping areas indicate highly dense "Hotspots".
  - **Density Insight**: A toggle filter that instantly isolates and highlights points located within 500 meters of each other, utilizing `Turf.js` for on-the-fly spatial processing.
- **Interactive Information**: Custom-styled Leaflet popups providing rich location details, including an exclusive "Featured in" badge for KDrama filming locations.
- **Robust Filtering System**:
  - Filter by Category (Heritage, KDrama Locations, Mixed).
  - Filter by Minimum Google Maps Rating (Slider).
  - Filter Top 10 Most Visited Locations (based on total reviews).

## 🛠️ Technology Stack

- **Frontend Core**: HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Mapping Engine**: [Leaflet.js](https://leafletjs.com/) (v1.9.4).
- **Spatial Processing**: [Turf.js](https://turfjs.org/) (for client-side distance calculations and density insights).
- **Styling Framework**: [Tailwind CSS](https://tailwindcss.com/) (via CDN for rapid deployment).
- **Icons**: [FontAwesome 6](https://fontawesome.com/).
- **Data Format**: GeoJSON (Converted from CSV).

## 📂 Project Structure

```
.
├── index.html       # Main HTML layout, UI controls, and Tailwind configuration.
├── styles.css       # Custom CSS for Glassmorphism, Leaflet popups, and transitions.
├── app.js           # Core application logic, map initialization, and Turf.js filtering.
├── data.geojson     # Geospatial data containing location properties.
├── convert.js       # Node.js script used to convert the original CSV to GeoJSON.
└── README.md        # Project documentation.
```

## 🌐 How to Run Locally

1. Clone this repository or download the files.
2. Since the application fetches a local `data.geojson` file, you need to serve the files using a local web server (to avoid CORS issues).
3. If you have Node.js installed, you can use `npx serve`:
   ```bash
   npx serve .
   ```
4. Alternatively, using Python:
   ```bash
   python -m http.server 8000
   ```
5. Open your browser and navigate to `http://localhost:3000` (or the port specified by your server).

## 🚀 Deployment (Vercel Ready)

This project consists entirely of static files and is 100% ready to be deployed to Vercel, Netlify, or GitHub Pages.

1. Install the Vercel CLI: `npm i -g vercel`.
2. Run `vercel` in the root directory.
3. Follow the prompts to deploy the interactive dashboard globally!

## 💡 Data Source

The data used in this application is derived from a provided CSV containing locations in Seoul categorized by their cultural significance and pop-culture (KDrama) relevance. Fields include `nama_lokasi`, `kategori_utama`, `judul_drama`, `rating_gmaps`, `total_ulasan`, and geographic coordinates.

---

*Designed and Developed for the Spatial Analysis / WebGIS requirement.*
