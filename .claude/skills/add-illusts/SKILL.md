---
name: add-illusts
description: R2 にアップロード済みの画像ファイル群から data/illusts.ts へイラストのエントリをまとめて追記する
disable-model-invocation: true
---

## 対象

`$ARGUMENTS` で指定されたローカルディレクトリ配下の画像ファイル。空の場合はパスを聞く。

追記先は `data/illusts.ts`（`/illust` 配下のギャラリー）。`data/works.ts` は展示・依頼などの実績用でカテゴリを持たないため、イラストの追加先ではない。「works に追加して」と言われた場合も、意図がイラストなら `data/illusts.ts` に追加し、その旨を伝える。

## 前提

画像は事前にユーザーが Cloudflare R2 へアップロード済み。このスキルはアップロードを行わず、データファイルへの追記のみを担当する。

## 手順

1. **ファイルの列挙**

   `ls -la <ディレクトリ>` でファイル名と件数を確認する。`.webp` 以外が混ざっていたら指摘する（CDN 配信は WebP 前提）。

2. **カテゴリの決定**

   ユーザーの指定に従う。`app/config.tsx` の `ILLUST_CATEGORIES` にある日本語キー（`厚塗り` / `ペン画` / `モノクロ` / `ドローイング`）をそのまま `category` に入れる。英語で指定された場合は `ILLUST_CATEGORY_LABELS` の en ラベルから対応する日本語キーへ読み替える（例: `drawing` → `ドローイング`）。一覧にないカテゴリを指定されたら、`app/config.tsx` への追加が必要な旨を確認する。

3. **配信 URL の確認**

   `data/illusts.ts` の `BASE`（`https://assets.seki-saki.com`）＋ 年ディレクトリ ＋ ファイル名でアクセスできるか、最初と最後のファイルで確認する。

   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" -I "https://assets.seki-saki.com/2026/<filename>.webp"
   ```

   404 の場合はパスの構成（年ディレクトリの有無など）を変えて再確認し、それでも見つからなければアップロード先をユーザーに確認する。**200 を確認できないまま追記しない。**

4. **エントリの作成**

   ファイルの末尾（`];` の直前）に追記する。既存エントリと同じ形。

   ```ts
   {
     id: "41",
     slug: "drawing_20260828",
     title: "drawing_20260828",
     category: "ドローイング",
     date: "2026/8/28",
     image: `${BASE}/2026/drawing_20260828.webp`,
     description: "",
   },
   ```

   - `id` — 既存の最大値からの連番（文字列）。
   - `slug` / `title` — 原則ファイル名のベース名をそのまま使う。日付入りのファイル名は日付を読み取って `date` に反映する。既存の命名と形式が違う場合（`drawing_0824` と `drawing_20260828` など）は、ファイル名側に合わせたうえで差異をユーザーに伝える。
   - `date` — `yyyy/mm/dd`。月日のゼロ埋めはしない（既存が `2026/8/17` の形式。`normalizeDateForSort` がソート時に吸収する）。
   - `description` は空文字のままでよい。ユーザーから文言の指定があれば `description` / `descriptionEn` に入れる。
   - `width` / `height` は書かない。次の手順のスクリプトが CDN から取得して挿入する。

   件数が多いときは手編集より `python3` のヒアドキュメントで一括生成するほうが確実。

5. **実寸の取得**

   ```bash
   node .claude/skills/add-illusts/fetch-image-sizes.mjs
   ```

   `data/illusts.ts` の全エントリについて、CDN の WebP ヘッダーから `width` / `height` を読み取って書き込む。一覧ページは CSS 段組み（`columns`）で画像を流し込むため、実寸がないと 1 枚読み込まれるたびに列の高さが変わり、後続の作品が列をまたいで飛ぶ。`Illust` 型で必須にしているので、実行するまでは型エラーになる。

   既存エントリの値も取得し直して上書きするため、`git diff data/illusts.ts` で差分が今回追加したエントリに収まっているか確認する。取得に失敗した画像があるとその場で止まるので、URL を見直す。

6. **検証**

   ```bash
   pnpm format:check && pnpm lint && pnpm test
   ```

   `format:check` が落ちたら `pnpm format` で整形する。

## 報告

追加した件数・id の範囲・カテゴリ・日付の範囲・URL 疎通を確認した旨を伝える。slug の命名を既存と変えた場合は必ず明示して、揃え直すか判断を仰ぐ。
