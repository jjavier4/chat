// src/app/admin/page.jsx
'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function AdminPage() {
  const [copied, setCopied] = useState({});

  const moodeCode = [
    {
      llave: 'block_chat',
      title: 'block_chat.php',
      code:
        `<?php
class block_chat extends block_base {
    public function init() {
        $this->title = 'Chat';
    }

    public function get_content() {
        if ($this->content !== null) {
            return $this->content;
        }
        $this->content = new stdClass;

            $this->content->text ='<iframe src="http://localhost:3000/" width="100%" height="500"  > </iframe>';


        return $this->content;
    }
}
?>`
    },

    {
      llave: 'version',
      title: 'version.php',
      code:
        `<?php
defined('MOODLE_INTERNAL') || die();

$plugin->component = 'block_chat'; // Nombre único del plugin
$plugin->version = 2025020600; // Versión en formato YYYYMMDDXX
$plugin->requires = 2022041900; // Versión mínima de Moodle requerida
$plugin->maturity = MATURITY_STABLE;
$plugin->release = '1.0';
?>`
    },

    {
      llave: 'access',
      title: 'access.php',
      code:
        `<?php
$capabilities = [
    'block/chat:addinstance' => [
        'captype' => 'write',
        'contextlevel' => CONTEXT_BLOCK,
        'archetypes' => [
            'manager' => CAP_ALLOW
        ],
    ],
];`
    },

    {
      llave: 'lang',
      title: 'lang/en/block_prueba.php',
      code:
        `<?php
$string['pluginname'] = 'chat';
?> `
    },
  ]

  const joomlaCode = [
    {
      llave: 'url',
      title: 'url chat',
      code: 'http://localhost:3000/'
    },
    {
      llave: 'height',
      title: 'height',
      code: '500'
    },
    {
      llave: 'width',
      title: 'width',
      code: '100%'
    },
  ]
  const copyToClipboard = (codeKey, text) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [codeKey]: true });
    setTimeout(() => setCopied({ ...copied, [codeKey]: false }), 2000);
  };

  const images = [
    {
      image: "/deploy/admin.png",
      text: " Entrar como administrador de joomla en el apartado de Modules y seleccionar el tipo Wrapper"
    },
    {
      image: "/deploy/settings.png",
      text: "En el apartado position seleccionar: sidebar-right"
    },
    {
      image: "/deploy/pluginmoodle.png",
      text: `Una vez instalado el plugin entrar como administrador para poder seleccionar el modo edicion,
      Abrir el cajon de bloques ubicado en el lado superior derecho para hacer clic en añadir bloque y seleccionar el plugin creado`
    },
    
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">


      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          Implementación Plataformas
        </h2>

        {/* Moodle*/}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-200 mb-8">
          <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
            Moodle
          </h3>

          <div className="space-y-6">
            <TemplateCopyCode
              title={"Construir proyecto chat dentro del ambiente de moodle siguiendo esta estructura"}
              text={`/moodle/block/
  /chat
    block_chat.php
    version.php
    /db
      access.php
    /lang
      /en
        block_chat.php
`}
              copied={copied}
              copyToClipboard={copyToClipboard}
              llave={'estructura'} />
            <h3 className="text-base font-medium text-gray-800 mb-4 flex items-center">
              Contenido de archivos
            </h3>

            {moodeCode.map((item, index) => (
              <div key={index}><span className="flex-shrink-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mt-1">1.{index + 1}</span>
                <TemplateCopyCode title={item.title} text={item.code} copied={copied} copyToClipboard={copyToClipboard} llave={item.llave} />
              </div>
            ))}

            <TemplateViewImage image={images[2].image} text={images[2].text} />
          </div>
        </div>


        {/* Joomla*/}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-200 mb-8">
          <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
            Joomla
          </h3>

          <div className="space-y-6">
            <TemplateViewImage image={images[0].image} text={images[0].text} />
            <h3 className="text-base font-medium text-gray-800 mb-4 flex items-center">
              Completar caracteristicas esenciales del modulo
            </h3>
            <TemplateViewImage image={images[1].image} text={images[1].text} />
            {joomlaCode.map((item, index) => (
              <div key={index}><span className="flex-shrink-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mt-1">1.{index + 1}</span>
                <TemplateCopyCode title={item.title} text={item.code} copied={copied} copyToClipboard={copyToClipboard} llave={item.llave} />
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
}

const TemplateCopyCode = ({ title, text, copied, copyToClipboard, llave }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-1">
        <p className="text-gray-700 mb-3">{title}</p>
        <div className="relative bg-gray-800 rounded-lg overflow-hidden">
          <pre className="text-gray-100 p-4 overflow-x-auto text-sm font-mono">
            <code>
              {text}
            </code>
          </pre>
          <button
            onClick={() => copyToClipboard(llave, text)}
            className={`absolute top-2 right-2 px-3 py-1 rounded text-sm font-medium ${copied[llave] ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
          >
            {copied[llave] ? '✓ Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>
    </div>
  )
}

const TemplateViewImage = ({ image, text }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-200">
      <div className="flex justify-center mb-6">
        <Image
        alt=''
          src={image}
          width={600}
          height={300}
          className="rounded-lg shadow-md"
        />
      </div>
      <p className="text-gray-700">
        {text}
      </p>
    </div>
  )
}