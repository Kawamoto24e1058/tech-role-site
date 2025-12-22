const QUESTIONS = [
  {id:1,text:"チームで意思決定するとき、自分はどの役割を取りがちですか？",choices:[
    {text:"方向性を決めて引っ張る",scores:{commander:2}},
    {text:"手を動かして実行する",scores:{worker:2}},
    {text:"外部と交渉・調整する",scores:{liaison:2}},
    {text:"データを分析して提案する",scores:{analyst:2}}
  ]},
  {id:2,text:"締切が迫ったとき、あなたはどう動く？",choices:[
    {text:"全体の優先順位を見直す",scores:{commander:2}},
    {text:"ひたすら作業を進める",scores:{worker:2}},
    {text:"誰かに協力を頼んで調整する",scores:{liaison:1,support:1}},
    {text:"作業を効率化する方法を設計する",scores:{analyst:2}}
  ]},
  {id:3,text:"ミーティング中、周りが迷ったら何をする？",choices:[
    {text:"決断して次へ進める",scores:{commander:2}},
    {text:"実行可能なタスクに分割する",scores:{worker:1,support:1}},
    {text:"利害関係者の意見を取りまとめる",scores:{liaison:2}},
    {text:"追加データを出して判断材料を作る",scores:{analyst:2}}
  ]},
  {id:4,text:"新しいアイデアが必要なとき、あなたは？",choices:[
    {text:"全体像を想像して方向付ける",scores:{commander:1,creator:1}},
    {text:"実現可能な案をいくつか試す",scores:{worker:2}},
    {text:"ユーザーや外部の声を集める",scores:{liaison:2}},
    {text:"データや類似事例を調査する",scores:{analyst:2}}
  ]},
  {id:5,text:"コードやドキュメントの品質を保つために、あなたはどれを重視する？",choices:[
    {text:"チームルールを作る",scores:{commander:1,support:1}},
    {text:"テストやCIをしっかり回す",scores:{worker:2}},
    {text:"レビューで合意を取りつける",scores:{liaison:1,support:1}},
    {text:"指標で品質を可視化する",scores:{analyst:2}}
  ]},
  {id:6,text:"トラブル発生時、あなたの対応は？",choices:[
    {text:"緊急対応の指示を出す",scores:{commander:2}},
    {text:"問題を切り分けて対処する",scores:{worker:2}},
    {text:"関係者に状況を伝え、調整する",scores:{liaison:2}},
    {text:"再発防止策をデータで設計する",scores:{analyst:2}}
  ]},
  {id:7,text:"メンバーのモチベーションが下がったら？",choices:[
    {text:"目標を再提示して鼓舞する",scores:{commander:1,support:1}},
    {text:"タスクを軽くして完了感を与える",scores:{worker:1,support:1}},
    {text:"個別に声かけして状況を聞く",scores:{liaison:2}},
    {text:"原因を分析して対策を立てる",scores:{analyst:2}}
  ]},
  {id:8,text:"デザインや発想面での自分の強みは？",choices:[
    {text:"コンセプトを作る",scores:{commander:1,creator:1}},
    {text:"形にして動かす",scores:{worker:1,creator:1}},
    {text:"他部署やユーザーに合わせて調整する",scores:{liaison:1,creator:1}},
    {text:"ロジックやデータに基づいた改善案",scores:{analyst:1,creator:1}}
  ]},
  {id:9,text:"他人に仕事を振るとき、あなたはどうする？",choices:[
    {text:"役割分担を明確にして割り振る",scores:{commander:2}},
    {text:"具体的な作業指示とフォローを行う",scores:{worker:1,support:1}},
    {text:"相手の調整や合意形成を行う",scores:{liaison:2}},
    {text:"成果基準を設定してチェックする",scores:{analyst:2}}
  ]},
  {id:10,text:"新規プロジェクトの初期段階であなたがやることは？",choices:[
    {text:"ビジョンとロードマップを描く",scores:{commander:2}},
    {text:"プロトタイプを作って動かす",scores:{worker:2}},
    {text:"キーパーソンと関係構築をする",scores:{liaison:2}},
    {text:"目標とKPIを設計する",scores:{analyst:2}}
  ]},
  {id:11,text:"あなたが一番得意なコミュニケーションは？",choices:[
    {text:"指示と決定を簡潔に伝える",scores:{commander:2}},
    {text:"実務ベースで細かくやりとりする",scores:{worker:2}},
    {text:"人と人を繋げる",scores:{liaison:2}},
    {text:"論理的に説明して納得させる",scores:{analyst:2}}
  ]},
  {id:12,text:"自分に評価されると嬉しいのは？",choices:[
    {text:"リーダーシップでプロジェクトが成功したとき",scores:{commander:2}},
    {text:"自分が作ったものが動いたとき",scores:{worker:2}},
    {text:"外部から感謝や信頼を得たとき",scores:{liaison:2}},
    {text:"データや数値で成果が示されたとき",scores:{analyst:2}}
  ]}
];

const ROLES = ['commander','worker','liaison','analyst','support','creator'];

let state = {answers: Array(QUESTIONS.length).fill(null), current:0};

function $(id){return document.getElementById(id)}

function start(){
  const sid = $('studentId').value.trim();
  const name = $('name').value.trim();
  const agree = $('agree').checked;
  if(!sid || !name || !agree){alert('学籍番号・氏名・同意は必須です');return}
  state.studentId=sid; state.name=name;
  $('form-section').classList.add('hidden');
  $('quiz-section').classList.remove('hidden');
  renderQuestion();
}

function renderQuestion(){
  const q = QUESTIONS[state.current];
  $('progressText').textContent = `${state.current+1} / ${QUESTIONS.length}`;
  $('progressFill').style.width = `${((state.current)/QUESTIONS.length)*100}%`;
  $('questionCard').textContent = q.text;
  const choices = $('choices'); choices.innerHTML='';
  q.choices.forEach((c,i)=>{
    const btn = document.createElement('button'); btn.className='choiceBtn'; btn.textContent=c.text;
    if(state.answers[state.current]===i) btn.classList.add('selected');
    btn.addEventListener('click',()=>{state.answers[state.current]=i; document.querySelectorAll('.choiceBtn').forEach(b=>b.classList.remove('selected')); btn.classList.add('selected')});
    choices.appendChild(btn);
  });
}

function next(){
  if(state.answers[state.current]===null){alert('選択肢を選んでください');return}
  if(state.current < QUESTIONS.length-1){state.current++; renderQuestion();} else {finish()}
}

function back(){ if(state.current>0){state.current--; renderQuestion()}}

function finish(){
  // スコア集計
  const totals = {};
  ROLES.forEach(r=>totals[r]=0);
  QUESTIONS.forEach((q,qi)=>{
    const ansIdx = state.answers[qi];
    const choice = q.choices[ansIdx];
    for(const [k,v] of Object.entries(choice.scores)) totals[k]=(totals[k]||0)+v;
  });
  const sum = Object.values(totals).reduce((a,b)=>a+b,0) || 1;
  const result = ROLES.map(r=>({role:r,score:totals[r],pct:Math.round((totals[r]/sum)*100)})).sort((a,b)=>b.score-a.score);
  showResult(result);
  // 保存（ローカル保存）
  const record = {studentId:state.studentId,name:state.name,createdAt:new Date().toISOString(),scores:totals, result:result};
  const records = JSON.parse(localStorage.getItem('results')||'[]'); records.push(record); localStorage.setItem('results',JSON.stringify(records));
}

function showResult(result){
  $('quiz-section').classList.add('hidden');
  $('result-section').classList.remove('hidden');
  const area = $('resultArea'); area.innerHTML='';
  result.slice(0,3).forEach(r=>{
    const div = document.createElement('div'); div.className='roleCard';
    div.innerHTML = `<div class='roleName'>${roleLabel(r.role)} — ${r.pct}%</div><div class='desc'>${roleDesc(r.role)}</div>`;
    area.appendChild(div);
  })
}

function roleLabel(key){
  return ({commander:'司令係',worker:'作業係',liaison:'渉外係',analyst:'分析係',support:'支援係',creator:'クリエイター'})[key]
}
function roleDesc(key){
  return ({commander:'方針決定や指揮を得意とします。','worker':'実装や作業を着実にこなします。','liaison':'調整と交渉が得意です。','analyst':'論理的な分析で意思決定を支えます。','support':'チームを支えるフォロー役です。','creator':'アイデアやデザインで貢献します。'})[key]
}

function downloadResults(){
  const records = JSON.parse(localStorage.getItem('results')||'[]');
  const blob = new Blob([JSON.stringify(records,null,2)],{type:'application/json'});
  const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='results.json'; a.click(); URL.revokeObjectURL(url);
}

$('startBtn').addEventListener('click',start);
$('nextBtn').addEventListener('click',next);
$('backBtn').addEventListener('click',back);
$('downloadBtn').addEventListener('click',downloadResults);
