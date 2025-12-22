#!/usr/bin/env node
// Supabase connectivity test script
// Usage (PowerShell):
// $env:VITE_SUPABASE_URL="https://..."; $env:VITE_SUPABASE_ANON_KEY="..."; npm run test:supabase

const { createClient } = require('@supabase/supabase-js')

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY

async function main(){
  if(!url || !key){
    console.error('環境変数が設定されていません。VITE_SUPABASE_URL と VITE_SUPABASE_ANON_KEY を設定してください。')
    process.exit(1)
  }
  const supabase = createClient(url, key)
  try{
    console.log('Supabase に接続を試みます...')
    const testRecord = { student_id: 'TEST0000', name: 'テストユーザ', scores: {test:1}, result: [{role:'worker',score:1,pct:100}], created_at: new Date().toISOString() }
    const { data, error } = await supabase.from('results').insert(testRecord).select()
    if(error){ console.error('INSERT エラー:', error); process.exit(1) }
    console.log('挿入成功:', data)
    const inserted = data && data[0]
    if(inserted && inserted.id){
      const { error: delErr } = await supabase.from('results').delete().eq('id', inserted.id)
      if(delErr) console.warn('テストレコードの削除でエラー:', delErr)
      else console.log('テストレコードを削除しました')
    }
    console.log('Supabase 接続テスト成功 ✅')
    process.exit(0)
  }catch(err){
    console.error('テスト中に例外が発生しました:', err)
    process.exit(1)
  }
}

main()
