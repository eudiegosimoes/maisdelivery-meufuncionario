#!/usr/bin/env bash
# uso: baixar.sh <pasta-destino> <lista sid|slug|url>
B="$1"; L="$2"; mkdir -p "$B"; cd "$B" || exit 1
ok=0
while IFS='|' read -r sid slug url; do
  [ -z "$sid" ] && continue
  mkdir -p "$sid"
  ct=$(curl -s -L -o tmp -w "%{content_type}" "$url")
  e=""
  case "$ct" in
    image/jpeg*) e=jpg ;;
    image/png*) e=png ;;
    image/webp*) e=webp ;;
  esac
  sz=$(wc -c < tmp)
  if [ -n "$e" ] && [ "$sz" -gt 3000 ]; then mv tmp "$sid/$slug.$e"; ok=$((ok+1)); else echo "pulou $sid $slug $ct $sz"; fi
done < "$L"
rm -f tmp
echo "ok=$ok"
for d in */; do echo "$d $(ls "$d" | wc -l) $(du -sh "$d" | cut -f1)"; done
