# Smile Centers App

Smile Centers App es una aplicación web que permite a los usuarios ver y filtrar centros de sonrisas (Smile Centers) por zona y tipo de centro. La aplicación utiliza Next.js para el frontend y Axios para las solicitudes HTTP a la API de Smile Centers.

## Características

- Mostrar una lista de centros de sonrisas.
- Filtrar centros por zona.
- Filtrar centros por tipo de centro.

## Requisitos

- Node.js (versión 12 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clona el repositorio:

   ```bash
   git https://github.com/91-julian-sanchez/smile-centers-app.git
   cd smile-centers-app
   ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

## Configuración
Crea un archivo .env.local en la raíz del proyecto con el siguiente contenido:
    ```
    SMILE_CENTERS_API_URL=http://tu-api-url
    ```

## Uso
### Ejecutar en modo de desarrollo
Para iniciar la aplicación en modo de desarrollo, ejecuta:
```
npm run dev
```

### Filtrar Smile Centers
La aplicación Smile Centers permite a los usuarios filtrar los centros de sonrisas por zona y tipo de centro. Aquí se explica cómo funcionan los filtros:

* Filtrar por zona:

Selecciona una zona del menú desplegable "Seleccione zona".
La aplicación enviará una solicitud a la API para obtener los centros de sonrisas que se encuentran en la zona seleccionada.

* Filtrar por tipo de centro:

Selecciona un tipo de centro del menú desplegable "Tipo de centro".
La aplicación enviará una solicitud a la API para obtener los centros de sonrisas que coinciden con el tipo de centro seleccionado.

**Nota:** Si seleccionas "Todas" en cualquiera de los menús desplegables, se mostrarán todos los centros de sonrisas sin aplicar ningún filtro.

## Desplegar en AWS S3
1. Para desplegar la aplicación en AWS S3, sigue estos pasos:

Construye la aplicación:

```
npm run build
```

Los archivos exportados se encontrarán en el directorio out.

2. Sube los archivos del directorio out a tu bucket de S3.

3. Configura el bucket de S3 para alojar un sitio web estático:

Ve a la consola de AWS S3.
* Selecciona tu bucket.
* Ve a la pestaña "Properties".
* En la sección "Static website hosting", selecciona "Enable" y especifica index.html como el documento de índice y index.html como el documento de error.
* Ajusta las políticas de permisos para que los archivos sean accesibles públicamente.