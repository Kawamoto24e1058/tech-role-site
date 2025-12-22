export const ROLES = ['commander','worker','liaison','analyst','support','creator'];

export const QUESTIONS = [
  { id: 1, text: '部の活動テーマを決めるとき、まず何をする？', choices: [
    { text: 'みんなの意見をまとめて方向を決める', scores: { commander: 2 } },
    { text: 'すぐに動ける案を選んで進める', scores: { worker: 2 } },
    { text: '関係者の意見を聞いて調整する', scores: { liaison: 2 } },
    { text: '過去の実績やデータを見て判断する', scores: { analyst: 2 } },
  ]},
  { id: 2, text: '大きな作業を進めるとき、最初にすることは？', choices: [
    { text: '全体の流れと優先順位を決める', scores: { commander: 2 } },
    { text: 'やることリストを作って手を動かす', scores: { worker: 2 } },
    { text: '誰がどこを担当するか相談する', scores: { liaison: 1, support: 1 } },
    { text: '必要な情報を集めて計画を組み立てる', scores: { analyst: 2 } },
  ]},
  { id: 3, text: 'イベント準備が遅れ気味。あなたはどう動く？', choices: [
    { text: 'やることを絞ってみんなを前に進める', scores: { commander: 2 } },
    { text: 'タスクを細かく分けて自分も作業する', scores: { worker: 1, support: 1 } },
    { text: '関係者に状況を伝え、日程を調整する', scores: { liaison: 2 } },
    { text: '遅れの原因を見つけて改善策を考える', scores: { analyst: 2 } },
  ]},
  { id: 4, text: '新しい企画を考えるとき、どこから始める？', choices: [
    { text: 'みんなの意見を聞きながら方向性を提案する', scores: { commander: 1, creator: 1 } },
    { text: 'まず試せる形にしてみる', scores: { worker: 2 } },
    { text: '参加者や関係者にニーズを聞く', scores: { liaison: 2 } },
    { text: '似た事例やデータを調べる', scores: { analyst: 2 } },
  ]},
  { id: 5, text: '準備に抜け漏れが出ている。どう対処する？', choices: [
    { text: '役割分担と期日を整理し直す', scores: { commander: 1, support: 1 } },
    { text: 'チェックリストを作って片付ける', scores: { worker: 2 } },
    { text: '声かけして確認を回す', scores: { liaison: 1, support: 1 } },
    { text: '抜け漏れのパターンを見て改善する', scores: { analyst: 2 } },
  ]},
  { id: 6, text: '当日トラブル発生！まずどうする？', choices: [
    { text: 'すぐ指示を出し、役割を割り振る', scores: { commander: 2 } },
    { text: '自分で現場に入って直す', scores: { worker: 2 } },
    { text: '来場者や関係者に状況を伝え調整する', scores: { liaison: 2 } },
    { text: '原因を探り、再発防止をまとめる', scores: { analyst: 2 } },
  ]},
  { id: 7, text: 'メンバーのやる気が下がってきた。どうする？', choices: [
    { text: 'ゴールと優先順位を再確認して示す', scores: { commander: 1, support: 1 } },
    { text: '小さな達成を作り、進捗を見える化する', scores: { worker: 1, support: 1 } },
    { text: '個別に話を聞き、橋渡しをする', scores: { liaison: 2 } },
    { text: '原因をデータや事実で探り、対策を決める', scores: { analyst: 2 } },
  ]},
  { id: 8, text: 'ふわっとしたアイデアを形にするときの一歩目は？', choices: [
    { text: 'みんなにイメージを伝えて方向を揃える', scores: { commander: 1, creator: 1 } },
    { text: '試作品やたたきをサッと作る', scores: { worker: 1, creator: 1 } },
    { text: '周囲の意見を集めて一緒に練る', scores: { liaison: 1, creator: 1 } },
    { text: '簡単なデータや例を調べて整理する', scores: { analyst: 1, creator: 1 } },
  ]},
  { id: 9, text: '依頼や要望がたくさん来た。次にすることは？', choices: [
    { text: '優先順位をつけて伝える', scores: { commander: 2 } },
    { text: 'やることの順番と量を決めて進める', scores: { worker: 1, support: 1 } },
    { text: '関係者の期待を調整し、順番を合意する', scores: { liaison: 2 } },
    { text: '影響と手間をざっくり見積もって整理する', scores: { analyst: 2 } },
  ]},
  { id: 10, text: '他団体との合同イベント。あなたは何を重視する？', choices: [
    { text: '全体の段取りと決め事を前に進める', scores: { commander: 2 } },
    { text: '自分の担当をきっちりこなす', scores: { worker: 2 } },
    { text: '双方の連絡を密にしてズレを防ぐ', scores: { liaison: 2 } },
    { text: '成功条件や振り返りポイントを決める', scores: { analyst: 2 } },
  ]},
  { id: 11, text: '意見がぶつかったとき、どう動く？', choices: [
    { text: '決めるポイントをはっきりさせ前に進める', scores: { commander: 2 } },
    { text: '役割とやることを整理する', scores: { worker: 2 } },
    { text: '双方の言い分を聞き、折り合いを探る', scores: { liaison: 2 } },
    { text: '事実と選択肢を整理して冷静に考える', scores: { analyst: 2 } },
  ]},
  { id: 12, text: '作業の進みが悪いとき、まず何をする？', choices: [
    { text: 'やり方を組み直し、進め方を変える', scores: { commander: 2 } },
    { text: '道具や手順を改善して手を早くする', scores: { worker: 2 } },
    { text: '周りの人に声をかけて協力を募る', scores: { liaison: 2 } },
    { text: 'どこで詰まっているか数字や事実で確認する', scores: { analyst: 2 } },
  ]},
  { id: 13, text: '新入生が入部。あなたはどう関わる？', choices: [
    { text: '部の雰囲気やルールをわかりやすく伝える', scores: { commander: 2 } },
    { text: '一緒に手を動かしながらサポートする', scores: { worker: 1, support: 1 } },
    { text: 'メンバーを紹介して輪に入りやすくする', scores: { liaison: 2 } },
    { text: '得意苦手を聞き、合いそうな役割を考える', scores: { analyst: 1, support: 1 } },
  ]},
  { id: 14, text: '新しい分野を調べるときの進め方は？', choices: [
    { text: '仮のゴールを決めて試しながら進める', scores: { commander: 1, creator: 1 } },
    { text: 'まず手を動かして小さく試す', scores: { worker: 1, creator: 1 } },
    { text: '詳しい人に話を聞き、情報を集める', scores: { liaison: 1, creator: 1 } },
    { text: '資料を読み、まとめて共有する', scores: { analyst: 2 } },
  ]},
  { id: 15, text: 'イベント参加者から厳しい声が届いた。どうする？', choices: [
    { text: '直接話を聞き、理解を合わせる場を作る', scores: { liaison: 2 } },
    { text: '案内やサポート体制を強化する', scores: { support: 2 } },
    { text: '事実を集め、原因を整理して改善策を考える', scores: { analyst: 2 } },
    { text: '優先順位をつけて改善計画を動かす', scores: { commander: 1, worker: 1 } },
  ]},
  { id: 16, text: 'テック部の年間計画を見直すとき、あなたの役割は？', choices: [
    { text: '方向性と決め方のルールを整える', scores: { commander: 2 } },
    { text: '必要な作業を洗い出し、進め方を決める', scores: { worker: 1, analyst: 1 } },
    { text: '学内外の予定や関係者の意見を集める', scores: { liaison: 1, support: 1 } },
    { text: '新しい活動案を提案し、広げ方を考える', scores: { creator: 2 } },
  ]},
];
