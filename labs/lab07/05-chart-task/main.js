// variables at the top:
let Rating24;
let Rating25;
let food;
let emoji;

// define the function to get the chart data:
async function getChartData() {
  const sheetName = 'PhoebeSSnow';
  const response = await fetch(
    `https://script.google.com/macros/s/AKfycbzcOnqzvg3ajtKVALrY_bvc5qo6bvYhwVYgPM7KNKU-3t2mG2YJRrFl4rwDmPxx0ZI78g/exec?sheet=${sheetName}`
  );
  const data = await response.json();
  return data;
}

// define the funciton to create the chart:
async function createChart() {
  const serverData = await getChartData();

  // create the two lists that we need for the chart:
  Rating24 = serverData.map(row => row['2024 Rating']);
  Rating25 = serverData.map(row => row['2025 Rating']);
  food = serverData.map(row => row['Thanksgiving Food']);
  emoji = serverData.map(row => row['emoji']);

  const options = {
    chart: {
      type: 'bar',
      events: {
        dataPointSelection: getDetails,
      },
    },
    title: {
      text: 'Thanksgiving Food Ratings',
      align: 'center',
    },
    colors: ['#9c2f2f', '#b6562a'], // series 1 and series 2 colors
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    series: [
      { name: '2024 Rating', data: Rating24 },
      { name: '2025 Rating', data: Rating25 },
    ],
    xaxis: { categories: food },
  };

  document.querySelector('#chart').innerHTML = '';
  const chart = new ApexCharts(document.querySelector('#chart'), options);
  chart.render();
}

// Much simpler function using our stored data:
function getDetails(event, chartContext, config) {
  const dataIndex = config.dataPointIndex; // get the index of the clicked point
  

  // target the details panel:
  const detailsElement = document.querySelector('#details');
  // update the details panel:
  detailsElement.innerHTML = `
          <h2>Details for ${food[dataIndex]} ${emoji[dataIndex]}</h2>
          <p>Thankgiving Food: ${food[dataIndex]} ${emoji[dataIndex]}</p>
          <p id="ratingOne">2024 Rating: ${Rating24[dataIndex]}/10</p>
          <p id="ratingTwo">2025 Rating: ${Rating25[dataIndex]}/10</p>
      `;
}

// run the function:
createChart();
