# Pulso Abierto

## Descripción

Pulso Abierto es una aplicación web desarrollada con React y TypeScript que permite consultar los precios de distintas criptomonedas, visualizar información detallada y guardar criptomonedas favoritas.

La aplicación utiliza la API de CoinGecko para obtener los precios actualizados de Bitcoin, Ethereum y Solana.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router
- CSS
- Zod para la validación de formularios
- Vitest para las pruebas automatizadas
- ESLint para el análisis del código
- API de CoinGecko

## Instalación

Para descargar e instalar las dependencias del proyecto, ejecutar:

```bash
npm install
```

## Ejecutar en desarrollo

Para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
```

## Pruebas automatizadas

Para ejecutar las pruebas:

```bash
npm run test:run
```

## Análisis del código

Para ejecutar ESLint:

```bash
npm run lint
```

## Generar el build de producción

Para compilar la aplicación:

```bash
npm run build
```

## Comprobar la versión de producción

Después de generar el build, ejecutar:

```bash
npm run preview
```

## Despliegue

La aplicación se encuentra publicada en Vercel:

https://pulso-abierto-react-eight.vercel.app

El código fuente se encuentra disponible en GitHub:

https://github.com/FranLl017/pulso-abierto-react__

## Mejora de mantenibilidad

**Problema identificado:**

En el servicio encargado de consultar los precios de las criptomonedas se repetía manualmente la estructura de los objetos de Bitcoin, Ethereum y Solana.

**Cambio realizado:**

Se modificó el archivo `src/services/CryptoService.ts` para organizar los datos básicos de las criptomonedas en una lista y utilizar el método `map()` para generar los resultados con sus respectivos precios.

Esta modificación permite evitar la repetición de código y facilita el mantenimiento del servicio.

**Comprobaciones realizadas:**

Después de realizar el cambio se ejecutaron las siguientes comprobaciones:

- `npm run test:run`: las pruebas automatizadas finalizaron correctamente.
- `npm run build`: el proyecto compiló correctamente para producción.
- `npm run lint`: el análisis del código finalizó correctamente.

También se comprobó que la aplicación continúa funcionando y mostrando los precios de las criptomonedas correctamente.