const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

export default function Keyboard({ onKeyPress, onEnter, onBackspace, keyStates }) {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2 mt-4">
      {ROWS.map((row, rowIdx) => (
        <div className="flex gap-1.5 sm:gap-2 justify-center" key={rowIdx}>
          {rowIdx === ROWS.length - 1 && (
            <button
              onClick={onEnter}
              className="px-2 py-1 sm:px-4 sm:py-2 text-sm font-bold bg-slate-700 text-yellow-100 rounded hover:bg-slate-600"
            >
              ENVIAR
            </button>
          )}

          {row.split("").map((ch) => {
            const state = keyStates[ch];
            const bg =
              state === "correct"
                ? "bg-green-700"
                : state === "present"
                  ? "bg-yellow-700"
                  : state === "absent"
                    ? "bg-slate-800 text-slate-500"
                    : "bg-slate-700 hover:bg-slate-600";
            return (
              <button
                key={ch}
                onClick={() => onKeyPress(ch)}
                className={`sm:w-11 sm:h-11 h-10 w-8 text-yellow-100 text-sm font-bold rounded ${bg}`}
              >
                {ch}
              </button>
            );
          })}

          {rowIdx === ROWS.length - 1 && (
            <button
              onClick={onBackspace}
              className="px-2 sm:px-4 py-1 sm:py-2 text-sm text-yellow-100 font-bold bg-slate-700 rounded hover:bg-slate-600"
            >
              APAGAR
            </button>
          )}
        </div>
      ))}
    </div>
  );
}