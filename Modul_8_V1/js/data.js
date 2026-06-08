window.palette = {
  ink: '#263B4E',
  ink2: '#3E5D76',
  blue: '#6FA1C9',
  teal: '#168573',
  tealDark: '#005C52',
  orange: '#F47B2F',
  gold: '#FFD47D',
  red: '#D72E38',
  mist: '#E9EEF2'
};

window.storyData = {
  road: {
    totalBroken: 5788,
    recovered: 3257,
    flooded: 2530,
    provinces: [
      { name: 'Aceh', broken: 2482, recovered: 1836, flooded: 646, pct: 74, status: 'Pulih', cls: 'good' },
      { name: 'Sumatera Utara', broken: 2015, recovered: 1110, flooded: 904, pct: 55, status: 'Sedang', cls: 'warn' },
      { name: 'Sumatera Barat', broken: 1290, recovered: 310, flooded: 980, pct: 24, status: 'Sangat Kritis', cls: 'bad' }
    ]
  },

  r3: {
    avg: 68.47,
    peakHa: 15094,
    residualHa: 10335,
    anomalies: [
      { name: 'Kota Tanjungbalai', value: 465, note: 'Anomali: luas puncak kecil' },
      { name: 'Kota Sawahlunto', value: 200, note: 'Rasio melompat' },
      { name: 'Dharmasraya', value: 104, note: 'Residual perlu verifikasi' },
      { name: 'Solok Selatan', value: 100, note: 'Pantauan lanjutan' }
    ],
    provinces: [
      { name: 'Sumatera Barat', value: 74, cls: 'bad' },
      { name: 'Aceh', value: 58, cls: 'warn' },
      { name: 'Sumatera Utara', value: 43, cls: 'mid' }
    ]
  },

  r6: {
    threshold: 1.5,
    slope: 15,
    status: [
      { name: 'Aceh', value: 88, label: 'Sisa pantauan kecil', cls: 'warn' },
      { name: 'Sumatera Utara', value: 96, label: 'Stabil', cls: 'good' },
      { name: 'Sumatera Barat', value: 94, label: 'Stabil', cls: 'good' }
    ]
  },

  r5: {
    monthLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'],

    series: [
      { month: 'Jan', value: 69.4 },
      { month: 'Feb', value: 67.9 },
      { month: 'Mar', value: 68.8 },
      { month: 'Apr', value: 71.8 },
      { month: 'Mei', value: 75.1 }
    ],

    monthlySeries: [
      { month: 'Jan', value: 69.4 },
      { month: 'Feb', value: 67.9 },
      { month: 'Mar', value: 68.8 },
      { month: 'Apr', value: 71.8 },
      { month: 'Mei', value: 75.1 }
    ],

    byProvinceMonthly: {
      'Aceh': [
        { month: 'Jan', value: 71.1 },
        { month: 'Feb', value: 72.9 },
        { month: 'Mar', value: 65.9 },
        { month: 'Apr', value: 72.8 },
        { month: 'Mei', value: 84.6 }
      ],

      'Sumatera Utara': [
        { month: 'Jan', value: 67.2 },
        { month: 'Feb', value: 55.5 },
        { month: 'Mar', value: 68.8 },
        { month: 'Apr', value: 69.9 },
        { month: 'Mei', value: 72.0 }
      ],

      'Sumatera Barat': [
        { month: 'Jan', value: 80.9 },
        { month: 'Feb', value: 64.8 },
        { month: 'Mar', value: 77.1 },
        { month: 'Apr', value: 73.2 },
        { month: 'Mei', value: 78.2 }
      ]
    },

    latestMay: [
      { name: 'Aceh', value: 84.6, cls: 'good' },
      { name: 'Sumatera Barat', value: 78.2, cls: 'good' },
      { name: 'Sumatera Utara', value: 72.0, cls: 'mid' }
    ],

    completeness: [
      { month: 'Jan', validKab: 50, observations: 134 },
      { month: 'Feb', validKab: 24, observations: 70 },
      { month: 'Mar', validKab: 52, observations: 217 },
      { month: 'Apr', validKab: 54, observations: 142 },
      { month: 'Mei', validKab: 44, observations: 118 }
    ]
  },

  r2: {
    aceh: [
      { name: 'Sabang', value: 126 },
      { name: 'Banda Aceh', value: 118 },
      { name: 'Aceh Besar', value: 103 },
      { name: 'Pidie', value: 94 },
      { name: 'Lhokseumawe', value: 86 },
      { name: 'Aceh Tamiang', value: 72 },
      { name: 'Aceh Utara', value: 68 }
    ]
  },

  r1: {
    summary: [
      { name: 'Aceh', mean: 62.9, median: 61.6, best: 'Sabang', bestValue: 79.4, worst: 'Aceh Tamiang', worstValue: 46.6 },
      { name: 'Sumatera Utara', mean: 56.6, median: 58.5, best: 'Pakpak Barat', bestValue: 77.8, worst: 'Padang Lawas Utara', worstValue: 16.4 },
      { name: 'Sumatera Barat', mean: 55.3, median: 58.7, best: 'Padang', bestValue: 67.5, worst: 'Padang Pariaman', worstValue: 36.2 }
    ],
    aceh: [
      { name: 'Sabang', value: 79.4, cls: 'good' },
      { name: 'Pidie', value: 77.4, cls: 'good' },
      { name: 'Simeulue', value: 77.2, cls: 'good' },
      { name: 'Aceh Tamiang', value: 46.6, cls: 'warn' }
    ],
    sumutSumbar: [
      { name: 'Pakpak Barat', prov: 'Sumut', value: 77.8, cls: 'good' },
      { name: 'Padang', prov: 'Sumbar', value: 67.5, cls: 'mid' },
      { name: 'Padang Pariaman', prov: 'Sumbar', value: 36.2, cls: 'warn' },
      { name: 'Padang Lawas Utara', prov: 'Sumut', value: 16.4, cls: 'bad' }
    ]
  },

  scorecard: [
    { province: 'Aceh', r1: 'mid', r2: 'good', r3: 'warn', r4: 'good', r5: 'mid', r6: 'warn' },
    { province: 'Sumatera Utara', r1: 'mid', r2: 'mid', r3: 'mid', r4: 'warn', r5: 'mid', r6: 'good' },
    { province: 'Sumatera Barat', r1: 'warn', r2: 'mid', r3: 'bad', r4: 'bad', r5: 'warn', r6: 'good' }
  ]
};

window.roadGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        nama_jalan: 'Ruas Lintas Aceh',
        tipe_jalan: 'Primary',
        panjang_km: 42.8,
        status_genangan_puncak: 'Tergenang',
        status_pemulihan: 'Pulih'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [95.36, 5.55],
          [96.10, 4.90],
          [97.00, 4.05],
          [98.20, 3.15]
        ]
      }
    }
  ]
};

window.r5LatestByKab = window.storyData.r5.latestByKab;
window.r5ProvinceLatest = window.storyData.r5.provinceLatest;