// Ortak iş kuralları — birden fazla bileşende tekrar yazılmasın diye tek yerde.
export const MIN_BUDGET = 1000;

export const isDuplicatePending = (tasks, vendorId, customerName) =>
  tasks.some(
    (t) =>
      t.vendorId === vendorId &&
      t.customerName.trim().toLocaleLowerCase('tr-TR') === customerName.trim().toLocaleLowerCase('tr-TR') &&
      t.status === 'Fiyat Bekleniyor'
  );

export const isDoubleBooked = (tasks, vendorId, eventDate, excludeId) =>
  tasks.some(
    (t) => t.vendorId === vendorId && t.eventDate === eventDate && t.status === 'Anlaşıldı' && t.id !== excludeId
  );

export const isCapacityExceeded = (vendor, guestCount) => vendor && guestCount > vendor.capacity;

export const isBudgetTooLow = (budget) => budget < MIN_BUDGET;
