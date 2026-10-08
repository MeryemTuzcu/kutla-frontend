import { useState, useEffect } from 'react';
import LandingPage from './Pages/LandingPage';
import CreateTask from './Pages/CreateTask';
import TaskList from './Components/TaskList';
import VendorDashboard from './Pages/VendorDashboard';
import Modal from './Components/Modal';

const DEFAULT_VENDORS = [
  { id: 1, name: 'Fındıksuyu Cam Bahçe', district: 'Sarıyer', category: 'Düğün', capacity: 400, price: 150000, rating: 5.0, reviewsCount: 48, img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Sait Halim Paşa Yalısı', district: 'Sarıyer', category: 'Düğün', capacity: 500, price: 350000, rating: 4.9, reviewsCount: 64, img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Çırağan Sarayı', district: 'Beşiktaş', category: 'Düğün', capacity: 800, price: 950000, rating: 5.0, reviewsCount: 128, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' },
  { id: 4, name: 'Thevent Söz/Nişan Evi', district: 'Sarıyer', category: 'Nişan', capacity: 100, price: 50000, rating: 4.8, reviewsCount: 32, img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80' },
  { id: 5, name: 'Mihrabat Korusu', district: 'Beykoz', category: 'Nişan', capacity: 200, price: 90000, rating: 4.7, reviewsCount: 45, img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80' },
  { id: 6, name: 'Fuat Paşa Yalısı', district: 'Sarıyer', category: 'Nişan', capacity: 250, price: 120000, rating: 4.9, reviewsCount: 57, img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80' },
  { id: 7, name: 'Frankie İstanbul', district: 'Şişli', category: 'İş Yemeği', capacity: 80, price: 40000, rating: 4.6, reviewsCount: 29, img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
  { id: 8, name: 'Sunset Grill & Bar', district: 'Beşiktaş', category: 'İş Yemeği', capacity: 120, price: 60000, rating: 4.8, reviewsCount: 86, img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80' },
  { id: 9, name: 'Vogue Restaurant', district: 'Beşiktaş', category: 'İş Yemeği', capacity: 100, price: 55000, rating: 4.7, reviewsCount: 41, img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80' },
  { id: 10, name: 'Oligark', district: 'Beşiktaş', category: 'Doğum Günü', capacity: 300, price: 100000, rating: 4.8, reviewsCount: 73, img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80' },
  { id: 11, name: 'Ruby', district: 'Beşiktaş', category: 'Doğum Günü', capacity: 250, price: 90000, rating: 4.6, reviewsCount: 54, img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80' },
  { id: 12, name: '360 Istanbul', district: 'Beyoğlu', category: 'Doğum Günü', capacity: 150, price: 75000, rating: 4.7, reviewsCount: 62, img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80' },
  { id: 13, name: 'Spago by Wolfgang Puck', district: 'Şişli', category: 'Yılbaşı', capacity: 200, price: 150000, rating: 4.9, reviewsCount: 39, img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80' },
  { id: 14, name: 'Swissôtel The Bosphorus', district: 'Beşiktaş', category: 'Yılbaşı', capacity: 400, price: 300000, rating: 4.8, reviewsCount: 95, img: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80' },
  { id: 15, name: 'Divan Brasserie', district: 'Beyoğlu', category: 'Yılbaşı', capacity: 120, price: 80000, rating: 4.7, reviewsCount: 31, img: 'https://images.unsplash.com/photo-1482575832494-771f74bf6857?auto=format&fit=crop&w=800&q=80' },
];

const DEFAULT_TASKS = [
  { id: 101, vendorId: 1, customerName: 'Ayşe Yılmaz', eventDate: '2026-11-15', guestCount: 300, budget: 180000, priority: 'Yüksek', status: 'Anlaşıldı', dismissedBy: [] },
  { id: 106, vendorId: 1, customerName: 'Can Öztürk', eventDate: '2026-11-15', guestCount: 280, budget: 170000, priority: 'Orta', status: 'Fiyat Bekleniyor', dismissedBy: [] },
  { id: 102, vendorId: 7, customerName: 'Ahmet Kara', eventDate: '2026-10-20', guestCount: 50, budget: 45000, priority: 'Orta', status: 'Fiyat Bekleniyor', dismissedBy: [] },
  { id: 103, vendorId: 10, customerName: 'Zeynep Demir', eventDate: '2026-12-05', guestCount: 200, budget: 80000, priority: 'Düşük', status: 'Reddedildi', dismissedBy: [] },
  { id: 104, vendorId: 4, customerName: 'Mehmet Aydın', eventDate: '2026-11-22', guestCount: 80, budget: 55000, priority: 'Yüksek', status: 'Fiyat Bekleniyor', dismissedBy: [] },
  { id: 105, vendorId: 13, customerName: 'Elif Şahin', eventDate: '2026-12-31', guestCount: 150, budget: 160000, priority: 'Orta', status: 'Anlaşıldı', dismissedBy: [] },
  { id: 107, vendorId: 'ALL', customerName: 'Fatma Çelik', eventDate: '2026-12-10', guestCount: 120, budget: 70000, priority: 'Orta', status: 'Fiyat Bekleniyor', dismissedBy: [] },
];

export default function App() {
  const [mode, setMode] = useState(null);
  const [toast, setToast] = useState(null);
  const [requestModal, setRequestModal] = useState({ open: false, vendorId: null });

  const [vendors, setVendors] = useState(() => {
    const saved = localStorage.getItem('kutla_vendors');
    return saved ? JSON.parse(saved) : DEFAULT_VENDORS;
  });
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kutla_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });
  const [customerName, setCustomerName] = useState(() => localStorage.getItem('kutla_customer_name') || '');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('kutla_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => localStorage.setItem('kutla_vendors', JSON.stringify(vendors)), [vendors]);
  useEffect(() => localStorage.setItem('kutla_tasks', JSON.stringify(tasks)), [tasks]);
  useEffect(() => localStorage.setItem('kutla_customer_name', customerName), [customerName]);
  useEffect(() => localStorage.setItem('kutla_favorites', JSON.stringify(favorites)), [favorites]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleFavorite = (vendorId) => {
    setFavorites((f) => (f.includes(vendorId) ? f.filter((id) => id !== vendorId) : [...f, vendorId]));
  };

  const openRequestModal = (vendorId = null) => setRequestModal({ open: true, vendorId });
  const closeRequestModal = () => setRequestModal({ open: false, vendorId: null });
  const handleRequestSuccess = () => {
    closeRequestModal();
    setMode('customer');
  };

  const goLanding = () => setMode(null);
  const goCustomerTasks = () => setMode('customer');
  const goVendorMode = () => setMode('vendor');

  const handleResetDemo = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="h-screen overflow-hidden relative">
      {toast && (
        <div className={`fixed top-6 right-6 px-6 py-3 rounded-xl shadow-lg z-[70] text-white font-semibold animate-[toastIn_0.3s_ease-out] ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}>
          {toast.message}
        </div>
      )}

      {requestModal.open && (
        <Modal onClose={closeRequestModal}>
          <CreateTask
            vendors={vendors}
            tasks={tasks}
            setTasks={setTasks}
            showToast={showToast}
            onSuccess={handleRequestSuccess}
            customerName={customerName}
            setCustomerName={setCustomerName}
            preselectedVendorId={requestModal.vendorId}
          />
        </Modal>
      )}

      {/* Landing Ekranı */}
      {mode === null && (
        <div className="h-full overflow-y-auto pb-16 md:pb-0">
          <LandingPage
            vendors={vendors}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenRequest={openRequestModal}
            onGoTaleplerim={goCustomerTasks}
            onVendorEnter={goVendorMode}
          />
        </div>
      )}

      {/* Taleplerim ve Firma Ekranları */}
      {mode !== null && (
        <div className="flex flex-col md:flex-row h-full bg-slate-50 font-sans overflow-hidden">
          {/* MASAÜSTÜ SIDEBAR (Mobilde gizli, masaüstünde sabit) */}
          <aside className="hidden md:flex w-64 bg-slate-900 text-white flex-col shadow-2xl shrink-0">
            <div className="p-6 border-b border-slate-800">
              <button onClick={goLanding} className="text-left">
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                  Kutla<span className="text-rose-500">.com</span>
                </h1>
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              <button
                onClick={goLanding}
                className="w-full text-left px-4 py-3 rounded-xl font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
              >
                🏠 Mekanlara Dön
              </button>
              <button
                onClick={goCustomerTasks}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                  mode === 'customer' ? 'bg-rose-500 shadow-md text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                📋 Taleplerim
              </button>
              <button
                onClick={goVendorMode}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                  mode === 'vendor' ? 'bg-rose-500 shadow-md text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                🏢 Firma Paneli
              </button>
            </nav>

            <div className="p-3 border-t border-slate-800">
              <button
                onClick={handleResetDemo}
                className="w-full text-xs text-slate-400 hover:text-rose-400 transition-colors text-left flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-800"
              >
                <span>↺</span> Demoyu Sıfırla
              </button>
            </div>
          </aside>

          {/* İÇERİK ALANI (Mobilde alt barın altında kalmaması için pb-24 eklendi) */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pb-24 md:pb-8">
            <div className="max-w-5xl mx-auto">
              {mode === 'customer' ? (
                <TaskList
                  tasks={tasks}
                  setTasks={setTasks}
                  showToast={showToast}
                  customerName={customerName}
                  vendors={vendors}
                  onNewRequest={openRequestModal}
                />
              ) : (
                <VendorDashboard
                  vendors={vendors}
                  setVendors={setVendors}
                  tasks={tasks}
                  setTasks={setTasks}
                  showToast={showToast}
                />
              )}
            </div>
          </main>
        </div>
      )}

      {/* MOBİL ALT NAVİGASYON BARI (Ekranın en altına sabitlenir) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <button
          onClick={goLanding}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
            mode === null ? 'text-rose-500 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <span className="text-xl">🏠</span>
          <span className="text-[10px] mt-0.5">Keşfet</span>
        </button>

        <button
          onClick={goCustomerTasks}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
            mode === 'customer' ? 'text-rose-500 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <span className="text-xl">📋</span>
          <span className="text-[10px] mt-0.5">Taleplerim</span>
        </button>

        <button
          onClick={goVendorMode}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
            mode === 'vendor' ? 'text-rose-500 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <span className="text-xl">🏢</span>
          <span className="text-[10px] mt-0.5">Firma</span>
        </button>

        <button
          onClick={handleResetDemo}
          className="flex flex-col items-center py-1 px-3 rounded-xl text-slate-400 hover:text-rose-500 font-medium transition-all"
        >
          <span className="text-xl">↺</span>
          <span className="text-[10px] mt-0.5">Sıfırla</span>
        </button>
      </nav>
    </div>
  );
}