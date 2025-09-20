async function logIn({ email, password }) {
  const res = await fetch(
    "https://api.redseam.redberryinternship.ge/api/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  if (!res.ok) throw new Error("couldn't log in");

  return res.json();
}

async function register(data) {
  const res = await fetch(
    "https://api.redseam.redberryinternship.ge/api/register",
    {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        accept: "application/json",
      },
      body: data,
    }
  );

  if (!res.ok) throw new Error("couldn't log in");

  return res.json();
}

export { logIn, register };
