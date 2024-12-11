const postData = async (url, data) => {
  // console.log(data,'DATA')
  const res = await fetch(`${import.meta.env.VITE_Backend_url}${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Error while adding");
  } else {
    return res.json();
  }
};
export { postData };
