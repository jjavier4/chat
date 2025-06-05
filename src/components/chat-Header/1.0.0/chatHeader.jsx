"use client"

const ChatHeader = ({ avatarBot, dobotLogo}) => {
  return (
    <>
      <h5 id="bot-unad__main-title" className="text-[0px]">
        DOBOT - Chatbot de consultas relacionadas con el curso. Estado, abierto.
      </h5>

      <img 
        className="rounded-t-lg w-[40%] transition-all duration-1000 relative z-[2] left-[50%]"
        src={avatarBot.src} 
        alt={avatarBot.alt} 
        id={avatarBot.id} 
      />
      <img 
        className="w-[50%] absolute left-[10px] top-[20px] z-[1]"
        src={dobotLogo.src} 
        alt={dobotLogo.alt}
      />
    </>
  );
};

export default ChatHeader;