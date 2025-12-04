// initialize the map:
const map = L.map('map');
map.setView([35.643445377615556, -82.55554263663021], 11);

// add the tile layer to the map:
const currentTileLayer = L.tileLayer(terrain, {
  attribution: '&copy; Stadia Maps contributors',
}).addTo(map);

// retrieve the landmarks from Google Sheets:
// const detailsElement = document.querySelector('#details');
async function getSMIE() {
  const sheetName = 'SMIE';
  const response = await fetch(
    `https://script.google.com/macros/s/AKfycbwjABaMDStuVqLz8WN6vUbbjXsMM1RKAmmPcdsN6zuwiytNLfmsfXbLeRLBZrE2n5zh/exec?sheet=${sheetName}`
  );
  const sites = await response.json();
  console.log('serverData: ', sites);
  return sites;
}

async function generateMarkers() {
  const sites = await getSMIE();

  // Add markers for each landmark
  for (const site of sites) {
    // Create marker with popup
    L.marker([site.LAT, site.LON], {
      icon: getIcon(site.color, site.number),
    })
      .addTo(map)
      .bindPopup(site.name)
      .on('click', function (e) {
        const detailsElement = document.querySelector('#details');
        detailsElement.innerHTML = getTemplate(site);
      });
  }
}

function getTemplate(site) {
  return `
      <div>
          <h2 style="margin: 0 0 5px 0;">${site.name}</h2>
          <h4>Site Number: ${site.number}</h4>
          <h3>Spring 2024 Rating: ${site.rating24}</h3>
          <h3>Spring 2025 Rating: ${site.rating25}</h3>
          <p>
          ${site.LAT.toFixed(4)}, ${site.LON.toFixed(4)}
          </p>
      </div>
      `;
}

function getIcon(color, number) {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}"
      class="map-marker">${number}</div>`,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });
}

generateMarkers();



// initialize the map:
const map2 = L.map('map2');
map2.setView([35.643445377615556, -82.55554263663021], 11);

// add the tile layer to the map:
const currentTileLayer2 = L.tileLayer(terrain, {
  attribution: '&copy; Stadia Maps contributors',
}).addTo(map2);

async function generateMarkers2() {
  const sites = await getSMIE();

  // Add markers for each landmark
  for (const site of sites) {
    // Create marker with popup
    L.marker([site.LAT, site.LON], {
      icon: getIcon2(site.color25, site.number),
    })
      .addTo(map2)
      .bindPopup(site.name)
      .on('click', function (e) {
        const detailsElement = document.querySelector('#details');
        detailsElement.innerHTML = getTemplate(site);
      });
  }
}


function getIcon2(color25, number) {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color25}"
      class="map-marker">${number}</div>`,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });
}

generateMarkers2();

function getColor(d) {
        return d === 'excellent'  ? "#2c7bb6" :
               d === 'good'  ? "#abd9e9" :
               d === 'good-fair' ? "#ffffbf" :
               d === 'fair' ? "#fdae61" :
               d === 'poor' ? "#d7191c" :
               d === 'inaccessible' ? "#666" :
               d === 'discontinued due to danger' ? "#fff" :
                      "#000";
              }
function style(site) {
        return {
            weight: 1.5,
            opacity: 1,
            fillOpacity: 1,
            radius: 6,
            fillColor: getColor(site.rating25),
            color: "grey"

        };
    }

legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Ratings</strong>'],
    categories = ['Excellent','Good','Good-fair','Fair','Poor'];

    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
           
    legend.addTo(map);

// define the funciton to create the chart:
async function createChart() {
  const totalData = await getSMIE();

  // create the two lists that we need for the chart:
  spring24 = totalData.map(row => row['totals spring 2024']);
  spring25 = totalData.map(row => row['totals spring 2025']);
  siteNames = totalData.map(row => row['name']);
  siteNumber = totalData.map(row => row['number']);

  const options = {
    chart: {
      type: 'bar',
      events: {
        dataPointSelection: getDetails,
      },
    },
    colors: ['#2c7bb6', '#d7191c'], // series 1 and series 2 colors
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    series: [
      { name: 'Total number of individuals spring 2024', data: spring24 },
      { name: 'Total number of individuals spring 2025', data: spring25 },
    ],
    xaxis: { categories: siteNames },
    dataLabels: {
        enabled: false,
    }
  };

  document.querySelector('#chart').innerHTML = '';
  const chart = new ApexCharts(document.querySelector('#chart'), options);
  chart.render();
}

// Much simpler function using our stored data:
function getDetails(event, chartContext, config) {
  const dataIndex = config.dataPointIndex; // get the index of the clicked point

  // target the details panel:
  const detailsElement3 = document.querySelector('#chartDetails');
  // update the details panel:
  detailsElement3.innerHTML = `<div>
          <h3 style="margin: 0 0 5px 0; font-weight: bold;">${siteNames[dataIndex]}</h3>
          <p>Site Number: ${siteNumber[dataIndex]}</p>
          <h4>Total Number of Individuals Spring 2024: ${spring24[dataIndex]}</h4>
          <h4>Total Number of Individuals Spring 2025: ${spring25[dataIndex]}</h4>
          <div>
      `;
}

// run the function:
createChart();



// define the funciton to create the chart:
async function createLineChart() {
  const totalData = await getSMIE();

  // create the two lists that we need for the chart:
  difference = totalData.map(row => row['difference']);
  siteNames = totalData.map(row => row['name']);
  siteNumber = totalData.map(row => row['number']);

  const options = {
    chart: {
      type: 'bar',
      events: {
        dataPointSelection: getDetails2,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    colors: ['#2c7bb6'], // series 1 and series 2 colors
    
    series: [
      { name: 'Difference from before Helene to after', data: difference },
    ],
    xaxis: { categories: siteNames },
  };

  document.querySelector('#chart2').innerHTML = '';
  const chart = new ApexCharts(document.querySelector('#chart2'), options);
  chart.render();
}

// Much simpler function using our stored data:
function getDetails2(event, chartContext, config) {
  const dataIndex = config.dataPointIndex; // get the index of the clicked point

  // target the details panel:
  const detailsElement4 = document.querySelector('#chartDetails2');
  // update the details panel:
  detailsElement4.innerHTML = `
        <div>
          <h3 style="margin: 0 0 5px 0;">${siteNames[dataIndex]}</h3>
          <p>Site Number: ${siteNumber[dataIndex]}</p>
          <h4>Difference in Individuals After Helene: ${difference[dataIndex]}</h4>
        <div>
      `;
}

/************************************/
/* Code to synchronize the two maps */
/************************************/
let isSyncing = false; // Flag to prevent infinite loops

// Sync map2 when map1 changes
map.on("moveend", function () {
    if (!isSyncing) {
        isSyncing = true;
        map2.setView(map.getCenter(), map.getZoom(), { animate: false });
        isSyncing = false;
    }
});

map.on("zoomend", function () {
    if (!isSyncing) {
        isSyncing = true;
        map2.setView(map.getCenter(), map.getZoom(), { animate: false });
        isSyncing = false;
    }
});

// Sync map1 when map2 changes
map2.on("moveend", function () {
    if (!isSyncing) {
        isSyncing = true;
        map.setView(map2.getCenter(), map2.getZoom(), { animate: false });
        isSyncing = false;
    }
});

map2.on("zoomend", function () {
    if (!isSyncing) {
        isSyncing = true;
        map.setView(map2.getCenter(), map2.getZoom(), { animate: false });
        isSyncing = false;
    }
});

/************************************/

// run the function:
createLineChart();
