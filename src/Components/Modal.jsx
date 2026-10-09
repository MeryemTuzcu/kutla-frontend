import { useEffect } from 'react';

export default function Modal({ onClose, children }) {
  // ESC tuşuyla kapanır
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-[fadeInUp_0.2s_ease-out_backwards]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90dvh] overflow-y-auto relative animate-[modalIn_0.25s_ease-out_backwards]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold z-10"
          aria-label="Kapat"
        >
          ✕
        </button>
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}