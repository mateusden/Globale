import Link from "next/link";
import { Earth, Languages, Swords, Flag, Lock, ArrowUpRight } from "lucide-react";

const GAMES = [
  {
    slug: "globale",
    name: "Globale",
    tagline: "Geografia",
    description: "Adivinhe o país do dia, letra por letra.",
    icon: Earth,
    cardBg: "bg-sky-200 hover:bg-sky-300",
    badgeBg: "bg-sky-400",
    available: true,
  },
  {
    slug: "idiomale",
    name: "Idiomale",
    tagline: "Idiomas",
    description: "Adivinhe o país pelo idioma da frase.",
    icon: Languages,
    cardBg: "bg-emerald-200 hover:bg-emerald-300",
    badgeBg: "bg-emerald-400",
    available: true,
  },
  {
    slug: "conflitale",
    name: "Conflitale",
    tagline: "História",
    description: "Adivinhe o ano de início de um conflito histórico.",
    icon: Swords,
    cardBg: "bg-rose-200 hover:bg-rose-300",
    badgeBg: "bg-rose-400",
    available: true,
  },
  {
    slug: "bandeirale",
    name: "Bandeirale",
    tagline: "Bandeiras",
    description: "Adivinhe o país pela bandeira histórica.",
    icon: Flag,
    cardBg: "bg-amber-200 hover:bg-amber-300",
    badgeBg: "bg-amber-400",
    available: true,
  },
];

export default function HubHome() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-between p-4 sm:p-8">
      
      {/* Cabeçalho */}
      <header className="w-full max-w-4xl mt-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-2">
        <div>
          <span className="inline-block px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs tracking-wider uppercase rounded-md border-2 border-slate-950 mb-2 shadow-[2px_2px_0px_0px_#000]">
            Jogos Diários
          </span>
          <h1
            className="text-5xl sm:text-6xl font-black text-white tracking-tight"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Meridiano
          </h1>
        </div>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-md sm:text-right">
          No <strong className="text-amber-300">Meridiano</strong>, você encontra desafios diários de geografia, idiomas e história. Um jogo novo a cada dia, de graça.
        </p>
      </header>

      {/* Card Bege Neobrutalista */}
      <main className="w-full max-w-4xl bg-[#f6f0e8] border-4 border-slate-950 rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {GAMES.map((game) => {
            const Icon = game.icon;

            const content = (
              <div
                className={`relative rounded-2xl p-6 h-full flex flex-col justify-between border-4 border-slate-950 transition-all duration-200 ${
                  game.available
                    ? `${game.cardBg} hover:-translate-y-1.5 hover:-rotate-1 cursor-pointer shadow-[5px_5px_0px_0px_#0f172a]`
                    : "bg-slate-300/60 border-slate-500 opacity-60 cursor-not-allowed shadow-[3px_3px_0px_0px_#64748b]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-slate-950 text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] ${
                        game.available ? game.badgeBg : "bg-slate-400"
                      }`}
                    >
                      <Icon size={28} strokeWidth={2.5} />
                    </div>

                    <span className="text-xs font-black uppercase text-slate-950 bg-white/90 px-2.5 py-1 rounded-md border-2 border-slate-950">
                      {game.tagline}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                    {game.name}
                  </h2>
                  <p className="text-slate-800 font-semibold text-sm mt-1 leading-snug">
                    {game.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-slate-950/20 flex items-center justify-between">
                  {game.available ? (
                    <span className="w-full inline-flex items-center justify-center gap-2 bg-slate-950 text-white font-bold text-sm px-5 py-2.5 rounded-xl border-2 border-slate-950 hover:bg-slate-800 transition-colors shadow-[2px_2px_0px_0px_#0f172a]">
                      Jogar Agora <ArrowUpRight size={16} />
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-slate-700 font-extrabold text-xs uppercase tracking-wider">
                      <Lock size={14} /> Em Breve
                    </span>
                  )}
                </div>
              </div>
            );

            return game.available ? (
              <Link href={`/${game.slug}`} key={game.slug} className="h-full">
                {content}
              </Link>
            ) : (
              <div key={game.slug} className="h-full">
                {content}
              </div>
            );
          })}
        </div>
      </main>

      {/* Rodapé */}
      <footer className="w-full max-w-4xl pt-8 mt-6 text-center text-slate-400 text-xs sm:text-sm space-y-1">
        <p>Feito com curiosidade por geografia, idiomas e história do mundo.</p>
        <p className="text-slate-500 font-medium">Meridiano · {new Date().getFullYear()}</p>
      </footer>

    </div>
  );
}