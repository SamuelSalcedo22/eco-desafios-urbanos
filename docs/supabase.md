# Configurar Supabase (paso a paso, Windows)

## 1. Crear el proyecto
1. Entra a https://supabase.com e inicia sesión.
2. **New project** → nombre `eco-desafios-urbanos` → elige una contraseña de base de datos (guárdala) → región cercana (por ejemplo *South America (São Paulo)*).
3. Espera a que termine de crearse.

## 2. Crear las tablas
En el panel: **SQL Editor → New query**. Pega y ejecuta **en este orden** el contenido de cada archivo:
1. `supabase/migrations/0001_schema.sql`
2. `supabase/migrations/0002_security.sql`
3. `supabase/migrations/0003_triggers.sql`
4. `supabase/seed.sql`

## 3. Autenticación
**Authentication → Providers → Email**: para probar rápido, desactiva *Confirm email*. (Para producción, déjalo activo.)

## 4. Conectar la app
**Project Settings → API**. Copia:
- **Project URL**
- **anon public key** (es pública por diseño)

En la carpeta del proyecto copia `.env.example` a `.env` y completa:
```
EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```
> **Nunca** pongas la `service_role key` en la app ni en el repositorio. Solo vive dentro de Supabase (la Edge Function ya la recibe automáticamente).

Sin `.env`, la app arranca en **modo demo** (datos guardados solo en el teléfono).

## 5. Publicar la función de validación
En PowerShell, dentro de la carpeta del proyecto:
```powershell
npx supabase login
npx supabase link --project-ref TU_PROJECT_REF
npx supabase functions deploy validate-evidence
```
`TU_PROJECT_REF` es el texto entre `https://` y `.supabase.co` de tu Project URL.

Los secretos de Google se configuran en `docs/vertex-ai.md`.
