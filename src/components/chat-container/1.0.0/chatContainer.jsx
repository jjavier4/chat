"use client"
import { useState, useEffect, useMemo } from 'react'
import ChatHeader from '@/components/chat-Header/1.0.0/chatHeader'
import ChatMessages from '@/components/chat-messages/1.0.0/chatMessages'
import ChatInputForm from '@/components/chat-input-Form/1.0.0/chatInputForm'
import ChatControls from '@/components/chat-controls/1.0.0/chatControls'


export default function ChatContainer({ token }) {
  const [avatarSelect, setAvatarSelect] = useState('ref1') //avatar mostrado
  const [bearerToken, setBearerToken] = useState('')
  const [request, setRequest] = useState({
    user_id: "user123",
    user_input: "",
    user_roles: ["student"],
    chat_id: ""
  })//pregunta chat
  const [waitingResponse, setWaitingResponse] = useState(true) //esperar respuesta
  const [response, setResponse] = useState('') //respuesta chat
  const [readResponse, setReadResponse] = useState(false) //activar leer respuesta
  const [messages, setMessages] = useState([]); //conversacion del chat



  const handleAvatarChange = (newAvatar) => {
    setAvatarSelect(newAvatar)
  }
  const resources = useMemo(() => ({
    miniAvatarBot: {
      src: `/avatars/images/${avatarSelect}.webp`,
      alt: `Avatar ${avatarSelect}`,
      id: 'avatar_active_image'
    },
    avatarBot: {
      src: `/avatars/${readResponse ? "gifts" : "images"}/${avatarSelect}.${readResponse ? "gif" : "webp"}`,
      alt: `Avatar ${avatarSelect}`,
      id: 'avatar_active_image'
    },
    dobotLogo: {
      src: '/logo-dobot.png',
      alt: 'Logo Dobot',
    }
  }), [avatarSelect, readResponse])


  const handleRecuest = (name, value) => {
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const updateMessages = (newMessage) => {
    setMessages(newMessage)
  }

  const handleReadResponse = (status) => {
    setReadResponse(status)
  }

  const sendRequest = async (e) => {
    e.preventDefault()
    if (request.user_input === '') {
      setResponse('Ingresar pregunta')
      return
    }
    setResponse('')
    setWaitingResponse(false)

    try {
      const res = await fetch('http://34.73.227.13/api/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        setResponse("Vuelve a intentarlo");
        handleRecuest('user_input', '');
      }

      const data = await res.json();
      setResponse(data.response);
      handleRecuest('user_input', '');

      if (messages.length === 0) {
        handleRecuest('chat_id', data.chat_id);
      }

    } catch (err) {
      setResponse("Vuelve a intentarlo");
      console.error("Error en la petición:", err);
    } finally {
      setWaitingResponse(true);
    }
  }


  useEffect(() => {
    setBearerToken(token?.token);
    handleRecuest("user_id", token?.user_id);
    handleRecuest("user_roles", token?.user_info?.roles || []);
  }, [token]);

  return (

    <>
      <SkipToDobot />
      <div
        id="bot-unad"
        className="bg-white border-b-sky-500 fixed  bottom-0 text-center text-gray-800 max-w-[400px] transition-all duration-[5000ms]"
        aria-label="Chat del DOBOT"
        role="dialog"
      >

        <ChatHeader
          avatarBot={resources.avatarBot}
          dobotLogo={resources.dobotLogo}
        />

        <ChatMessages
          waitingResponse={waitingResponse}
          response={response}
          request={request.user_input}
          messages={messages}
          updateMessages={updateMessages}
        />

        <ChatInputForm
          waitingResponse={waitingResponse}
          request={request.user_input}
          onRequestChange={handleRecuest}
          onSubmit={sendRequest}
        />

        <ChatControls
          Avatar={avatarSelect}
          onAvatarChange={handleAvatarChange}
          onVoiceTranscript={handleRecuest}
          readResponse={readResponse}
          changeReadResponse={handleReadResponse}
          response={response}
          updateMessages={updateMessages}
        />
      </div>

    </>
  )
}

function SkipToDobot() {
  useEffect(() => {
    const handleClick = () => {
      const mainDobot = document.querySelector('#bot-unad__main-title')

        (mainDobot)?.focus()
    }

    const btn = document.getElementById('skip_to_dobot')
    btn?.addEventListener('click', handleClick)

    return () => btn?.removeEventListener('click', handleClick)
  }, [])

  return (
    <button
      id="skip_to_dobot"
      className="sr-only sr-only-focusable px-4 py-2 bg-white text-blue-600"
      aria-label='Saltar a chat'
      role="button"
      tabIndex={0}
    >
      Salta al DOBOT
    </button>
  )
}
