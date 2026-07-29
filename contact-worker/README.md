# contact-worker

`seki-saki.com` のお問い合わせフォーム送信専用の Cloudflare Worker です。Cloudflare Email Service の `send_email` バインディング経由で `contact@seki-saki.com`（検証済み宛先）にのみメールを送信します。Cloudflare Pages Functions は `send_email` バインディングに対応していないため、本体サイト（Pages）とは別デプロイの Worker として切り出しています。

## 構成

- `src/index.ts` — フォーム入力のバリデーション、Turnstile検証、メール送信を行う Worker 本体
- `wrangler.toml` — `api.seki-saki.com` へのカスタムドメインルーティングと `send_email` バインディング定義

フロントエンド（`app/contact/page.tsx`）はこの Worker の URL (`https://api.seki-saki.com`) に直接 `fetch` します。

## 初回セットアップ

依存関係をインストールします。

```bash
pnpm install
```

Cloudflareダッシュボードで以下を手動設定してください（コードからは行えません）。

1. **宛先アドレスの検証**: Email Routing の設定画面で `contact@seki-saki.com` を検証済み宛先アドレスとして登録する
2. **カスタムドメイン**: `api.seki-saki.com` が Worker に紐付いていることを確認する（`wrangler deploy` 時に `wrangler.toml` の `routes` から自動作成される想定だが、失敗する場合はダッシュボードの Workers > Triggers から手動追加）

Turnstile のシークレットキーを設定します。

```bash
pnpm secret:turnstile
```

## コマンド

```bash
pnpm dev              # ローカルでWorkerを起動（wrangler dev）
pnpm deploy           # 本番デプロイ（wrangler deploy）
pnpm secret:turnstile # TURNSTILE_SECRET_KEY を設定/更新
```

## 動作確認

デプロイ後、以下でエンドポイントの疎通を確認できます（Turnstileトークンが無効なので `turnstile_failed` が返れば正常）。

```bash
curl -X POST https://api.seki-saki.com \
  -H "Content-Type: application/json" \
  -H "Origin: https://seki-saki.com" \
  -d '{"name":"test","email":"test@example.com","message":"test","turnstileToken":"dummy"}'
```

## 料金

送信先がすべて検証済み固定アドレス（`contact@seki-saki.com`）のため、Email Service の送信は全プラン無料です。Worker のリクエスト数もポートフォリオサイトの問い合わせ量であれば Workers Free プラン（100,000リクエスト/日）の範囲内に収まり、月額 $0 で運用できます。任意の宛先（例: フォーム送信者への自動返信）への送信を追加する場合は Workers Paid プランが必要になります。
