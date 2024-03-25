# Discord Nuisance Bot

Este proyecto es un bot para Discord que puede detectar cuándo ciertos usuarios entran en un canal de voz y reproducir un sonido. Es un proyecto de código abierto desarrollado por Elias Nacher Fernandez.

## Descripción

El bot `Discord Nuisance` se conecta a un servidor de Discord y monitorea la actividad de los usuarios en los canales de voz. Cuando ciertos usuarios específicos entran en un canal de voz, el bot reproduce un sonido. Esto puede ser útil para notificar la llegada de ciertos usuarios al canal de voz.

## Instalación

Para instalar y ejecutar este bot en tu propio servidor de Discord, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando npm:

npm install discord.js @discordjs/voice

css
Copy code

3. Crea un archivo `config.json` en el directorio raíz del proyecto y proporciona los siguientes detalles:

```json
{
  "prefix": "!d",
  "token": "TU_TOKEN_DE_DISCORD",
  "admins": ["ID_ADMIN_1", "ID_ADMIN_2"],
  "targets": []
}
```
Ejecuta el bot utilizando el siguiente comando:
Copy code
```
node main.js
```

Invita al bot a tu servidor de Discord utilizando el enlace generado por la aplicación Discord Developer Portal.
Uso
Una vez que el bot esté en tu servidor de Discord, puedes usar los siguientes comandos:

!d add @usuario: Agrega a un usuario a la lista de objetivos del bot.

!d remove @usuario: Elimina a un usuario de la lista de objetivos del bot.

!d stop: Detiene al bot y lo desconecta de los canales de voz.

!d start: Inicia al bot y activa su funcionalidad para detectar usuarios en los canales de voz.

!d help: Muestra una lista de comandos disponibles y sus descripciones.

Contribución
Este proyecto es de código libre. Si deseas contribuir, sigue los pasos habituales de fork y pull request en GitHub.

Licencia
Este proyecto se distribuye bajo la licencia GPL. Consulta el archivo LICENSE para obtener más información.