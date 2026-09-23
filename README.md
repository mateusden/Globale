# Meridiano

Um hub de jogos diários de geografia, idiomas e história, inspirado em jogos como Termo e Worldle.

## Jogos disponíveis

- **Globale** — Adivinhe o país do dia, letra por letra.
- **Idiomale** — Adivinhe o país pela frase no idioma local.
- **Conflitale** — Adivinhe o ano de início de um conflito histórico.
- **Bandeirale** — Adivinhe o país ou entidade histórica pela bandeira.

## Tecnologias

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (ícones)
- Hospedado na [Vercel](https://vercel.com/)

## Rodando localmente

\`\`\`bash
npm install
npm run dev
\`\`\`

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura

Cada jogo vive em sua própria pasta dentro de `src/app/`, com sua própria lógica de API (`api/`), garantindo que a resposta do dia fique no servidor, não exposta no navegador.

O horário de troca da palavra/desafio do dia é calculado com base no fuso de Brasília (America/Sao_Paulo), independente de onde o servidor estiver hospedado.

## Créditos

As bandeiras usadas no Bandeirale vêm do Wikimedia Commons, sob licenças Creative Commons ou domínio público. Créditos de atribuição, quando exigidos pela licença, estão documentados como comentários dentro de cada arquivo `.svg` em `public/flags/`.