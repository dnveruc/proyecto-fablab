# YuraFab · Bitácora de taller

Proyecto académico del equipo YuraFab en el FabLab de la Universidad de Cuenca.

La bitácora sigue las nueve semanas de la guía del curso. Las evidencias existentes se conservan; cada entrada diferencia el trabajo documentado de los entregables pendientes.

## Editar

- `index.html`: portada, proyecto, acerca de nosotros y biblioteca.
- `assets/bitacora-data.js`: contenido, apartados, pendientes y archivos de cada semana.
- `assets/app.js`: fichas semanales, perfiles y navegación accesible.
- `assets/theme.css`: estilos editables.
- `assets/equipo/`: fotografías del equipo.
- `assets/bitacora/`: evidencias del informe semanal original.
- `assets/descargas/`: plantilla y registro de pendientes.

Cuando se complete una actividad, añadir su evidencia y su archivo real antes de retirar el pendiente correspondiente. Las reflexiones deben redactarse con la experiencia del equipo.

## Presentación pública y pendientes

La página usa `data-show-pending="false"` en `<body>` para mostrar las semanas con evidencias y ocultar temporalmente avisos, plantillas de edición y semanas marcadas como `draft`. Los datos originales y el registro Markdown se conservan.

Para volver a mostrar los pendientes y las nueve semanas, cambiar el atributo a `data-show-pending="true"`. Los fragmentos `data-editorial-pending` reaparecen; los textos alternativos `data-presentation-only` se ocultan. La navegación se adapta a las semanas visibles.

Los valores convencionales de impresión se presentan como referencias; no sustituyen el registro de los parámetros que se utilizaron en el taller.

## Publicar estilos

Desde la raíz del repositorio:

```sh
npx --yes tailwindcss@3.4.17 -c assets/tailwind.config.cjs -i assets/theme.css -o assets/styles.css --minify
```

Guardar también `assets/styles.css`. La página publicada no necesita ejecutar Node ni descargar Tailwind desde un CDN. Actualizar la versión de los recursos en `index.html` cuando cambien para renovar la caché del navegador.

GitHub Pages publica la rama `main` con el flujo de despliegue del repositorio. El marcador `.nojekyll` conserva los archivos estáticos y las plantillas Markdown descargables sin transformarlos.
