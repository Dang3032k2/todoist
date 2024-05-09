const setLocalStorageItem = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};
const getLocalStorageItem = (name) => {
  return JSON.parse(localStorage.getItem(name));
};
const removeLocalStorageItem = (name) => {
  return localStorage.removeItem(name);
};
export { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem };
