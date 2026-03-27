export async function sendMessage(message: string) {
  const response = await fetch(
    "https://de-brill-learn-app.vercel.app/api/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get response from server");
  }

  return response.json();
}