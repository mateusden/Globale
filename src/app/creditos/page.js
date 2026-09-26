import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

const FLAG_CREDITS = [
  {
    name: "União Polaco-Lituana",
    author:
      "117-M-I-K-E, with assets by Sodacan, Heralder, Odejea e Thetaspilt",
    source:
      "https://commons.wikimedia.org/wiki/File:Banner_of_Poland-Lithuania.svg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    verified: true,
  },
  {
    name: "União Soviética",
    author: "CCCP",
    source:
      "http://pravo.levonevsky.org/ / Construction sheet of the flag of the Soviet Union.png",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Iugoslávia",
    author: "Đorđe Andrejević-Kun (design), Zscout370 (codificação SVG)",
    source: "Trabalho próprio / CONSTRUCTION SHEET (Flags of the World)",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Alemanha Oriental",
    author: "Deutsche Demokratische Republik (Design: Fritz Behrendt)",
    source:
      "Derivado de File:Flag of East Germany.svg / Gesetzblatt der Deutschen Demokratischen Republik",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Reino da Prússia",
    author: "David Liuzzo",
    source:
      "Own Work, Custom Creation according design specifications of the previous file",
    license: "Attribution (Atribuição)",
    licenseUrl: "https://commons.wikimedia.org/wiki/Template:Attribution",
    verified: true,
  },
  {
    name: "Império Otomano",
    author:
      "Orwellianist (com base em trabalhos de Kerem Özcan, DsMurat e Niusereset)",
    source: "Documentos e fotografias históricas (1850–1922)",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Estados Confederados da América",
    author: "Nicola Marschall (original), Ariane Schmidt (vetor)",
    source: "Obra própria",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Rodésia",
    author: "Actarux (original)",
    source: "Coat of arms of Rhodesia.svg",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Zaire",
    author: "Moyogo",
    source:
      "Obra própria baseada em bandeiras oficiais (http://flagspot.net/flags/cd-zr.html)",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Tchecoslováquia",
    author: "Jaroslav Kursa",
    source: "Appendix No. 3 of Czech Legal Act 3/1993",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Império Austro-Húngaro",
    author: "Sgt_bilko (vetorização), Željko Heimer (original)",
    source:
      "Obra própria, baseada em https://www.crwflags.com/fotw/flags/ah~war.html#war1915 (Die Symbole Österreichs)",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Bandeira Provisória da República do Brasil",
    author: "Sitenl",
    source: "Obra própria",
    license: "CC BY-SA 2.5",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5/",
    verified: true,
  },
  {
    name: "Império do Japão",
    author: "FDRMRZUSA",
    source:
      "Obra própria (baseada em imagens do Wikimedia Commons e fontes externas)",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Biafra",
    author: "Mysid",
    source:
      "Desenho próprio no CorelDraw, baseado em imagem do FOTW e no livro 'Encyclopedia of the Stateless Nations' (James Minahan)",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Raj Britânico",
    author: "Barryob",
    source:
      "Baseado em Canadian Red Ensign.svg e Star of the Order of the Star of India (gold).svg",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Reino do Egito",
    author: "Mysid",
    source: "Obra própria, usando https://www.fotw.info/flags/eg-kingd.html",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Império da Etiópia",
    author: "Oren neu dag",
    source: "Versão SVG de Image:Flag of Ethiopia (1897).png",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Estados Unidos da Indonésia",
    author: "Jayakatwang",
    source: "lei: Undang-Undang Republik Indonesia Nomor 24 Tahun 2009",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Estado Livre da Irlanda",
    author: "Éire",
    source: "Drawn by User:SKopp",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Manchukuo",
    author: "Urmas",
    source: "Obra do próprio",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "União Sul-Africana",
    author: "Parliament of South Africa (imagem vetorial por Denelson83)",
    source:
      "Vetorizado a partir da descrição no Southern African Vexillological Association. Flag specification sheets : South Africa national flag 1928-1994",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Vietnã do Sul",
    author: "(muitos, ver histórico)",
    source: "(ver histórico)",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Iêmen do Sul",
    author: "National Front - الجبهة القومية",
    source: "Obra do próprio",
    license: "Domínio Público",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    verified: true,
  },
  {
    name: "Reino das Duas Sicílias",
    author: "Flanker (com elementos de Ipankonin, Rastrojo e HansenBCN)",
    source:
      "Image:Flag of the Kingdom of the Two Sicilies 1738.gif, www.realcasadiborbone.it, www.duesicilie.org, www.cnicg.net",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    verified: true,
  },
  {
    name: "República de Veneza",
    author: "Facquis",
    source:
      "Obra do próprio, baseada na obra de Oliviero Murru (Bandiera contarina)",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    verified: true,
  },
];

function CreditItem({ credit }) {
  if (credit.verified) {
    return (
      <li className="bg-white border-2 border-slate-950 rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0px_0px_#000]">
        <div className="flex items-center justify-between gap-2">
          <p className="font-extrabold text-base sm:text-lg text-slate-950">
            {credit.name}
          </p>
          <span className="bg-emerald-300 text-slate-950 text-xs font-black px-2.5 py-1 rounded-lg border border-slate-950 shadow-[1px_1px_0px_0px_#000] shrink-0">
            Confirmado
          </span>
        </div>

        <p className="text-slate-700 text-xs sm:text-sm font-semibold mt-2.5 leading-relaxed">
          Autor:{" "}
          <span className="text-slate-950 font-bold">{credit.author}</span> ·{" "}
          <a
            href={credit.licenseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold text-slate-950 hover:text-sky-600"
          >
            {credit.license}
          </a>
        </p>

        <a
          href={credit.source}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 bg-sky-300 hover:bg-sky-200 text-slate-950 text-xs font-black px-3 py-1.5 rounded-xl border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_#000] active:translate-y-0.5 transition-all cursor-pointer"
        >
          Ver fonte original <ExternalLink size={14} strokeWidth={2.5} />
        </a>
      </li>
    );
  }

  return (
    <li className="bg-amber-50/90 border-2 border-slate-950 rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0px_0px_#000]">
      <div className="flex items-center justify-between gap-2">
        <p className="font-extrabold text-base sm:text-lg text-slate-950">
          {credit.name}
        </p>
        <span className="bg-amber-300 text-slate-950 text-xs font-black px-2.5 py-1 rounded-lg border border-slate-950 shadow-[1px_1px_0px_0px_#000] shrink-0">
          Pendente
        </span>
      </div>

      <p className="text-amber-900 text-xs font-bold mt-2">
        Licença pendente de verificação (presumida domínio público)
      </p>
    </li>
  );
}

export default function Creditos() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-950 p-4 sm:p-8 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-[#f6f0e8] border-4 border-slate-950 rounded-3xl p-5 sm:p-8 shadow-[6px_6px_0px_0px_#000] my-4">
        {/* Botão Voltar */}
        <Link
          href="/sobre"
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm border-2 border-slate-950 rounded-xl px-4 py-2 shadow-[2px_2px_0px_0px_#000] active:translate-y-0.5 transition-all inline-flex items-center gap-2 mb-6 cursor-pointer"
        >
          <ArrowLeft size={18} strokeWidth={3} /> Voltar
        </Link>

        {/* Título e Descrição */}
        <h1 className="text-3xl sm:text-4xl font-black mb-3 text-slate-950 tracking-tight">
          Créditos das bandeiras
        </h1>
        <p className="text-slate-800 font-medium mb-8 leading-relaxed text-sm sm:text-base">
          As bandeiras do Bandeirale vêm do{" "}
          <a
            href="https://commons.wikimedia.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline text-slate-950 hover:text-sky-600"
          >
            Wikimedia Commons
          </a>
          . Abaixo estão os créditos de atribuição já confirmados. As demais
          estão marcadas como pendentes de verificação de licença.
        </p>

        {/* Lista de Itens */}
        <ul className="space-y-3.5">
          {FLAG_CREDITS.map((credit, i) => (
            <CreditItem key={i} credit={credit} />
          ))}
        </ul>
      </div>
    </div>
  );
}
