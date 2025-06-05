'use client';

import ChatContainer from '@/components/chat-container/1.0.0/chatContainer';
import { useEffect, useState } from 'react';


export default function ChatbotEmbed() {
  const [user, setUser] = useState({})
  const [token, setToken] = useState({})
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        /**
        // 1. Llave de operaciones
        const resLlave = await fetch(
          'https://aurea2.unad.edu.co/servicios/ws_key.php/52224845dfb0eb6445390bf0b485952e',
          { signal: controller.signal }
        );
        if (!resLlave.ok) throw new Error("Error al obtener llave");
        const { respuesta: llaveOperaciones } = await resLlave.json();
        console.log(llaveOperaciones)
        // 2. Hash SHA-256         
        const llaveTerminalHash = await hashSHA256(".33cc5ab063");
        console.log(llaveTerminalHash)
*/
        /** 
         * 3. Autenticación
         * falta estar dentro del dominio unad
        */
        setUser({ TipoDoc: "CC", Documento: "4881476", RazonSocial: "ALBERTO  MORENO GAITAN", error: "" })
        

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        try {

          const token = await fetch('http://34.73.227.13/api/v1/generate-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
          const infoToken = await token.json();
          setToken(infoToken)
        } catch (error) {
          console.error('Error:', error)
        }

      }
    }

    fetchToken()
  }, [user])

  async function hashSHA256(text) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0-11
    const day = String(today.getDate()).padStart(2, '0');
    const fecha = `${year}${month}${day}`;
    const fechaLlaveDatos = fecha + text
    const encoder = new TextEncoder();
    const data = encoder.encode(fechaLlaveDatos);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  return (
    <ChatContainer token={token} />
  );
}