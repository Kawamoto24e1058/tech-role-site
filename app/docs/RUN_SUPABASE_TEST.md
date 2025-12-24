# Supabase 接続テスト（ローカル）

手順:
1. Supabase のプロジェクトを作成し、`app/db/supabase-schema.sql` を実行して `results` テーブルがあることを確認
2. ローカルで `cd app` を実行
3. 環境変数を設定してテストを実行
   - PowerShell の例（1回だけ env を設定して実行）:
     $env:VITE_SUPABASE_URL="https://your-supabase-url.supabase.co"; $env:VITE_SUPABASE_ANON_KEY="your-anon-key"; npm run test:supabase
   - macOS / Linux の例:
     VITE_SUPABASE_URL="https://your-supabase-url.supabase.co" VITE_SUPABASE_ANON_KEY="your-anon-key" npm run test:supabase
4. 成功すると `Supabase 接続テスト成功 ✅` と出力されます。もしエラーが出たら、URL/キー/テーブルの存在を確認してください。

注意:
- テストは挿入したレコードを削除してクリーンアップしますが、念のため本番データベースでの実行は避けてください。