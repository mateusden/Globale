import { Compass, Languages, Landmark, Globe, Sparkles } from "lucide-react";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-between p-4 sm:p-8">
      
      {/* Container Principal em Estilo Papel Bege */}
      <div className="w-full max-w-2xl my-auto bg-[#f6f0e8] border-4 border-slate-950 rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] space-y-8 text-slate-950">
        
        {/* Badge e Título */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs tracking-wider uppercase rounded-md border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000]">
            <Globe className="w-3.5 h-3.5" strokeWidth={2.5} />
            Jogos Diários
          </span>
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Sobre o Meridiano
          </h1>
        </div>

        {/* Texto de Apresentação */}
        <p className="text-slate-900 text-base sm:text-lg font-semibold leading-relaxed">
          O <strong className="text-slate-950 bg-amber-300 px-1.5 py-0.5 rounded border border-slate-950">Meridiano</strong> é um conjunto de jogos diários sobre geografia, idiomas e história. Cada jogo é rápido — leva só alguns minutos — e traz um desafio novo todo dia.
        </p>

        {/* Três Pilares com Cards Coloridos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-sky-200 border-3 border-slate-950 shadow-[3px_3px_0px_0px_#0f172a] flex flex-col items-center text-center space-y-2 hover:-translate-y-1 hover:-rotate-1 transition-all">
            <div className="p-2 rounded-xl bg-sky-400 border-2 border-slate-950 text-slate-950 shadow-[1.5px_1.5px_0px_0px_#000]">
              <Compass className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <span className="font-black text-slate-950 text-sm">Geografia</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-200 border-3 border-slate-950 shadow-[3px_3px_0px_0px_#0f172a] flex flex-col items-center text-center space-y-2 hover:-translate-y-1 hover:rotate-1 transition-all">
            <div className="p-2 rounded-xl bg-emerald-400 border-2 border-slate-950 text-slate-950 shadow-[1.5px_1.5px_0px_0px_#000]">
              <Languages className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <span className="font-black text-slate-950 text-sm">Idiomas</span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-200 border-3 border-slate-950 shadow-[3px_3px_0px_0px_#0f172a] flex flex-col items-center text-center space-y-2 hover:-translate-y-1 hover:-rotate-1 transition-all">
            <div className="p-2 rounded-xl bg-rose-400 border-2 border-slate-950 text-slate-950 shadow-[1.5px_1.5px_0px_0px_#000]">
              <Landmark className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <span className="font-black text-slate-950 text-sm">História</span>
          </div>
        </div>

        <hr className="border-2 border-slate-950/20" />

        {/* Frase Final */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-200 border-3 border-slate-950 text-slate-950 font-bold text-sm shadow-[3px_3px_0px_0px_#0f172a]">
          <Sparkles className="w-5 h-5 text-slate-950 shrink-0" strokeWidth={2.5} />
          <p>
            Feito por curiosidade e paixão por mapas, línguas e histórias do mundo.
          </p>
        </div>

      </div>

      {/* Footer */}
      <footer className="w-full max-w-2xl pt-6 text-center text-slate-400 text-xs sm:text-sm">
        <p className="text-slate-500 font-medium">Meridiano · {new Date().getFullYear()}</p>
      </footer>

    </div>
  );
}