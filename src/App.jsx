import { useState } from "react";
import "./App.css";
import { TextArea } from "./components/atoms";

function App() {
  const [textRules, setTextRules] = useState(`padre(juan,jose).\npapa(pedro,maria).\npapa(juan,jose).\npapito(juan,maria).\nmujer(maria). `);
  const [textQuery, setTextQuery] = useState(`Quien es papa de maria y jose?\n\n¿Me podría decir quien es el papito de la señorita Maria?\n\n¿sera cierto que juan es el papito perdido de el niño travieso de maria?\n\nmaria es mujer?`);
  const [prologQuery, setPrologQuery] = useState("");
  const [textOuput, setTextOuput] = useState("");
  const variables = { varX: ['quien', 'quién'] }

  function queryProlog(code_pl, query) {
    let output = "";
    var session = pl.create(1000);
    var code_pl = code_pl;
    var parsed = session.consult(code_pl, {
      success: function () {
        var callback = function (answer) {
          let res = false
          res = pl.format_answer(answer)
          inform(res);
        }
        session.query(query, {
          success: function () {
            session.answer(callback)
          }
        })
      }
    });

    function inform(msg) {
      setTextOuput((output += msg + "\n"));
    }
  }

  function transformQuery(questions, relations, objects, variables) {
    let querys = [];
    for (let i = 0; i < questions.length; i++) {
      let question = questions[i]
      let objQuestion = []
      let relQuestion = []

      for (let j = 0; j < questions[i].length; j++) {
        const element = questions[i][j];
        if (objects.includes(element)) objQuestion.push(element)
        if (relations.includes(element)) relQuestion.push(element)
        if (variables.varX.includes(element)) {
          question.some(item => {
            if (variables.varX.includes(item)) {
              question.some(relation => {
                if (relations.includes(relation)) {
                  question.some(object => {
                    if (objects.includes(object)) {
                      let query = relation + '(' + relation.toUpperCase() + '_' + object.toUpperCase() + ',' + object + '). \n'
                      querys.push(query)
                    }
                  })
                };
              })
            }
          })
          break
        }
      }
      if (objQuestion.length === 2) {
        relQuestion.forEach((item) => {
          let query = item + '(' + objQuestion[0] + ',' + objQuestion[1] + '). \n'
          querys.push(query)
        })
      } else if (objQuestion.length === 1) {
        relQuestion.forEach((item) => {
          let query = item + '(' + objQuestion[0] + '). \n'
          querys.push(query)
        })
      }
    }

    alert(querys)

    let query = ''
    for (let i = 0; i < querys.length; i++) {
      query += querys[i];
    }
    setPrologQuery(query)
    queryProlog(textRules, query)
  }

  function execute(textQuery, textRules) {
    const regexQuestion = /\W*[?]/
    const regexRule = /\W*[.]/
    const regexSentence = /\W/
    let questions = textQuery.toLowerCase().split(regexQuestion);
    let rules = textRules.split(regexRule)

    let objects = [];
    let relations = [];

    let wordsQuestion = []
    let wordsRules = []
    questions.forEach(question => {
      let q = question.split(regexSentence).filter(function (x) { return x !== ''; })
      wordsQuestion.push(q)
    });

    rules.forEach(rule => {
      let r = rule.split(regexSentence).filter(function (x) { return x !== '' })
      let rObj = r.filter(function (x, i) { return i !== 0 })
      relations.push(r[0])
      rObj.forEach(obj => {
        if (!objects.includes(obj))
          objects.push(obj)
      })
      wordsRules.push(r)
    })

    transformQuery(wordsQuestion, relations, objects, variables)
  }

  return (
    <div className="flex flex-col w-screen sm:h-screen h-full bg-[#191D24] dark:bg-[#191D24]"> {/* bg-[#3D4451] */}
      <div className="py-10 items-center justify-center text-center text-warning">
        <h1>Prolog Resolver</h1>
      </div>
      <div className="flex">
        <div className="mockup-code grow mx-10 mb-10 shadow-xl shadow-orange-200 bg-[#191d24]">
          <div className="flex flex-col p-5 h-auto">
            <div className="grid sm:grid-flow-col grid-flow-row">
              <TextArea value={textRules} title='Reglas' text='warning' onChange={(value) => setTextRules(value + ' ')} />
              <TextArea value={textQuery} title='Consulta' text='info' onChange={(value) => setTextQuery(value)} />
            </div>
            <div className="pt-5">
              <TextArea
                title='Output'
                text='success'
                action={
                  <button
                    className="btn btn-sm btn-success"
                    onClick={(e) => execute(textQuery, textRules)}>
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
