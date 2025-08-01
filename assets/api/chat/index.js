// ✅ BACKEND GPT CONFIG PER UPIA
// Framework: Node.js con Express su Vercel (API serverless)
// Obiettivo: Collegare il frontend "Upia Assistant" a OpenAI GPT via API

const { OpenAI } = require("openai");

// In Vercel, questa chiave è salvata come ENV: process.env.OPENAI_API_KEY
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
        { role: "system", content: `Sei Upia, l'assistente AI di Uppunto Communication. Rispondi in modo naturale, professionale, ma anche amichevole. Parla dei servizi come creazione siti web, campagne Google Ads, social media marketing, SEO, creazione immagine aziendale, sviluppo gestionali, intelligenza artificiale. Evita risposte troppo lunghe, guida l'utente con proposte chiare.` },
        ...(history || []),
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 600
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });

  } catch (error) {
    console.error("Errore GPT:", error);
    res.status(500).json({ error: "Errore nella generazione della risposta" });
  }
};
