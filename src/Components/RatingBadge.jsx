// Puan ve değerlendirme sayısı. Henüz değerlendirmesi olmayan (yeni eklenen) mekanda
// uydurma puan göstermek yerine "Yeni" yazar.
export default function RatingBadge({ vendor, long = false }) {
  const hasReviews = (vendor.reviewsCount ?? 0) > 0 && Number(vendor.rating) > 0;

  if (!hasReviews) return <span className="text-slate-700">✨ Yeni</span>;

  return (
    <>
      <span>⭐</span>
      <span className="text-slate-800">{Number(vendor.rating).toFixed(1)}</span>
      <span className="text-slate-500 font-medium">
        ({vendor.reviewsCount}{long ? ' değerlendirme' : ''})
      </span>
    </>
  );
}