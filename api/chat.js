// ✅ BACKEND GPT CONFIG PER UPIA
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Sei Upia, l'assistente AI di Uppunto Communication. Rispondi in modo naturale, professionale, ma anche amichevole. Parla dei servizi come creazione siti web, campagne Google Ads, social media, logo, SEO e sviluppo software." },
        ...(history || []),
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Errore GPT:", error);
    res.status(500).json({ error: "Errore nella generazione della risposta" });
  }
};
