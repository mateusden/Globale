# Meridiano

Um hub de jogos diários de geografia, idiomas e história, inspirado em jogos como Termo e Worldle.

🌐 **Jogue agora:** [globale-nine.vercel.app](https://globale-nine.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![UI Style](https://img.shields.io/badge/Style-Neobrutalism_Pop-ff6b6b?style=for-the-badge)

## 🎮 Jogos disponíveis

- **Globale** 🌍 — Adivinhe o país do dia, letra por letra. *(Tema: Azul-Céu)*
- **Idiomale** 🗣️ — Adivinhe o país pela frase no idioma local. *(Tema: Verde-Esmeralda)*
- **Conflitale** ⚔️ — Adivinhe o ano de início de um conflito histórico. *(Tema: Laranja)*
- **Bandeirale** 🚩 — Adivinhe o país ou entidade histórica pela bandeira. *(Tema: Rosa)*

## 🎨 Design & Interface

A interface foi projetada no estilo **Neobrutalista Pop**, combinando:
- Cores pastel vibrantes e temáticas para cada modalidade.
- Bordas pretas marcadas (`border-slate-950`), sombras sólidas táticas e cantos arredondados.
- Molduras escuras (`bg-slate-950`) de alto contraste para exibição precisa de bandeiras com faixas claras.
- Micro-interações e autocompletar dinâmico.

## 🛠️ Tecnologias

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Ícones)
- Hospedado na [Vercel](https://vercel.com/)

## 🚀 Rodando localmente

```bash
# Clone o repositório
git clone https://github.com/mateusden/meridiano.git

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## 📂 Estrutura do Projeto

Cada jogo vive em sua própria pasta dentro de `src/app/`, com sua própria lógica de API (`api/`), garantindo que a resposta do dia fique no servidor, não exposta no navegador.

O horário de troca do desafio diário é sincronizado com o fuso horário de Brasília (`America/Sao_Paulo`), independente de onde o servidor de hospedagem estiver localizado.

## 📜 Créditos e Licenças

As bandeiras usadas no Bandeirale são provenientes do **Wikimedia Commons**, sob licenças Creative Commons ou domínio público. Créditos de atribuição, quando exigidos pela licença, estão documentados como comentários dentro de cada arquivo `.svg` em `public/flags/`.