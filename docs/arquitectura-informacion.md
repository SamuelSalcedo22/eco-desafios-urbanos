# Arquitectura de información

Aplicación de los **cuatro sistemas** vistos en clase a Eco-Desafíos Urbanos.

## 1. Organización
Modelo **faceted / multidimensional**: las misiones se organizan por categoría (parque, reciclaje, espacio deteriorado, residuos) y se pueden combinar filtros (categoría + texto). Las pantallas siguen una **jerarquía estricta** (Misiones → Detalle → Evidencia → Resultado) y el registro/ingreso es un flujo **secuencial lineal**.

```
Onboarding (solo la primera vez) → Login / Registro
Main (navegación global, 4 pestañas)
 ├─ Misiones ─→ Detalle ─→ Evidencia ─→ Resultado
 ├─ Mapa
 ├─ Ranking
 └─ Perfil (impacto, historial, idioma, cerrar sesión)
```

## 2. Etiquetado
Vocabulario unívoco: cada categoría tiene **un solo nombre, un solo color y un solo icono** en toda la app (`src/content/categories.ts`). El lenguaje es el del usuario ("Se guardaron los cambios"), no el del sistema.

| Categoría | Color | Icono |
|---|---|---|
| Parque | verde | hoja |
| Reciclaje | azul | flechas circulares |
| Espacio deteriorado | rosa | llave |
| Residuos | amarillo | caneca |

## 3. Navegación
- **Global (persistente):** bottom nav con 4 pestañas (patrón recomendado para móvil). Las etiquetas se truncan a una línea con puntos suspensivos para soportar idiomas más largos.
- **Contextual (wayfinding):** botón "← Volver" en las pantallas de detalle, chips de categoría como segmentación dentro de Misiones, pasos numerados en el detalle de misión.

## 4. Búsqueda
Búsqueda por **filtrado** en Misiones: texto sin distinguir tildes ni mayúsculas, combinado con el filtro por categoría (`src/utils/filterMissions.ts`, con pruebas automáticas).

## Orden de trabajo
Contenido → jerarquía → estructura → estilo. Los textos reales de las misiones (`src/content/missions.ts`) y los mensajes de error se escribieron **antes** del diseño, para que la interfaz se adapte al contenido y no al revés.
