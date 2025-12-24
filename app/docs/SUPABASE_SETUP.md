# Supabase セットアップ手順（簡易）

1. Supabase にプロジェクトを作成する
   - Org/Project を作成し、Postgres DB を有効にする
2. `supabase-schema.sql` を実行してテーブルを作成する
   - `app/db/supabase-schema.sql` を実行（SQLエディタ or supabase CLI）
3. 認証（Admin）：
   - 管理画面は Google OAuth を使うことを推奨（tech@andrew.ac.jp のみ許可）
   - Supabase Auth を設定し、特定メールに管理者ロールを付与するか、RLS ポリシーでメールを限定します
4. 環境変数の設定
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` をプロジェクトの設定に追加
   - ローカルでは `.env` を使って設定（`.env.example` を参照）
5. Row Level Security (推奨)
   - 本運用では RLS を有効にして、管理者のみ SELECT を許可するポリシーを作成してください
6. テスト
   - `saveResult` を使ってテスト用レコードを挿入し、管理画面で確認

セキュリティ: 学籍番号は個人情報です。保存期間やアクセスポリシーを組織で決め、不要になったデータを削除してください。