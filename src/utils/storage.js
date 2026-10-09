// Tüm demo verileri "kutla_" önekiyle saklanır. Veri yapısı değişirse sadece
// SCHEMA sürümünü artırın: eski ziyaretçilerin tarayıcısındaki uyumsuz veri otomatik yok sayılır.
const SCHEMA = 'v5';
const key = (name) => `kutla_${SCHEMA}_${name}`;

// Bozuk / uyumsuz veri uygulamayı çökertmesin: hata olursa varsayılan değere dön.
export function loadJSON(name, fallback) {
  try {
    const raw = localStorage.getItem(key(name));
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    const sameType = typeof parsed === typeof fallback && Array.isArray(parsed) === Array.isArray(fallback);
    return sameType ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(name, value) {
  try {
    localStorage.setItem(key(name), JSON.stringify(value));
  } catch {
    // Gizli sekme / dolu kota: sessizce geç, uygulama çalışmaya devam eder.
  }
}

// Sadece bu uygulamanın anahtarlarını siler (aynı adreste çalışan diğer projeleri etkilemez).
export function resetDemoData() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith('kutla_'))
    .forEach((k) => localStorage.removeItem(k));
  window.location.reload();
}