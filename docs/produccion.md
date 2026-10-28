# Puesta en producción (la app que instala el profesor)

Objetivo: que el profesor instale el APK, abra la app y todo funcione **sin configurar nada**:
misma base de datos que la tuya y validación de fotos con IA real.

## Cómo está armado

```
App instalada (APK)  ──►  Supabase (en línea)  ──►  Google Vertex AI
                          · Base de datos Postgres      (Gemini)
                          · Autenticación
                          · Función validate-evidence
                            (guarda aquí la clave de Google)
```

- **Servidor en línea:** Supabase cumple el papel que el profesor describió con Render o Railway.
  Es un backend desplegado en internet; la app solo conoce su dirección.
- **Credenciales de Vertex:** viven como *secretos del servidor* en Supabase. Nunca van en la app ni en GitHub.
- **Base de datos:** está en el servidor, así que tus datos y los del profesor son los mismos.
- Si el profesor exige literalmente Render/Railway, avísame y movemos la función a un servidor Node allí.

## Lista de comprobación (en este orden)

1. **Supabase:** sigue `docs/supabase.md` completo (SQL 0001 → 0002 → 0003 → seed, y desplegar la función).
2. **Correo sin confirmación:** *Authentication → Providers → Email* → desactiva **Confirm email**.
   Si no, el profesor no podría registrarse (el correo gratis de Supabase solo envía 2–4 mensajes por hora).
3. **Cuenta lista para el profesor** (opcional pero recomendable): *Authentication → Users → Add user →
   Create new user*, con correo y contraseña, marcando **Auto Confirm User**. Dale esos datos.
4. **Vertex AI:** sigue `docs/vertex-ai.md` y sube los secretos con
   `npx supabase secrets set --env-file .\supabase\.env.secrets`.
5. **Variables de la app en EAS** (la dirección y la clave *anon*, que son públicas por diseño):
   ```powershell
   npx eas-cli env:create --environment preview --name EXPO_PUBLIC_SUPABASE_URL --value "https://TU-PROYECTO.supabase.co" --visibility plaintext
   npx eas-cli env:create --environment preview --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "TU-CLAVE-ANON" --visibility plaintext
   ```
   Jamás pongas aquí la clave `service_role` ni el JSON de Google.
6. **Generar el APK:** `npx eas-cli build -p android --profile preview`. Al terminar, EAS da un enlace de descarga.
7. **Publicar el APK:** en GitHub → *Releases → Draft a new release*, sube el `.apk` y publica.
   El profesor descarga desde ahí; no necesita cuenta de Expo.
8. **Evitar que Supabase se duerma:** el plan gratis pausa el proyecto tras ~7 días sin uso.
   En GitHub → *Settings → Secrets and variables → Actions* crea `SUPABASE_URL` y `SUPABASE_ANON_KEY`;
   la tarea `keepalive.yml` lo despierta cada 3 días.
9. **Prueba de humo** (hazla tú antes de entregar, con el APK ya instalado):
   registrar usuario → abrir una misión → subir foto → recibir veredicto → ver puntos en el ranking.
   Pídele a un amigo que lo repita con otra cuenta en otro teléfono: debe ver tus puntos en el ranking.

## Cómo lo instala el profesor en su computador

La app es de Android. En un computador hay dos caminos:
- **Emulador:** Android Studio → *Device Manager* → crear un teléfono virtual → arrastrar el `.apk` sobre él.
- **Teléfono Android:** abrir el enlace del Release y tocar el archivo descargado (permitir "instalar apps desconocidas").

## Qué pasa si algo falla

- La app **no** cae en modo demo: si el APK se generó sin servidor, muestra un aviso claro
  ("no está conectada al servidor") en lugar de fingir que funciona.
- El crédito de prueba de Google dura 90 días; revisa en *Facturación* que cubra hasta la fecha de evaluación.
