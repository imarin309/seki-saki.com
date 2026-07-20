# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code (claude.ai/code) へのガイダンスを提供します。

## コマンド

```bash
pnpm dev           # 開発サーバー起動（Next.js + Turbopack）
pnpm build         # 静的エクスポートビルド（/out に出力）
pnpm lint          # ESLint 実行
pnpm lint:fix      # ESLint 自動修正
pnpm format        # Prettier でフォーマット（Tailwind クラス順序の自動整列含む）
pnpm format:check  # フォーマットチェック（書き込みなし）
```

テストスイートは設定されていません。

## アーキテクチャ

イラストレーター・デザイナー「世木口」の **Next.js 16 静的エクスポート** ポートフォリオサイトです。`next.config.ts` に `output: "export"` が設定されており、Cloudflare へのデプロイ用に `/out` ディレクトリへ静的サイトを生成します。

### 重要な設計方針

- **静的エクスポート**: 全ページは事前レンダリングされます。動的ルート（`/illust/[slug]`, `/works/[slug]`）はビルド時に全 slug を列挙するための `generateStaticParams()` が必要で、それぞれ `app/illust/[slug]/page.tsx`, `app/works/[slug]/page.tsx` に実装されています。
- **クライアントコンポーネント**: `motion/react` によるアニメーションのため、多くのページで `"use client"` を使用しています。詳細ルートは、`generateStaticParams` を呼ぶサーバーコンポーネント（`page.tsx`）と、インタラクティブ処理を担うクライアントコンポーネント（`WorkDetailClient.tsx`）に分割されています。
- **多言語対応 (i18n)**: 日本語（デフォルト、プレフィックスなし）と英語（`/en` プレフィックス）に対応しています。詳細は下記「多言語対応 (i18n)」セクションを参照してください。
- **画像ホスティング**: 作品画像はすべて外部 CDN `https://assets.seki-saki.com` から配信され、アプリにはバンドルされません。`data/illusts.ts` の `BASE` 定数で管理されており、画像は `.webp` 形式である必要があります。
- **CSP ヘッダー**: `output: "export"` の静的エクスポート構成では `next.config.ts` の `headers()` は本番ビルドに適用されないため、CSP を含むセキュリティヘッダーは `public/_headers`（Cloudflare Pages が解釈する形式。ビルド時に `out/_headers` へそのままコピーされます）で一元管理しています。新しい外部画像ソースを追加する際は、`public/_headers` の `img-src` と `images` 設定の `remotePatterns` の両方を更新してください。

### データフロー

全作品データは `data/illusts.ts` に TypeScript の静的配列として定義されています（型: `Illust`、配列: `illusts`、ソート済み配列: `sortedIllusts`）。新しい作品を追加する場合は、連番の `id` を付けてこのファイルにエントリを追記します。トップページは最初の 3 件（`sortedIllusts.slice(0, 3)`）を表示し、イラスト一覧ページではクライアントサイドでカテゴリフィルタリングを行います。

### ページ・ルート構成

| ルート           | ファイル                     | 備考                                                |
| ---------------- | ---------------------------- | --------------------------------------------------- |
| `/`              | `app/page.tsx`               | ヒーロー + 注目作品（先頭3件）+ About プレビュー    |
| `/illust`        | `app/illust/page.tsx`        | 全作品ギャラリー（カテゴリフィルター付き）          |
| `/illust/[slug]` | `app/illust/[slug]/page.tsx` | 作品詳細。クライアント処理は `WorkDetailClient.tsx` |
| `/works`         | `app/works/page.tsx`         | 実績一覧（タイムライン表示）                        |
| `/works/[slug]`  | `app/works/[slug]/page.tsx`  | 実績詳細。クライアント処理は `WorkDetailClient.tsx` |
| `/about`         | `app/about/page.tsx`         | プロフィールページ                                  |
| `/contact`       | `app/contact/page.tsx`       | 問い合わせページ（mailto リンク）                   |

上記の各ルートは `/en` プレフィックス付きで `app/en/` 配下にも同じ構成でミラーリングされています（例: `/en/illust/[slug]` → `app/en/illust/[slug]/page.tsx`）。

### 多言語対応 (i18n)

日本語をデフォルトロケール（URL プレフィックスなし）、英語を `/en` プレフィックス付きロケールとして扱う静的サイト向け i18n 構成です。`output: "export"` のため middleware によるロケール自動判定は使えず、パスベースでページ実体を作り分けています。

- `i18n/config.ts` — `locales` / `defaultLocale` の定義、`withLocale(locale, path)`（ja のパスをロケール別パスへ変換）、`getAlternateLocalePath(locale, pathname)`（現在のパスからもう一方のロケールの同一ページパスを算出。Header の言語切り替えリンクで使用）。
- `i18n/dictionaries.ts` — ナビゲーション・見出し・ボタン・空状態メッセージなど UI 文言の ja/en 辞書（`Dictionary` 型 + `getDictionary(locale)`）。UI 文言を追加・変更する際はここに ja/en 両方を追記します。
- `data/illusts.ts` / `data/works.ts` — 各エントリが `titleEn` / `descriptionEn` を保持し、`getIllustTitle()` / `getIllustDescription()` / `getWorkTitle()` / `getWorkDescription()` でロケールに応じた文字列を取得します。作品追加時は英語版もあわせて記入してください（`Illust.titleEn`/`descriptionEn` は任意、`Work.titleEn`/`descriptionEn` は必須）。
- `app/config.tsx` — イラストのカテゴリ（厚塗り・ペン画・モノクロ）はデータ上のキーは日本語のまま固定し、`getIllustCategoryLabel(locale, category)` で表示ラベルのみ ja/en を切り替えます。
- ページ実装の共有化 — 各ページの実装本体は `app/components/pages/*Content.tsx`（`HomeContent.tsx`, `IllustListContent.tsx`, `WorksListContent.tsx`, `AboutContent.tsx`, `ContactContent.tsx`）や `app/illust/[slug]/WorkDetailClient.tsx` / `app/works/[slug]/WorkDetailClient.tsx` に集約されており、`locale` prop を受け取ります。`app/*/page.tsx`（ja）と `app/en/*/page.tsx`（en）はそれぞれ `locale="ja"` / `locale="en"` を渡すだけの薄いラッパーです。新しいページを追加する際もこのパターンに従ってください。
- メタデータ — `app/layout.tsx` は日本語メタデータ、`app/en/layout.tsx` は英語メタデータ（`title` / `description` / `openGraph.locale` など）を `metadata` としてエクスポートし、Next.js のネストしたレイアウトのメタデータマージにより `/en` 配下のページへ自動適用されます。動的詳細ページ（`illust/[slug]`, `works/[slug]`）は ja/en それぞれの `page.tsx` で `generateMetadata` を個別定義し、`alternates.languages` でもう一方のロケール URL を指定しています。
- `<html lang>` — ルートレイアウトの `<html>` タグは 1 つしか存在できないため、`app/components/SyncHtmlLang.tsx`（クライアントコンポーネント）が `usePathname()` を見て `document.documentElement.lang` を実行時に同期しています。
- 新しいページ・ルートを追加する場合は、(1) 実装本体を `locale` prop 付き共有コンポーネントとして作成、(2) `app/` 配下に `locale="ja"` を渡すラッパーを追加、(3) `app/en/` 配下に `locale="en"` を渡すラッパーを追加、(4) `app/sitemap.ts` にエントリを追加、の 4 点セットで対応してください。

### 共有コンポーネント

- `app/components/Header.tsx` — 固定ナビゲーション（`motion` の layoutId でアクティブリンクをアニメーション、パス名からロケールを判定して言語切り替えリンクを表示）
- `app/components/Footer.tsx` — フッター
- `app/components/SyncHtmlLang.tsx` — 現在のロケールに応じて `document.documentElement.lang` を同期するクライアントコンポーネント
- `app/meta.tsx` — サイトのタイトル・説明・URL 等の定数と、ロケール別の値を返す `getSiteTitle()` / `getSiteDescription()` / `getOgLocale()`。メタデータと Header で使用

### スタイリング

Tailwind CSS でダークテーマ。背景色は `#0a0a0a`、サブセクションは `#111111`。カスタム Tailwind テーマの拡張はありません。`prettier-plugin-tailwindcss` により Prettier が Tailwind クラスを自動整列します。

### スクリプト

`scripts/convert-to-webp.sh` — CDN にアップロードする前に画像を WebP 形式へ変換するシェルスクリプトです。
