import { useState } from 'react';
import VendorList from './VendorList';
import VendorDetail from './VendorDetail';

export default function LandingPage({ vendors, favorites, onToggleFavorite, onOpenRequest, onGoTaleplerim, onVendorEnter }) {
  const [viewingVendorId, setViewingVendorId] = useState(null);
  const viewingVendor = vendors.find((v) => v.id === viewingVendorId);

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. SOL ÜST: ANA IŞIK VE ETRAFINA ASİMETRİK SAÇILAN CANLI KONFETİLER        */}
      {/* ========================================================================= */}
      <div className="absolute -top-16 -left-16 w-52 h-52 md:w-80 md:h-80 bg-rose-400/25 rounded-full filter blur-3xl pointer-events-none" />

      {/* Yan dönmüş fuşya şerit pul */}
      <div
        className="absolute top-12 left-32 md:left-48 w-3 h-1.5 bg-fuchsia-400/60 rounded-xs rotate-45 pointer-events-none animate-pulse blur-[0.5px]"
        style={{ animationDuration: '2.4s', animationDelay: '200ms' }}
      />
      {/* Minik pastel sarı ışıltı */}
      <div
        className="absolute top-24 left-44 md:left-64 w-2 h-2 bg-amber-300/70 rounded-full pointer-events-none animate-pulse blur-[0.5px]"
        style={{ animationDuration: '3s', animationDelay: '700ms' }}
      />
      {/* Dikey pembe yaprak pul */}
      <div
        className="absolute top-36 left-28 md:left-40 w-1.5 h-3 bg-rose-400/55 rounded-xs -rotate-12 pointer-events-none animate-pulse blur-[0.5px]"
        style={{ animationDuration: '2.1s', animationDelay: '1100ms' }}
      />
      {/* Aşağıya süzülen minik gül kurusu nokta */}
      <div
        className="absolute top-48 left-16 md:left-24 w-2 h-2 bg-rose-300/60 rounded-full pointer-events-none animate-pulse"
        style={{ animationDuration: '2.8s', animationDelay: '400ms' }}
      />
      {/* İçe doğru uzanan hafif turuncu mikro pul */}
      <div
        className="absolute top-16 left-56 md:left-80 w-2.5 h-1.5 bg-orange-300/50 rounded-xs rotate-28 pointer-events-none animate-pulse blur-[0.5px]"
        style={{ animationDuration: '3.4s', animationDelay: '900ms' }}
      />
      {/* Canlı minik mor parıltı (yeni) */}
      <div
        className="absolute top-8 left-48 md:left-72 w-1.5 h-1.5 bg-indigo-400/65 rounded-full pointer-events-none animate-pulse"
        style={{ animationDuration: '2.2s', animationDelay: '1300ms' }}
      />
      {/* İnce yatay altın sarısı konfeti çubuğu (yeni) */}
      <div
        className="absolute top-28 left-16 md:left-28 w-3.5 h-1 bg-amber-400/60 rounded-xs rotate-12 pointer-events-none animate-pulse blur-[0.5px]"
        style={{ animationDuration: '2.7s', animationDelay: '500ms' }}
      />
      {/* Aşağı doğru savrulan minik pembe zerrecik (yeni) */}
      <div
        className="absolute top-60 left-32 md:left-48 w-2 h-2 bg-pink-400/55 rounded-full pointer-events-none animate-pulse blur-[0.5px]"
        style={{ animationDuration: '3.2s', animationDelay: '800ms' }}
      />
      {/* Çapraz duran mini fuşya pul (yeni) */}
      <div
        className="absolute top-40 left-52 md:left-72 w-2.5 h-1.5 bg-fuchsia-300/60 rounded-xs -rotate-45 pointer-events-none animate-pulse blur-[0.5px]"
        style={{ animationDuration: '2.5s', animationDelay: '150ms' }}
      />

      {/* ========================================================================= */}
      {/* 2. SAĞ ALT: ANA IŞIK VE ETRAFINA ASİMETRİK SAÇILAN CANLI KONFETİLER        */}
      {/* ========================================================================= */}
      <div className="absolute -bottom-16 -right-16 w-52 h-52 md:w-80 md:h-80 bg-orange-300/25 rounded-full filter blur-3xl pointer-events-none" />

      {/* Yukarı doğru fırlamış turuncu pul */}
      <div
        className="absolute bottom-32 right-36 md:right-56 w-3 h-1.5 bg-orange-400/55 rounded-xs -rotate-45 pointer-events-none animate-pulse blur-[0.5px]"
        style={{ animationDuration: '2.6s', animationDelay: '300ms' }}
      />
      {/* Süzülen sarı nokta */}
      <div
        className="absolute bottom-44 right-20 md:right-36 w-2 h-2 bg-amber-400/60 rounded-full pointer-events-none animate-pulse"
        style={{ animationDuration: '3.1s', animationDelay: '800ms' }}
      />
      {/* Pembe yatay yaprak */}
      <div
        className="absolute bottom-20 right-48 md:right-72 w-2.5 h-1.5 bg-rose-400/50 rounded-xs rotate-12 pointer-events-none animate-pulse blur-[0.5px]"
        style={{ animationDuration: '2.2s', animationDelay: '1200ms' }}
      />
      {/* İç boşluğa süzülen fuşya zerrecik */}
      <div
        className="absolute bottom-52 right-40 md:right-60 w-1.5 h-1.5 bg-fuchsia-300/60 rounded-full pointer-events-none animate-pulse blur-[0.5px]"
        style={{ animationDuration: '2.9s', animationDelay: '500ms' }}
      />
      {/* Canlı sıcak mercan pul (yeni) */}
      <div
        className="absolute bottom-24 right-28 md:right-44 w-3 h-1.5 bg-rose-500/55 rounded-xs rotate-32 pointer-events-none animate-pulse blur-[0.5px]"
        style={{ animationDuration: '2.3s', animationDelay: '650ms' }}
      />
      {/* Yukarı tırmanan minik amber nokta (yeni) */}
      <div
        className="absolute bottom-60 right-28 md:right-48 w-2 h-2 bg-amber-300/65 rounded-full pointer-events-none animate-pulse blur-[0.5px]"
        style={{ animationDuration: '3.3s', animationDelay: '950ms' }}
      />
      {/* İnce dikey altın şerit (yeni) */}
      <div
        className="absolute bottom-40 right-56 md:right-80 w-1 h-3 bg-yellow-400/55 rounded-xs -rotate-15 pointer-events-none animate-pulse blur-[0.5px]"
        style={{ animationDuration: '2.5s', animationDelay: '150ms' }}
      />
      {/* Kenarda asılı kalan minik pembe ışıltı (yeni) */}
      <div
        className="absolute bottom-16 right-64 md:right-96 w-1.5 h-1.5 bg-pink-400/60 rounded-full pointer-events-none animate-pulse"
        style={{ animationDuration: '2.8s', animationDelay: '1100ms' }}
      />

      {/* Üst utility bar — Mobilde gizli, masaüstünde görünür */}
      <div className="relative z-10 flex justify-end gap-3 px-6 pt-5 max-w-6xl mx-auto">
        <button
          onClick={() => { localStorage.clear(); window.location.reload(); }}
          className="hidden md:flex text-xs font-semibold text-slate-500 hover:text-rose-600 bg-white/80 hover:bg-white border border-slate-200/80 shadow-sm px-3.5 py-1.5 rounded-full transition-all items-center gap-1.5"
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