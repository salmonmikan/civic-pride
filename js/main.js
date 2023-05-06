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
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        }],
      },
    },
  });
}

// 投票データをCookieから取得する関数
function getVoteData() {
  let voteData = getCookie('voteData');
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

// 投票データをCookieに保存する関数
function saveVoteData(voteData) {
  setCookie('voteData', JSON.stringify(voteData), 365);
}

// Cookieを取得する関数
function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Cookieを設定する関数
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/";
}

// 投票を行う関数
function castVote(storeParam) {
  const voteData = getVoteData();
  const storeIndex = voteData.labels.indexOf(storeParam);
  voteData.data[storeIndex] += 1;
  saveVoteData(voteData);
}

// ページ別の処理
function initIndexPage() {
  // index.htmlで実行する処理を記述
  const voteData = getVoteData();
  drawChart(voteData);
}

function initVotePage() {
  // vote.htmlで実行する処理を記述
  // URLからパラメータを取得する
  const url = new URL(window.location.href);
  const urlString = url.toString(); // URLの文字列表現を取得
  const isPathIncludesStore = urlString.includes('store');
  const voteMessage = document.getElementById('vote-message');
  const ActionVote = document.getElementById('ActionVote');
  let storeParam;
  if (isPathIncludesStore) {
    storeParam = url.searchParams.get('store');
    voteMessage.textContent = `${storeParam}に投票しますか？`;
  } else {
    voteMessage.textContent = '投票する店舗が指定されていません。';
    ActionVote.style.display = 'none';
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
  document.cookie = 'voteData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
});
