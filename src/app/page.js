import Link from "next/link";
import { Earth, Languages, Swords, Flag, Lock } from "lucide-react";
import MeridianoTitle from "./MeridianoTitle";

const GAMES = [
  {
    slug: "globale",
    name: "Globale",
    description: "Adivinhe o país do dia, letra por letra.",
    icon: Earth,
    bg: "bg-sky-200 border-3 border-sky-400",
    badge: "bg-sky-400",
    iconColor: "text-wheat",
    available: true,
  },
  {
    slug: "idiomale",
    name: "Idiomale",
    description: "Adivinhe o país pelo idioma da frase.",
    icon: Languages,
    bg: "bg-emerald-200 border-3 border-emerald-400",
    badge: "bg-emerald-400",
    iconColor: "text-wheat",
    available: true,
  },
  {
    slug: "conflitale",
    name: "Conflitale",
    description: "Adivinhe o ano de início de um conflito histórico.",
    icon: Swords,
    bg: "bg-rose-200 border-3 border-rose-400",
    badge: "bg-rose-400",
    iconColor: "text-wheat",
    available: true,
  },
  {
    slug: "bandeirale",
    name: "Bandeirale",
    description: "Adivinhe o país ou entidade pela bandeira histórica.",
    icon: Flag,
    bg: "bg-amber-200 border-3 border-amber-400",
    badge: "bg-amber-400",
    iconColor: "text-wheat",
    available: true,
  },
];

export default function HubHome() {
  return (
    <div className="min-h-screen bg-slate-800 text-white flex flex-col items-center p-8 gap-10">
      <div className="max-w-md text-center mt-8">
        <MeridianoTitle />
        <p className="text-slate-400 mt-4 leading-relaxed">
          No <span className="text-white font-bold">Meridiano</span>, você
          encontra desafios diários de geografia, idiomas e história. Um jogo
          novo a cada dia.
        </p>
      </div>

      {/* Painel claro contendo os cards */}
      <div className="w-full max-w-3xl border-5 border-slate-950 bg-[#f5e9d8] rounded-3xl p-8 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {GAMES.map((game) => {
            const Icon = game.icon;
            const content = (
              <div
                className={`relative rounded-2xl p-6 h-full flex flex-col items-center text-center transition-all duration-300 ease-out ${
                  game.available
                    ? `${game.bg} hover:-translate-y-1 hover:-rotate-2 hover:scale-103  cursor-pointer shadow-md`
                    : "bg-black/5 opacity-50 cursor-not-allowed"
                }`}
              >
                <div
                  className={`w-18 h-18 rounded-full flex items-center justify-center mb-3 border-4 border-white shadow-sm ${
                    game.available ? game.badge : "bg-black/10"
                  }`}
                >
                  <Icon
                    className={game.available ? game.iconColor : "text-black/30"}
                    size={28}
                    strokeWidth={2}
                  />
                </div>

                <h2 className="text-xl font-extrabold text-slate-800">{game.name}</h2>
                <p className="text-slate-700 text-sm mt-1 mb-4">{game.description}</p>

                {game.available ? (
                  <span className="bg-slate-800 border-1 border-slate-950 text-white text-sm font-bold px-5 py-2 rounded-full mt-auto">
                    Jogar Agora
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-slate-500 text-xs font-bold mt-auto">
                    <Lock size={14} /> EM BREVE
                  </span>
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
      </div>

      <footer className="w-full max-w-3xl border-t border-slate-800 pt-6 mt-2 text-center">
        <p className="text-slate-500 text-sm">
          Feito com curiosidade por geografia e história.
        </p>
        <p className="text-slate-600 text-xs mt-2">
          Meridiano · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}