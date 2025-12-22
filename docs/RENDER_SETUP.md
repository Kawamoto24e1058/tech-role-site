# Renderへのデプロイ（GitHub連携版）

RenderはGitHubと連携することで、pushするだけで自動的にビルド・デプロイできます。CLI不要です。以下の手順で進めてください。

## 前提条件
- GitHubアカウント
- Renderアカウント（https://render.com で無料登録）

## ステップ1: このプロジェクトをGitHubにアップロード

```powershell
cd c:\Users\kharu\tech-role-site

# Git初期化
git init
git add .
git commit -m "Initial commit: tech role diagnosis site"

# GitHubリポジトリを作成（GitHub Webから先に作成）
# その後、以下のコマンドで連携
git remote add origin https://github.com/<YOUR_USERNAME>/tech-role-site.git
git branch -M main
git push -u origin main
```

## ステップ2: RenderでBackendをデプロイ

1. https://render.com にログイン
2. **Dashboard** → **Create** → **Web Service**
3. GitHub リポジトリを選択（`tech-role-site`）
4. 以下を設定：

| 項目 | 値 |
|-----|-----|
| **Name** | `tech-role-site-backend` |
| **Region** | `Singapore` またはお好みのリージョン |
| **Runtime** | `Java` |
| **Build Command** | `cd java-backend && ./mvnw clean package -DskipTests` |
| **Start Command** | `java -jar target/java-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=render --server.port=$PORT` |
| **Enviroment** | `Production` |

5. **Environment Variables** → Add Variable：
   - `SPRING_DATASOURCE_URL`: PostgreSQL接続URL（後で設定）
   - `SPRING_DATASOURCE_USERNAME`: `techrole`
   - `SPRING_DATASOURCE_PASSWORD`: （セキュアな値）
   - `ADMIN_EMAIL`: `tech@andrew.ac.jp`

6. **Create Web Service** をクリック

## ステップ3: PostgreSQLデータベースを作成

1. **Dashboard** → **Create** → **PostgreSQL**
2. 以下を設定：

| 項目 | 値 |
|-----|-----|
| **Name** | `tech-role-db` |
| **Database** | `techrole` |
| **User** | `techrole` |
| **Region** | Backendと同じリージョン |

3. 作成完了後、接続文字列をコピー（External Database URLの形式）

## ステップ4: Backendに接続情報を追加

1. Backendの Web Service を選択
2. **Environment** タブを開く
3. `SPRING_DATASOURCE_URL` 変数を編集し、PostgreSQLの接続文字列をペースト
   - 例: `postgresql://techrole:password@dpg-xxx.xxx.com:5432/techrole`

4. **Save** をクリック（自動的に再デプロイ）

## ステップ5: Frontendをデプロイ

1. **Dashboard** → **Create** → **Web Service**
2. GitHub リポジトリを再度選択
3. 以下を設定：

| 項目 | 値 |
|-----|-----|
| **Name** | `tech-role-site-frontend` |
| **Runtime** | `Node` |
| **Build Command** | `cd app && npm install && npm run build` |
| **Start Command** | `cd app && npm run preview` |

4. **Environment Variables**:
   - `VITE_API_BASE`: (BackendのURL、例: `https://tech-role-site-backend.onrender.com`)

5. **Create Web Service** をクリック

## ステップ6: URLの確認

デプロイ完了後：
- **Backend**: `https://tech-role-site-backend.onrender.com`
  - ヘルスチェック: `https://tech-role-site-backend.onrender.com/health`
- **Frontend**: `https://tech-role-site-frontend.onrender.com`
  - または `https://<custom-domain>.onrender.com`（カスタムドメイン設定時）

## トラブルシューティング

### ビルドエラーが出た場合

Render Dashboard で **Logs** タブを見て詳細を確認：

```
# よくあるエラー例
- "Cannot find module": npm installが実行されているか確認
- "Command not found: mvnw": ディレクトリ構造を確認（`java-backend` フォルダが存在するか）
```

### 405 Method Not Allowed

フロントとバックが通信できていない：
- `VITE_API_BASE` がバックエンドの正しいURLか確認
- バックエンドのCORS設定が有効か確認（既に設定済み）

### データベース接続エラー

```
ERROR: connect ECONNREFUSED / FATAL: Ident authentication failed
```

- `SPRING_DATASOURCE_URL` が正しいPostgres接続文字列か確認
- ユーザー名・パスワードが一致しているか確認

### Free Planの制限

Renderの Free Plan：
- 15分以上アクセスがないと自動停止（初回起動は最大30秒かかる）
- 無料データベースは24時間でスピン停止される可能性あり

→ **推奨**: 本番運用なら Paid Plan または他のPaaS（Vercel, Railway等）を検討

## ローカルでのテスト（デプロイ前確認）

```powershell
# バックエンド（renderプロファイル使用）
cd java-backend
.\mvnw clean package -DskipTests
java -jar target\java-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=render

# フロント
cd app
npm install
npm run build
npm run preview
```

## 次のステップ

- 独自ドメイン設定: Render Dashboard → Custom Domain
- 環境変数の管理: `.env.local` をGitで管理しない（`.gitignore` で除外済み）
- ログ確認: Render Dashboard → Web Service → Logs タブ
