import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

export default function TaskList({ tasks, setTasks, showToast, customerName, setCustomerName, vendors, onNewRequest }) {
  const [confirmTarget, setConfirmTarget] = useState(null);

  const myTasks = tasks.filter(
    (t) => t.customerName.trim().toLocaleLowerCase('tr-TR') === customerName.trim().toLocaleLowerCase('tr-TR')
  );

  const confirmCancel = () => {
    setTasks(tasks.filter((t) => t.id !== confirmTarget.id));
    showToast(confirmTarget.status === 'Fiyat Bekleniyor' ? 'Talebiniz iptal edildi.' : 'Kayıt silindi.', 'error');
    setConfirmTarget(null);
  };

  const statusStyle = {
    'Fiyat Bekleniyor': 'bg-amber-50 text-amber-600 border-amber-200',
    'Anlaşıldı': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    'Reddedildi': 'bg-red-50 text-red-600 border-red-200',
  };

  const vendorLabel = (task) => {
    if (task.vendorId === 'ALL') return '🌐 Tüm Firmalara Gönderildi';
    const v = vendors.find((v) => v.id === task.vendorId);
    return v ? v.name : 'Bilinmeyen Mekan';
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">📋 Taleplerim</h2>
        {onNewRequest && (
          <button
            onClick={() => onNewRequest(null)}
            className="w-full sm:w-auto px-5 py-2.5 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 text-sm text-center shadow-sm"
          >
            + Yeni Talep
          </button>
        )}
      </div>

      {!customerName.trim() ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500 p-6">
          <p>Taleplerinizi görmek için önce bir talep oluşturup adınızı girin.</p>
          {setCustomerName && (
            <button
              onClick={() => setCustomerName('Ayşe Yılmaz')}
              className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-colors"
            >
              👤 Örnek müşteriyle gör (Ayşe Yılmaz)
            </button>
          )}
        </div>
      ) : myTasks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400 p-6">
          Henüz bir talebiniz bulunmuyor.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {myTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-all"
            >
              <div className="w-full sm:w-auto">
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-800">{vendorLabel(task)}</h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Tarih: {task.eventDate} | Davetli: {task.guestCount} | Bütçe: {task.budget.toLocaleString('tr-TR')} TL
                  {task.priority && ` | Öncelik: ${task.priority}`}
                </p>
                {task.note && <p className="text-slate-400 text-xs sm:text-sm mt-1 italic">"{task.note}"</p>}
                <span className={`inline-block mt-3 px-3 py-1 text-xs font-bold rounded-full border ${statusStyle[task.status]}`}>
                  {task.status}
                </span>
              </div>
              <button
                onClick={() => setConfirmTarget(task)}
                className="w-full sm:w-auto px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 text-sm text-center"
              >
                {task.status === 'Fiyat Bekleniyor' ? 'Talebi İptal Et' : 'Kaydı Sil'}
              </button>
            </div>
          ))}
        </div>
      )}

      {confirmTarget && (
        <ConfirmModal
          title="Talebi Silmek İstediğinize Emin Misiniz?"
          message={`${vendorLabel(confirmTarget)} için oluşturduğunuz talep kalıcı olarak silinecek.`}
          onConfirm={confirmCancel}
          onCancel={() => setConfirmTarget(null)}
        />
      )}
    </div>
  );
}