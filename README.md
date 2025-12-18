# Simulador de Transacciones - Cotrafa

Este proyecto es una aplicación web moderna diseñada para simular el envío de dinero entre usuarios. Está construida sobre **Angular 19** y utiliza **Angular Material** para ofrecer una interfaz limpia, profesional y con soporte completo para modo oscuro.

La aplicación permite gestionar todo el flujo de una transacción: desde elegir al destinatario y definir el monto, hasta generar un comprobante con un código de seguridad (CUS) encriptado y consultar el historial.

---

## 🛠️ Detalles Técnicos y Arquitectura

En este desarrollo me enfoqué en usar las funcionalidades más recientes de Angular y seguir patrones que faciliten el mantenimiento a largo plazo. Aquí te cuento los puntos clave:

### Gestión de Estado con Signals
En lugar de depender del sistema de detección de cambios tradicional, utilicé **Angular Signals** para manejar el estado de forma granular. 
*   Lo verás aplicado en el sistema de temas (`ThemeService`), donde la app reacciona instantáneamente al cambio entre modo luz y oscuridad.
*   También lo usé en el modal de confirmación para manejar la lógica de "presionar para revelar" el código CUS, lo que hace que la interfaz se sienta mucho más fluida.

### Comunicación entre Componentes
Para mantener los componentes desacoplados, seguí el patrón de *Smart & Presentational Components*. 
*   El formulario de transacción (`TransactionForm`) es un componente "tonto" que no sabe nada de servicios; simplemente valida los datos y usa un **EventEmitter** para avisarle al componente padre que el usuario quiere enviar dinero. 
*   Esto hace que el código sea mucho más fácil de testear y reutilizar.

### Capa de Datos: Patrón Repository
Aunque los datos se guardan en el navegador, decidí implementar un **Repository Pattern**. 
*   El `TransactionRepository` es el único que "habla" directamente con el **LocalStorage**. 
*   ¿Por qué? Porque si mañana el proyecto crece y los datos pasan a una base de datos real o una API, solo tengo que cambiar el código en un solo lugar (el repositorio) sin romper el resto de la aplicación.

### Seguridad y CUS
Cada vez que haces un envío, la app genera un **Código Único de Seguridad (CUS)**. 
*   Para que no sea texto plano, uso `crypto-js` para encriptarlo antes de guardarlo.
*   En el historial verás el código encriptado por seguridad, y solo en el comprobante final permitimos que el usuario lo vea temporalmente mediante una interacción física.

---

## 🐳 Despliegue con Docker (Recomendado)

La forma más profesional y sencilla de probar la aplicación es utilizando **Docker Compose**. Esto automatiza la construcción y configuración de los puertos sin que tengas que escribir comandos largos.

### Cómo ponerlo en marcha

1.  **Levantar el entorno**:
    Este comando se encarga de todo: compila la app, configura el servidor Nginx y lanza el contenedor en segundo plano.
    ```bash
    docker-compose up -d --build
    ```

2.  **¡Listo!**:
    Ya puedes entrar en [http://localhost:8080](http://localhost:8080) para ver la aplicación funcionando.

### Otros comandos útiles

*   **Ver los logs**: `docker-compose logs -f`
*   **Detener la app**: `docker-compose down`

*Nota: He configurado Nginx específicamente para que las rutas de Angular funcionen bien (SPA), así que no tendrás errores al refrescar la página en el historial.*

---

## � Instalación para Desarrollo

Si prefieres el método tradicional:

1.  Baja las dependencias: `npm install`
2.  Arranca el proyecto: `npm run start`
3.  Lo verás en: `http://localhost:4200`
