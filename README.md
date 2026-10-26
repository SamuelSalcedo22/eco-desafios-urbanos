# Eco-Desafíos Urbanos

App móvil de **micro-voluntariado urbano**: el usuario recibe misiones (limpiar un parque, ubicar un punto de reciclaje, reportar un espacio deteriorado, separar residuos), sube evidencia fotográfica y gana puntos. La foto se valida con **visión por computador** (Gemini en Vertex AI), que apoya la decisión pero no es el único mecanismo de verificación.

**ODS:** 11 Ciudades y comunidades sostenibles · 12 Producción y consumo responsables · 13 Acción por el clima.

## Funciones
Misiones · cámara · geolocalización · validación de evidencia · puntos · ranking · recompensas · mapa de actividades · historial de impacto · español e inglés.

## Stack
- **React Native + Expo (SDK 58) + TypeScript** — Android (APK) e iPhone (Expo Go)
- **Supabase** — autenticación, base de datos con RLS y Edge Function
- **Google Cloud Vertex AI (Gemini)** — análisis de las fotos
- **Leaflet + OpenStreetMap** en un WebView — mapa sin API key

## Inicio rápido
```powershell
npm install
npx expo start      # escanea el QR con Expo Go
```
Sin configurar Supabase la app arranca en **modo demo** (todo se guarda en el teléfono) para probar la interfaz.

## Estructura (Atomic Design)
```
src/
  design/        tokens globales, semánticos y de componente + helpers Neo-Brutalist
  components/
    atoms/       NeoBox, Text, Button, Input, Chip, Badge, Icon...
    molecules/   FormField, SearchBar, MissionCard, ErrorMessage, StatTile...
    organisms/   AuthForm, MissionList, EvidenceCapture, ActivityMap, TabBar...
  templates/     ScreenTemplate
  screens/       páginas (Login, Misiones, Evidencia, Mapa, Ranking, Perfil...)
  navigation/    stack raíz + pestañas inferiores
  content/       misiones, categorías y recompensas (el contenido va primero)
  i18n/          textos en español e inglés
  services/      Api (Supabase y modo demo), cámara, ubicación
supabase/        migraciones SQL, semilla y función validate-evidence (Deno)
docs/            guías y documentación de diseño
```

## Documentación
| Documento | Contenido |
|---|---|
| [docs/supabase.md](docs/supabase.md) | Crear el proyecto, tablas, claves y publicar la función |
| [docs/vertex-ai.md](docs/vertex-ai.md) | Cuenta de servicio, secretos y reglas de decisión de la IA |
| [docs/apk-y-iphone.md](docs/apk-y-iphone.md) | Expo Go, generar el APK e iPhone |
| [docs/arquitectura-informacion.md](docs/arquitectura-informacion.md) | Los cuatro sistemas de la arquitectura de información |
| [docs/design-system.md](docs/design-system.md) | Tokens, Atomic Design y estilo Neo-Brutalist |
| [docs/voz-y-tono.md](docs/voz-y-tono.md) | Voz, tono y mensajes de error |

## Calidad
`npm run typecheck` y `npm test` (19 pruebas: decisión de veredicto, filtro de misiones, clasificación de errores, paridad de idiomas y recompensas).

## Seguridad
- La clave de Google vive solo como secreto en Supabase; la app nunca la ve.
- El cliente no puede escribir puntos ni veredictos: solo la Edge Function (service role) inserta envíos.
- Una misión aprobada por día y la misma foto no se acepta dos veces.
- El mapa no expone usuarios y redondea las coordenadas (~110 m).
