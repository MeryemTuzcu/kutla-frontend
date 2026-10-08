export default function VendorProfileCard({ vendor, editable, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="relative h-56 bg-slate-100 flex items-center justify-center text-8xl">
        {vendor.img}
        <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-bold shadow-sm flex items-center gap-1">
          ⭐ {(vendor.rating || 5.0).toFixed(1)}
        </span>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">{vendor.name}</h2>
            <p className="text-rose-400 text-sm font-semibold mt-1">{vendor.category} · {vendor.district}</p>
          </div>
          {editable && (
            <div className="flex gap-2">
              <button onClick={onEdit} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold hover:bg-slate-200 text-sm">✏️ Düzenle</button>
              <button onClick={onDelete} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 text-sm">🗑️ Sil</button>
            </div>
          )}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <li className="bg-slate-50 rounded-xl p-3 text-sm text-slate-600">✓ {vendor.capacity} kişiye kadar kapasite</li>
          <li className="bg-slate-50 rounded-xl p-3 text-sm text-slate-600">✓ {vendor.district} bölgesinde konum</li>
          <li className="bg-slate-50 rounded-xl p-3 text-sm text-slate-600">✓ {(vendor.rating || 5.0).toFixed(1)} ortalama değerlendirme</li>
        </ul>

        <div className="flex justify-between items-center bg-slate-50 rounded-xl p-4">
          <span className="text-slate-500 text-sm">Başlangıç fiyatı</span>
          <span className="text-xl font-bold text-rose-500">₺{vendor.price.toLocaleString('tr-TR')}</span>
        </div>
      </div>
    </div>
  );
}