import { useState } from 'react';
import { isBudgetTooLow, isCapacityExceeded, isDuplicatePending } from '../utils/rules';

export default function CreateTask({ vendors, tasks, setTasks, showToast, onSuccess, customerName, setCustomerName, preselectedVendorId }) {
  // İsim alanı artık yerel: global kimlik sadece başarılı gönderimde güncellenir,
  // böylece yazarken "Taleplerim" filtresi bozulup eski talepler kaybolmuyor.
  const [localName, setLocalName] = useState(customerName);
  const [formData, setFormData] = useState({
    vendorId: preselectedVendorId ?? 'ALL',
    eventDate: '', guestCount: '', budget: '', priority: 'Orta', note: '',
  });

  const isGeneral = formData.vendorId === 'ALL';
  const selectedVendor = vendors.find((v) => v.id === Number(formData.vendorId));

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = localName.trim();
    if (!trimmedName) return showToast('Lütfen önce adınızı girin.', 'error');

    const budget = Number(formData.budget);
    const guests = Number(formData.guestCount);

    if (isBudgetTooLow(budget)) return showToast('Bütçe 1000 TL altında olamaz!', 'error');

    if (!isGeneral && isCapacityExceeded(selectedVendor, guests)) {
      return showToast(`Kapasite aşıldı! ${selectedVendor.name} en fazla ${selectedVendor.capacity} kişi alabilir.`, 'error');
    }

    const vendorId = isGeneral ? 'ALL' : Number(formData.vendorId);
    if (isDuplicatePending(tasks, vendorId, trimmedName)) {
      return showToast(isGeneral ? 'Zaten bekleyen bir genel talebiniz var!' : 'Bu mekana zaten bekleyen bir talebiniz var!', 'error');
    }

    setTasks([
      {
        id: Date.now(),
        vendorId,
        customerName: trimmedName,
        eventDate: formData.eventDate,
        guestCount: guests,
        budget,
        priority: formData.priority,
        note: formData.note.trim(),
        status: 'Fiyat Bekleniyor',
        dismissedBy: [],
      },
      ...tasks,
    ]);

    setCustomerName(trimmedName); // kimlik sadece burada, başarılı gönderimde güncellenir
    showToast(isGeneral ? 'Genel talebiniz tüm firmalara iletildi!' : 'Talebiniz firmaya başarıyla iletildi!');
    onSuccess();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">✨ Yeni Etkinlik Talebi Oluştur</h2>
      {isGeneral ? (
        <p className="text-sm text-slate-500 mb-6">Talebiniz <span className="font-semibold text-rose-500">tüm firmalara</span> gönderilecek, ilk uygun olan sizinle iletişime geçecek.</p>
      ) : (
        <p className="text-sm text-slate-500 mb-6"><span className="font-semibold text-rose-500">{selectedVendor?.name}</span> için talep oluşturuyorsunuz.</p>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-semibold text-slate-500 mb-1">Mekan Seçimi</label>
          <select required value={formData.vendorId} onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })} className="border p-3 rounded-xl">
            <option value="ALL">🌐 Tüm Firmalara Gönder (Genel Talep)</option>
            {vendors.map((v) => <option key={v.id} value={v.id}>{v.name} ({v.district} · Kap: {v.capacity})</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-500 mb-1">Adınız Soyadınız</label>
          <input type="text" required value={localName} onChange={(e) => setLocalName(e.target.value)} className="border p-3 rounded-xl" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-500 mb-1">Etkinlik Tarihi</label>
          <input type="date" min={today} required value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} className="border p-3 rounded-xl" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-500 mb-1">Davetli Sayısı</label>
          <input type="number" required min="1" value={formData.guestCount} onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })} className="border p-3 rounded-xl" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-500 mb-1">Tahmini Bütçe (TL)</label>
          <input type="number" required min="1000" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="border p-3 rounded-xl" />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-semibold text-slate-500 mb-1">Öncelik</label>
          <div className="flex gap-3">
            {['Düşük', 'Orta', 'Yüksek'].map((p) => (
              <button type="button" key={p} onClick={() => setFormData({ ...formData, priority: p })} className={`flex-1 py-2 rounded-xl font-semibold text-sm border transition-colors ${formData.priority === p ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-slate-600 border-slate-200'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-semibold text-slate-500 mb-1">Not (opsiyonel)</label>
          <textarea
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            placeholder="Örn: Açık alan tercih ederim, akşam saatleri uygun"
            rows={3}
            className="border p-3 rounded-xl resize-none"
          />
        </div>

        <div className="md:col-span-2 flex justify-end mt-2">
          <button type="submit" className="px-8 py-3 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600">Talebi Gönder</button>
        </div>
      </form>
    </div>
  );
}