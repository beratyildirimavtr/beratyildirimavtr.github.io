#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Tek seferlik duzenleme betigi (Av. Berat YILDIRIM sitesi).
Konu dosyalarinin UZERINDE calisir (guncel hallerini bozmadan):
  1) Baslik/aciklama kisaltma ve iyilestirme (adresler DEGISMEZ)
  2) Sahte (kalin yazi) basliklari gercek basliga cevirme, baslik siralamasini duzeltme
  3) Konular arasi "Ilginizi Cekebilir" baglantilarini ekleme
  4) Kokteki yanlis yerdeki kopya dosyalari silme
  5) Ek simge dosyalari ve simge etiketleri
Betik tekrar calistirilirsa ayni seyi ikinci kez yapmaz.
"""
import os, re, glob, base64

KOK = os.getcwd()

def slugla(s):
    s = s.replace("I", "ı").replace("İ", "i").lower()
    for a, b in (("ç","c"),("ğ","g"),("ı","i"),("ö","o"),("ş","s"),("ü","u")):
        s = s.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")

BASLIK = {
 "alkollu-arac-kullanma-cezasi": "Alkollü Araç Kullanma Cezası ve Promil Sınırları",
 "anayasa-mahkemesi-onalim-iptal-karari": "Anayasa Mahkemesi Önalım (Şufa) Hakkı İptal Kararı",
 "bilisim-suclari": "Bilişim Suçları Nedir? Türleri ve Cezaları",
 "bosanma-davalari": "Boşanma Davası Nasıl Açılır? Sebepleri ve Süreci",
 "devlet-memuru-icra-borclari-sorun-olur-mu": "Memurların İcra Borçları Disiplin Cezası Gerektirir mi?",
 "dolandiricilik-suclari": "Dolandırıcılık Suçu Nedir? Cezası ve Unsurları",
 "garanti-uygulamalari": "Garanti ve Yetkili Servis Hakları (Araç Alım Satımı Dahil)",
 "halki-kin-ve-dusmanliga-tahrik-sucu": "Halkı Kin ve Düşmanlığa Tahrik Suçu (TCK 216)",
 "hirsizlik-suclari": "Hırsızlık Suçu Nedir? Cezası ve Unsurları",
 "iban-kullandirma-suclari": "IBAN Kullandırma Suçu ve Cezası",
 "ilamli-icra-takibi": "İlamlı İcra Takibi Nasıl Yapılır?",
 "ilamsiz-icra-takibine-itiraz": "İlamsız İcra Takibine İtiraz Nasıl Yapılır?",
 "istihkak-davasi": "İstihkak Davası Nedir? Şartları ve Süreci",
 "karsiliksiz-cek-cezasi": "Karşılıksız Çek Cezası Nedir?",
 "malvarligi-degerlerini-aklama-sucu": "Malvarlığı Değerlerini Aklama Suçu (TCK 282)",
 "maas-haczi-ve-banka-hesaplarina-haciz": "Maaş Haczi ve Banka Hesaplarına Haciz",
 "nafaka-davalari": "Nafaka Davaları: Türleri ve Şartları",
 "nafaka-icra-takipleri": "Nafaka İcra Takibi Nasıl Yapılır?",
 "tapu-iptal-tescil-davalari": "Tapu İptal ve Tescil Davası Nedir? (Yolsuz Tescil)",
 "tehdit-ve-hakaret-suclari": "Tehdit ve Hakaret Suçları ve Cezaları",
 "tuketici-hakem-heyeti-basvurusu": "Tüketici Hakem Heyeti Başvurusu Nasıl Yapılır? (THH)",
 "tuketici-haklarii": "Tüketicinin Hakları Nelerdir?",
 "universite-disiplin-cezalari": "Üniversite Disiplin Cezası ve Okuldan Uzaklaştırma İptali",
 "uyusturucu-suclari": "Uyuşturucu Suçları: Kullanma ve Ticaret Ayrımı",
 "yaralama-suclari": "Yaralama Suçu Nedir? Kasten ve Taksirle Yaralama",
 "zimmet-sucu": "Zimmet Suçu Nedir? Cezası ve Unsurları",
 "ayipli-malin-ve-urunun-iadesi": "Ayıplı Mal ve Kusurlu Ürün İadesi Nasıl Yapılır?",
}
ACIKLAMA = {
 "tuketici-hakem-heyeti-basvurusu": "Tüketici hakem heyetine (THH) başvuru nasıl yapılır? Başvuru şartları, parasal sınırlar, e-Devlet adımları ve karara itiraz süreci.",
 "bilisim-suclari": "Bilişim suçları nedir? Bilişim sistemine girme, sistemi engelleme ve banka veya kredi kartlarının kötüye kullanılması suçlarının unsurları ve cezaları.",
 "ayipli-malin-ve-urunun-iadesi": "Aldığınız ürün kusurlu ya da ayıplı çıktıysa iade, değişim, onarım ve bedel indirimi haklarınız nelerdir? Süreler ve başvuru yolları.",
 "tapu-iptal-tescil-davalari": "Yolsuz tescil nedir, tapu iptal ve tescil davası hangi hâllerde açılır? Davanın şartları, görevli mahkeme ve süreç hakkında bilgiler.",
 "tehdit-ve-hakaret-suclari": "Tehdit ve hakaret suçlarının unsurları, cezaları ve sık karşılaşılan durumlar hakkında genel bilgilendirme.",
 "uyusturucu-suclari": "Uyuşturucu madde kullanma, bulundurma ve ticaret suçlarının tanımı ve cezaları; kullanmak için bulundurma ile ticaret arasındaki ayrım.",
 "karsiliksiz-cek-cezasi": "Karşılıksız çek düzenlemenin hukuki sonuçları ve cezası nedir? Suçun unsurları ve sürecin nasıl işlediği hakkında genel bilgilendirme.",
 "istihkak-davasi": "İstihkak davası nedir? Haczedilen mal üzerinde hak iddia eden üçüncü kişinin başvuru yolu, şartları ve davanın süreci.",
 "nafaka-icra-takipleri": "Nafaka alacağı için icra takibi nasıl başlatılır? Nafaka ödenmediğinde başvurulacak yollar ve süreç hakkında bilgiler.",
 "tuketicininn-secimlik-haklari": "Tüketicinin ayıplı mal karşısındaki seçimlik hakları: sözleşmeden dönme, bedel indirimi, ücretsiz onarım ve ürün değişimi.",
 "ilamli-icra-takibi": "İlamlı icra takibi nedir ve nasıl yapılır? Mahkeme kararlarının icra yoluyla uygulanması, süreç ve itiraz imkânları.",
 "universite-disiplin-cezalari": "Üniversite öğrencilerine verilen disiplin cezaları, itiraz yolları ve iptal davası süreci hakkında bilgiler.",
 "anayasa-mahkemesi-nafaka-karari": "Anayasa Mahkemesi süresiz nafaka kuralını iptal etti mi? Kararın yürürlük tarihi ve mevcut nafakalara etkisi (E.2025/156, K.2026/131).",
 "ayipli-hizmet-nedir": "Ayıplı hizmet nedir? Verilen hizmetin ayıplı olması hâlinde tüketicinin hakları ve başvuru yolları.",
}
LINKS = {
 "malvarligi-degerlerini-aklama-sucu": ["orgutlu-suclar","zimmet-sucu","dolandiricilik-suclari"],
 "alkollu-arac-kullanma-cezasi": ["trafikten-men-edilen-arac","onodeme-kapsami"],
 "bilisim-suclari": ["dolandiricilik-suclari","iban-kullandirma-suclari"],
 "dolandiricilik-suclari": ["iban-kullandirma-suclari","bilisim-suclari","12-yargi-paketiyle-gelen-ceza-hukuku-duzenlemeleri"],
 "halki-kin-ve-dusmanliga-tahrik-sucu": ["tehdit-ve-hakaret-suclari"],
 "hirsizlik-suclari": ["yaralama-suclari","tehdit-ve-hakaret-suclari"],
 "iban-kullandirma-suclari": ["dolandiricilik-suclari","bilisim-suclari","malvarligi-degerlerini-aklama-sucu"],
 "imar-kirliligi-ve-muhur-bozma-suclari": ["imar-ve-belediye-islemlerinin-iptali"],
 "karsiliksiz-cek-cezasi": ["borc-faiz-icra-masraflari","12-yargi-paketiyle-gelen-ceza-hukuku-duzenlemeleri"],
 "onodeme-kapsami": ["alkollu-arac-kullanma-cezasi","karsiliksiz-cek-cezasi"],
 "orgutlu-suclar": ["malvarligi-degerlerini-aklama-sucu","zimmet-sucu"],
 "tehdit-ve-hakaret-suclari": ["halki-kin-ve-dusmanliga-tahrik-sucu","hirsizlik-suclari","yaralama-suclari"],
 "uyusturucu-suclari": ["hirsizlik-suclari","12-yargi-paketiyle-gelen-ceza-hukuku-duzenlemeleri"],
 "yaralama-suclari": ["tehdit-ve-hakaret-suclari","hirsizlik-suclari"],
 "zimmet-sucu": ["malvarligi-degerlerini-aklama-sucu","orgutlu-suclar"],
 "12-yargi-paketiyle-gelen-ceza-hukuku-duzenlemeleri": ["dolandiricilik-suclari","iban-kullandirma-suclari","karsiliksiz-cek-cezasi"],
 "kira-davalari": ["tapu-iptal-tescil-davalari","ortakligin-giderilmesi"],
 "miras-hukuku-zumreler": ["onalim-davasi","ortakligin-giderilmesi","tapu-iptal-tescil-davalari"],
 "onalim-davasi": ["anayasa-mahkemesi-onalim-iptal-karari","ortakligin-giderilmesi","tapu-iptal-tescil-davalari"],
 "ortakligin-giderilmesi": ["miras-hukuku-zumreler","onalim-davasi"],
 "tapu-iptal-tescil-davalari": ["onalim-davasi","ortakligin-giderilmesi"],
 "anayasa-mahkemesi-nafaka-karari": ["nafaka-davalari","bosanma-davalari","nafaka-icra-takipleri"],
 "anayasa-mahkemesi-onalim-iptal-karari": ["onalim-davasi","tapu-iptal-tescil-davalari","miras-hukuku-zumreler"],
 "is-hukuku-isci-davalari": ["karsi-vekalet-ucreti"],
 "karsi-vekalet-ucreti": ["is-hukuku-isci-davalari","bosanma-davalari"],
 "nafaka-davalari": ["anayasa-mahkemesi-nafaka-karari","bosanma-davalari","nafaka-icra-takipleri"],
 "bosanma-davalari": ["nafaka-davalari","anayasa-mahkemesi-nafaka-karari","karsi-vekalet-ucreti"],
 "evdeki-esyalarin-haczi": ["maas-haczi-ve-banka-hesaplarina-haciz","istihkak-davasi","taskin-haciz-nedir"],
 "nafaka-icra-takipleri": ["nafaka-davalari","ilamli-icra-takibi"],
 "sira-cetveli": ["iflas-masasi-nedir","istihkak-davasi"],
 "borc-faiz-icra-masraflari": ["ilamsiz-icra-takibine-itiraz","ilamli-icra-takibi","karsiliksiz-cek-cezasi"],
 "iflas-masasi-nedir": ["sira-cetveli","istihkak-davasi"],
 "ihtiyati-haciz": ["taskin-haciz-nedir","ilamsiz-icra-takibine-itiraz"],
 "ilamli-icra-takibi": ["ilamsiz-icra-takibine-itiraz","borc-faiz-icra-masraflari"],
 "ilamsiz-icra-takibine-itiraz": ["ilamli-icra-takibi","borc-faiz-icra-masraflari","ihtiyati-haciz"],
 "istihkak-davasi": ["evdeki-esyalarin-haczi","sira-cetveli"],
 "maas-haczi-ve-banka-hesaplarina-haciz": ["evdeki-esyalarin-haczi","taskin-haciz-nedir","devlet-memuru-icra-borclari-sorun-olur-mu"],
 "taskin-haciz-nedir": ["maas-haczi-ve-banka-hesaplarina-haciz","evdeki-esyalarin-haczi","ihtiyati-haciz"],
 "sozlesmeli-er-ve-uzman-erbas-davalari": ["idari-islemin-iptali-davasi","yurutmenin-durdurulmasi"],
 "trafikten-men-edilen-arac": ["alkollu-arac-kullanma-cezasi","yurutmenin-durdurulmasi"],
 "universite-disiplin-cezalari": ["memur-disiplin-cezalari","idari-islemin-iptali-davasi","yurutmenin-durdurulmasi"],
 "yurutmenin-durdurulmasi": ["idari-islemin-iptali-davasi","ivedi-yargilama"],
 "devlet-memuru-icra-borclari-sorun-olur-mu": ["memur-disiplin-cezalari","maas-haczi-ve-banka-hesaplarina-haciz","memur-davalari-ve-idari-yargi-surecleri"],
 "idari-islemin-iptali-davasi": ["yurutmenin-durdurulmasi","ivedi-yargilama","memur-davalari-ve-idari-yargi-surecleri"],
 "imar-ve-belediye-islemlerinin-iptali": ["imar-kirliligi-ve-muhur-bozma-suclari","idari-islemin-iptali-davasi"],
 "ivedi-yargilama": ["idari-islemin-iptali-davasi","yurutmenin-durdurulmasi"],
 "memur-davalari-ve-idari-yargi-surecleri": ["memur-disiplin-cezalari","idari-islemin-iptali-davasi","universite-disiplin-cezalari"],
 "memur-disiplin-cezalari": ["memur-davalari-ve-idari-yargi-surecleri","universite-disiplin-cezalari","devlet-memuru-icra-borclari-sorun-olur-mu"],
 "ayipli-hizmet-nedir": ["gizli-ayip-nedir","tuketici-hakem-heyeti-basvurusu","tuketicininn-secimlik-haklari"],
 "ayipli-malin-ve-urunun-iadesi": ["gizli-ayip-nedir","garanti-uygulamalari","tuketici-hakem-heyeti-basvurusu"],
 "garanti-uygulamalari": ["ayipli-malin-ve-urunun-iadesi","tuketici-hakem-heyeti-basvurusu"],
 "gizli-ayip-nedir": ["ayipli-malin-ve-urunun-iadesi","ayipli-hizmet-nedir"],
 "tuketici-hakem-heyeti-basvurusu": ["ayipli-malin-ve-urunun-iadesi","tuketicininn-secimlik-haklari"],
 "tuketicininn-secimlik-haklari": ["ayipli-malin-ve-urunun-iadesi","tuketici-hakem-heyeti-basvurusu"],
 "tuketici-haklarii": ["tuketicininn-secimlik-haklari","tuketici-hakem-heyeti-basvurusu"],
}
IKON = {48: "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", 96: "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"}
ESKI_KOKTE_KOPYA = ["_data", "_includes", "css", "js", "gruplar", "konular", ".github/workflows"]

def on_bilgi_ayir(t):
    m = re.match(r"^(---\n)(.*?)(\n---\n?)(.*)$", t, re.S)
    if not m: return None
    return m.group(1), m.group(2), m.group(3), m.group(4)

def _kapali(val, q):
    if len(val) < 2 or not val.endswith(q): return False
    if q == '"':
        n = 0; i = len(val) - 2
        while i >= 0 and val[i] == "\\": n += 1; i -= 1
        return n % 2 == 0
    return True

def alan_oku(fm, key):
    lines = fm.split("\n")
    for i, l in enumerate(lines):
        if re.match(r"^" + key + r":", l):
            val = l.split(":", 1)[1].strip(); j = i + 1
            if val[:1] in ('"', "'") and not _kapali(val, val[0]):
                while j < len(lines):
                    val = val + " " + lines[j].strip(); j += 1
                    if _kapali(val, val[0]): break
            else:
                extra = []
                while j < len(lines) and lines[j].startswith((" ", "\t")) and lines[j].strip():
                    extra.append(lines[j].strip()); j += 1
                if val in (">", "|", ">-", "|-", ">+", "|+"): val = " ".join(extra)
                elif extra: val = (val + " " + " ".join(extra)).strip()
            if val.startswith('"') and val.endswith('"') and len(val) >= 2:
                val = val[1:-1].replace('\\"', '"').replace("\\\\", "\\")
            elif val.startswith("'") and val.endswith("'") and len(val) >= 2:
                val = val[1:-1].replace("''", "'")
            return i, j, val
    return None

def alan_yaz(fm, key, deger):
    r = alan_oku(fm, key)
    yeni = key + ': "' + deger.replace("\\", "\\\\").replace('"', '\\"') + '"'
    lines = fm.split("\n")
    if r is None: return fm + "\n" + yeni
    i, j, _ = r
    lines[i:j] = [yeni]
    return "\n".join(lines)

def kisalt(s, n=155):
    s = re.sub(r"\s+", " ", s).strip()
    if len(s) <= n: return s
    kes = s[:n]
    cikis = max(kes.rfind(". "), kes.rfind("! "), kes.rfind("? "))
    if cikis >= 70: return kes[:cikis + 1]
    kes = kes.rsplit(" ", 1)[0].rstrip(",;:- ")
    return kes + "…"

def norm(s): return re.sub(r"\W+", "", s.lower())

SAHTE = re.compile(r"^(\*{2,3})(?=\S)(.+?)(?<=\S)\1$")

def basliklari_duzelt(body):
    lines = body.split("\n"); cit = False; parsed = []
    for l in lines:
        if l.strip().startswith("```"): cit = not cit; parsed.append(("kod", l)); continue
        if cit: parsed.append(("kod", l)); continue
        m = re.match(r"^(#{1,6})\s+(.*)$", l)
        if m: parsed.append(("h", len(m.group(1)), m.group(2).rstrip())); continue
        s = l.strip()
        if not re.match(r"^([*\-+]\s|\d+[.)]\s)", s):
            f = SAHTE.match(s)
            if f and "**" not in f.group(2) and len(f.group(2)) <= 120:
                parsed.append(("sahte", f.group(2).strip())); continue
        parsed.append(("m", l))
    seviyeler = [p[1] for p in parsed if p[0] == "h"]
    sahte_numarali = any(p[0] == "sahte" and re.match(r"^(\d{1,2}[.)]|[IVX]{1,5}\.)\s", p[1]) for p in parsed)
    var_h2 = (1 in seviyeler) or (2 in seviyeler) or sahte_numarali
    yukari = (not var_h2) and bool(seviyeler) and min(seviyeler) >= 3
    sonuc = []
    for p in parsed:
        if p[0] in ("kod", "m"): sonuc.append(p[1]); continue
        if p[0] == "h":
            sev = p[1]
            if sev == 1: sev = 2
            elif yukari: sev = max(2, sev - 1)
            sonuc.append("#" * sev + " " + p[2]); continue
        txt = p[1].strip().rstrip(":").strip()
        if re.match(r"^(\d{1,2}[.)]|[IVX]{1,5}\.)\s", txt): sev = 2
        elif re.match(r"^[A-Za-zÇĞİÖŞÜçğıöşü]\)\s", txt): sev = 3
        else: sev = 3 if var_h2 else 2
        sonuc.append("#" * sev + " " + txt)
    return "\n".join(sonuc)

dosyalar = sorted(glob.glob(os.path.join(KOK, "konular", "*.md")))
kayit = {}
for f in dosyalar:
    t = open(f, encoding="utf-8").read().replace("\r\n", "\n")
    ayr = on_bilgi_ayir(t)
    if not ayr: continue
    a, fm, c, body = ayr
    g = alan_oku(fm, "grup")
    if not g or not g[2]: continue
    slug = slugla(os.path.splitext(os.path.basename(f))[0])
    kayit[slug] = dict(yol=f, a=a, fm=fm, c=c, body=body,
                       baslik=(alan_oku(fm, "baslik") or (0, 0, slug))[2],
                       aciklama=(alan_oku(fm, "aciklama") or (0, 0, ""))[2], grup=g[2])

rapor = []
for slug, k in kayit.items():
    eski_b, eski_a = k["baslik"], k["aciklama"]
    yeni_b = BASLIK.get(slug, eski_b)
    yeni_a = ACIKLAMA.get(slug) or (eski_a if len(eski_a) <= 160 else kisalt(eski_a))
    yeni_a = kisalt(yeni_a, 158)
    if len(eski_a) > 160 and norm(eski_a)[:60] not in norm(k["body"]):
        k["body"] = eski_a.strip() + "\n\n" + k["body"].lstrip("\n")
    k["baslik"], k["aciklama"] = yeni_b, yeni_a
    k["fm"] = alan_yaz(alan_yaz(k["fm"], "baslik", yeni_b), "aciklama", yeni_a)
    rapor.append((slug, eski_b, yeni_b, len(eski_a), len(yeni_a)))

for slug, k in kayit.items():
    k["body"] = basliklari_duzelt(k["body"])

def otomatik(slug):
    k = kayit[slug]; kelime = set(re.findall(r"\w{4,}", k["baslik"].lower()))
    adaylar = []
    for s2, k2 in kayit.items():
        if s2 == slug or k2["grup"] != k["grup"]: continue
        ortak = len(kelime & set(re.findall(r"\w{4,}", k2["baslik"].lower())))
        adaylar.append((-ortak, s2))
    return [s for _, s in sorted(adaylar)[:3]]

for slug, k in kayit.items():
    if "İlginizi Çekebilir" in k["body"]: continue
    hedefler = [h for h in LINKS.get(slug, []) if h in kayit and h != slug] or otomatik(slug)
    if not hedefler: continue
    blok = "\n\n## İlginizi Çekebilir\n" + "\n".join("- [%s](/konu/%s/)" % (kayit[h]["baslik"], h) for h in hedefler) + "\n"
    k["body"] = k["body"].rstrip("\n") + blok

degisen = 0
for slug, k in kayit.items():
    yeni = k["a"] + k["fm"] + k["c"] + k["body"]
    eski = open(k["yol"], encoding="utf-8").read().replace("\r\n", "\n")
    if yeni != eski:
        open(k["yol"], "w", encoding="utf-8", newline="\n").write(yeni); degisen += 1
print("Düzenlenen konu dosyası:", degisen, "/", len(kayit))

silinen = []
for kl in ESKI_KOKTE_KOPYA:
    d = os.path.join(KOK, kl)
    if not os.path.isdir(d): continue
    for ad in os.listdir(d):
        if os.path.isfile(os.path.join(d, ad)) and os.path.isfile(os.path.join(KOK, ad)):
            os.remove(os.path.join(KOK, ad)); silinen.append(ad)
for ad in os.listdir(KOK):
    if "#U0" in ad and os.path.isfile(os.path.join(KOK, ad)):
        os.remove(os.path.join(KOK, ad)); silinen.append(ad)
print("Silinen yanlış yerdeki dosyalar:", silinen)

for n, b64 in IKON.items():
    open(os.path.join(KOK, "favicon-%d.png" % n), "wb").write(base64.b64decode(b64))
bn = os.path.join(KOK, "_includes", "base.njk")
if os.path.isfile(bn):
    s = open(bn, encoding="utf-8").read()
    if "favicon-96.png" not in s:
        s2 = re.sub(r'<link rel="icon" href="/favicon\.ico"[^>]*>\n?', '', s)
        yeni_ikon = ('<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">\n'
                     '<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">\n'
                     '<link rel="icon" href="/favicon.ico" sizes="any">\n'
                     '<link rel="shortcut icon" href="/favicon.ico">\n')
        if 'rel="icon" type="image/png" sizes="192x192"' in s2:
            s2 = s2.replace('<link rel="icon" type="image/png" sizes="192x192"', yeni_ikon + '<link rel="icon" type="image/png" sizes="192x192"', 1)
        else:
            s2 = s2.replace("</head>", yeni_ikon + "</head>", 1)
        open(bn, "w", encoding="utf-8").write(s2)
        print("Simge etiketleri güncellendi.")

print("\nBAŞLIK DEĞİŞİKLİKLERİ:")
for slug, eski, yeni, ea, ya in rapor:
    if eski != yeni: print(" -", eski, "=>", yeni)
