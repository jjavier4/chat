"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import AvatarPanelSelector from "@/components/avatar-panel-selector/1.0.0/avatarPanelSelector"

export default function ChatControls({ Avatar, onAvatarChange, onVoiceTranscript, readResponse, changeReadResponse, response, updateMessages }) {

  //Actualizacion de avatar
  const [showAvatarPanel, setShowAvatarPanel] = useState(false)
  const [currentAvatar, setCurrentAvatar] = useState(Avatar)
  const handleSelectAvatar = (avatar) => {
    setCurrentAvatar(avatar.id)
    onAvatarChange(avatar.id)
    console.log('Avatar seleccionado:', avatar)
  }
  //Activacion de microfono
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)


  const cleanTranscript = (transcript) => {
    // Define la palabra clave
    const triggerWord = "botón";

    // Encuentra la posición de la palabra clave
    const triggerIndex = transcript.toLowerCase().indexOf(triggerWord);

    if (triggerIndex !== -1) {
      // Devuelve solo lo que viene después de la palabra clave
      return transcript.slice(triggerIndex + triggerWord.length).trim();
    }

    // Si no encuentra la palabra clave, devuelve la transcripción completa
    return transcript.trim();
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('El reconocimiento de voz no está soportado en este navegador.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true; // Escuchar solo hasta que se detenga manualmente
    recognitionRef.current.interimResults = false; // Solo obtener resultados finales
    recognitionRef.current.lang = 'es-ES';

    recognitionRef.current.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join(' ');

      const cleanedTranscript = cleanTranscript(transcript)
      console.log('Texto traducido limpio:', cleanTranscript(transcript));
      console.log('Texto traducido limpio:', cleanedTranscript);
      console.log('Texto traducido:', transcript);
      onVoiceTranscript('user_input', cleanedTranscript)

    };

    recognitionRef.current.onerror = (event) => {
      console.error('Error en el reconocimiento de voz:', event.error);
    };
  }, []);

  const toggleMicrophone = () => {
    if (!recognitionRef.current) {
      console.warn('El reconocimiento de voz no está disponible.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      console.log('Grabación detenida.');
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      console.log('Grabación iniciada.');
    }
  };


  const controls = {
    microphone: {
      descriptionDisabled: 'Micrófono para ingreso de texto mediante voz. Estado: desactivado...',
      descriptionEnabled: 'Micrófono Activado. Puedes comenzar a hablar.',
    },
    speechSynthesis: {
      descriptionDisabled: 'Generar archivos de audio para respuestas...',
      descriptionEnabled: 'Generar audio del DOBOT. Estado: Activado',
    },
    clearHistory: {
      description: 'Limpiar historial del chat',
    },
    expandChat: {
      description: 'Expandir o contraer interfaz del chat. Estado: Contraído',
      descriptionStatusChanged: 'Expandir o contraer interfaz del chat. Estado: Expandido',
    },
    changeAvatar: {
      description: 'Cambiar imagen de avatar',
    }
  }

  //lectura
  const cleanText = (text) => {
    const patterns = [
      /#{1,3}\s*.+/g,
      /\*\*?.+?\*\*?/g,
      /\d+\.\s/g,
      /\s+/g,
    ];

    const cleaned = patterns.reduce((acc, pattern) => acc.replace(pattern, ' '), text)
      .trim()
      .replace(/\s{2,}/g, ' ');
    return cleaned;
  };

  const readAloud = () => {

    if (!response) {
      changeReadResponse(false);
      alert('No hay texto para leer.');
      return;
    }

    const cleanedText = cleanText(response);

    if (!cleanedText) {
      changeReadResponse(false);
      alert('El texto está vacío después de limpiarlo.');
      return;
    }

    if (!('speechSynthesis' in window)) {
      changeReadResponse(false);
      alert('Tu navegador no soporta la función de lectura en voz alta.');
      return;
    }


    if ('speechSynthesis' in window && cleanedText) {
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        changeReadResponse(false);
      };
      window.speechSynthesis.speak(utterance);
    }


  };
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  return (
    <div
      className="p-[5px] relative transition-all duration-1000"
      aria-label="Panel con controles para la interacción con el DOBOT"
      title="Panel con controles para la interacción con el DOBOT"
    >
      <div className="flex gap-2 justify-center">
        <button
          onClick={toggleMicrophone}
          aria-label={isListening ? controls.microphone.descriptionEnabled : controls.microphone.descriptionDisabled}
          className={`${isListening ? "icon-bot-select" : "icon-bot"} fa fa-microphone`}

        />
        <button
          onClick={() => {
            const newReadResponse = !readResponse;
            changeReadResponse(newReadResponse);
            if (newReadResponse) {
              readAloud();
            } else {
              window.speechSynthesis.cancel();
            }
          }}
          aria-label={readResponse ? controls.speechSynthesis.descriptionEnabled : controls.speechSynthesis.descriptionDisabled}
          className={`${readResponse ? "icon-bot-select" : "icon-bot"}  fa fa-volume-off`}
        />
        <button
          onClick={() => updateMessages([])}
          aria-label={controls.clearHistory.description}
          className="icon-bot icon-bot-reload fa fa-repeat"
        />


        <button
          aria-label={controls.expandChat.description}
          data-contract-title={controls.expandChat.descriptionStatusChanged}
          data-expand-title={controls.expandChat.description}
          className="icon-bot icon-bot-expand fa fa-expand"
        />
        <button
          onClick={() => setShowAvatarPanel(true)}
          aria-label={controls.changeAvatar.description}
          className="icon-bot icon-bot-avatars fa fa-user"
        />
        {showAvatarPanel && (
          <AvatarPanelSelector
            onClose={() => setShowAvatarPanel(false)}
            onSelectAvatar={handleSelectAvatar}
            currentAvatarId={currentAvatar}
          />
        )}

      </div>
    </div>
  )
}


