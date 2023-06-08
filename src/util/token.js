import storge from "./localStorage";

const token = {
  get: function (tokenType) {
    if (!storge.isSupported) return "";
    return storge.get(tokenType);
  },
  set: function (tokenType, newTokenvalue) {
    if (storge.isSupported) {
      storge.set(tokenType, newTokenvalue);
    }
  },
  clean: function (tokenType) {
    if (storge.isSupported) {
      storge.remove(tokenType);
    }
  },
};

export default token;
