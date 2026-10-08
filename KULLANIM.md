# Site kullanım kılavuzu (kısa)

Sitenin dosyaları GitHub'da durur. Her değişiklik için ilgili dosyayı açıp kaleme (Edit) tıklarsınız,
sonra yeşil "Commit changes" düğmesine iki kez basarsınız. 1-2 dakika sonra site güncellenir (Ctrl+F5 ile yenileyin).

## Ana sayfadaki uyarı yazısını değiştirmek
Dosya: `_data/site.json`. `"uyari":` ile başlayan satırdaki tırnak içindeki yazıyı değiştirin.
Satırın sonundaki virgülü ve tırnakları silmeyin. Yazının içine düz çift tırnak (") koymayın.

## Yeni karar eklemek
`kararlar` klasörü > Add file > Create new file. Dosya adı: `2026-10-08-kararin-kisa-adi.md`
(tarih ile başlayan, boşluksuz, Türkçe harfsiz). İçeriği SABLONLAR/karar-sablonu.md'den kopyalayın.
- `konu:` değeri, `konular` klasöründeki ilgili dosyanın adıdır (örn. `nafaka-davalari`).
- Özet `ozet:` satırına, kararın tam metni ikinci üç tire (---) satırından sonra gelir.
- Örnek kararlardaki `ornek: true` satırını silerseniz "Örnek içerik" etiketi kalkar.

## Örnek bir kararı kendi kararınızla değiştirmek
`kararlar` klasöründe ilgili dosyayı açın > kalem simgesi > bilgileri (daire, esas, karar, tarih, başlık, madde, özet) ve
tam metni düzenleyin > `ornek: true` satırını silin > Commit changes.

## Yeni konu başlığı eklemek
`konular` klasörüne yeni dosya (örn. `ortaklik-davalari.md`). Şablon: SABLONLAR/konu-sablonu.md.
Başlıkta her kelimenin ilk harfi büyük yazılır ("ve" küçük kalır). `grup:` değeri `ceza-hukuku`, `hukuk-davalari`,
`idari-davalar`, `icra-takipleri` veya `tuketici-islemleri` olmalıdır.
İkinci üç tireden sonra yazdığınız metin, konu sayfasının üstünde açıklama olarak görünür.

## Ana başlıkların (Ceza Hukuku vb.) açıklama metni
`gruplar` klasöründeki ilgili dosya (örn. `ceza-hukuku.md`). İkinci "---" çizgisinin altındaki metin sayfada görünür.

## Diğer
- Telefon, adres, e-posta: `_data/iletisim.json`
- Menü: `_data/menu.json`
- Hakkımda yazısı: `hakkimda.md` (fotoğraf: kök klasördeki `berat-yildirim.jpg`)

## Siteyi herkese açmak
`_data/site.json` içinde `"yayinda": false` ifadesini `true` yapın. Bu yapıldığında örnek kararlar
(`ornek: true` olanlar) otomatik gizlenir ve site arama motorlarına açılır.
