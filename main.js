// CSVファイルを読み込む関数
async function loadCSVData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    const parsedData = parseCSVData(data);
    return parsedData;
  } catch (error) {
    console.error('Failed to fetch CSV data:', error);
    return { labels: [], data: [] };
  }
}

// CSVデータをパースする関数
function parseCSVData(data) {
  const lines = data.trim().split('\n');
  const header = lines.shift().split(',');
  const result = {
    labels: [],
    data: [],
  };

  lines.forEach((line) => {
    const [label, value] = line.split(',');
    result.labels.push(label);
    result.data.push(parseInt(value, 10));
  });

  return result;
}


document.addEventListener('DOMContentLoaded', async () => {
  // CSVファイルからデータを読み込む
  const csvData = await loadCSVData('sample_data.csv');

  const data = {
    labels: csvData.labels,
    datasets: [{
      data: csvData.data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    }],
  };

  // グラフを描画する
  const ctx = document.getElementById('resultChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
