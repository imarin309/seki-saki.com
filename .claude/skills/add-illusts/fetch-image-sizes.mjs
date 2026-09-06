/**
 * data/illusts.ts の各エントリに、CDN 上の画像の実寸（width / height）を書き込む。
 *
 * 一覧は CSS 段組み（columns）で流し込んでいるため、縦横比が分からないと
 * 画像が 1 枚読み込まれるたびに列の高さが変わり、後続の作品が列をまたいで飛ぶ。
 * 実寸を持たせて読み込み前から場所を確保するために使う。
 *
 * 使い方: node .claude/skills/add-illusts/fetch-image-sizes.mjs
 */
import { readFile, writeFile } from "node:fs/promises";

const DATA_FILE = new URL("../../../data/illusts.ts", import.meta.url);

/** WebP のヘッダーは先頭 32 バイトに収まるが、余裕を持って取得する */
const HEADER_BYTES = 64;

/** VP8X の canvas サイズは 29 バイト目まで使う */
const MIN_HEADER_BYTES = 30;

function parseWebpSize(buffer) {
  if (buffer.length < MIN_HEADER_BYTES) {
    throw new Error("ヘッダーを読み切れませんでした");
  }

  if (
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    throw new Error("WebP ではありません");
  }

  const format = buffer.toString("ascii", 12, 16);

  if (format === "VP8 ") {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }

  if (format === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }

  if (format === "VP8X") {
    const read24 = (offset) =>
      buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
    return { width: read24(24) + 1, height: read24(27) + 1 };
  }

  throw new Error(`未対応のチャンク: ${format}`);
}

/**
 * Range を無視して 200 で全体を返すサーバーに当たっても画像を丸ごと落とさないよう、
 * 必要なバイト数が揃った時点でストリームを打ち切る。
 */
async function readHead(res) {
  const reader = res.body.getReader();
  const chunks = [];
  let read = 0;

  while (read < HEADER_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    read += value.length;
  }
  await reader.cancel();

  return Buffer.concat(chunks);
}

async function fetchSize(url) {
  const res = await fetch(url, {
    headers: { Range: `bytes=0-${HEADER_BYTES - 1}` },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return parseWebpSize(await readHead(res));
}

const source = await readFile(DATA_FILE, "utf8");

const base = source.match(/const BASE = "(.+?)";/)?.[1];
if (!base) throw new Error("BASE 定数が見つかりません");

/** `image:` の行と、その直後に既に並んでいる width / height の行をまとめて捉える */
const IMAGE_ENTRY =
  /^([ \t]*)image: `\$\{BASE\}(.+?)`,\n(?:[ \t]*(?:width|height): \d+,\n)*/gm;

const matches = [...source.matchAll(IMAGE_ENTRY)];
console.log(`${matches.length} 件の画像を取得します`);

const sizes = new Map();
for (const [, , path] of matches) {
  const url = `${base}${path}`;
  const size = await fetchSize(url);
  sizes.set(path, size);
  console.log(`  ${path} → ${size.width}x${size.height}`);
}

const updated = source.replace(IMAGE_ENTRY, (_match, indent, path) => {
  const { width, height } = sizes.get(path);
  return (
    `${indent}image: \`\${BASE}${path}\`,\n` +
    `${indent}width: ${width},\n` +
    `${indent}height: ${height},\n`
  );
});

await writeFile(DATA_FILE, updated);
console.log("data/illusts.ts を更新しました");
