# Deno Hono SSE App

このプロジェクトは、DenoとHonoを使用してServer-Sent Events (SSE) を実装したシンプルなアプリケーションです。ブラウザからのPOSTリクエストを受け取り、現在時刻をSSEでクライアントに送信します。

## プロジェクト構成

```
deno-hono-sse-app
├── src
│   ├── main.ts          # アプリケーションのエントリーポイント
│   ├── routes
│   │   └── index.ts     # POSTリクエストを処理するルート
│   └── types
│       └── index.ts     # 型やインターフェースの定義
├── frontend
│   ├── index.html       # ブラウザに表示されるHTMLページ
│   └── script.js        # クライアントサイドのJavaScriptコード
├── deno.json            # Denoの設定ファイル
└── README.md            # プロジェクトのドキュメント
```

## 使用方法

1. **依存関係のインストール**  
   Denoをインストールした後、プロジェクトのルートディレクトリで以下のコマンドを実行します。
   ```
   deno run --allow-net src/main.ts
   # deno task start でもOK
   ```
2. **ブラウザでのアクセス**  
   ブラウザを開き、`http://localhost:8000` にアクセスします。

3. **ボタンのクリック**  
   ページに表示されるボタンをクリックすると、サーバーにPOSTリクエストが送信され、現在時刻が表示されます。

## 注意事項

- このプロジェクトはDenoの最新バージョンで動作します。
- SSEの動作確認には、対応したブラウザを使用してください。

