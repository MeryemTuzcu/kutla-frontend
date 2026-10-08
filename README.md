# Kutla.com — Etkinlik Pazar Yeri🎉

Düğün, nişan, iş yemeği, doğum günü ve yılbaşı etkinlikleri için **mekan keşfetme ve teklif isteme** platformunun React önyüzü. Müşteriler mekanları gezip talep gönderir, firmalar kendi panellerinden gelen talepleri yönetir.

🔗 **Canlı demo:** [kutlacom.netlify.app](https://kutlacom.netlify.app)

![Ana sayfa](docs/screenshots/01-katalog.png)

## ✨ Neler yapabilirsiniz?

### 👤 Müşteri olarak
- Mekanları **kategoriye** (Düğün, Nişan, İş Yemeği, Doğum Günü, Yılbaşı), **ilçeye** ve **bütçeye** göre filtreleyin
- Beğendiğiniz mekanları ❤️ ile **favorilere** ekleyin
- Bir mekanın tanıtım sayfasını inceleyip **o mekan için talep oluşturun**
- Aklınızda mekan yoksa **Genel Talep** gönderin: talebiniz tüm firmalara iletilir, ilk uygun olan üstlenir
- **Taleplerim** ekranından durumu (Fiyat Bekleniyor / Anlaşıldı / Reddedildi) takip edin, isterseniz iptal edin

### 🏢 Firma olarak
- Firma girişinden mekanınızı seçip kendi profil kartınızı görün
- Mekan bilgilerinizi **düzenleyin**, yeni mekan **ekleyin**, mekanı **silin**
- Size gelen talepleri **kabul edin veya reddedin**
- Aynı mekan ve tarih için ikinci bir onay verilmeye çalışılırsa sistem **çifte rezervasyonu engeller**

## 🔄 CRUD işlemleri nerede?

| İşlem | Müşteri tarafı | Firma tarafı |
|-------|----------------|--------------|
| **Ekle** | Yeni talep oluşturma (pop-up form) | Yeni mekan ekleme |
| **Listele** | Mekan kataloğu, Taleplerim | Gelen talepler |
| **Güncelle** | — (müşteri kendi talebini onaylayamaz) | Talep durumu (Kabul / Reddet), mekan bilgileri |
| **Sil** | Talebi iptal etme | Talebi silme, mekanı silme |

Tüm silme işlemleri, tarayıcının standart kutusu yerine kendi tasarladığımız onay penceresinden geçer.

## 🛠️ Teknolojiler
- **React** (Vite ile)
- **Tailwind CSS**
- **localStorage** — veriler tarayıcıda saklanır, sunucu gerekmez

## 📁 Klasör yapısı
```
src/
├── App.jsx                  # Ana akış: ana sayfa / müşteri / firma modları
├── Pages/
│   ├── LandingPage.jsx      # Karşılama + mekan kataloğu
│   ├── VendorList.jsx       # Kategori çubuğu, filtreler, mekan kartları
│   ├── VendorDetail.jsx     # Mekan tanıtım sayfası
│   ├── VendorProfileCard.jsx# Profil kartı (müşteri ve firma panelinde ortak)
│   ├── CreateTask.jsx       # Talep oluşturma formu
│   └── VendorDashboard.jsx  # Firma paneli
├── Components/
│   ├── Modal.jsx            # Genel pop-up
│   ├── ConfirmModal.jsx     # Silme onay penceresi
│   └── TaskList.jsx         # Taleplerim listesi
└── utils/                   # İş kuralları, kategoriler, emoji listesi
```

## ⚙️ Kurulum ve çalıştırma

```bash
git clone https://github.com/MeryemTuzcu/kutla-frontend.git
cd kutla-frontend
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini açın. Yayın için `npm run build` komutu `dist` klasörünü üretir.

## 🧪 Denemek için senaryolar

1. **Çifte rezervasyon engeli:** Firma Girişi → *Fındıksuyu Cam Bahçe* → *Can Öztürk*'ün bekleyen talebini **Kabul Et**'e basın. Aynı tarihte *Ayşe Yılmaz* ile anlaşma olduğu için işlem reddedilir.
2. **Genel talep:** Firma Girişi → herhangi bir mekan → 🌐 rozetli *Fatma Çelik* talebini **Kabul Et** ile üstlenin. Talep o firmaya kilitlenir ve diğer firmaların panelinden kaybolur. **İlgilenmiyorum** derseniz sadece sizin listenizden kalkar.
3. **Müşteri akışı:** Ana sayfada **İlk Talebinizi Oluşturun** → formu doldurun → **Taleplerim**'de takip edin. Hazır örnek talepleri görmek için adınızı *Ayşe Yılmaz* yazabilirsiniz.
4. **Mekan yönetimi:** Firma Girişi → **+ Yeni Mekan Ekle** ile emoji seçerek yeni mekan oluşturun, ana sayfada kataloğa eklendiğini görün.

## 💾 Veriler nerede tutuluyor?
Tüm veriler tarayıcının **localStorage** alanında saklanır. Her ziyaretçi örnek verilerle başlar, yaptığı değişiklikler sadece kendi tarayıcısında kalır. Başlangıç verilerine dönmek için tarayıcı konsolunda `localStorage.clear()` yazıp sayfayı yenileyin.
