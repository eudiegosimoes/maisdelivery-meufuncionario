Add-Type -AssemblyName System.Drawing
$dest = 'E:\Users\Maisd\Desktop\PASTATOTEM\levantamento-aripuana\cardapios\logos\pre'
New-Item -ItemType Directory -Force $dest | Out-Null
$lojas = @(
  @('restaurante-avenida', 'Restaurante|Avenida', '#7A3E1D', 'RESTAURANTE'),
  @('atakadao-do-sorvete', 'Atakadão|do Sorvete', '#1E88E5', 'SORVETES'),
  @('sorveteria-andorinha', 'Sorveteria|Andorinha', '#00897B', 'SORVETES'),
  @('karla-gavioli', 'Karla|Gavioli', '#AD1457', 'CONFEITARIA'),
  @('ponto-doce', 'Ponto|Doce', '#8E24AA', 'PANIFICADORA'),
  @('pao-de-mel', 'Pão|de Mel', '#C77800', 'PANIFICADORA'),
  @('pao-dourado', 'Pão|Dourado', '#B8860B', 'PANIFICADORA'),
  @('kanpai-sushi', 'Kanpai|Sushi', '#B71C1C', 'COMIDA JAPONESA'),
  @('puro-sushi', 'Puro|Sushi', '#212121', 'COMIDA JAPONESA'),
  @('lohmann', 'Lohmann', '#2E7D32', 'CONVENIÊNCIA')
)
foreach ($l in $lojas) {
  $bmp = New-Object System.Drawing.Bitmap 600, 600
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAliasGridFit'
  $g.Clear([System.Drawing.ColorTranslator]::FromHtml($l[2]))
  $branco = [System.Drawing.Brushes]::White
  $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(90,255,255,255)), 10
  $g.DrawEllipse($pen, 40, 40, 520, 520)
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = 'Center'; $fmt.LineAlignment = 'Center'
  $linhas = $l[1].Split('|')
  $tam = 78; if (($linhas | Measure-Object -Property Length -Maximum).Maximum -gt 9) { $tam = 64 }
  $fonte = New-Object System.Drawing.Font 'Segoe UI', $tam, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
  $alt = $tam * 1.15; $y0 = 270 - (($linhas.Count - 1) * $alt / 2)
  for ($i = 0; $i -lt $linhas.Count; $i++) {
    $g.DrawString($linhas[$i], $fonte, $branco, (New-Object System.Drawing.RectangleF 40, ($y0 + $i * $alt - $alt/2), 520, $alt), $fmt)
  }
  $f2 = New-Object System.Drawing.Font 'Segoe UI', 30, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
  $g.DrawString($l[3], $f2, $branco, (New-Object System.Drawing.RectangleF 40, 420, 520, 50), $fmt)
  $f3 = New-Object System.Drawing.Font 'Segoe UI', 24, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
  $g.DrawString('ARIPUANÃ - MT', $f3, $branco, (New-Object System.Drawing.RectangleF 40, 460, 520, 40), $fmt)
  $bmp.Save("$dest\$($l[0]).png", [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}
Get-ChildItem $dest | Select-Object Name, Length
