# GitHubへのプッシュ手順

Gitでの初期化とコミットは完了しました。次のステップでGitHubにプッシュします。

## 手順

### 1. GitHubでリポジトリを作成
1. https://github.com にログイン
2. **New** ボタンを クリック
3. 以下を入力：
   - **Repository name**: `tech-role-site`
   - **Description**: `Tech role diagnosis site with Vite frontend and Spring Boot backend`
   - **Public** / **Private**: お好みで選択
4. **Create repository** をクリック

### 2. ローカルリポジトリをGitHubに接続

作成されたリポジトリの画面に表示されるコマンドを実行（以下は例）：

```powershell
cd c:\Users\kharu\tech-role-site

# リモートを追加
git remote add origin https://github.com/<YOUR_USERNAME>/tech-role-site.git

# ブランチ名を main に統一
git branch -M main

# mainブランチにpush
git push -u origin main
```

### 3. 認証

初回はGitの認証が必要です。以下のいずれかで対応：

#### オプションA: GitHub CLI (推奨)
```powershell
gh auth login
# 対話的にログイン
```

#### オプションB: Personal Access Token
1. GitHub → Settings → Developer settings → Personal access tokens
2. **Generate new token** → **Generate new token (classic)**
3. スコープは `repo` を選択
4. トークンをコピー
5. push時にパスワード欄へペースト

#### オプションC: SSH Key
```powershell
# SSH キーを生成（初回のみ）
ssh-keygen -t ed25519 -C "your-email@example.com"

# GitHub → Settings → SSH and GPG keys → New SSH key
# id_ed25519.pub の内容をペースト

# リモートをSSHに変更
git remote set-url origin git@github.com:<YOUR_USERNAME>/tech-role-site.git
```

### 4. Push実行

認証設定後：
```powershell
git push -u origin main
```

## 完了確認

https://github.com/<YOUR_USERNAME>/tech-role-site にアクセスして、ファイルが表示されれば成功です。

## トラブルシューティング

### "Permission denied (publickey)"
- SSH Key が正しく GitHub に登録されているか確認
- `ssh -T git@github.com` で接続テスト

### "fatal: Authentication failed"
- Personal Access Token の有効期限を確認
- Token のスコープが `repo` を含んでいるか確認

### "Updates were rejected"
```powershell
git pull origin main --allow-unrelated-histories
git push origin main
```
