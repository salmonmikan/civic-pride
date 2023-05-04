// グラフを描画する関数
function drawChart(voteData) {
  const data = {
    labels: voteData.labels,
    datasets: [{
      data: voteData.data,
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
}

// デフォルトの投票データ
const defaultVoteData = {
  labels: ['店舗A', '店舗B', '店舗C', '店舗D', '店舗E'],
  data: [0, 0, 0, 0, 0],
};

// 投票データをlocalStorageから取得する関数
function getVoteData() {
  const storedData = localStorage.getItem('voteData');
  return storedData ? JSON.parse(storedData) : defaultVoteData;
}

// 投票データをlocalStorageに保存する関数
function saveVoteData(voteData) {
  localStorage.setItem('voteData', JSON.stringify(voteData));
}

// URLパラメーターから店舗名を取得、投票する関数
function castVote(storeParam) {
  const storeIndex = voteData.labels.indexOf(storeParam);

  if (storeIndex !== -1) {
    voteData.data[storeIndex]++;
    saveVoteData(voteData);
    console.log(`投票が完了しました: ${storeParam}`);
  } else {
    console.log('無効な店舗パラメーター');
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const scriptTag = document.querySelector('script[src="main.js"]');
  const page = scriptTag.dataset.page;

  switch (page) {
    case 'index':
      initIndexPage();
      break;
    case 'vote':
      initVotePage();
      break;
    default:
      console.error('Unknown page type:', page);
  }
});

function initIndexPage() {
  // index.htmlで実行する処理を記述
  const voteData = getVoteData();
  drawChart(voteData);
}

function initVotePage() {
  // vote.htmlで実行する処理を記述
  const voteData = getVoteData();

}

