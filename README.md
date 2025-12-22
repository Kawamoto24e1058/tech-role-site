# Tech Role Site

Techロール診断（適性診断）を行うWebアプリのモノレポです。フロントエンド（Vite + React）、バックエンド（Spring Boot）、およびSupabase/Postgres向けのスキーマ・ドキュメントを含みます。

## 概要
- 診断ページで質問に回答 → スコア集計 → 結果を表示
- 結果はバックエンドAPIへ保存し、管理者はCSVでエクスポート可能
- Supabase(Postgres)を使う場合のスキーマ・初期データを提供（任意）

## リポジトリ構成
- `app/`: フロントエンド（Vite + React + Tailwind）
- `java-backend/`: バックエンド（Spring Boot 3, JPA）。開発用はH2、運用想定はPostgreSQL
- `app/db/`: Supabase/Postgres用のスキーマとシード
- `docs/`: Supabaseのセットアップ・テスト手順
- `prototype/`, `design/`: UI試作と仕様

## 技術仕様
- フロントエンド
  - ランタイム: Node.js v18+ 推奨
  - 主要ライブラリ: React 18, React Router, Tailwind CSS, Framer Motion, Lottie
  - 開発サーバ: Vite（ポート 5173）
  - APIベースURL: `VITE_API_BASE`（未設定時は `http://localhost:8080`）
  - Supabase（任意）: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- バックエンド
  - ランタイム: Java 17, Spring Boot 3.2
  - プロファイル: `dev` は H2 インメモリDB、デフォルトは Postgres を想定
  - データソース（デフォルト）: `SPRING_DATASOURCE_URL` / `SPRING_DATASOURCE_USERNAME` / `SPRING_DATASOURCE_PASSWORD`
  - マイグレーション: Flyway（Postgres時有効）
  - 管理連絡先（例）: `ADMIN_EMAIL`
- データベース（Supabase/Postgres 任意）
  - スキーマ: `app/db/supabase-schema.sql`
  - シード: `app/db/seed.sql`
  - 結果テーブル `results` と詳細回答テーブル `answers` を用意

## 主なAPI（バックエンド）
- `GET /health`: ヘルスチェック
- `POST /api/results`: 診断結果の保存（ボディは `studentId`, `name`, `answers`, `scores`, `result` を含む）
- `GET /api/results`: 診断結果の一覧取得
- `GET /api/admin/results/csv`: 結果をCSVでエクスポート

## 起動方法（Windows）

### 1) フロントエンド（app）
```powershell
cd app
npm install
npm run dev
```
- ブラウザで http://localhost:5173 を開く
- バックエンドAPIのURLを変えたい場合は `.env` 等で `VITE_API_BASE` を設定

### 2) バックエンド（java-backend）
方法A: バッチで起動（推奨）
```powershell
c:\Users\kharu\tech-role-site\java-backend\start-backend.bat
```
方法B: 直接実行
```powershell
cd java-backend
mvnw.cmd spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```
- ローカルAPI: http://localhost:8080
- 動作確認: `http://localhost:8080/health` が `ok` を返す

### 3) Supabase/Postgres を使う場合（任意）
- セットアップ手順: `docs/SUPABASE_SETUP.md`
- 接続テスト: `docs/RUN_SUPABASE_TEST.md`、またはフロントから `npm run test:supabase`
- スキーマ適用: `app/db/supabase-schema.sql`
- シード投入: `app/db/seed.sql`
- フロント環境変数: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## 連携ポイント
- フロント→バック: `app/src/lib/api.js` が `POST /api/results` と `GET /api/results` を使用
  - 失敗時はローカルストレージへフォールバック保存
- フロント→Supabase（任意）: `app/src/lib/supabaseClient.js` を利用（環境変数が未設定なら無効）

## よくあるトラブル
- バックエンドが起動していない: フロントからの保存・取得が失敗します。`/health` を確認
- CORS/ポート競合: フロント 5173 とバック 8080 を併用。プロキシが必要ならVite設定を調整
- Postgres接続エラー: `SPRING_DATASOURCE_*` を確認。`dev` はH2なのでPostgres不要

## 開発の次のステップ
- 診断UI（質問/回答/結果）の実装とアニメーション適用
- 管理画面のCSVダウンロード・集計の強化
- SupabaseのRLSや認証連携（必要に応じて）
