import { useState } from 'react';

// URL ise <img>, değilse (eski emoji verisi) emoji gösterir.
// Görsel yüklenemezse tek seferlik, döngüye girmeyen bir yer tutucu gösterir.
export default function VendorImage({ src, alt, className = '', emojiClassName = 'text-5xl' }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const isUrl = typeof src === 'string' && src.startsWith('http');

  if (!isUrl) return <span className={emojiClassName}>{src || '🏛️'}</span>;

  if (failedSrc === src) {
    return (
      <div className={`flex items-center justify-center bg-slate-200 text-slate-400 ${className}`} title="Görsel yüklenemedi">
        <span aria-hidden="true">🖼️</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailedSrc(src)}
      className={className}
    />
  );
}