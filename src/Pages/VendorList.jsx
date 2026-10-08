import { useMemo, useState } from 'react';
import { CATEGORIES } from '../utils/categories';

export default function VendorList({ vendors, favorites, onToggleFavorite, onViewVendor }) {
  const [category, setCategory] = useState('Tümü');
  const [showFilters, setShowFilters] = useState(false);
  const [district, setDistrict] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const districts = useMemo(() => [...new Set(vendors.map((v) => v.district))].sort(), [vendors]);

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      if (category !== 'Tümü' && v.category !== category) return false;
      if (district && v.district !== district) return false;
      if (maxBudget && v.price > Number(maxBudget)) return false;
      if (onlyFavorites && !favorites?.includes(v.id)) return false;
      return true;
    });
  }, [vendors, category, district, maxBudget, onlyFavorites, favorites]);

  const districtCount = new Set(filtered.map((v) => v.district)).size;

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-6 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`flex flex-col items-center gap-1 text-sm font-medium whitespace-nowrap pb-2 border-b-2 transition-colors ${
                category === c.key ? 'text-rose-500 border-rose-500' : 'text-slate-400 border-transparent hover:text-slate-600'
              }`}
            >
              <span className="text-xl">{c.icon}</span>
              {c.key}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOnlyFavorites((f) => !f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
              onlyFavorites ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-slate-600 border-slate-200 hover:border-rose-300'
            }`}
          >
            {onlyFavorites ? '❤️' : '🤍'} Favorilerim
          </button>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 bg-white text-slate-600 hover:border-rose-300 transition-colors"
          >
            ⚙️ Filtrele
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 flex flex-wrap gap-4 items-end animate-[fadeInUp_0.25s_ease-out_backwards]">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 mb-1">İlçe</label>
            <select value={district} onChange={(e) => setDistrict(e.target.value)} className="border p-2 rounded-xl text-sm">
              <option value="">Tümü</option>
              {districts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 mb-1">Maks. Bütçe (TL)</label>
            <input type="number" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} placeholder="Örn: 200000" className="border p-2 rounded-xl text-sm w-40" />
          </div>
          <button onClick={() => { setDistrict(''); setMaxBudget(''); }} className="text-sm text-rose-500 font-semibold hover:underline">
            Filtreleri Temizle
          </button>
        </div>
      )}

      <p className="text-sm text-slate-500 mb-5 font-medium">
        <span className="font-bold text-slate-800">{filtered.length} konsept</span> — {districtCount}+ lokasyonda
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((vendor, i) => (
          <div
            key={vendor.id}
            style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
            onClick={() => onViewVendor(vendor.id)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col cursor-pointer animate-[fadeInUp_0.4s_ease-out_backwards]"
          >
            <div className="relative h-40 bg-slate-100 flex items-center justify-center text-5xl">
              {vendor.img}
              <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(vendor.id); }}
                className="absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur rounded-full shadow-sm hover:scale-110 transition-transform z-10 text-sm"
                aria-label="Favorilere ekle"
              >
                {favorites?.includes(vendor.id) ? '❤️' : '🤍'}
              </button>
              <span className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur px-2 py-0.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                ⭐ {(vendor.rating || 5.0).toFixed(1)}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-slate-800 truncate">{vendor.name}</h3>
              <p className="text-slate-500 text-xs mt-1 mb-3">{vendor.category} · {vendor.district}</p>
              <div className="mt-auto">
                <p className="font-semibold text-slate-800 text-sm mb-3">
                  ₺{Math.round(vendor.price / vendor.capacity).toLocaleString('tr-TR')} <span className="text-slate-400 font-normal">/kişi</span>
                </p>
                <span className="block w-full text-center py-2.5 bg-slate-100 text-slate-800 text-sm font-bold rounded-xl group-hover:bg-rose-500">
                  Mekanı İncele
                </span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400">
            Bu kriterlere uyan mekan bulunamadı. Filtreleri değiştirmeyi deneyin.
          </div>
        )}
      </div>
    </div>
  );
}