import React from 'react'

export default function TextArea({ title, text, onChange, action, classTextArea, value, disabled }) {
  return (
    <>
      <div className={`text-${text}`}>
        <div className={`flex ${action && 'justify-between'}`}>
          <pre
            data-prefix=">"
            className={`border-l-2 border-${text} text-${text} flex`}>
            <h2 className={`text-${text} font-bold`}>{title}</h2>
          </pre>
          {action}
        </div>
        <textarea
          spellCheck="false"
          className={`flex text-area pl-5 mt-4 h-72 w-full bg-transparent border-l-2 border-${text} ${classTextArea}`}
          onChange={(e) => onChange(e?.target?.value)}
          value={value}
          disabled={disabled}
        >
        </textarea>
      </div>
    </>
  )
}
