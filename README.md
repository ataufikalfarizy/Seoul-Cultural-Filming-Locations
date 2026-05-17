# 🗺️ Seoul Heritage & K-Drama Tourism Interactive WebGIS
### 서울 헤리티지 & K-드라마 관광 대화형 웹 지리정보시스템 (WebGIS)

---

## 🌟 Project Overview | 프로젝트 개요
An advanced, fully responsive **Interactive WebGIS platform** designed to analyze and visualize the spatial relationships between traditional cultural heritage sites and contemporary K-Drama filming locations across **Seoul, South Korea**. 

본 플랫폼은 대한민국 서울의 전통 문화유산 명소와 현대 K-드라마 촬영지 간의 공간적 상관관계를 분석하고 시각화하는 고성능 모바일 반응형 **대화형 웹 GIS 애플리케이션**입니다.

This project demonstrates how pop-culture elements (*Hallyu Wave*) act as geographic anchors to revitalize interest in historical environments. It features public transit proximity modeling, multi-criteria spatial filtering, dynamic buffering for tourism density analysis, and an embedded data-driven local chatbot assistant. [cite_start]Developed as a core portfolio project for the *Information Systems Selected Topics (Kapita Selekta)* curriculum at Universitas Bakrie [cite: 341-344].

---

## 🚀 Key Features | 주요 기능

### 1. Dual-Layer Exploration (Tourism & Transit Integration)
- [cite_start]**Interactive Theme Layers**: Seamlessly toggle between **Culture (문화)**, **Filming Locations (촬영지)**, and blended historical-media hotspots (**Both / Keduanya**) to explore how media narratives overlay onto physical heritage [cite: 385-391].
- **Seoul Subway Network Integration**: Live mapping of 700+ subway stations parsed dynamically from transit datasets, enabling international tourists to evaluate destination accessibility and optimize transit routes.

### 2. Multi-Criteria Spatial Filtering
- **Dynamic Filter Control Panel**: Real-time attribute filtering based on Google Maps rating thresholds (e.g., `>= 4.5`) and total review volumes to isolate highly popular destinations.
- **Proximity & Density Mapping**: Automated rendering of 500-meter transparent buffers around hotspots. Overlapping buffers dynamically intensify in color/glow, visually representing **High Industry Density Areas** and prime walkable tourism clusters.
- **Dynamic Navigation Linkage**: Every point popup features a customized "Open in Google Maps" button that automatically generates coordinates-based deep links for real-world navigation.

### 3. Client-Side Data-Driven Chatbot Assistant
- **Local Context AI Chatbot**: A responsive floating chat window that interacts directly with the loaded GeoJSON layers via optimized local keyword matching.
- **Automated Spatial Insights**: Users can input queries like *"Rating tertinggi"* (Highest Rating) or *"Drama Kingdom"* to receive instant analytical list breakdowns and statistics directly extracted from the map data without external API calls.

### 4. Premium UI/UX & Advanced Mobile Optimization
- **Seoul High-Tech Aesthetic**: A clean, minimalist interface utilizing a professional "Seoul Indigo Blue" color palette, smooth shadows, and fluid transitions.
- **Toggle-State Glassmorphism**: High-end background blur treatments (`backdrop-filter: blur(12px)`) applied exclusively when panels or floating widgets are fully active.
- **Zero Touch-Conflict Navigation**: Implements strict touch/scroll event propagation locks (`L.DomEvent.disableScrollPropagation`). [cite_start]Users can fluidly swipe and scroll through long navbar lists on mobile devices without accidentally dragging or zooming the underlying map canvas[cite: 502, 506].
- [cite_start]**Synchronized Theme Engines**: One-tap toggle switching between Light Mode (CartoDB Positron) and Dark Mode (CartoDB Dark Matter) that instantly restyles both the UI panels and base map layers simultaneously[cite: 414, 484].

---

## 📊 Dataset Architecture | 데이터 구조

The application dynamically parses and merges two core local datasets:

### A. Tourism & Media Dataset (`korea-trip-place.csv` / GeoJSON)
- **id_lokasi**: Unique alpha-numeric identifier (e.g., `SEL-001`).
- **nama_lokasi**: Standardized destination name (e.g., `Gyeongbokgung Palace`).
- **kategori_utama**: Spatial classification (`Culture`, `Filming Location`, `Both`).
- **alamat**: Full, structured textual address in Seoul.
- **Latitude / Longitude**: Exact geographic coordinates mapped under WGS 84 (EPSG:4326).
- **judul_drama**: Associated K-Drama titles (`Kingdom`, `Goblin`, `True Beauty`, etc.).
- **rating_gmaps**: Quantitative metric representing average Google Maps user score (1.0 - 5.0).
- **total_ulasan**: Volume index tracking total tourist check-ins and reviews.
- **rasio_pengaruh_drama**: Calculated percentage metric tracking explicit pop-culture keywords against baseline historical reviews.
- [cite_start]**deskripsi_popup**: Tailored text summary rendered inside interactive map tooltips[cite: 482, 596].

### B. Transit Network Dataset (`Seoul_subway_stations.csv`)
- **line**: Subway line identifier (e.g., `01호선`, `02호선`).
- **name**: Native Korean station name (e.g., `소요산`, `동두천`).
- **lat / lng**: Geographic node coordinates for network placement.
- **no**: Unique station code sequence mapping.

---

## 📈 Spatial Insights & Conclusions | 공간 분석 결과

- [cite_start]**Urban Clustering**: Analysis reveals highly concentrated spatial clusters within central Seoul, particularly the **Jongno-gu** district [cite: 609-611]. [cite_start]Traditional palaces and modern drama sets share adjacent spatial bounds, creating ideal environments for integrated, low-emission pedestrian *walking tours*[cite: 616].
- [cite_start]**The Tourism Spillover Effect**: Overlapping density buffers mathematically prove that viral media locations serve as powerful geographic anchors [cite: 617-619]. [cite_start]International travelers drawn primarily by pop-culture media sets are naturally funneled into neighboring heritage preservation zones, driving organic economic support to traditional historical landmarks[cite: 616].

---

## 🛠️ Technology Stack | 사용된 기술 Stack

- **Core Frontend**: HTML5, CSS3, JavaScript (ES6+ Vanilla)
- [cite_start]**Mapping Engine**: Leaflet.js v1.9.4 [cite: 502, 579]
- [cite_start]**Styling UI**: Tailwind CSS (Fully Responsive Framework) [cite: 502]
- [cite_start]**Basemaps**: CartoDB (Positron & Dark Matter APIs) [cite: 414, 484]
- [cite_start]**Version Control & Hosting**: Git, GitHub, and cloud deployment via Vercel [cite: 457, 458]

---

## 🎓 Academic Framework | 학술적 배경

- [cite_start]**Institution**: Universitas Bakrie, Jakarta [cite: 344]
- [cite_start]**Faculty**: Engineering and Computer Science (Fakultas Teknik dan Ilmu Komputer) [cite: 345]
- [cite_start]**Program**: Information Systems Undergraduate (S1 Sistem Informasi) [cite: 345]
- [cite_start]**Course Assignment**: Mid-Term Examination (UTS) - Kapita Selekta Sistem Informasi (Genap 2025/2026) [cite: 340-342]
- [cite_start]**Matrix Alignment**: Fully satisfies **CPMK-4** and **CPL (P1, KK2)** curriculum requirements for structural clean-code orchestration, responsive UI handling, and live public deployment execution[cite: 454, 455].

---

<p align="center">
  <b>시청해 주셔서 감사합니다 • Thank you for exploring this project</b> <br>
  <i>Designed and engineered for professional portfolio integration. All rights reserved. © 2026.</i>
</p>