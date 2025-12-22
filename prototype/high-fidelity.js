const HF_QUESTIONS = window.QUESTIONS || [];
let hfState = {answers:Array(HF_QUESTIONS.length).fill(null),current:0};
const hfChoices = document.getElementById('hfChoices');
function hfRender(){
  const q = HF_QUESTIONS[hfState.current];
  if(!q) return;
  document.querySelector('.hf-progress-fill').style.width = `${((hfState.current)/HF_QUESTIONS.length)*100}%`;
  document.querySelector('.hf-question').textContent = q.text;
  hfChoices.innerHTML='';
  q.choices.forEach((c,i)=>{
    const d=document.createElement('div'); d.className='hf-choice'; d.textContent=c.text; d.addEventListener('click',()=>{hfState.answers[hfState.current]=i; document.querySelectorAll('.hf-choice').forEach(x=>x.style.borderColor='#E6EEF6'); d.style.borderColor='var(--accent)'});
    hfChoices.appendChild(d);
  })
}

document.getElementById('hfBegin').addEventListener('click',()=>{
  const sid=document.getElementById('hfStudent').value.trim(); const name=document.getElementById('hfName').value.trim(); const agree=document.getElementById('hfAgree').checked; if(!sid||!name||!agree){alert('学籍番号・氏名・同意は必須です');return} document.getElementById('hf-form').classList.add('hidden'); document.getElementById('hf-quiz').classList.remove('hidden'); hfRender();
});
document.getElementById('hfNext').addEventListener('click',()=>{if(hfState.answers[hfState.current]===null){alert('選択してください');return} if(hfState.current<HF_QUESTIONS.length-1){hfState.current++; hfRender()} else {hfFinish()}});
document.getElementById('hfBack').addEventListener('click',()=>{if(hfState.current>0){hfState.current--; hfRender()}});

function hfFinish(){
  const totals={}; ROLES.forEach(r=>totals[r]=0);
  HF_QUESTIONS.forEach((q,qi)=>{const ans=hfState.answers[qi]; const choice=q.choices[ans]; for(const [k,v] of Object.entries(choice.scores)) totals[k]=(totals[k]||0)+v});
  const sum=Object.values(totals).reduce((a,b)=>a+b,0)||1; const result=ROLES.map(r=>({role:r,score:totals[r],pct:Math.round((totals[r]/sum)*100)})).sort((a,b)=>b.score-a.score);
  document.getElementById('hf-quiz').classList.add('hidden'); document.getElementById('hf-result').classList.remove('hidden'); const list=document.getElementById('hfResultList'); list.innerHTML=''; result.slice(0,3).forEach(r=>{const e=document.createElement('div'); e.className='hf-result-card'; e.innerHTML=`<div><div class='hf-role'>${roleLabel(r.role)}</div><div class='hf-role-sub'>${r.pct}%</div></div><div><button class='hf-btn ghost'>詳細</button></div>`; list.appendChild(e)})
}
