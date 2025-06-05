"use client"

export default function ChatInputForm  ({waitingResponse, request, onRequestChange, onSubmit })  {
  return (
    <form id="m-[0]" onSubmit={onSubmit}>
      <textarea
        className=" bg-[#fff] p-[10px_10%_10px_10px] border border-[#fff] w-[90%] max-h-[300px] m-5"
        placeholder="Escribir la consulta que deseas realizar al DOBOT"
        title="Escribir la consulta que deseas realizar al DOBOT"
        aria-label="Escribir la consulta que deseas realizar al DOBOT"
        value={request}
        onChange={(e) => onRequestChange("user_input",e.target.value)}
      />
      <button
        className="icon-bot icon-bot-send  fa fa-paper-plane disabled:opacity-25"
        disabled={!waitingResponse}
        type="submit"
        aria-label="Enviar consulta al DOBOT"
        title="Enviar consulta al DOBOT"
      />
    </form>
  ) 
} 

 