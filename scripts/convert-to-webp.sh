#!/usr/bin/env bash
#
# convert-to-webp.sh
#
# 概要:
#   指定したディレクトリ配下の画像を WebP 形式かつ 300KB 以下に変換する。
#   変換後のファイルは入力ディレクトリと同じ階層に
#   "{入力ディレクトリ名}_edited" という名前で出力される。
#
# 使い方:
#   bash scripts/convert-to-webp.sh <input_dir>
#
# 引数:
#   input_dir   変換対象の画像が入ったディレクトリ（絶対パス・相対パス どちらも可）
#
# 出力:
#   <input_dir の親>/<input_dir 名>_edited/
#   入力ディレクトリのサブディレクトリ構造をそのまま維持して .webp ファイルを配置する。
#
# 例:
#   bash scripts/convert-to-webp.sh scripts/data
#   # → migration と同じ階層に migration_edited/ が作成される
#
# 依存:
#   cwebp (brew install webp)

set -euo pipefail

CWEBP="/opt/homebrew/bin/cwebp"
MAX_BYTES=$((300 * 1024))   # 300KB = 307200 bytes
INITIAL_QUALITY=85
MIN_QUALITY=10

# --- 引数チェック ---
if [[ $# -ne 1 ]]; then
  echo "Usage: $(basename "$0") <input_dir>" >&2
  exit 1
fi

SRC_DIR="$(cd "$1" && pwd)"
PARENT_DIR="$(dirname "$SRC_DIR")"
SRC_NAME="$(basename "$SRC_DIR")"
OUT_DIR="${PARENT_DIR}/${SRC_NAME}_edited"

if [[ ! -x "$CWEBP" ]]; then
  echo "Error: cwebp not found at $CWEBP" >&2
  echo "Install with: brew install webp" >&2
  exit 1
fi

convert_image() {
  local src="$1"
  local rel="${src#$SRC_DIR/}"
  local out="${OUT_DIR}/${rel%.*}.webp"
  local out_dir
  out_dir="$(dirname "$out")"

  mkdir -p "$out_dir"

  local quality=$INITIAL_QUALITY
  local success=false
  local note=""

  # Phase 1: quality を落としながら試す
  while [[ $quality -ge $MIN_QUALITY ]]; do
    "$CWEBP" -quiet -q "$quality" "$src" -o "$out"
    local size
    size=$(stat -f%z "$out")   # macOS: stat -f%z でバイト数取得

    if [[ $size -le $MAX_BYTES ]]; then
      success=true
      break
    fi

    quality=$((quality - 5))
  done

  # Phase 2: quality=1 でも超過する場合はリサイズで対処
  if ! $success; then
    local orig_w
    orig_w=$(sips -g pixelWidth "$src" | awk '/pixelWidth/{print $2}')
    local scale=75
    while [[ $scale -ge 25 ]]; do
      local resize_w=$(( orig_w * scale / 100 ))
      quality=$INITIAL_QUALITY
      "$CWEBP" -quiet -q "$quality" -resize "$resize_w" 0 "$src" -o "$out"
      local size
      size=$(stat -f%z "$out")
      if [[ $size -le $MAX_BYTES ]]; then
        success=true
        note=" resize=${scale}%"
        break
      fi
      scale=$((scale - 25))
    done
  fi

  if $success; then
    local kb=$(( $(stat -f%z "$out") / 1024 ))
    printf "  [OK] %s -> %s (q=%d, %dKB%s)\n" "$rel" "${out#$OUT_DIR/}" "$quality" "$kb" "$note"
  else
    printf "  [WARN] %s: リサイズしても 300KB を超過 (%dKB)\n" \
      "$rel" "$(( $(stat -f%z "$out") / 1024 ))"
  fi
}

echo "=== WebP 変換開始 ==="
echo "  入力: $SRC_DIR"
echo "  出力: $OUT_DIR"
echo "  上限: 300KB"
echo ""

count=0
while IFS= read -r -d '' file; do
  convert_image "$file"
  count=$((count + 1))
done < <(find "$SRC_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) -print0)

echo ""
echo "=== 完了: ${count}ファイル変換 ==="
