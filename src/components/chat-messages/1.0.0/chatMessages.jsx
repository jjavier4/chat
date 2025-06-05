"use client"
import { useEffect} from 'react';
import ReactMarkdown from 'react-markdown';

export default function ChatMessages({ waitingResponse, response, request,messages,updateMessages }) {
  
  useEffect(() => {
    if (response ) {
      updateMessages(prev => [...prev, { origin: "chat", id: Date.now(), content: response }]);
    }
    if (request) {
      updateMessages(prev => [...prev, { origin: "user", id: Date.now(), content: request }]);
    }
  }, [waitingResponse, response]);

  useEffect(() => {
    const chatboxResponse = document.querySelector('#chatbox-response')
    chatboxResponse.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div id="container-response" className="bg-[#fcaa06] rounded-[10px_10px_10px_0] h-[50vh] mx-[6px] p-[5px] relative transition-all duration-1000">
      <div id="chatbox-response" className="bg-white rounded-[15px] p-[10px] text-left h-[100%] overflow-auto relative [&>*]:font-sans [&>*]:text-base">
        {messages.length === 0 ? (
          <p>¡Bienvenidos!</p>

        ) : (
          messages.map((message) => (
            
            <div
            
              key={message.id}
              className={`mb-2 relative last:mb-0 border-1 p-1 ${message.origin === "chat"
                  ? "rounded-[10px_10px_10px_0] bg-blue-50 max-w-[80%]"
                  : "rounded-[10px_10px_0_10px] bg-green-50 ml-auto max-w-[80%]"
                }`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          ))
        )}

        {!waitingResponse && (
          <div
            className="bot-unad_chat-bubble"
            aria-label="El Dobot está procesando tu consulta"
          >
            <div className="typing">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

