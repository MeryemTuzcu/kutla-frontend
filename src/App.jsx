import { useState, useEffect } from 'react';
import LandingPage from './Pages/LandingPage';
import CreateTask from './Pages/CreateTask';
import TaskList from './Components/TaskList';
import VendorDashboard from './Pages/VendorDashboard';
import Modal from './Components/Modal';

const DEFAULT_VENDORS = [
  { id: 1, name: 'Fındıksuyu Cam Bahçe', district: 'Sarıyer', category: 'Düğün', capacity: 400, price: 150000, rating: 5.0, img: '🌿' },
  { id: 2, name: 'Sait Halim Paşa Yalısı', district: 'Sarıyer', category: 'Düğün', capacity: 500, price: 350000, rating: 4.9, img: '🏰' },
  { id: 3, name: 'Çırağan Sarayı', district: 'Beşiktaş', category: 'Düğün', capacity: 800, price: 950000, rating: 5.0, img: '✨' },
  { id: 4, name: 'Thevent Söz/Nişan Evi', district: 'Sarıyer', category: 'Nişan', capacity: 100, price: 50000, rating: 4.8, img: '💐' },
  { id: 5, name: 'Mihrabat Korusu', district: 'Beykoz', category: 'Nişan', capacity: 200, price: 90000, rating: 4.7, img: '🌳' },
  { id: 6, name: 'Fuat Paşa Yalısı', district: 'Sarıyer', category: 'Nişan', capacity: 250, price: 120000, rating: 4.9, img: '🏛️' },
  { id: 7, name: 'Frankie İstanbul', district: 'Şişli', category: 'İş Yemeği', capacity: 80, price: 40000, rating: 4.6, img: '🥂' },
  { id: 8, name: 'Sunset Grill & Bar', district: 'Beşiktaş', category: 'İş Yemeği', capacity: 120, price: 60000, rating: 4.8, img: '🌆' },
  { id: 9, name: 'Vogue Restaurant', district: 'Beşiktaş', category: 'İş Yemeği', capacity: 100, price: 55000, rating: 4.7, img: '🍽️' },
  { id: 10, name: 'Oligark', district: 'Beşiktaş', category: 'Doğum Günü', capacity: 300, price: 100000, rating: 4.8, img: '🎂' },
  { id: 11, name: 'Ruby', district: 'Beşiktaş', category: 'Doğum Günü', capacity: 250, price: 90000, rating: 4.6, img: '💃' },
  { id: 12, name: '360 Istanbul', district: 'Beyoğlu', category: 'Doğum Günü', capacity: 150, price: 75000, rating: 4.7, img: '🎉' },
  { id: 13, name: 'Spago by Wolfgang Puck', district: 'Şişli', category: 'Yılbaşı', capacity: 200, price: 150000, rating: 4.9, img: '🎄' },
  { id: 14, name: 'Swissôtel The Bosphorus', district: 'Beşiktaş', category: 'Yılbaşı', capacity: 400, price: 300000, rating: 4.8, img: '❄️' },
  { id: 15, name: 'Divan Brasserie', district: 'Beyoğlu', category: 'Yılbaşı', capacity: 120, price: 80000, rating: 4.7, img: '🎆' },
];

const DEFAULT_TASKS = [
  { id: 101, vendorId: 1, customerName: 'Ayşe Yılmaz', eventDate: '2026-11-15', guestCount: 300, budget: 180000, priority: 'Yüksek', status: 'Anlaşıldı', dismissedBy: [] },
  // Çifte rezervasyon demosu: aynı mekan + aynı tarih, bekleyen bir talep daha
  { id: 106, vendorId: 1, customerName: 'Can Öztürk', eventDate: '2026-11-15', guestCount: 280, budget: 170000, priority: 'Orta', status: 'Fiyat Bekleniyor', dismissedBy: [] },
  { id: 102, vendorId: 7, customerName: 'Ahmet Kara', eventDate: '2026-10-20', guestCount: 50, budget: 45000, priority: 'Orta', status: 'Fiyat Bekleniyor', dismissedBy: [] },
  { id: 103, vendorId: 10, customerName: 'Zeynep Demir', eventDate: '2026-12-05', guestCount: 200, budget: 80000, priority: 'Düşük', status: 'Reddedildi', dismissedBy: [] },
  { id: 104, vendorId: 4, customerName: 'Mehmet Aydın', eventDate: '2026-11-22', guestCount: 80, budget: 55000, priority: 'Yüksek', status: 'Fiyat Bekleniyor', dismissedBy: [] },
  { id: 105, vendorId: 13, customerName: 'Elif Şahin', eventDate: '2026-12-31', guestCount: 150, budget: 160000, priority: 'Orta', status: 'Anlaşıldı', dismissedBy: [] },
  // Genel talep (henüz hiçbir firma tarafından üstlenilmemiş) demosu
  { id: 107, vendorId: 'ALL', customerName: 'Fatma Çelik', eventDate: '2026-12-10', guestCount: 120, budget: 70000, priority: 'Orta', status: 'Fiyat Bekleniyor', dismissedBy: [] },
];

export default function App() {
  // mode: null (public landing) | 'customer' (Taleplerim ekranı) | 'vendor' (Firma Paneli)
  const [mode, setMode] = useState(null);
  const [toast, setToast] = useState(null);
  const [requestModal, setRequestModal] = useState({ open: false, vendorId: null });

  const [vendors, setVendors] = useState(() => {
    const saved = localStorage.getItem('kutla_vendors_v4');
    return saved ? JSON.parse(saved) : DEFAULT_VENDORS;
  });
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kutla_tasks_v4');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });
  const [customerName, setCustomerName] = useState(() => localStorage.getItem('kutla_customer_name_v4') || '');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('kutla_favorites_v4');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => localStorage.setItem('kutla_vendors_v4', JSON.stringify(vendors)), [vendors]);
  useEffect(() => localStorage.setItem('kutla_tasks_v4', JSON.stringify(tasks)), [tasks]);
  useEffect(() => localStorage.setItem('kutla_customer_name_v4', customerName), [customerName]);
  useEffect(() => localStorage.setItem('kutla_favorites_v4', JSON.stringify(favorites)), [favorites]);

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

  return (
    <div className="h-screen overflow-hidden relative">
      {toast && (
        <div
          className={`fixed top-6 right-6 px-6 py-3 rounded-xl shadow-lg z-[60] text-white font-semibold animate-[toastIn_0.3s_ease-out] ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'
          }`}
        >
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

      {mode === null && (
        <div className="h-full overflow-y-auto">
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

      {mode === 'customer' && (
        <div className="flex h-full bg-slate-50 font-sans overflow-hidden">
          <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
            <button onClick={goLanding} className="p-6 border-b border-slate-800 text-left hover:bg-slate-800 transition-colors">
              <h1 className="text-2xl font-extrabold tracking-tight text-white">Kutla<span className="text-rose-500">.com</span></h1>
            </button>
            <nav className="flex-1 p-4 space-y-2">
              <button onClick={goLanding} className="w-full text-left px-4 py-3 rounded-xl font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
                🏠 Mekanlara Dön
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl font-medium bg-rose-500 shadow-md">
                📋 Taleplerim
              </button>
            </nav>
            <button onClick={goVendorMode} className="p-4 border-t border-slate-800 text-left text-xs text-slate-400 hover:text-white transition-colors">
              🏢 Firma mısınız? Giriş yapın →
            </button>
            {customerName && (
              <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
                Müşteri: <span className="text-white font-semibold">{customerName}</span>
              </div>
            )}
            <div className="p-3 border-t border-slate-800">
  <button
    onClick={() => { localStorage.clear(); window.location.reload(); }}
    className="w-full text-xs text-slate-500 hover:text-rose-400 transition-colors text-left flex items-center gap-1.5"
  >
    <span>↺</span> Demoyu Sıfırla
  </button>
</div>
          </aside>
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto">
              <TaskList tasks={tasks} setTasks={setTasks} showToast={showToast} customerName={customerName} vendors={vendors} onNewRequest={openRequestModal} />
            </div>
          </main>
        </div>
      )}

      {mode === 'vendor' && (
        <div className="flex h-full bg-slate-50 font-sans overflow-hidden">
          <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
            <button onClick={goLanding} className="p-6 border-b border-slate-800 text-left hover:bg-slate-800 transition-colors">
              <h1 className="text-2xl font-extrabold tracking-tight text-white">Kutla<span className="text-rose-500">.com</span></h1>
            </button>
            <nav className="flex-1 p-4">
              <button onClick={goLanding} className="w-full text-left px-4 py-3 rounded-xl font-medium bg-indigo-500 shadow-md">
                🔄 Müşteri Moduna Dön
              </button>
            </nav>
          </aside>
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-5xl mx-auto">
              <VendorDashboard vendors={vendors} setVendors={setVendors} tasks={tasks} setTasks={setTasks} showToast={showToast} />
            </div>
          </main>
        </div>
      )}
    </div>
  );
}