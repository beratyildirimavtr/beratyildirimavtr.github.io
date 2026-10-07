# Site kullanım kılavuzu (kısa)

Sitenin dosyaları GitHub'da durur. Her değişiklik için ilgili dosyayı açıp kaleme (Edit) tıklarsınız,
sonra yeşil "Commit changes" düğmesine basarsınız. 1-2 dakika sonra site güncellenir.

## Yeni karar eklemek
`kararlar` klasörü > Add file > Create new file. Dosya adı: `2026-10-08-kararin-kisa-adi.md`
(tarih-ile-başlayan, boşluksuz, Türkçe harfsiz). İçeriği SABLONLAR/karar-sablonu.md'den kopyalayın.
- `konu:` değeri, `konular` klasöründeki ilgili dosyanın adıdır (örn. `nafaka-davalari`).
- Özet `ozet:` satırına, kararın tam metni üç tire (---) satırından sonra gelir.

## Yeni konu başlığı eklemek
`konular` klasörüne yeni dosya (örn. `ortaklik-davalari.md`). Şablon: SABLONLAR/konu-sablonu.md.
`grup:` değeri `ceza-hukuku`, `hukuk-davalari`, `idari-davalar`, `icra-takipleri` veya `tuketici-islemleri` olmalıdır.
Aşağıda "---" çizgisinden sonra yazdığınız metin, konu sayfasının üstünde açıklama olarak görünür.

## Ana başlıkların (Ceza Hukuku vb.) açıklama metni
`gruplar` klasöründeki ilgili dosyayı açın (örn. `ceza-hukuku.md`). "---" çizgisinin altındaki metin sayfada görünür.
Üstteki kısa cümle (`ozet:`) sayfanın renkli şeridinde görünür.

## Diğer
- Ana sayfadaki uyarı yazısı ve altındaki cümle: `_data/site.json`
- Telefon, adres, e-posta: `_data/iletisim.json`
- Menü: `_data/menu.json`
- Hakkımda yazısı ve zaman çizelgesi: `hakkimda.md`

## Siteyi herkese açmak
`_data/site.json` içinde `"yayinda": false` ifadesini `true` yapın. Bu yapıldığında örnek kararlar
(`ornek: true` olanlar) otomatik gizlenir ve site arama motorlarına açılır.
