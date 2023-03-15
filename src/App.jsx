import { useState } from "react";
import "./App.css";

function App() {
  const [textRules, setTextRules] = useState("");
  const [textQuery, setTextQuery] = useState("");
  const [textOuput, setTextOuput] = useState("");

  function queryRG(code_pl, query) {
    let output = "";
    var session = pl.create(1000);
    var code_pl = code_pl;
    var parsed = session.consult(code_pl);
    var query = session.query(query);

    function inform(msg) {
      setTextOuput((output += msg + "\n"));
    }

    var count_answers = 0;
    var callback = function (answer) {
      if (answer === false) {
        inform("REALIZADO, #respuestas = " + count_answers);
        return;
      }
      if (answer === null) {
        inform("TIMEOUT, #respuestas = " + count_answers);
        return;
      }
      ++count_answers;
      inform(pl.format_answer(answer));
      session.answer(callback);
    };
    session.answer(callback);
  }

  return (
    <div className="flex flex-col w-screen h-screen bg-[#3D4451] dark:bg-[#191D24]">
      <div className="py-10 items-center justify-center text-center text-warning">
        <h1>Prolog Resolver</h1>
      </div>
      <div className="flex grow">
        <div className="mockup-code grow mx-10 mb-10 shadow-xl shadow-orange-200">
          <div className="flex flex-col p-5 h-full">
            <div className="grid sm:grid-flow-col grid-flow-row">
              <div className="text-warning">
                <pre
                  data-prefix=">"
                  className="border-l-2 border-warning text-warning flex">
                  <h2 className="text-warning font-bold">Reglas</h2>
                </pre>
                <textarea
                  spellcheck="false"
                  className="flex text-area pl-5 mt-4 h-72 w-full bg-transparent border-l-2 border-warning"
                  onChange={(e) => setTextRules(e?.target?.value)}></textarea>
              </div>
              <div className="text-info">
                <pre data-prefix=">" className="border-l-2 border-info flex">
                  <h2 className="font-bold">Consulta</h2>
                </pre>
                <textarea
                  spellcheck="false"
                  className="flex text-area pl-5 mt-4 h-72 w-full bg-transparent border-l-2 border-info"
                  onChange={(e) => setTextQuery(e?.target?.value)}></textarea>
              </div>
            </div>
            <div className="flex justify-between py-5 text-success text-center items-center ">
              <pre data-prefix=">" className="border-l-2 border-success flex">
                <h2 className="text-success font-bold">Output</h2>
              </pre>
              <button
                className="btn btn-sm btn-success"
                onClick={(e) => queryRG(textRules, textQuery)}>
                Ejecutar
              </button>
            </div>
            <textarea
              disabled
              spellcheck="false"
              className="flex text-area grow pl-5 mt-4 w-full h-44 bg-transparent text-success"
              value={textOuput}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
