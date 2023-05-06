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

// 投票データをlocalStorageから取得する関数。もしvoteDataがanyならばデフォルトのデータを使い、そのデータをlocalStorageに保存する。
function getVoteData() {
  let voteData = localStorage.getItem('voteData');
  if (voteData) {
    voteData = JSON.parse(voteData);
  } else {
    voteData = {
      labels: ['店舗A', '店舗B', '店舗C', '店舗D', '店舗E'],
      data: [0, 0, 0, 0, 0],
    };
    saveVoteData(voteData);
  }
  return voteData;
}


// 投票データをlocalStorageに保存する関数
function saveVoteData(voteData) {
  localStorage.setItem('voteData', JSON.stringify(voteData));
}

// 投票を行う関数。投票データを取得し、storeParamに対応するデータを+1する。その後、投票データをlocalStorageに保存する。
function castVote(storeParam) {
  const voteData = getVoteData();
  const storeIndex = voteData.labels.indexOf(storeParam);
  voteData.data[storeIndex] += 1;
  saveVoteData(voteData);
}

// ページ別の処理
function initIndexPage() {
  // index.htmlで実行する処理を記述
  // 投票データを取得してグラフを描画する。もしvoteDataの値が存在しなければデフォルトのデータを使う。
  drawChart(getVoteData());
}

function initVotePage() {
  // vote.htmlで実行する処理を記述
  // URLからパラメータを取得する
  const url = new URL(window.location.href);
  const urlString = url.toString(); // URLの文字列表現を取得
  const isPathIncludesStore = urlString.includes('store');
  const voteMessage = document.getElementById('vote-message');
  const ActionVote = document.getElementById('ActionVote');
  if (isPathIncludesStore) {
    const storeParam = url.searchParams.get('store');
    voteMessage.textContent = `${storeParam}に投票しますか？`;
    ActionVote.style.display = 'block';
  }

  // 投票ボタンを押したときに投票を行う関数を実行する。ボタンを押すと投票しました！というメッセージに変わり、投票ボタンが消える。
  ActionVote.addEventListener('click', () => {
    castVote(storeParam);
    ActionVote.style.display = 'none';
    voteMessage.textContent = '投票しました！';
  });
}

// データをリセットする関数
function resetVoteData() {
  localStorage.removeItem('voteData');
  getVoteData();
  location.reload();
}

// ページ読み込み完了後にメイン処理を実行。現在のURLを取得し、data-pageを利用してもしindexを含んでいればinitIndexPage関数を実行する。そうでなければ次の処理を実行する。
window.addEventListener('DOMContentLoaded', () => {
  const url = new URL(window.location.href);
  const urlString = url.toString();
  const isPathIncludesIndex = urlString.includes('index');
  const isPathIncludesVote = urlString.includes('vote');
  if (isPathIncludesIndex) {
    initIndexPage();
  } else if (isPathIncludesVote) {
    initVotePage();
  }

  // データをリセットするボタン(ResetVote)を押したときにresetVoteData関数を実行する
  const ResetVote = document.getElementById('ResetVote');
  ResetVote.addEventListener('click', resetVoteData);

  // 投票ボタン(id=ActionVote)を押したときに投票を行う(initVotePage)関数を実行する。ボタンを押すと投票しました！というメッセージに変わり、投票ボタンが消える。
  const ActionVote = document.getElementById('ActionVote');
  ActionVote.addEventListener('click', initVotePage);
  ActionVote.addEventListener('click', () => {
    ActionVote.style.display = 'none';
  });
});
