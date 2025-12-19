# Simulador de transacciones (Angular 19)

Solución frontend para un simulador de transacciones financieras. Enfocado en el uso de Angular 19, reactividad con **Signals** y arquitectura desacoplada basada en el **Patrón Repositorio**.

## Stack

- **Framework**: Angular 19 
- **UI**: Angular Material.
- **Estado**: Angular Signals (Presente en nuevas versiones Angular).
- **Estilos**: SCSS con feature (Light/Dark).
- **Seguridad**: Crypto-JS pare generación de CUS.
- **Contenerización**: Docker.

## Arquitectura

### 1. Reactividad con Signals
No usé Observables para el estado local, opté por Signals

### 2. Patrón Repositoro
La lógica de persistencia se ha encapsulado en `TransactionRepository`.

**Nota**: El patrón repositorio garantiza en este caso que el servicio que lo utiliza es agnóstico a la fuente de datos, en este caso son datos persistidos en localstorage, pero es adaptable para poderse conectar con API’s externas o datos hardcodeados

### 3. Componentes Smart & Presentational
Uso de componentes smart para garantiar poco acoplamiento, usé `@Input()` y `@output()` para manejo de eventos y paso de información 

### 4. Generación de CUS
Los datos de el usuario se encriptan usando la libraría Crypto-js, se usan con una llave simétrica que se encuentra en las variables de entorno y se llama `cryptoKey`

---

## Requisitos Previos

- **Node.js**: v20.x o superior.
- **Docker & Docker Compose** (opcional para despliegue).

## Instalación y Desarrollo

**Instalar dependencias**:
```bash
npm install
```

**Configurar entorno**:

En versiones recientes de Angular, los archivos de entorno no se generan por defecto. Para crearlos, ejecuta:
```bash
ng generate environments
```
En caso de no funcionar, ejecutar el siguiente comando: 
```bash
npx ng generate environments
```
En caso que ninguno funciones, hacerlo manualmente creando la carpeta `src/environments/` y los archivos `environment.ts` y `environment.development.ts`.

Esto generará la carpeta `src/environments/`. Debes configurar los archivos `environment.ts` y `environment.development.ts` de la siguiente manera:

```typescript
export const environment = {
  production: false, // Cambia a true en producción
  // La API es pública, pero se define aquí por buenas prácticas de desacoplamiento
  apiUrl: 'https://randomuser.me/api/?results=50&inc=login,name,email,picture,phone',
  cryptoKey: Valor de llave secreta definido en variables de entorno
};
```

> [!NOTE]  
> Aunque la `apiUrl` apunta a un servicio público (`randomuser.me`), se mantiene en el archivo de entorno para facilitar el cambio entre servicios de Mocking y Producción sin tocar el código fuente, siguiendo el principio de S.O.L.I.D.

**Ejecutar en local**:
```bash
npm run start
```

Acceso normalmente en: http://localhost:4200 o en puerto disponible en el momento de ejecutar el comando.

---

## Despliegue con Docker

El proyecto incluye un Dockerfile multi-etapa para generar una imagen optimizada servida por Nginx.

**Levantar entorno completo**:
```bash
docker-compose up -d --build
```

La aplicación estará disponible en http://localhost:8080.

**Nota para Windows**: Si encuentras errores de EOF con BuildKit, ejecuta:
```bash
$env:DOCKER_BUILDKIT=0; docker-compose up -d --build
```
