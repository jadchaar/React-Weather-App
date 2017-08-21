module.exports.checkResponseStatus = res => {
  if (res.ok) return res.json();
  throw new Error(`Network response was not ok: ${res.statusText} (${res.status})`);
};
