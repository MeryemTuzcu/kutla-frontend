import { useState } from 'react';
import { isDoubleBooked } from '../utils/rules';
import { CATEGORIES } from '../utils/categories';
import { EMOJI_OPTIONS } from '../utils/emojiOptions';
import VendorProfileCard from './VendorProfileCard';
import ConfirmModal from '../Components/ConfirmModal';

const emptyForm = { name: '', district: '', category: 'Düğün', capacity: '', price: '', img: '🏛️' };

export default function VendorDashboard({ vendors, setVendors, tasks, setTasks, showToast }) {
  const [activeVendorId, setActiveVendorId] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [confirmDeleteTask, setConfirmDeleteTask] = useState(null);
  const [confirmDeleteVendor, setConfirmDeleteVendor] = useState(false);

  const activeVendorIdNum = Number(activeVendorId);
  const activeVendor = vendors.find((v) => v.id === activeVendorIdNum);

  const vendorTasks = tasks.filter(
    (t) => t.vendorId === activeVendorIdNum || (t.vendorId === 'ALL' && !(t.dismissedBy || []).includes(activeVendorIdNum))
  );

  const handleStatusUpdate = (task, newStatus) => {
    if (newStatus === 'Anlaşıldı') {
      if (isDoubleBooked(tasks, activeVendorIdNum, task.eventDate, task.id)) {
        return showToast('İşlem Reddedildi: Mekan o tarihte başka bir etkinliğe zaten ayrılmış!', 'error');
      }
      setTasks(tasks.map((t) => (t.id === task.id ? { ...t, vendorId: activeVendorIdNum, status: 'Anlaşıldı' } : t)));
      showToast(task.vendorId === 'ALL' ? 'Genel talebi üstlendiniz!' : 'Talep durumu "Anlaşıldı" olarak güncellendi!');
      return;
    }

    if (newStatus === 'Reddedildi' && task.vendorId === 'ALL') {
      setTasks(tasks.map((t) => (t.id === task.id ? { ...t, dismissedBy: [...(t.dismissedBy || []), activeVendorIdNum] } : t)));
      showToast('Bu talebi listenizden kaldırdınız. Diğer firmalar hâlâ görebilir.', 'error');
      return;
    }

    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)));
    showToast(`Talep durumu "${newStatus}" olarak güncellendi!`);
  };

  const confirmDeleteTaskNow = () => {
    setTasks(tasks.filter((t) => t.id !== confirmDeleteTask.id));
    showToast('Talep sistemden kaldırıldı.', 'error');
    setConfirmDeleteTask(null);
  };

  const resetForm = () => { setForm(emptyForm); setShowAddForm(false); setEditMode(false); };

  const handleAddVendor = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.district.trim() || !form.capacity || !form.price) {
      return showToast('Lütfen tüm mekan bilgilerini doldurun.', 'error');
    }
    setVendors([...vendors, { id: Date.now(), ...form, capacity: Number(form.capacity), price: Number(form.price), rating: 5.0 }]);
    showToast('Yeni mekan eklendi!');
    resetForm();
  };

  const startEdit = () => {
    if (!activeVendor) return;
    setForm({
      name: activeVendor.name, district: activeVendor.district, category: activeVendor.category,
      capacity: activeVendor.capacity, price: activeVendor.price, img: activeVendor.img,
    });
    setEditMode(true);
  };

  const handleUpdateVendor = (e) => {
    e.preventDefault();
    setVendors(vendors.map((v) => (v.id === activeVendor.id ? { ...v, ...form, capacity: Number(form.capacity), price: Number(form.price) } : v)));
    showToast('Mekan bilgileri güncellendi!');
    resetForm();
  };

  const confirmDeleteVendorNow = () => {
    setVendors(vendors.filter((v) => v.id !== activeVendor.id));
    setActiveVendorId('');
    showToast('Mekan silindi.', 'error');
    setConfirmDeleteVendor(false);
  };

  const vendorFormFields = (
    <>
      <input required placeholder="Mekan Adı" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-3 rounded-xl" />
      <input required placeholder="İlçe" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className="border p-3 rounded-xl" />
      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border p-3 rounded-xl">
        {CATEGORIES.filter((c) => c.key !== 'Tümü').map((c) => <option key={c.key} value={c.key}>{c.key}</option>)}
      </select>
      <input required type="number" placeholder="Kapasite" min="1" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="border p-3 rounded-xl" />
      <input required type="number" placeholder="Başlangıç Fiyatı (TL)" min="1000" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border p-3 rounded-xl" />

      <div className="md:col-span-3">
        <label className="text-xs font-semibold text-slate-500 mb-2 block">Görsel (emoji seçin)</label>
        <div className="flex flex-wrap gap-2">
          {EMOJI_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setForm({ ...form, img: emoji })}
              className={`w-11 h-11 flex items-center justify-center text-2xl rounded-xl border-2 transition-all ${
                form.img === emoji ? 'border-rose-500 bg-rose-50 scale-110' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-3xl font-extrabold text-slate-800">🏢 Firma Yönetim Paneli</h2>
        <div className="flex gap-3">
          <button
            onClick={() => { setShowAddForm((s) => !s); setEditMode(false); setForm(emptyForm); }}
            className="bg-rose-500 text-white font-semibold px-4 py-3 rounded-xl shadow-md hover:bg-rose-600"
          >
            + Yeni Mekan Ekle
          </button>
          <select
            value={activeVendorId}
            onChange={(e) => { setActiveVendorId(e.target.value); resetForm(); }}
            className="bg-slate-900 text-white font-semibold px-4 py-3 rounded-xl shadow-md focus:ring-2 focus:ring-rose-500 outline-none"
          >
            <option value="">-- Mekanınızı Seçin --</option>
            {vendors.map((v) => <option key={v.id} value={v.id}>{v.name} Paneli</option>)}
          </select>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddVendor} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {vendorFormFields}
          <div className="md:col-span-3 flex justify-end gap-3">
            <button type="button" onClick={resetForm} className="px-6 py-2 rounded-xl font-semibold text-slate-500">Vazgeç</button>
            <button type="submit" className="px-6 py-2 bg-rose-500 text-white rounded-xl font-semibold hover:bg-rose-600">Mekanı Kaydet</button>
          </div>
        </form>
      )}

      {!activeVendorId ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
          <span className="text-6xl block mb-4">🔐</span>
          <p className="text-slate-500 text-lg font-medium">Gelen talepleri ve mekan bilgilerinizi görmek için mekanınızı seçin.</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <VendorProfileCard vendor={activeVendor} editable onEdit={startEdit} onDelete={() => setConfirmDeleteVendor(true)} />
          </div>

          {editMode && (
            <form onSubmit={handleUpdateVendor} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {vendorFormFields}
              <div className="md:col-span-3 flex justify-end gap-3">
                <button type="button" onClick={resetForm} className="px-6 py-2 rounded-xl font-semibold text-slate-500">Vazgeç</button>
                <button type="submit" className="px-6 py-2 bg-rose-500 text-white rounded-xl font-semibold hover:bg-rose-600">Güncelle</button>
              </div>
            </form>
          )}

          <h3 className="font-bold text-slate-700 mb-4">Gelen Talepler</h3>
          <div className="grid grid-cols-1 gap-4">
            {vendorTasks.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-2xl text-slate-400">Bu mekana ait talep bulunmuyor.</div>
            ) : (
              vendorTasks.map((task) => (
                <div key={task.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-extrabold text-xl text-slate-800">{task.customerName}</h3>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${task.status === 'Anlaşıldı' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : task.status === 'Reddedildi' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                        {task.status}
                      </span>
                      {task.priority && <span className="px-2 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-500">{task.priority} öncelik</span>}
                      {task.vendorId === 'ALL' && <span className="px-2 py-1 text-xs font-bold rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">🌐 Genel Talep</span>}
                    </div>
                    <div className="text-slate-500 text-sm flex gap-3 flex-wrap">
                      <span>📅 {task.eventDate}</span>
                      <span>👥 {task.guestCount} Kişi</span>
                      <span className="text-rose-500 font-semibold">💰 {task.budget.toLocaleString('tr-TR')} TL</span>
                    </div>
                    {task.note && <p className="text-slate-400 text-sm mt-2 italic">"{task.note}"</p>}
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    {task.status !== 'Anlaşıldı' && (
                      <button onClick={() => handleStatusUpdate(task, 'Anlaşıldı')} className="flex-1 md:flex-none px-4 py-2 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 shadow-sm transition-colors">
                        Kabul Et
                      </button>
                    )}
                    {task.status !== 'Reddedildi' && (
                      <button onClick={() => handleStatusUpdate(task, 'Reddedildi')} className="flex-1 md:flex-none px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
                        {task.vendorId === 'ALL' ? 'İlgilenmiyorum' : 'Reddet'}
                      </button>
                    )}
                    <button onClick={() => setConfirmDeleteTask(task)} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors">
                      Sil
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {confirmDeleteTask && (
        <ConfirmModal
          title="Talebi Silmek İstediğinize Emin Misiniz?"
          message={`${confirmDeleteTask.customerName} adlı müşterinin talebi kalıcı olarak silinecek.`}
          onConfirm={confirmDeleteTaskNow}
          onCancel={() => setConfirmDeleteTask(null)}
        />
      )}

      {confirmDeleteVendor && activeVendor && (
        <ConfirmModal
          title="Mekanı Silmek İstediğinize Emin Misiniz?"
          message={`"${activeVendor.name}" kalıcı olarak silinecek.`}
          onConfirm={confirmDeleteVendorNow}
          onCancel={() => setConfirmDeleteVendor(false)}
        />
      )}
    </div>
  );
}