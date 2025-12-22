# Supabase Quickstart

手順（短縮版）：

1. Supabase プロジェクトを作成
2. `app/db/supabase-schema.sql` を SQL エディタで実行してテーブルを作成
3. `.env` に `VITE_SUPABASE_URL` と `VITE_SUPABASE_ANON_KEY` を設定（`.env.example` を参照）
4. 開発環境で `cd app && npm install && npm run dev` を実行
5. フロントで診断を実行 → 保存されているか Supabase のテーブルを確認

管理画面の運用：
- プロダクションでは Supabase Auth と RLS ポリシーを使い、管理アカウント（tech@andrew.ac.jp）だけが閲覧できるようにします

データ保護：
- 学籍番号は個人情報です。保存期間やアクセスログ、削除ポリシーを運営で定めてください。