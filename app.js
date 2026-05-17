// --- DOM Elements ---
const htmlEl = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapse-btn');
const expandBtn = document.getElementById('expand-btn');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileOverlay = document.getElementById('mobile-overlay');
const btnRecenter = document.getElementById('btn-recenter');
const loadingOverlay = document.getElementById('loading-overlay');

// Chatbot UI Elements
const chatbotFab = document.getElementById('chatbot-fab');
const chatbotPanel = document.getElementById('chatbot-panel');
const closeChatBtn = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatPrompts = document.querySelectorAll('.chat-prompt');

// Filters
const categoryFilters = document.querySelectorAll('.category-filter');
const ratingSlider = document.getElementById('rating-slider');
const ratingValue = document.getElementById('rating-value');
const popularFilter = document.getElementById('popular-filter');
const densityFilter = document.getElementById('density-filter');
const subwayFilter = document.getElementById('subway-filter');

// --- Global State ---
let map;
let allFeatures = []; // To store the original GeoJSON features
let geojsonLayer;
let bufferLayer; // LayerGroup for circles
let subwayLayer; // LayerGroup for subway stations
let subwayFeatures = []; // To store subway CSV data
let isSubwayDataLoaded = false;
let currentTheme = 'dark';

const SEOUL_CENTER = [37.5665, 126.9780];
const DEFAULT_ZOOM = 12;

// Colors mapping
const COLORS = {
    'Budaya': '#ef4444', // Red
    'Lokasi Syuting': '#3b82f6', // Blue
    'Keduanya': '#a855f7' // Purple
};

const ICONS = {
    'Budaya': 'fa-landmark',
    'Lokasi Syuting': 'fa-video',
    'Keduanya': 'fa-star'
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initUI();
    initMap();
    loadData();
});

// --- Theme Management ---
function initTheme() {
    // We set dark as default in HTML, let's sync
    if (htmlEl.classList.contains('dark')) {
        themeToggle.checked = true;
        currentTheme = 'dark';
    } else {
        themeToggle.checked = false;
        currentTheme = 'light';
    }

    themeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            htmlEl.classList.add('dark');
            currentTheme = 'dark';
        } else {
            htmlEl.classList.remove('dark');
            currentTheme = 'light';
        }
        updateBasemap();
    });
}

// --- UI Interactions ---
function initUI() {
    // Sidebar Collapse (Desktop)
    collapseBtn.addEventListener('click', () => {
        sidebar.classList.add('md:-translate-x-full');
        setTimeout(() => {
            expandBtn.classList.remove('hidden');
        }, 300);
        setTimeout(() => map.invalidateSize(), 400);
    });

    expandBtn.addEventListener('click', () => {
        sidebar.classList.remove('md:-translate-x-full');
        expandBtn.classList.add('hidden');
        setTimeout(() => map.invalidateSize(), 400);
    });

    // Mobile Bottom Sheet / Overlay
    const toggleMobileMenu = (e) => {
        if(e) e.preventDefault();
        sidebar.classList.toggle('mobile-open');
        mobileOverlay.classList.toggle('overlay-open');
    };

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        mobileMenuToggle.addEventListener('touchstart', toggleMobileMenu, {passive: false});
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', toggleMobileMenu);
        mobileOverlay.addEventListener('touchstart', toggleMobileMenu, {passive: false});
    }

    // Reset View
    btnRecenter.addEventListener('click', () => {
        map.flyTo(SEOUL_CENTER, DEFAULT_ZOOM, { duration: 1.5 });
    });

    // Filter Listeners
    categoryFilters.forEach(cb => cb.addEventListener('change', updateMapData));
    
    ratingSlider.addEventListener('input', (e) => {
        ratingValue.textContent = parseFloat(e.target.value).toFixed(1) + '+';
    });
    ratingSlider.addEventListener('change', updateMapData);
    
    popularFilter.addEventListener('change', updateMapData);
    densityFilter.addEventListener('change', updateMapData);
    
    if (subwayFilter) {
        subwayFilter.addEventListener('change', (e) => {
            if (e.target.checked) {
                if (!isSubwayDataLoaded) {
                    loadingOverlay.classList.remove('opacity-0');
                    loadSubwayData().then(() => {
                        map.addLayer(subwayLayer);
                        loadingOverlay.classList.add('opacity-0');
                    }).catch(() => loadingOverlay.classList.add('opacity-0'));
                } else {
                    map.addLayer(subwayLayer);
                }
            } else {
                map.removeLayer(subwayLayer);
            }
        });
    }

    // Chatbot Listeners
    chatbotFab.addEventListener('click', () => {
        chatbotPanel.classList.add('chat-open');
        chatbotFab.classList.add('scale-0');
    });

    closeChatBtn.addEventListener('click', () => {
        chatbotPanel.classList.remove('chat-open');
        chatbotFab.classList.remove('scale-0');
    });

    chatPrompts.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const queryType = e.currentTarget.dataset.query;
            let text = e.currentTarget.innerText;
            // Remove emojis from text for cleaner query match if needed, or just map queries
            
            if (queryType === 'rating-top') {
                handleTextQuery('Rating tertinggi');
            } else if (queryType === 'kingdom') {
                handleTextQuery('Kingdom');
            } else if (queryType === 'density') {
                handleTextQuery('Kepadatan');
            } else {
                handleTextQuery(text);
            }
        });
    });

    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    if (chatForm && chatInput) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if(text) {
                handleTextQuery(text);
                chatInput.value = '';
            }
        });
    }
}

// --- Map Logic ---
const basemaps = {
    light: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }),
    dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    })
};

function initMap() {
    map = L.map('map', {
        center: SEOUL_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: false // Move to bottom right
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Init basemap
    basemaps[currentTheme].addTo(map);
    
    // Init layer groups
    bufferLayer = L.layerGroup().addTo(map);
    geojsonLayer = L.geoJSON(null, {
        pointToLayer: createCustomMarker,
        onEachFeature: bindPopupData
    }).addTo(map);
    subwayLayer = L.layerGroup(); // Do not add to map by default

    // Prevent map interactions when scrolling/touching sidebar & chatbot
    L.DomEvent.disableScrollPropagation(sidebar);
    L.DomEvent.disableClickPropagation(sidebar);
    L.DomEvent.on(sidebar, 'touchstart touchmove touchend wheel', L.DomEvent.stopPropagation);
    
    const sidebarScroll = document.getElementById('sidebar-scroll');
    if (sidebarScroll) {
        L.DomEvent.disableScrollPropagation(sidebarScroll);
        L.DomEvent.on(sidebarScroll, 'touchstart touchmove touchend wheel', L.DomEvent.stopPropagation);
    }
    
    L.DomEvent.disableScrollPropagation(chatbotPanel);
    L.DomEvent.disableClickPropagation(chatbotPanel);
    L.DomEvent.on(chatbotPanel, 'touchstart touchmove touchend wheel', L.DomEvent.stopPropagation);
}

function updateBasemap() {
    if (currentTheme === 'dark') {
        map.removeLayer(basemaps.light);
        basemaps.dark.addTo(map);
    } else {
        map.removeLayer(basemaps.dark);
        basemaps.light.addTo(map);
    }
}

// --- Data Loading & Processing ---
async function loadData() {
    loadingOverlay.classList.remove('opacity-0');
    try {
        const response = await fetch('data.geojson');
        const data = await response.json();
        allFeatures = data.features;
        updateMapData(); // Initial render
    } catch (error) {
        console.error("Error loading GeoJSON data:", error);
        alert("Failed to load map data. Make sure data.geojson exists.");
    } finally {
        loadingOverlay.classList.add('opacity-0');
    }
}

async function loadSubwayData() {
    return new Promise((resolve, reject) => {
        Papa.parse('QGIS/Seoul_subway_stations.csv', {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: function(results) {
                const data = results.data;
                subwayFeatures = data.filter(row => row.lat && row.lng);
                
                subwayFeatures.forEach(row => {
                    const icon = L.divIcon({
                        className: 'custom-div-icon',
                        html: `<div class="custom-marker marker-subway w-6 h-6 flex items-center justify-center shadow-md rounded-full text-white text-[10px] z-[100] border-2">M</div>`,
                        iconSize: [24, 24],
                        iconAnchor: [12, 12],
                        popupAnchor: [0, -12]
                    });

                    const marker = L.marker([row.lat, row.lng], { icon: icon });
                    
                    const html = `
                        <div class="popup-header">
                            <span class="popup-category" style="background:#06b6d4;color:white;padding:2px 8px;border-radius:12px;font-weight:700;font-size:11px;">${row.line}</span>
                            <h3 class="popup-title mt-2">${row.name} Station</h3>
                        </div>
                        <div class="popup-body p-4 text-sm">
                            <p class="popup-desc m-0 flex items-center"><i class="fa-solid fa-hashtag mr-2 text-gray-400"></i> Station No: <b>${row.no}</b></p>
                        </div>
                    `;
                    marker.bindPopup(html, { closeButton: false, minWidth: 220 });
                    subwayLayer.addLayer(marker);
                });
                isSubwayDataLoaded = true;
                resolve();
            },
            error: function(err) {
                console.error("Error loading Subway Data", err);
                reject(err);
            }
        });
    });
}

// Custom Marker rendering
function createCustomMarker(feature, latlng) {
    const category = feature.properties.kategori_utama;
    let colorClass = 'marker-kdrama';
    let iconClass = 'fa-star';

    if (category === 'Budaya') {
        colorClass = 'marker-budaya';
        iconClass = 'fa-landmark';
    } else if (category === 'Lokasi Syuting') {
        colorClass = 'marker-kdrama';
        iconClass = 'fa-video';
    } else if (category === 'Keduanya') {
        colorClass = 'marker-both';
        iconClass = 'fa-crown';
    }

    const html = `<div class="custom-marker ${colorClass} w-8 h-8 flex items-center justify-center shadow-lg"><i class="fa-solid ${iconClass} text-sm"></i></div>`;
    
    const icon = L.divIcon({
        className: 'custom-div-icon',
        html: html,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
    });

    return L.marker(latlng, { icon: icon });
}

// Popup Content Generation
function bindPopupData(feature, layer) {
    const p = feature.properties;
    const catClass = p.kategori_utama === 'Budaya' ? 'cat-budaya' : (p.kategori_utama === 'Lokasi Syuting' ? 'cat-kdrama' : 'cat-both');
    
    let kdramaBadge = '';
    if (p.judul_drama && p.judul_drama !== '-' && p.judul_drama.trim() !== '') {
        kdramaBadge = `
            <div class="popup-kdrama-badge shadow-md">
                <i class="fa-solid fa-clapperboard"></i> Featured in: ${p.judul_drama}
            </div>
        `;
    }

    const coords = feature.geometry.coordinates;

    const html = `
        <div class="popup-header">
            <span class="popup-category ${catClass}">${p.kategori_utama}</span>
            <h3 class="popup-title mt-2">${p.nama_lokasi}</h3>
        </div>
        <div class="popup-body">
            ${kdramaBadge}
            <p class="popup-desc">${p.deskripsi_popup || 'Tidak ada deskripsi.'}</p>
        </div>
        <div class="popup-footer flex-col items-stretch px-4 pb-4">
            <div class="flex justify-between w-full mb-3">
                <div class="popup-rating"><i class="fa-solid fa-star mr-1"></i> ${p.rating_gmaps}</div>
                <div class="popup-reviews"><i class="fa-regular fa-comment mr-1"></i> ${parseInt(p.total_ulasan).toLocaleString()} reviews</div>
            </div>
            <a href="https://www.google.com/maps?q=${coords[1]},${coords[0]}" target="_blank" rel="noopener noreferrer" class="w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center shadow-sm">
                <i class="fa-solid fa-map-location-dot mr-2"></i> Open in Google Maps
            </a>
        </div>
    `;

    layer.bindPopup(html, { closeButton: false, minWidth: 300 });
}

// --- Filtering & Update Logic ---
function updateMapData() {
    // 1. Get Filter Values
    const activeCategories = Array.from(categoryFilters)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    const minRating = parseFloat(ratingSlider.value);
    const showPopular = popularFilter.checked;
    const showDensity = densityFilter.checked;

    // 2. Filter Features
    let filteredFeatures = allFeatures.filter(f => {
        const p = f.properties;
        const matchesCategory = activeCategories.includes(p.kategori_utama);
        const matchesRating = parseFloat(p.rating_gmaps) >= minRating;
        return matchesCategory && matchesRating;
    });

    // Popularity Filter (Top 10)
    if (showPopular) {
        filteredFeatures.sort((a, b) => parseInt(b.properties.total_ulasan) - parseInt(a.properties.total_ulasan));
        filteredFeatures = filteredFeatures.slice(0, 10);
    }

    // Density Filter (Hotspots < 500m)
    // We highlight them by only keeping features that are within 500m of another feature in the current filtered set.
    if (showDensity && filteredFeatures.length > 1) {
        const fc = turf.featureCollection(filteredFeatures);
        const denseFeatures = [];
        
        filteredFeatures.forEach(feature => {
            // Find distances from this feature to all others
            let hasNeighbor = false;
            for (let other of filteredFeatures) {
                if (feature.properties.id_lokasi !== other.properties.id_lokasi) {
                    const distance = turf.distance(feature, other, {units: 'kilometers'});
                    if (distance <= 0.5) { // 500m
                        hasNeighbor = true;
                        break;
                    }
                }
            }
            if (hasNeighbor) {
                denseFeatures.push(feature);
            }
        });
        filteredFeatures = denseFeatures;
    }

    // 3. Render Markers
    geojsonLayer.clearLayers();
    geojsonLayer.addData(filteredFeatures);

    // 4. Render Buffers
    bufferLayer.clearLayers();
    
    // Efficient intersection check for density glow
    const intersecting = new Set();
    for (let i = 0; i < filteredFeatures.length; i++) {
        for (let j = i + 1; j < filteredFeatures.length; j++) {
            const dist = turf.distance(filteredFeatures[i], filteredFeatures[j], {units: 'kilometers'});
            if (dist <= 1.0) { // Buffers of 0.5 radius intersect if distance <= 1.0 (1km)
                intersecting.add(filteredFeatures[i].properties.id_lokasi);
                intersecting.add(filteredFeatures[j].properties.id_lokasi);
            }
        }
    }

    filteredFeatures.forEach(f => {
        const coords = f.geometry.coordinates;
        const cat = f.properties.kategori_utama;
        const color = COLORS[cat] || '#888';
        const isDense = intersecting.has(f.properties.id_lokasi);
        
        // Draw a 500m buffer circle
        L.circle([coords[1], coords[0]], {
            radius: 500, // meters
            color: color,
            fillColor: color,
            fillOpacity: isDense ? 0.35 : 0.15,
            weight: isDense ? 2 : 1,
            dashArray: isDense ? null : '4, 4',
            className: isDense ? 'buffer-glow' : ''
        }).addTo(bufferLayer);
    });

    // 5. Fit Bounds if not empty
    if (filteredFeatures.length > 0) {
        const group = new L.featureGroup(geojsonLayer.getLayers());
        // Only fit bounds if density filter is toggled to show the new focus, otherwise stay put
        // or just fit bounds smoothly if points changed dramatically
        // For a better UX, maybe we don't always zoom unless requested. 
        // We will just do a soft pan if the map center is too far.
        // Let's just do it smoothly
        map.flyToBounds(group.getBounds(), { padding: [50, 50], duration: 1, maxZoom: 14 });
    }
}

// --- Chatbot Logic ---

function appendMessage(sender, text) {
    const div = document.createElement('div');
    const isUser = sender === 'user';
    div.className = `chat-bubble ${sender} text-sm p-3 shadow-sm border ${isUser ? 'user' : 'ai bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'}`;
    div.innerHTML = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleTextQuery(text) {
    appendMessage('user', text);

    setTimeout(() => {
        if (!allFeatures || allFeatures.length === 0) {
            appendMessage('ai', "Maaf, data belum termuat sepenuhnya.");
            return;
        }

        const lowerText = text.toLowerCase();
        let response = '';

        if (lowerText.includes('rating') || lowerText.includes('tertinggi') || lowerText.includes('terbaik')) {
            response = getTopRated();
        } else if (lowerText.includes('kingdom') || lowerText.includes('zombie')) {
            response = getDramaLocations('Kingdom');
        } else if (lowerText.includes('kepadatan') || lowerText.includes('ramai') || lowerText.includes('density')) {
            response = analyzeDensity();
        } else if (lowerText.includes('rute') || lowerText.includes('jalan')) {
            response = recommendRoute();
        } else {
            // Find in drama names
            const foundDrama = allFeatures.filter(f => f.properties.judul_drama && f.properties.judul_drama.toLowerCase().includes(lowerText));
            if (foundDrama.length > 0) {
                response = `Saya menemukan ${foundDrama.length} lokasi untuk drama yang berkaitan dengan "${text}":<br>`;
                response += foundDrama.map(f => `- <b>${f.properties.nama_lokasi}</b>`).join('<br>');
            } else {
                response = "Maaf, saya tidak menemukan informasi yang cocok dengan kata kunci tersebut. Coba cari nama drama, 'rating tertinggi', atau 'kepadatan'.";
            }
        }

        appendMessage('ai', response);
    }, 600);
}

function getTopRated() {
    const sorted = [...allFeatures].sort((a, b) => parseFloat(b.properties.rating_gmaps) - parseFloat(a.properties.rating_gmaps));
    const top3 = sorted.slice(0, 3);
    let html = 'Berikut adalah 3 lokasi dengan rating tertinggi:<br><br>';
    top3.forEach((f, i) => {
        html += `${i+1}. <b>${f.properties.nama_lokasi}</b> (⭐ ${f.properties.rating_gmaps})<br>`;
    });
    return html;
}

function getDramaLocations(keyword) {
    const matches = allFeatures.filter(f => f.properties.judul_drama && f.properties.judul_drama.toLowerCase().includes(keyword.toLowerCase()));
    if (matches.length === 0) return `Tidak ada lokasi yang ditemukan untuk drama "${keyword}".`;
    
    let html = `Lokasi syuting untuk drama <b>${keyword}</b>:<br><br>`;
    matches.forEach(f => {
        html += `- <b>${f.properties.nama_lokasi}</b><br>`;
    });
    return html;
}

function analyzeDensity() {
    // Find the hotspot for "Lokasi Syuting"
    const dramaSpots = allFeatures.filter(f => f.properties.kategori_utama === 'Lokasi Syuting');
    if(dramaSpots.length === 0) return "Belum ada data lokasi syuting.";

    let maxNeighbors = -1;
    let hotspotName = "";

    dramaSpots.forEach(spot => {
        let neighbors = 0;
        allFeatures.forEach(other => {
            if (spot.properties.id_lokasi !== other.properties.id_lokasi) {
                const dist = turf.distance(spot, other, {units: 'kilometers'});
                if (dist <= 0.5) neighbors++;
            }
        });
        if(neighbors > maxNeighbors) {
            maxNeighbors = neighbors;
            hotspotName = spot.properties.nama_lokasi;
        }
    });

    return `Berdasarkan analisis spasial, area di sekitar <b>${hotspotName}</b> memiliki kepadatan lokasi industri syuting tertinggi. Terdapat ${maxNeighbors} lokasi wisata/syuting lain dalam radius 500 meter! 🎥🔥`;
}

function recommendRoute() {
    // Find closest pair of Budaya and Lokasi Syuting
    const cultures = allFeatures.filter(f => f.properties.kategori_utama === 'Budaya');
    const dramas = allFeatures.filter(f => f.properties.kategori_utama === 'Lokasi Syuting');
    
    if (cultures.length === 0 || dramas.length === 0) return "Data belum memadai untuk rekomendasi ini.";

    let minDistance = Infinity;
    let bestPair = [];

    cultures.forEach(c => {
        dramas.forEach(d => {
            const dist = turf.distance(c, d, {units: 'kilometers'});
            if(dist < minDistance) {
                minDistance = dist;
                bestPair = [c, d];
            }
        });
    });

    return `🚶‍♂️ Rekomendasi rute jalan kaki terbaik: Mulai dari situs budaya <b>${bestPair[0].properties.nama_lokasi}</b>, lalu berjalan sejauh ${(minDistance * 1000).toFixed(0)} meter menuju <b>${bestPair[1].properties.nama_lokasi}</b> (Lokasi Syuting). Rute ini memadukan sejarah dan pop-culture dengan jarak terdekat!`;
}

function analyzeRating() {
    const both = allFeatures.filter(f => f.properties.kategori_utama === 'Keduanya');
    if (both.length === 0) return "Tidak ada data untuk kategori 'Keduanya'.";

    const total = both.reduce((acc, curr) => acc + parseFloat(curr.properties.rating_gmaps), 0);
    const avg = (total / both.length).toFixed(2);

    return `⭐ Rata-rata rating Google Maps untuk kategori 'Keduanya' (lokasi sejarah yang juga menjadi tempat syuting) adalah <b>${avg}</b> dari skala 5. Ini menunjukkan bahwa perpaduan budaya dan pop-culture sangat disukai wisatawan!`;
}
