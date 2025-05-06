import { useState } from 'react';
import "../styles.css";

export default function OutroVoce() {
  const [frase, setFrase] = useState('');
  const [carregando, setCarregando] = useState(false);

  const gerarFrase = async () => {
    setCarregando(true);

    const prompt = `Gere uma frase no estilo “relatório de bem-estar corporativo” sobre o “outro eu” de alguém.

A frase deve:
- Começar com “Seu outro você”
- Descrever um comportamento estranho, contraditório, ou banal
- Ser objetiva, fria, e levemente absurda
- Evitar explicações ou julgamentos
- Ter tom clínico, impessoal

Exemplos:
- Seu outro você sente alívio ao cancelar compromissos.
- Seu outro você evita elevadores espelhados.
- Seu outro você confia em pessoas que falam devagar.

Agora gere uma nova frase.`;

    const resposta = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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", // Sua chave de API
        "Content-Type": "application/json",
        "HTTP-Referer": "https://meuprojeto.com", // Coloque seu domínio aqui, ou qualquer string
        "X-Title": "Outro Você App"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-distill-llama-70b:free", // Modelo correto da OpenRouter
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await resposta.json();
    const texto = data.choices?.[0]?.message?.content || "Erro ao gerar frase.";
    setFrase(texto.trim());
    setCarregando(false);
  };

  return (
    <div className="terminal">
      <h2 className="glitch">Relatório do Outro Você</h2>
      <div className="output">
        <p>{frase}</p>
        <span className="cursor">_</span>
      </div>
      <button onClick={gerarFrase} disabled={carregando}>
        {carregando ? 'Analisando seu outro eu...' : 'Gerar frase'}
      </button>
    </div>
  );
}
