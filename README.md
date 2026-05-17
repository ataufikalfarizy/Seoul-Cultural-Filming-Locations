# 🗺️ Seoul Heritage & K-Drama Tourism Interactive WebGIS
### 대한민국 서울의 전통 문화유산 및 K-드라마 촬영지 대화형 웹 GIS 플랫폼

<p align="center">
  <img src="https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/Leaflet.js-v1.9.4-B91C1C?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet">
  <img src="https://img.shields.io/badge/Tailwind_CSS-v3.4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F59E0B?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</p>

---

## 🌟 Project Overview | 프로젝트 개요

> 💡 **Core Mission:** Evaluating the direct spatial impact of the *Hallyu Wave* on historical tourism ecosystems through advanced client-side spatial analytics.

An elite, high-performance, and mobile-responsive **Interactive WebGIS platform** engineered to map, filter, and analyze the geometric relationships between traditional cultural heritage sites and contemporary K-Drama filming locations across **Seoul, South Korea**. 

본 플랫폼은 대한민국 서울의 전통 문화유산 명소와 현대 K-드라마 촬영지 간의 공간적 상관관계를 정밀하게 분석하고 시각화하는 고성능 모바일 반응형 **대화형 웹 지리정보시스템(WebGIS)**입니다. 

---

## 🚀 Key Features | 주요 기능

### 🌐 1. Dynamic Dual-Layer Infrastructure
* **Cultural & Media Overlays:** Real-time toggling across multi-classification layers: **Culture (문화)**, **Filming Locations (촬영지)**, and synergistic hotspots (**Both / Keduanya**).
* **Mass Transit Integration:** Asynchronous parsing and spatial mapping of over **700+ Seoul Subway Stations**, granting international tourists immediate visibility into destination accessibility.

### 🎛️ 2. Multi-Criteria Attribute Filtering
* **Analytical Sidebar:** Interactive range thresholds filtering live data points by Google Maps ratings (`>= 4.0`) and total review metrics concurrently.
* **Proximity & Density Mapping:** Real-time generation of 500-meter transparent buffers around specific hotspots. Overlapping buffers dynamically scale in opacity and visual glow to highlight **High-Density Tourism Clusters**.
* **Deep-Link Navigation:** Every localized popup box injects custom-built anchor tags that dynamically bridge exact coordinate properties (`latitude`, `longitude`) directly into Google Maps mobile/desktop routing interfaces.

### 💬 3. Contextual Data-Driven Chatbot
* **Client-Side Spatial Assistant:** A fully integrated floating chat modal that computes queries locally against the active GeoJSON layer using optimized keyword-matching arrays.
* **Automated Insights:** Instant parsing of text commands (e.g., *"Rating tertinggi"*, *"Drama Kingdom"*) into structured list break-downs and statistical metrics without external backend API latency.

### 📱 4. Premium UI/UX & Mobile Engine Fixes
* **Seoul High-Tech Aesthetic:** A bespoke, minimalist interface utilizing a professional "Seoul Indigo Blue" baseline, subtle element drop shadows, and modern typography.
* **Active-State Glassmorphism:** Elegant frosted-glass blur mechanics (`backdrop-filter: blur(12px)`) restricted strictly to active floating UI elements for a highly refined layer depth.
* **Zero Touch-Conflict Controls:** Full neutralization of touch and scroll event propagation (`L.DomEvent.disableScrollPropagation`). Users can fluidly navigate dense sidebar options on mobile screens without triggering underlying map canvas dragging or zoom distortions.
* **Synchronized Theme Toggles:** Instant, one-tap switching between Light Mode (CartoDB Positron) and Dark Mode (CartoDB Dark Matter), restyling both UI components and map vector styles simultaneously.

---

## 📊 Dataset Architecture | 데이터 구조

### A. Tourism & Media Matrix (`korea-trip-place.csv`)
| Attribute | Data Type | Analytical Purposing |
| :--- | :---: | :--- |
| `id_lokasi` | `String` | Unique alpha-numeric identifier sequence (e.g., `SEL-001`) |
| `nama_lokasi` | `String` | Standardized tourist destination name |
| `kategori_utama` | `String` | Core layer classification (`Culture`, `Filming Location`, `Both`) |
| `alamat` | `String` | Full text-standardized postal address in Seoul |
| `Latitude` / `Longitude` | `Float` | Spatial geographic nodes projected under WGS 84 (EPSG:4326) |
| `judul_drama` | `String` | Explicitly featured K-Drama media properties |
| `rating_gmaps` | `Float` | Quantitative user-experience score metrics (1.0 - 5.0) |
| `total_ulasan` | `Integer` | Mass review volume metric tracking destination popularity |
| `deskripsi_popup` | `String` | Tailored contextual description optimized for map tooltips |

### B. Transit Network Matrix (`Seoul_subway_stations.csv`)
| Attribute | Data Type | Analytical Purposing |
| :--- | :---: | :--- |
| `line` | `String` | Native subway line identifier code (e.g., `01호선`, `02호선`) |
| `name` | `String` | Native Korean station node name (e.g., `소요산`, `동두천`) |
| `lat` / `lng` | `Float` | Precision coordinates for public transit network placement |
| `no` | `String` | Standardized structural unique station index number |

---

## 📈 Spatial Analytics & Conclusions | 공간 분석 결과

### 📍 Urban Clustering | 공간적 클러스터링
> Spatial density analysis demonstrates severe geometric concentrations within central Seoul, predominantly focused throughout the **Jongno-gu** district. Traditional palaces and modern sets share immediate spatial bounds, forming a high-yield walking environment for low-emission pedestrian tours.

### 🧲 The Tourism Spillover Effect | 유입 효과
> Overlapping proximity buffers mathematically validate that viral modern media locations serve as immense geometric anchors. International travelers arriving primarily for pop-culture sets are organically guided into adjacent heritage preservation zones, directly bolstering the preservation economics of neighboring traditional historical landmarks.

---

## 🛠️ Technology Stack | 사용된 기술 Stack

* **Frontend Core:** HTML5, CSS3, JavaScript (ES6+ Vanilla)
* **Mapping Engine:** Leaflet.js v1.9.4
* **CSS Framework:** Tailwind CSS (Fully Responsive Configuration)
* **Tile Providers:** CartoDB (Positron & Dark Matter API Tiles)
* **Version Control & Hosting:** Git, GitHub, and production cloud hosting via Vercel

---

## 🎓 Academic Framework | 학술적 배경

* **Institution:** Universitas Bakrie, Jakarta
* **Faculty:** Engineering and Computer Science (Fakultas Teknik dan Ilmu Komputer)
* **Program:** Information Systems Undergraduate (S1 Sistem Informasi)
* **Course Assignment:** Mid-Term Examination (UTS) - Kapita Selekta Sistem Informasi (Genap 2025/2026)
* **Matrix Alignment:** Fully satisfies **CPMK-4** and **CPL (P1, KK2)** curriculum guidelines for clean-code encapsulation, touch-safe responsive interface deployment, and live web production.

---

<p align="center">
  <b>시청해 주셔서 감사합니다 • Thank you for exploring this project</b> <br>
  <i>Engineered for professional portfolio integration. All rights reserved. © 2026.</i>
</p>