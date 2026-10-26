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

## 4. Subir los secretos a Supabase
Crea el archivo `supabase/.env.secrets` (está en `.gitignore`):
```
GCP_PROJECT_ID=tu-id-de-proyecto
GCP_LOCATION=us-central1
GEMINI_MODEL=gemini-2.5-flash
GCP_SERVICE_ACCOUNT_JSON=<el JSON en UNA sola línea>
```
Para convertir el JSON a una línea en PowerShell:
```powershell
(Get-Content .\gcp-key.json -Raw | ConvertFrom-Json | ConvertTo-Json -Compress)
```
Luego:
```powershell
npx supabase secrets set --env-file .\supabase\.env.secrets
```

## 5. Verifica el nombre del modelo
Los nombres de modelo de Gemini cambian con el tiempo. Revisa en la consola (**Vertex AI → Model Garden**) o en la documentación oficial cuál es un modelo Gemini "Flash" vigente con soporte de imágenes y, si es distinto, cambia `GEMINI_MODEL` y vuelve a ejecutar el comando de secretos. No hace falta tocar el código.

## Cómo decide la app (la IA apoya, no decide sola)
| Resultado de la IA | Ubicación | Veredicto |
|---|---|---|
| Coincide, confianza ≥ 75 % | presente (o no requerida) | **Aprobada** (suma puntos) |
| Coincide, confianza entre 40 % y 75 % | cualquiera | **En revisión** |
| Coincide con alta confianza | falta y la misión la exige | **En revisión** |
| No coincide o confianza < 40 % | cualquiera | **Rechazada** |

Además, antes de gastar IA se rechazan: la misma foto repetida y una misión ya aprobada el mismo día.
