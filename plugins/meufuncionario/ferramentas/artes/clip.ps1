param([int]$i)
$L = Get-Content -Raw -Encoding UTF8 'E:\Users\Maisd\Desktop\PASTATOTEM\cadastro-lote\artes-parceiro\legendas-feed.json' | ConvertFrom-Json
$t = $L[$i][1] -replace "`n", "`r`n"
Set-Clipboard -Value $t
$L[$i][0] + ' ' + $t.Length
