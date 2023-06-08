const storge = {
  isSupported:
    typeof window.localStorage !== "undefined" && window.localStorage !== null,

  get: function (key) {
    try {
      const item = localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      }
      return null;
    } catch (error) {
      return null;
    }
  },
  set: function (key, item) {
    const value = JSON.stringify(item);
    localStorage.setItem(key, value);
  },
  remove: function (key) {
    localStorage.removeItem(key);
  },
};
export default storge;
