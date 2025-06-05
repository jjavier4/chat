# Chat-Moodle-Joomla

## Tabla de Contenidos

- [Características](#características)
- [Estructura](#estructura)
- [Despliegue](#despliegue)
- [Integración](#integración)


## Características

- **Interfaz de chat moderna** con mensajes en tiempo real
- **Selección de avatar** personalizable
- **Funciones de accesibilidad**:
  - Dictado por voz 🎤
  - Lectura de respuestas 📢
- **Integración simple** con Moodle y Joomla
- **Dockerizado** para fácil despliegue 🐳

## Estructura
chat-moodle-joomla/
├── public/ #recursos de avatares
├── src/
│ ├── app/
│ │ ├── admin/ # Docs de integración
│ │ └── page.jsx # Punto de entrada
│ ├── components/
│ │ ├── avatar-panel-selector/ # Selector de avatares
│ │ ├── chat-container/ # Contenedor principal
│ │ ├── chat-controls/ # Controles (voz, etc.)
│ │ ├── chat-header/ # Cabecera con logo
│ │ ├── chat-input-form/ # Formulario de mensaje
│ │ └── chat-messages/ # Historial de chat
│ └── css/
│ └── chat.css # Estilos personalizados para los botones de chat-controls y animacion de respuesta del chat
├── Dockerfile 
└── docker-compose.yml

##  Despliegue
Construye y ejecuta con Docker:
docker-compose up --build

##  Integración
Para Moodle:
Seguir los pasos para construir el plugin en /app/admin

Instalar en Moodle via panel de administración

Activar el módulo

Para Joomla:
Seguir los pasos en /app/admin para construir el Componentes > Chat-Moodle-Joomla