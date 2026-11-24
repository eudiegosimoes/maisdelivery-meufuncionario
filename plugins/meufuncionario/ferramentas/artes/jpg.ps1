Add-Type -AssemblyName System.Drawing
$src = 'E:\Users\Maisd\Desktop\PASTATOTEM\cadastro-lote\artes-parceiro\aripuana'
$dst = 'E:\Users\Maisd\Desktop\PASTATOTEM\cadastro-lote\artes-parceiro\aripuana-story-jpg'
New-Item -ItemType Directory -Force $dst | Out-Null
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 90L
$i = 0
foreach ($f in Get-ChildItem $src -Filter *.png | Sort-Object Name) {
  $i++
  $img = [System.Drawing.Image]::FromFile($f.FullName)
  $bmp = New-Object System.Drawing.Bitmap 1080, 1920
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($img, 0, 0, 1080, 1920)
  $g.Dispose()
  $bmp.Save((Join-Path $dst ('{0:D2}-{1}.jpg' -f $i, $f.BaseName)), $codec, $ep)
  $bmp.Dispose(); $img.Dispose()
}
'ok ' + $i
