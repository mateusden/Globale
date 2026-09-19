import Link from "next/link";
import { Earth, Languages, Swords, Flag, Lock } from "lucide-react";

const GAMES = [
  {
    slug: "globale",
    name: "Globale",
    description: "Adivinhe o país do dia, letra por letra.",
    icon: Earth,
    available: true,
  },
  {
    slug: "idiomale",
    name: "Idiomale",
    description: "Adivinhe o país pelo idioma da frase.",
    icon: Languages,
    available: true,
  },
  {
    slug: "conflitale",
    name: "Conflitale",
    description: "Adivinhe o conflito histórico pela data.",
    icon: Swords,
    available: false,
  },
  {
    slug: "bandeirale",
    name: "Bandeirale",
    description: "Adivinhe a bandeira histórica.",
    icon: Flag,
    available: false,
  },
];

export default function HubHome() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-8 gap-10">
      <div className="text-center mt-8">
        <h1
          className="text-5xl font-bold tracking-tight flex items-center justify-center gap-3"
          style={{ fontFamily: "var(--font-title)" }}
        >
          <Earth className="text-amber-500" style={{ width: "0.85em", height: "0.85em" }} strokeWidth={2.5} />
          Jogos Diários
        </h1>
        <p className="text-slate-400 mt-3">Um desafio novo a cada dia. De graça, sem cadastro.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
        {GAMES.map((game) => {
          const Icon = game.icon;
          const content = (
            <div
              className={`group relative border-2 rounded-xl p-6 h-full transition-all ${
                game.available
                  ? "border-slate-700 hover:border-amber-600 bg-slate-800/50 hover:bg-slate-800 cursor-pointer"
                  : "border-slate-800 bg-slate-900/50 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-start justify-between">
                <Icon
                  className={game.available ? "text-amber-500" : "text-slate-600"}
                  size={32}
                  strokeWidth={2}
                />
                {!game.available && <Lock className="text-slate-600" size={18} />}
              </div>
              <h2 className="text-2xl font-bold mt-3">{game.name}</h2>
              <p className="text-slate-400 text-sm mt-1">{game.description}</p>
              {!game.available && (
                <p className="text-amber-600 text-xs font-bold mt-4 tracking-wide">
                  EM BREVE
                </p>
              )}
              {game.available && (
                <p className="text-amber-600 text-xs font-bold mt-4 tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                  JOGAR →
                </p>
              )}
            </div>
          );

          return game.available ? (
            <Link href={`/${game.slug}`} key={game.slug}>
              {content}
            </Link>
          ) : (
            <div key={game.slug}>{content}</div>
          );
        })}
      </div>

      <p className="text-slate-600 text-xs mt-4">Globale · {new Date().getFullYear()}</p>
    </div>
  );
}