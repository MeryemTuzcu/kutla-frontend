import Modal from './Modal';

export default function ConfirmModal({ title, message, confirmLabel = 'Evet, Sil', onConfirm, onCancel }) {
  return (
    <Modal onClose={onCancel}>
      <div className="text-center">
        <span className="text-5xl block mb-4">⚠️</span>
        <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={onCancel} className="px-6 py-2.5 rounded-xl font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200">
            Vazgeç
          </button>
          <button onClick={onConfirm} className="px-6 py-2.5 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600">
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}