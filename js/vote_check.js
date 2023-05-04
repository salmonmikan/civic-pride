// URLからパラメータを取得する関数
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// パラメータに応じてスクリプトを実行する関数
function executeScript(param) {
  switch (param) {
    case 'a':
      console.log('aの処理を実行');
      // aの処理を記述
      break;
    case 'b':
      console.log('bの処理を実行');
      // bの処理を記述
      break;
    default:
      console.log('無効なパラメータ');
      break;
  }
}

// メイン処理
function main() {
  const url = 'https://salmonmikan.github.io/civic-pride/vote';
  if (window.location.href.startsWith(url)) {
    const paramA = getQueryParam('a');
    const paramB = getQueryParam('b');

    if (paramA) {
      executeScript('a');
    } else if (paramB) {
      executeScript('b');
    } else {
      console.log('パラメータが指定されていません');
    }

    // トップページに戻る
    window.location.href = 'https://salmonmikan.github.io/civic-pride/';
  }
}

// ページ読み込み完了後にメイン処理を実行
window.addEventListener('DOMContentLoaded', main);
