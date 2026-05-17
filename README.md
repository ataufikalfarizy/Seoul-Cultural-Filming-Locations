```markdown
# 🗺️ Seoul Heritage & K-Drama Tourism WebGIS 
### 서울 헤리티지 & K-드라마 관광 대화형 웹 지리정보시스템

[![Deployment Status](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Leaflet](https://img.shields.io/badge/Leaflet.js-v1.9.4-green?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🌟 Project Overview | 프로젝트 개요
An advanced, mobile-responsive **Interactive WebGIS application** built for analyzing and visualizing the spatial correlation between traditional cultural heritage sites and contemporary K-Drama filming locations in **Seoul, South Korea**. [cite: 315]

본 프로젝트는 대한민국 서울의 전통 문화유산 명소와 현대 K-드라마 촬영지 간의 공간적 상관관계를 분석하고 시각화하는 고성능 모바일 반응형 **대화형 웹 GIS 애플리케이션**입니다. [cite: 315]

This platform evaluates the *Hallyu Wave* pop-culture impact on historical tourism, featuring transit proximity analysis, live spatial filtering, dynamic buffering for industry density analysis, and an embedded data-driven chatbot assistant. Developed as a comprehensive mid-term project for the *Information Systems Selected Topics (Kapita Selekta)* curriculum. [cite: 3-6, 315]

---

## 🚀 Key Features | 주요 기능

### 1. Dual-Layer Exploration (Theme & Transit)
- **Cultural & Media Layers**: Filter spots categorized into **Culture (문화)**, **Filming Location (촬영지)**, or **Both (keduanya)** to witness how pop culture revitalizes historical environments.
- **Seoul Subway Integration**: Real-time rendering of over 700+ subway stations across Seoul using parsed transit metadata to showcase destination accessibility and route choices for international tourists. 

### 2. Advanced Spatial Filtering & UI Analytics
- **Multi-Criteria Filter Sidebar**: Seamlessly adjust visible markers based on Google Maps ratings, total review counts, and operational categories.
- **Dynamic Spatial Buffering**: Automated projection-correct visualization of a 500-meter radius around specific hotspots to illustrate tourism industry density and overlap clusters.
- **Redirect Integration**: Every interactive map popup contains a direct dynamic deep link to Google Maps navigation based on exact geographic coordinates (`latitude`, `longitude`).

### 3. Integrated AI Tourism Analyst Chatbot
- **Data-Driven Contextual Chat**: A lightweight, client-side assistant that interacts instantly with loaded GeoJSON datasets via keyword matching—enabling automated spatial summaries (e.g., finding top-rated sites or K-Drama locations) without external AI API dependencies.

### 4. High-End UI/UX Design & Cross-Device Optimization
- **Seoul Premium Aesthetics**: A sleek interface blending professional GIS tools with modern Korean tech design aesthetics, utilizing elegant sans-serif typography and consistent element shadows.
- **Refined Glassmorphism**: Beautiful blurred background overlays (`backdrop-filter: blur(12px)`) that transition dynamically when menus or floating windows are engaged.
- **Dynamic Viewport (`dvh`) Responsive Fix**: Completely handles touch-scroll propagation conflicts between Leaflet maps and mobile sidebar containers, preventing background map movement while shifting navbar panels.
- **True Dark & Light Theme**: Toggle synchronizes UI overlays and Map tile skins simultaneously (CartoDB Positron for Light Mode & CartoDB DarkMatter for Dark Mode).

---

## 📊 Dataset Structure | 데이터 구조

The application processes two main datasets stored locally in the repository:

### A. Tourist Spots Dataset (`korea-trip-place.csv` / converted GeoJSON)
| Attribute | Type | Description |
| :--- | :--- | :--- |
| `id_lokasi` | String | Unique ID code (e.g., SEL-001) |
| `nama_lokasi` | String | Official location name (e.g., Gyeongbokgung Palace) |
| `kategori_utama` | String | Primary classification: Culture, Filming Location, or Both |
| `alamat` | String | Full standardized text address in Seoul |
| `Latitude` / `Longitude` | Float | Spatial geographic coordinates (WGS 84 / EPSG:4326) |
| `judul_drama` | String | Featured K-Dramas (e.g., Kingdom, Goblin, True Beauty) |
| `rating_gmaps` | Float | Google Maps average rating score (1.0 - 5.0) |
| `total_ulasan` | Integer | Total review metrics count |
| `rasio_pengaruh_drama` | Float | Calculated ratio of drama-related keyword mentions |
| `deskripsi_popup` | String | Pre-formatted contextual description for map tooltips |

### B. Transit Network Dataset (`Seoul_subway_stations.csv`) 
| Attribute | Type | Description |
| :--- | :--- | :--- |
| `line` | String | Subway Line identifier (e.g., 01호선, 02호선)  |
| `name` | String | Korean station name (e.g., 소요산, 동두천)  |
| `lat` / `lng` | Float | Exact node coordinates for spatial mapping  |
| `no` | String/Int | Standardized station unique code sequence number  |

---

## 📈 Spatial Analysis Insights | 공간 분석 및 결론

- **Urban Clustering (공간적 클러스터링)**: Spatial distribution highlights intense density concentrations within central Seoul (specifically Jongno-gu). Historic structures share spatial footprints with modern media sets, allowing tourists to effortlessly experience heritage and pop culture sequentially through walking routes.
- **The Spillover Effect (유입 효과)**: High-density overlapping buffers reveal that viral media locations serve as immense geometric anchors. International tourists initially drawn by contemporary media sets are seamlessly funneled toward neighboring traditional heritage museums, naturally driving organic preservation interest.

---

## 🛠️ Technology Stack | 사용된 기술 Stack

- **Core Engine**: HTML5, CSS3, JavaScript (ES6+)
- **Mapping APIs**: Leaflet.js v1.9.4 [cite: 141-146]
- **CSS Framework**: Tailwind CSS
- **Basemaps Providers**: CartoDB (Positron & Dark Matter)
- **Deployment Platform**: Vercel [cite: 147-149]
- **Version Control**: Git & GitHub [cite: 147-149]

---

## ⚙️ Installation & Running Locally | 로컬 실행 방법

To test or host this project on your machine, follow these commands:

1. Clone the repository from GitHub:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/seoul-webgis-kdrama.git](https://github.com/YOUR_USERNAME/seoul-webgis-kdrama.git)