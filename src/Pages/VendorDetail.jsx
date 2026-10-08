import VendorProfileCard from './VendorProfileCard';

export default function VendorDetail({ vendor, onBack, onRequest }) {
  return (
    <div className="max-w-2xl mx-auto animate-[fadeInUp_0.3s_ease-out_backwards]">
      <button onClick={onBack} className="text-slate-500 font-semibold text-sm mb-4 hover:text-rose-500 transition-colors">
        ← Mekanlara Dön
      </button>

      <VendorProfileCard vendor={vendor} />

      <button
        onClick={() => onRequest(vendor.id)}
        className="w-full mt-6 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:-translate-y-1 transition-all text-lg"
      >
        Bu Mekan İçin Talep Oluştur
      </button>
    </div>
  );
}