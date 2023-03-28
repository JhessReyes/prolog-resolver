import { useState } from "react";
import "./App.css";
import { TextArea } from "./components/atoms";

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
    <div className="flex flex-col w-screen h-screen bg-[#191D24] dark:bg-[#191D24]"> {/* bg-[#3D4451] */}
      <div className="py-10 items-center justify-center text-center text-warning">
        <h1>Prolog Resolver</h1>
      </div>
      <div className="flex grow">
        <div className="mockup-code grow mx-10 mb-10 shadow-xl shadow-orange-200 bg-[#191d24]">
          <div className="flex flex-col p-5 h-auto">
            <div className="grid sm:grid-flow-col grid-flow-row">
              <TextArea title='Reglas' text='warning' onChange={(value) => setTextRules(value + ' ')} />
              <TextArea title='Consulta' text='info' onChange={(value) => setTextQuery(value)} />
            </div>
            <div className="pt-5">
              <TextArea
                title='Output'
                text='success'
                action={
                  <button
                    className="btn btn-sm btn-success"
                    onClick={(e) => queryRG(textRules, textQuery)}>
                    Ejecutar
                  </button>
                }
                value={textOuput}
                classTextArea='!h-44'
                disabled
              >
              </TextArea>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
