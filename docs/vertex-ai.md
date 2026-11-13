# Configurar Vertex AI (Gemini) para validar las fotos

La app **no** habla con Google directamente: la foto va a la Edge Function `validate-evidence` y esta llama a Vertex AI con una cuenta de servicio. Así ninguna clave queda dentro del APK.

## 1. Proyecto y facturación
1. https://console.cloud.google.com → **Nuevo proyecto** → `eco-desafios-urbanos`.
2. **Facturación**: vincula la cuenta con el crédito de prueba (300 USD).
3. **Presupuestos y alertas**: crea una alerta de unos 5 USD para vigilar el gasto.

## 2. Activar la API
**APIs y servicios → Biblioteca → Vertex AI API → Habilitar**.

## 3. Cuenta de servicio
1. **IAM y administración → Cuentas de servicio → Crear cuenta de servicio** (`eco-validador`).
2. Rol: **Vertex AI User**.
3. En la cuenta creada: **Claves → Agregar clave → JSON**. Se descarga un archivo `.json`.
4. Guárdalo **fuera** de la carpeta del repositorio (o con el nombre `gcp-key.json`, que está en `.gitignore`). No lo compartas ni lo pegues en ningún chat.

## 4. Guardar los secretos en Supabase (desde el navegador)
En Supabase: **Edge Functions → Secrets** (o **Project Settings → Edge Functions → Secrets**). Agrega uno por uno:

| Nombre | Valor |
|---|---|
| `GCP_PROJECT_ID` | el **ID** del proyecto de Google (no el nombre), p. ej. `eco-desafios-urbanos-123456` |
| `GCP_LOCATION` | `global` |
| `GEMINI_MODEL` | `gemini-3.8-flash` |
| `GCP_SERVICE_ACCOUNT_JSON` | abre el `.json` con el Bloc de notas, copia **todo** y pégalo tal cual |

Pegarlo en el panel evita problemas con comillas y saltos de línea. Ninguno de estos valores va en el `.env` de la app.

## 5. Publicar la función
```powershell
npx supabase login
npx supabase functions deploy validate-evidence --project-ref TU_PROJECT_REF
```
`TU_PROJECT_REF` es el texto entre `https://` y `.supabase.co` de tu Project URL. No hace falta Docker.

## 6. Si Google retira el modelo
Gemini 2.5 Flash se retiró el 20 de octubre de 2026; por eso la app usa `gemini-3.8-flash`, en la ubicación `global`.
Cuando Google retire un modelo, revisa la página oficial *Model versions and lifecycle* de Vertex AI,
cambia el secreto `GEMINI_MODEL` en el panel y listo: no hace falta tocar el código ni generar otro APK.

## Cómo decide la app (la IA apoya, no decide sola)
| Resultado de la IA | Ubicación | Veredicto |
|---|---|---|
| Coincide, confianza ≥ 75 % | presente (o no requerida) | **Aprobada** (suma puntos) |
| Coincide, confianza entre 40 % y 75 % | cualquiera | **En revisión** |
| Coincide con alta confianza | falta y la misión la exige | **En revisión** |
| No coincide o confianza < 40 % | cualquiera | **Rechazada** |

Además, antes de gastar IA se rechazan: la misma foto repetida y una misión ya aprobada el mismo día.
