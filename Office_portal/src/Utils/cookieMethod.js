const setCookie = (name, value, days) => {
  const expires = new Date(
    Date.now() + days + 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/ `;
};

export default setCookie;
