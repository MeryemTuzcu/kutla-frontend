import { useState } from 'react';
import VendorList from './VendorList';
import VendorDetail from './VendorDetail';

export default function LandingPage({ vendors, favorites, onToggleFavorite, onOpenRequest, onGoTaleplerim, onVendorEnter, onResetRequest }) {
  const [viewingVendorId, setViewingVendorId] = useState(null);
  const viewingVendor = vendors.find((v) => v.id === viewingVendorId);

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-hidden">
      <style>{`
        @keyframes confettiTwinkle {
          0%, 100% {
            opacity: 0;
            scale: 0.3;
          }
          50% {
            opacity: 1;
            scale: 1.15;
          }
        }
        .confetti-spark {
          animation-name: confettiTwinkle;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          animation-iteration-count: infinite;
        }
                  @media (prefers-reduced-motion: reduce) {
          .confetti-spark { animation: none; opacity: 0.7; }
        }
      `}</style>

      {/* 1. SOL ÜST: ANA IŞIK VE ETRAFINDA CANLI PARILDAYAN KONFETİLER              */}
      <div className="absolute -top-16 -left-16 w-52 h-52 md:w-80 md:h-80 bg-rose-400/25 rounded-full filter blur-3xl pointer-events-none" />

      {/* Yan dönmüş fuşya şerit pul */}
      <div
        className="confetti-spark absolute top-12 left-32 md:left-48 w-3 h-1.5 bg-fuchsia-500 rounded-xs rotate-45 pointer-events-none shadow-xs shadow-fuchsia-500/40"
        style={{ animationDuration: '2.4s', animationDelay: '200ms' }}
      />
      {/* Minik sarı ışıltı */}
      <div
        className="confetti-spark absolute top-24 left-44 md:left-64 w-2.5 h-2.5 bg-amber-400 rounded-full pointer-events-none shadow-xs shadow-amber-400/40"
        style={{ animationDuration: '3s', animationDelay: '700ms' }}
      />
      {/* Dikey pembe yaprak pul */}
      <div
        className="confetti-spark absolute top-36 left-28 md:left-40 w-1.5 h-3 bg-rose-500 rounded-xs -rotate-12 pointer-events-none shadow-xs shadow-rose-500/40"
        style={{ animationDuration: '2.1s', animationDelay: '1100ms' }}
      />
      {/* Aşağıya süzülen mercan nokta */}
      <div
        className="confetti-spark absolute top-48 left-16 md:left-24 w-2 h-2 bg-rose-400 rounded-full pointer-events-none"
        style={{ animationDuration: '2.8s', animationDelay: '400ms' }}
      />
      {/* İçe doğru uzanan canlı turuncu mikro pul */}
      <div
        className="confetti-spark absolute top-16 left-56 md:left-80 w-3 h-1.5 bg-orange-500 rounded-xs rotate-28 pointer-events-none shadow-xs shadow-orange-500/40"
        style={{ animationDuration: '3.4s', animationDelay: '900ms' }}
      />
      {/* Derin mavi/mor parıltı */}
      <div
        className="confetti-spark absolute top-8 left-48 md:left-72 w-2 h-2 bg-indigo-500 rounded-full pointer-events-none shadow-xs shadow-indigo-500/40"
        style={{ animationDuration: '2.2s', animationDelay: '1300ms' }}
      />
      {/* Yatay altın sarısı konfeti şeridi */}
      <div
        className="confetti-spark absolute top-28 left-16 md:left-28 w-3.5 h-1.5 bg-amber-400 rounded-xs rotate-12 pointer-events-none shadow-xs shadow-amber-400/40"
        style={{ animationDuration: '2.7s', animationDelay: '500ms' }}
      />
      {/* Minik fuşya zerrecik */}
      <div
        className="confetti-spark absolute top-60 left-32 md:left-48 w-2 h-2 bg-pink-500 rounded-full pointer-events-none"
        style={{ animationDuration: '3.2s', animationDelay: '800ms' }}
      />
      {/* Çapraz duran mini fuşya pul */}
      <div
        className="confetti-spark absolute top-40 left-52 md:left-72 w-2.5 h-1.5 bg-fuchsia-400 rounded-xs -rotate-45 pointer-events-none shadow-xs shadow-fuchsia-400/40"
        style={{ animationDuration: '2.5s', animationDelay: '150ms' }}
      />

      {/* 2. SAĞ ALT: ANA IŞIK VE ETRAFINDA CANLI PARILDAYAN KONFETİLER              */}
      <div className="absolute -bottom-16 -right-16 w-52 h-52 md:w-80 md:h-80 bg-orange-300/25 rounded-full filter blur-3xl pointer-events-none" />

      {/* Yukarı doğru fırlamış turuncu pul */}
      <div
        className="confetti-spark absolute bottom-32 right-36 md:right-56 w-3 h-1.5 bg-orange-500 rounded-xs -rotate-45 pointer-events-none shadow-xs shadow-orange-500/40"
        style={{ animationDuration: '2.6s', animationDelay: '300ms' }}
      />
      {/* Süzülen amber nokta */}
      <div
        className="confetti-spark absolute bottom-44 right-20 md:right-36 w-2.5 h-2.5 bg-amber-400 rounded-full pointer-events-none shadow-xs shadow-amber-400/40"
        style={{ animationDuration: '3.1s', animationDelay: '800ms' }}
      />
      {/* Pembe yatay yaprak */}
      <div
        className="confetti-spark absolute bottom-20 right-48 md:right-72 w-3 h-1.5 bg-rose-500 rounded-xs rotate-12 pointer-events-none shadow-xs shadow-rose-500/40"
        style={{ animationDuration: '2.2s', animationDelay: '1200ms' }}
      />
      {/* İç boşluğa süzülen fuşya zerrecik */}
      <div
        className="confetti-spark absolute bottom-52 right-40 md:right-60 w-2 h-2 bg-fuchsia-400 rounded-full pointer-events-none shadow-xs shadow-fuchsia-400/40"
        style={{ animationDuration: '2.9s', animationDelay: '500ms' }}
      />
      {/* Canlı sıcak mercan pul */}
      <div
        className="confetti-spark absolute bottom-24 right-28 md:right-44 w-3.5 h-1.5 bg-rose-600 rounded-xs rotate-32 pointer-events-none shadow-xs shadow-rose-600/40"
        style={{ animationDuration: '2.3s', animationDelay: '650ms' }}
      />
      {/* Yukarı tırmanan sarı nokta */}
      <div
        className="confetti-spark absolute bottom-60 right-28 md:right-48 w-2 h-2 bg-amber-400 rounded-full pointer-events-none"
        style={{ animationDuration: '3.3s', animationDelay: '950ms' }}
      />
      {/* İnce dikey altın şerit */}
      <div
        className="confetti-spark absolute bottom-40 right-56 md:right-80 w-1.5 h-3 bg-amber-500 rounded-xs -rotate-15 pointer-events-none shadow-xs shadow-amber-500/40"
        style={{ animationDuration: '2.5s', animationDelay: '150ms' }}
      />
      {/* Kenarda asılı kalan minik pembe pırıltı */}
      <div
        className="confetti-spark absolute bottom-16 right-64 md:right-96 w-2 h-2 bg-pink-500 rounded-full pointer-events-none"
        style={{ animationDuration: '2.8s', animationDelay: '1100ms' }}
      />

      {/* Üst utility bar — Mobilde tamamen gizli, masaüstünde görünür */}
      <div className="hidden md:flex relative z-10 justify-end gap-3 px-6 pt-5 max-w-6xl mx-auto">

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
      <footer className="relative z-10 text-center px-6 pb-10 text-xs text-slate-500 space-y-2">
        <p>Bu bir demo uygulamadır; mekanlar, puanlar ve görseller örnek amaçlıdır.</p>
        <button onClick={onResetRequest} className="hover:text-rose-500 transition-colors">
          ↺ Demo verilerini sıfırla
        </button>
      </footer>
    </div>
  );
}