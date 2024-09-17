// This file handles data persistence using local storage

export const saveTransactions = (email, transactions) => {
  localStorage.setItem(`transactions_${email}`, JSON.stringify(transactions));
};

export const getTransactions = (email) => {
  const transactions = localStorage.getItem(`transactions_${email}`);
  return transactions ? JSON.parse(transactions) : [];
};

export const clearTransactions = (email) => {
  localStorage.removeItem(`transactions_${email}`);
};

export const saveSettings = (email, settings) => {
  localStorage.setItem(`settings_${email}`, JSON.stringify(settings));
};

export const getSettings = (email) => {
  const settings = localStorage.getItem(`settings_${email}`);
  return settings ? JSON.parse(settings) : {};
};
