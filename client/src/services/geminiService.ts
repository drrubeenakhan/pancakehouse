export const getDailySpecial = async (): Promise<{ name: string; description: string } | null> => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY || '';
    if (!apiKey) return null;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are the creative director of a 90s-themed breakfast restaurant called "Pancake House".
              Invent a "Daily Special" pancake dish.
              The name should be loud, exciting, and reference 90s pop culture or cartoons.
              The description should be short (under 20 words), energetic, and mention sugar or syrup.
              Return the response as a JSON object with keys "name" and "description".
              Do not include markdown code blocks.`
            }]
          }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to fetch daily special:", error);
    return null;
  }
};
