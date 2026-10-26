# Voz y tono

**Voz (no cambia):** cercana, enérgica y de barrio. Habla de tú, frases cortas, sin tecnicismos.

**Tono (cambia según el momento del usuario):**
| Momento | Tono | Ejemplo |
|---|---|---|
| Bienvenida | Entusiasta | "Tu ciudad te necesita" |
| Misión aprobada | Celebración | "¡Misión cumplida! Ganaste 50 puntos." |
| Foto en revisión | Tranquilo | "No pudimos confirmarla solos. Un revisor la mirará pronto." |
| Error | Calmado y útil | "No pudimos conectarnos. Revisa tu conexión e intenta de nuevo." |

## Anatomía del mensaje de error
1. **Qué pasó** (en lenguaje del usuario)
2. **Por qué** (solo si ayuda a actuar)
3. **Qué hacer ahora** (acción concreta)

Nunca se muestran códigos internos. Los errores técnicos se traducen en `src/utils/classifyError.ts` y la prueba `src/i18n/parity.test.ts` falla si algún mensaje contiene lenguaje técnico.

| Sistema | Usuario |
|---|---|
| Invalid login credentials | "El correo o la contraseña no coinciden. Revísalos e intenta otra vez." |
| JWT expired | "Tu sesión expiró. Entra de nuevo para continuar." |
| Payload excede el límite | "La foto pesa demasiado. El máximo es 10 MB." |
