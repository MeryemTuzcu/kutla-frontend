import { useState } from 'react';
import VendorList from './VendorList';
import VendorDetail from './VendorDetail';

export default function LandingPage({ vendors, favorites, onToggleFavorite, onOpenRequest, onGoTaleplerim, onVendorEnter }) {
  const [viewingVendorId, setViewingVendorId] = useState(null);
  const viewingVendor = vendors.find((v) => v.id === viewingVendorId);

  return (
<div className="min-h-screen bg-slate-50 font-sans relative overflow-hidden">      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none" />

      {/* Üst utility bar — her zaman erişilebilir */}
      <div className="relative z-10 flex justify-end gap-3 px-6 pt-5 max-w-6xl mx-auto">
       <button
          onClick={() => { localStorage.clear(); window.location.reload(); }}
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 bg-white/80 hover:bg-white border border-slate-200/80 shadow-sm px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5"
          title="Tüm mekan ve talep verilerini başlangıç durumuna döndürür"
        >
          <span>↺</span> Demoyu Sıfırla
        </button>
        <button onClick={onGoTaleplerim} className="text-sm font-semibold text-slate-500 hover:text-rose-500 transition-colors px-3 py-2">
          📋 Taleplerim
        </button>
        <button onClick={onVendorEnter} className="text-sm font-semibold text-slate-500 hover:text-rose-500 transition-colors px-3 py-2">
          🏢 Firma Girişi
        </button>
      </div>

      <header className="max-w-3xl mx-auto text-center pt-10 pb-10 px-6 relative z-10">
        <div className="inline-block px-4 py-1.5 mb-5 rounded-full bg-rose-100 text-rose-600 font-semibold text-sm border border-rose-200 shadow-sm animate-[fadeInUp_0.4s_ease-out_backwards]">
          🚀 Kutla.com — Etkinlik Pazar Yeri
        </div>
        <h1
          className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight mb-4 animate-[fadeInUp_0.4s_ease-out_backwards]"
          style={{ animationDelay: '0.05s' }}
        >
          Kutlamalarınız İçin{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
            Mükemmel Uyum
          </span>
        </h1>
        <p
          className="text-slate-600 mb-8 max-w-xl mx-auto animate-[fadeInUp_0.4s_ease-out_backwards]"
          style={{ animationDelay: '0.1s' }}
        >
          Mekanı seç, talebini gönder, firma onaylasın. Aklında belli bir yer yoksa, direkt genel bir talep de oluşturabilirsin.
        </p>
        <button
          onClick={() => onOpenRequest(null)}
          className="px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/30 hover:-translate-y-1 transition-all animate-[fadeInUp_0.4s_ease-out_backwards]"
          style={{ animationDelay: '0.15s' }}
        >
          📝 İlk Talebinizi Oluşturun
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20 relative z-10">
        {viewingVendor ? (
          <VendorDetail vendor={viewingVendor} onBack={() => setViewingVendorId(null)} onRequest={onOpenRequest} />
        ) : (
          <VendorList vendors={vendors} favorites={favorites} onToggleFavorite={onToggleFavorite} onViewVendor={setViewingVendorId} />
        )}
      </main>
    </div>
  );
}