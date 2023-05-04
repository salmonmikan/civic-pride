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

function castVote(storeParam) {
  const voteData = getVoteData();
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
  const urlParams = new URLSearchParams(window.location.search);
  const storeParam = urlParams.get('store');
  
  if (storeParam) {
    castVote(storeParam);
  }
});
