const FALLBACK_BOUNDARIES = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { nmkab: 'ACEH', nmprov: 'ACEH', recovery: 68, r3: 58, r4: 74, r1: 62.9, status: 'membaik' },
      geometry: { type: 'Polygon', coordinates: [[[95.02, 2.05], [95.04, 6.16], [98.24, 3.62], [97.78, 2.55], [95.02, 2.05]]] }
    },
    {
      type: 'Feature',
      properties: { nmkab: 'SUMATERA UTARA', nmprov: 'SUMATERA UTARA', recovery: 56, r3: 43, r4: 55.1, r1: 56.6, status: 'sedang' },
      geometry: { type: 'Polygon', coordinates: [[[97.12, 0.62], [98.12, 3.72], [100.38, 1.10], [98.84, -0.76], [97.12, 0.62]]] }
    },
    {
      type: 'Feature',
      properties: { nmkab: 'SUMATERA BARAT', nmprov: 'SUMATERA BARAT', recovery: 48, r3: 74, r4: 24.1, r1: 55.3, status: 'prioritas' },
      geometry: { type: 'Polygon', coordinates: [[[98.72, -0.58], [100.58, 0.20], [101.68, -2.05], [99.82, -3.72], [98.72, -0.58]]] }
    }
  ]
};

window.mapOverlays = {
  floodPeak: [
    [[4.9, 95.18], [5.35, 96.2], [4.6, 97.35], [3.55, 97.08], [3.45, 95.72], [4.9, 95.18]],
    [[-0.7, 100.05], [-1.05, 100.95], [-2.1, 101.25], [-2.95, 100.35], [-2.15, 99.45], [-0.7, 100.05]]
  ],
  floodResidual: [
    [[4.55, 95.62], [4.82, 96.45], [4.08, 96.88], [3.63, 96.15], [4.55, 95.62]],
    [[-1.05, 100.15], [-1.32, 100.82], [-2.08, 100.92], [-2.38, 100.15], [-1.65, 99.76], [-1.05, 100.15]]
  ],
  soilWet: [
    [[4.95, 95.82], [4.58, 96.8], [3.72, 96.42], [3.95, 95.55], [4.95, 95.82]]
  ],
  slopeRisk: [
    [[4.62, 96.06], [4.34, 96.58], [3.92, 96.34], [4.08, 95.92], [4.62, 96.06]]
  ],
  roads: [
    { coords: [[5.55, 95.36], [4.9, 96.1], [4.05, 97.0], [3.15, 98.2]], color: '#D72E38', label: 'Pernah terputus' },
    { coords: [[3.15, 98.2], [2.35, 99.0], [1.2, 99.9], [0.25, 100.2]], color: '#168573', label: 'Pulih' },
    { coords: [[-0.6, 99.75], [-1.35, 100.25], [-2.2, 100.55], [-3.0, 100.25]], color: '#F47B2F', label: 'Masih tergenang' },
    { coords: [[1.8, 97.6], [1.35, 98.45], [0.65, 99.4], [-0.15, 100.2]], color: '#D72E38', label: 'Terputus' }
  ],
  night: [
    [5.55, 95.32, 13], [5.18, 95.95, 8], [4.47, 96.13, 6], [4.45, 97.15, 8],
    [4.1, 97.94, 5], [3.59, 98.67, 12], [2.96, 99.15, 7], [2.27, 99.78, 6],
    [0.91, 100.36, 10], [-0.95, 100.36, 12], [-1.5, 100.6, 7]
  ],
  buildings: [
    [5.55, 95.32], [4.47, 96.13], [3.59, 98.67], [3.1, 99.0], [0.91, 100.36],
    [-0.95, 100.36], [-1.45, 100.57], [-2.15, 100.85], [2.33, 99.06], [1.42, 99.23]
  ],
  landslideDisaster: [
    [5.45, 95.40], [5.08, 95.92], [4.88, 96.22], [4.56, 96.62], [4.20, 97.02],
    [3.95, 97.40], [3.48, 97.92], [2.95, 98.55], [2.34, 99.10], [1.85, 99.70],
    [1.20, 100.02], [0.42, 100.28], [-0.55, 100.36], [-1.20, 100.62], [-1.90, 100.88],
    [-2.45, 101.05], [-2.95, 100.72], [-3.08, 100.24]
  ],
  landslideRecovery: [
    [5.18, 95.72], [4.70, 96.18], [3.86, 97.34], [2.65, 98.88], [1.45, 99.82],
    [-0.75, 100.44], [-1.55, 100.78], [-2.62, 100.92]
  ]
};

function titleCase(value) {
  return String(value || '-')
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase())
    .replace(/\bDki\b/g, 'DKI');
}

function normalizeAdminName(value) {
  return String(value || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, ' ');
}

function getR5Value(feature) {
  const p = feature.properties || {};
  const kabKey = normalizeAdminName(p.nmkab || p.name);
  const provKey = normalizeAdminName(p.nmprov || p.provinsi);

  const byKab = window.r5LatestByKab || window.storyData?.r5?.latestByKab || {};
  const byProv = window.r5ProvinceLatest || window.storyData?.r5?.provinceLatest || {};

  const rawValue =
    byKab[kabKey] ??
    byProv[provKey] ??
    p.r5 ??
    p.r5_latest ??
    p.building_recovery ??
    p.recovery;

  const value = Number(rawValue);
  return Number.isFinite(value) ? value : NaN;
}

function colorByRecoveryValue(value) {
  if (!Number.isFinite(value) || value < 0) return '#D72E38';
  if (value >= 75) return '#168573';
  if (value >= 50) return '#FFD685';
  if (value >= 25) return '#F47B2F';
  return '#D72E38';
}

function getBoundaryData() {
  return window.boundaryGeoJSON || FALLBACK_BOUNDARIES;
}

function mapCard({ mode = 'recovery', title = 'PETA PEMULIHAN', dark = false, legend = [] } = {}) {
  const id = `map-${Math.random().toString(36).slice(2, 9)}`;
  const legendHTML = legend.map(item => `
    <span class="legend-item">
      <span class="swatch" style="background:${item.color}"></span>${item.label}
    </span>
  `).join('');

  return `
    <div class="map-card ${dark ? 'dark' : 'light'}" data-map-mode="${mode}">
      <div id="${id}" class="leaflet-map" data-map-mode="${mode}" data-map-dark="${dark ? '1' : '0'}"></div>
      <div class="map-head">
        <span class="map-label">${title}</span>
        <span class="north">N</span>
      </div>
      <div class="map-legend">${legendHTML}</div>
    </div>
  `;
}

function initStoryMaps() {
  if (!window.L) {
    document.querySelectorAll('.leaflet-map').forEach(el => {
      el.innerHTML = '<div class="map-fallback">Leaflet belum termuat. Jalankan dengan koneksi internet atau gunakan local server.</div>';
    });
    return;
  }

  document.querySelectorAll('.leaflet-map').forEach(el => {
    if (el.dataset.ready === '1') return;
    el.dataset.ready = '1';

    const mode = el.dataset.mapMode || 'recovery';
    const isDark = el.dataset.mapDark === '1';
    const boundaries = getBoundaryData();

    const map = L.map(el, {
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: true,
      attributionControl: true
    }).setView([2.3, 98.7], 7);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    getTileLayer(mode, isDark).addTo(map);

    const boundaryLayer = addBoundaryLayer(map, mode, boundaries);
    addModeLayer(map, mode);

    const bounds = boundaryLayer.getBounds();
    if (bounds.isValid()) {
            map.fitBounds(bounds, {
        padding: [20, 20],
        maxZoom: 7
      });
    }

    setTimeout(() => map.invalidateSize(), 120);
  });
}

function getTileLayer(mode, isDark) {
  if (isDark || mode === 'night') {
    return L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 18
    });
  }

  // Gunakan satelit imagery untuk semua mode kecuali night
  return L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 18
  });
}

function valueForMode(feature, mode) {
  const p = feature.properties || {};
  if (mode === 'flood' || mode === 'r3') return Number(p.r3 ?? 0);
  if (mode === 'road') return Number(p.r4 ?? 0);
  if (mode === 'veg') return Number(p.r1 ?? 0);
  if (mode === 'building-recovery' || mode === 'building') return getR5Value(feature);
  return Number(p.recovery ?? 0);
}

function getBoundaryColor(feature, mode) {
  const value = valueForMode(feature, mode);

  // Recovery mode: 4-category gradient
  if (mode === 'recovery') {
    if (value >= 75) return '#168573';
    if (value >= 50) return '#FFD685';
    if (value >= 25) return '#F47B2F';
    return '#D72E38';
  }

  // Flood Peak: all red
  if (mode === 'flood-peak') {
    return '#D72E38';
  }

  // Flood Receding: all orange
  if (mode === 'flood-receding') {
    return '#F47B2F';
  }

  // Flood Residual: all blue
  if (mode === 'flood') {
    return '#6FA1C9';
  }

  // Soil Disaster & Recovery: blue for high moisture (low recovery), white for normal
  if (mode === 'soil-disaster' || mode === 'soil-recovery') {
    if (value < 50) return '#6FA1C9'; // High moisture = blue
    return '#FFFFFF'; // Normal moisture = white
  }

  // Soil Critical: all blue
  if (mode === 'soil-critical') {
    return '#6FA1C9';
  }

  // Landslide risk maps: base color red
  if (mode === 'landslide-disaster' || mode === 'landslide-recovery') {
    return '#D72E38';
  }

  if (mode === 'r3') {
    if (value >= 75) return '#D72E38';
    if (value >= 50) return '#F47B2F';
    if (value >= 25) return '#FFD47D';
    return '#168573';
  }

  if (mode === 'road') {
    if (value >= 75) return '#168573';
    if (value >= 50) return '#FFD685';
    if (value >= 25) return '#F47B2F';
    return '#D72E38';
  }

  if (mode === 'soil') {
    if (value >= 75) return '#168573';
    if (value >= 50) return '#FFD685';
    if (value >= 25) return '#F47B2F';
    return '#D72E38';
  }

  if (mode === 'building') {
    if (value >= 75) return '#168573';
    if (value >= 50) return '#FFD685';
    if (value >= 25) return '#F47B2F';
    return '#D72E38';
  }

  if (mode === 'veg') {
    if (value >= 75) return '#168573';
    if (value >= 50) return '#FFD685';
    if (value >= 25) return '#F47B2F';
    return '#D72E38';
  }

  if (value >= 60) return '#168573';
  if (value >= 50) return '#F47B2F';
  return '#D72E38';

  if (mode === 'building-recovery' || mode === 'building') {
    return colorByRecoveryValue(value);
  }
}

function addBoundaryLayer(map, mode, boundaries) {
  const isLandslideMode = mode === 'landslide-disaster' || mode === 'landslide-recovery';
  const isRoadMode = mode === 'road';

  return L.geoJSON(boundaries, {
    style: feature => ({
      fillColor: getBoundaryColor(feature, mode),
      color: mode === 'night' ? 'rgba(255,255,255,.78)' : '#FFFFFF',
      weight: 0.5,
      opacity: 0.9,
      fillOpacity: isLandslideMode || isRoadMode ? 0 : mode === 'night' ? 0.12 : 0.45
    }),
    onEachFeature: (feature, layer) => {
      const p = feature.properties || {};
      const kab = titleCase(p.nmkab || p.name);
      const prov = titleCase(p.nmprov || p.provinsi);

      if (mode === 'building-recovery' || mode === 'building') {
        const r5Value = getR5Value(feature);
        const r5Label = Number.isFinite(r5Value)
          ? `${r5Value.toFixed(1).replace('.', ',')}%`
          : '-';

        const tooltipHTML = `
          <div class="map-popup r5-popup">
            <b>${kab}</b>
            <span>${prov}</span><br />
            Pemulihan Terbaru: ${r5Label}
          </div>
        `;

        layer.bindTooltip(tooltipHTML, {
          sticky: true,
          direction: 'top',
          opacity: 1,
          className: 'r5-tooltip'
        });

        layer.on('mouseover', function () {
          this.setStyle({
            weight: 2.2,
            fillOpacity: 0.72
          });
          this.openTooltip();
        });

        layer.on('mouseout', function () {
          this.setStyle({
            weight: 0.5,
            fillOpacity: 0.45
          });
          this.closeTooltip();
        });

        return;
      }
      layer.bindPopup(`
        <div class="map-popup">
          <b>${kab}</b>
          <span>${prov}</span><br />
          R-1 Vegetasi: ${p.r1 ?? '-'}%<br />
          R-3 Residual: ${p.r3 ?? '-'}%<br />
          R-4 Jalan: ${p.r4 ?? '-'}%
        </div>
      `);
      layer.bindTooltip(`${kab}`, { sticky: true });
    }
  }).addTo(map);
}

function addModeLayer(map, mode) {
  const p = window.palette;

  // Modes used in slide 3 carousel and slide 5 carousel - no dummy overlays
  if (mode === 'recovery' || mode === 'flood-peak' || mode === 'flood-receding' || mode === 'flood' || 
      mode === 'soil-disaster' || mode === 'soil-recovery' || mode === 'soil-critical' || mode === 'building-recovery') {
    // Boundary colors only - no dummy overlays
    return;
  }

  if (mode === 'landslide-disaster') {
    window.mapOverlays.landslideDisaster.forEach(([lat, lng]) => {
      L.circleMarker([lat, lng], {
        radius: 7,
        color: '#D72E38',
        weight: 1,
        fillColor: '#D72E38',
        fillOpacity: 0.78
      }).addTo(map);
    });
    return;
  }

  if (mode === 'landslide-recovery') {
    window.mapOverlays.landslideRecovery.forEach(([lat, lng]) => {
      L.circleMarker([lat, lng], {
        radius: 5,
        color: '#D72E38',
        weight: 1,
        fillColor: '#D72E38',
        fillOpacity: 0.6
      }).addTo(map);
    });
    return;
  }

  if (mode === 'soil') {
    window.mapOverlays.soilWet.forEach(coords => {
      L.polygon(coords, { color: p.red, weight: 2, fillColor: p.red, fillOpacity: 0.52 }).addTo(map);
    });

    window.mapOverlays.slopeRisk.forEach(coords => {
      L.polygon(coords, { color: '#5ED6E8', weight: 2, fillColor: '#5ED6E8', fillOpacity: 0.58 }).addTo(map);
    });
  }

  if (mode === 'road') {
    const roadData = window.roadGeoJSON;

    if (!roadData) return;

    L.geoJSON(roadData, {
      style: feature => {
        const status = feature.properties?.status_pemulihan;

        let color = '#D72E38';
        if (status === 'Pulih') color = '#168573';
        if (status === 'Masih Tergenang') color = '#F47B2F';

        return {
          color,
          weight: 5,
          opacity: 0.95,
          lineCap: 'round'
        };
      },

      onEachFeature: (feature, layer) => {
        const p = feature.properties || {};

        const tooltipHTML = `
          <div class="map-popup road-popup">
            <b>${p.nama_jalan || 'Tidak Ada Nama'}</b>
            <span>${p.tipe_jalan || '-'}</span><br />
            Panjang: ${p.panjang_km || '-'} km<br />
            Genangan Puncak: ${p.status_genangan_puncak || '-'}<br />
            Pemulihan Terkini: ${p.status_pemulihan || '-'}
          </div>
        `;

        layer.bindTooltip(tooltipHTML, {
          sticky: true,
          direction: 'top',
          opacity: 1,
          className: 'road-tooltip'
        });

        layer.on('mouseover', function () {
          this.setStyle({
            weight: 8,
            opacity: 1
          });
          this.openTooltip();
        });

        layer.on('mouseout', function () {
          this.setStyle({
            weight: 5,
            opacity: 0.95
          });
          this.closeTooltip();
        });
      }
    }).addTo(map);

    return;
  }

  if (mode === 'night') {
    window.mapOverlays.night.forEach(([lat, lng, size]) => {
      L.circleMarker([lat, lng], {
        radius: size,
        color: '#FFD47D',
        weight: 1,
        fillColor: '#FFD47D',
        fillOpacity: 0.72
      }).addTo(map);
    });
  }

  if (mode === 'building') {
    return;
  }

  if (mode === 'veg') {
    // No dummy polygons for vegetation recovery maps; show boundaries only.
    return;
  }
}

window.mapCard = mapCard;
window.initStoryMaps = initStoryMaps;
