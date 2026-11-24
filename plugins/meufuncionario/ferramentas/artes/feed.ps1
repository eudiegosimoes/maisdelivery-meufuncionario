Add-Type -AssemblyName System.Drawing
$src = 'E:\Users\Maisd\Desktop\PASTATOTEM\cadastro-lote\artes-parceiro\aripuana-story-jpg'
$dst = 'E:\Users\Maisd\Desktop\PASTATOTEM\cadastro-lote\artes-parceiro\aripuana-feed-jpg'
New-Item -ItemType Directory -Force $dst | Out-Null
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 90L
$W = 1080; $H = 1350
$n = 0
foreach ($f in Get-ChildItem $src -Filter *.jpg) {
  $img = [System.Drawing.Image]::FromFile($f.FullName)
  # fundo: arte esticada para cobrir, borrada (reduz e amplia)
  $small = New-Object System.Drawing.Bitmap 27, 34
  $gs = [System.Drawing.Graphics]::FromImage($small)
  $gs.InterpolationMode = 'HighQualityBilinear'
  $gs.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, 27, 34), (New-Object System.Drawing.Rectangle 0, 285, 1080, 1350), [System.Drawing.GraphicsUnit]::Pixel)
  $gs.Dispose()
  $bmp = New-Object System.Drawing.Bitmap $W, $H
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBilinear'; $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($small, -20, -20, $W + 40, $H + 40)
  $dark = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(90, 60, 0, 0))
  $g.FillRectangle($dark, 0, 0, $W, $H)
  # arte inteira no centro (altura 1350)
  $g.InterpolationMode = 'HighQualityBicubic'
  $aw = [int](1080 * $H / 1920)
  $x = [int](($W - $aw) / 2)
  $sh = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(110, 0, 0, 0))
  $g.FillRectangle($sh, $x + 8, 0, $aw, $H)
  $g.DrawImage($img, $x, 0, $aw, $H)
  $g.Dispose(); $small.Dispose()
  $bmp.Save((Join-Path $dst $f.Name), $codec, $ep)
  $bmp.Dispose(); $img.Dispose(); $n++
}
'ok ' + $n
