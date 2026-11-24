Add-Type -AssemblyName System.Drawing
$dir = 'E:\Users\Maisd\Desktop\PASTATOTEM\cadastro-lote\artes-parceiro\aripuana'
$files = Get-ChildItem $dir -Filter *.png | Sort-Object Name
$cols = 6; $tw = 220; $th = 391; $lab = 22
$rows = [math]::Ceiling($files.Count / $cols)
$bmp = New-Object System.Drawing.Bitmap ($cols * $tw), ($rows * ($th + $lab))
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = 'HighQualityBicubic'; $g.Clear([System.Drawing.Color]::FromArgb(34,34,34))
$font = New-Object System.Drawing.Font 'Segoe UI', 9
$i = 0
foreach ($f in $files) {
  $img = [System.Drawing.Image]::FromFile($f.FullName)
  $x = ($i % $cols) * $tw; $y = [math]::Floor($i / $cols) * ($th + $lab)
  $g.DrawImage($img, $x + 2, $y + 2, $tw - 4, $th - 4)
  $name = ($i + 1).ToString() + ' ' + $f.BaseName.Replace('parceiro-','')
  $g.DrawString($name, $font, [System.Drawing.Brushes]::White, $x + 4, $y + $th)
  $img.Dispose(); $i++
}
$g.Dispose()
$bmp.Save('E:\Users\Maisd\Desktop\PASTATOTEM\cadastro-lote\artes-parceiro\folha-conferencia-aripuana.jpg', [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
'ok ' + $files.Count
