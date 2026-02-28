# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code (claude.ai/code) へのガイダンスを提供します。

## コマンド

```bash
npm run dev           # 開発サーバー起動（Next.js + Turbopack）
npm run build         # 静的エクスポートビルド（/out に出力）
npm run lint          # ESLint 実行
npm run lint:fix      # ESLint 自動修正
npm run format        # Prettier でフォーマット（Tailwind クラス順序の自動整列含む）
npm run format:check  # フォーマットチェック（書き込みなし）
```

テストスイートは設定されていません。

## アーキテクチャ

イラストレーター・デザイナー「関口咲」の **Next.js 15 静的エクスポート** ポートフォリオサイトです。`next.config.ts` に `output: "export"` が設定されており、Cloudflare へのデプロイ用に `/out` ディレクトリへ静的サイトを生成します。

### 重要な設計方針

- **静的エクスポート**: 全ページは事前レンダリングされます。動的ルート（`/works/[id]`）はビルド時に全 ID を列挙するための `generateStaticParams()` が必要で、`app/works/[id]/page.tsx` に実装されています。
- **クライアントコンポーネント**: `motion/react` によるアニメーションのため、多くのページで `"use client"` を使用しています。ワーク詳細ルートは、`generateStaticParams` を呼ぶサーバーコンポーネント（`page.tsx`）と、インタラクティブ処理を担うクライアントコンポーネント（`WorkDetailClient.tsx`）に分割されています。
- **画像ホスティング**: 作品画像はすべて外部 CDN `https://assets.seki-saki.com` から配信され、アプリにはバンドルされません。`data/works.ts` の `BASE` 定数で管理されており、画像は `.webp` 形式である必要があります。
- **CSP ヘッダー**: `next.config.ts` に厳格なコンテンツセキュリティポリシーが定義されています。新しい外部画像ソースを追加する際は、CSP の `img-src` と `images` 設定の `remotePatterns` の両方を更新してください。

### データフロー

全作品データは `data/works.ts` に TypeScript の静的配列として定義されています（型: `Work`）。新しい作品を追加する場合は、連番の `id` を付けてこのファイルにエントリを追記します。トップページは最初の 3 件（`works.slice(0, 3)`）を表示し、ワーク一覧ページではクライアントサイドでカテゴリフィルタリングを行います。

### ページ・ルート構成

| ルート        | ファイル                  | 備考                                                |
| ------------- | ------------------------- | --------------------------------------------------- |
| `/`           | `app/page.tsx`            | ヒーロー + 注目作品（先頭3件）+ About プレビュー    |
| `/works`      | `app/works/page.tsx`      | 全作品ギャラリー（カテゴリフィルター付き）          |
| `/works/[id]` | `app/works/[id]/page.tsx` | 作品詳細。クライアント処理は `WorkDetailClient.tsx` |
| `/about`      | `app/about/page.tsx`      | プロフィールページ                                  |

### 共有コンポーネント

- `app/components/Header.tsx` — 固定ナビゲーション（`motion` の layoutId でアクティブリンクをアニメーション）
- `app/components/Footer.tsx` — フッター
- `app/meta.tsx` — `siteConfig` オブジェクト（タイトル・説明・URL）。メタデータと Header で使用

### スタイリング

Tailwind CSS でダークテーマ。背景色は `#0a0a0a`、サブセクションは `#111111`。カスタム Tailwind テーマの拡張はありません。`prettier-plugin-tailwindcss` により Prettier が Tailwind クラスを自動整列します。

### スクリプト

`scripts/convert-to-webp.sh` — CDN にアップロードする前に画像を WebP 形式へ変換するシェルスクリプトです。
