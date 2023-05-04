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
function defaultVoteData() {
  const defaultVoteData = {
    labels: ['店舗A', '店舗B', '店舗C', '店舗D', '店舗E'],
    data: [0, 0, 0, 0, 0],
  };
}

// 投票データをlocalStorageから取得する関数。もしvoteDataがanyならばデフォルトのデータ(defaultVoteData)を使う。
function getVoteData() {
  const voteData = localStorage.getItem('voteData');
  if (voteData) {
    return 
  } else {
    return defaultVoteData;
  }
}


// 投票データをlocalStorageに保存する関数
function saveVoteData(voteData) {
  localStorage.setItem('voteData', JSON.stringify(voteData));
}

// URLパラメーターを使って投票する関数
function castVote(storeParam) {
  const voteData = getVoteData();
  const storeIndex = voteData.labels.indexOf(storeParam);
  voteData.data[storeIndex] += 1;
  saveVoteData(voteData);
}


// URLから"store"パラメータを取得する関数
function getStoreParam() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('store');
}


function initIndexPage() {
  // index.htmlで実行する処理を記述
  // 投票データを取得してグラフを描画するが、もし投票データがなければデフォルトのデータを使う
  if (voteData) {
    drawChart(voteData);
  } else {
    drawChart(defaultVoteData);
  }
}

function initVotePage() {
  // vote.htmlで実行する処理を記述
  // URLパラメーターの判定を行うためにgetStoreParamを実行する。StoreParamを利用してcastVoteで投票し、投票データを更新する。
  const storeParam = getStoreParam();
  if (storeParam) {
    castVote(storeParam);
  } else {
    console.log('パラメータが指定されていません');
  }
}


// ページ読み込み完了後にメイン処理を実行。現在のURLを取得し、index.htmlとvote.htmlで実行する処理を分ける
window.addEventListener('DOMContentLoaded', () => {
  const url = new URL(window.location.href);
  if (url.pathname === '/civic-pride/') {
    initIndexPage();
  } else if (url.pathname === '/civic-pride/vote/') {
    initVotePage();
  }
});


