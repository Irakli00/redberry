async function logIn({ email, password }) {
  const statusMap = {
    401: "User not found check Email or Password inputs",
  };

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

  if (!res.ok) throw new Error(statusMap[res.status]);

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

  // if (!res.ok)
  //   return res.json().then((errors) => Object.values(errors.errors).flat());

  if (!res.ok) {
    const errors = await res.json();

    const errMessages = Object.values(errors.errors).flat();
    const error = new Error(errors.message);
    error.messages = errMessages;

    throw error;
  }

  return res.json();
}

export { logIn, register };
