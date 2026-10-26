# Design System

## Estilo: Neo-Brutalism
Bordes negros gruesos (3 px), sombras sólidas desplazadas sin desenfoque, tipografía pesada en mayúsculas, bloques de color planos y fondo crema. La sombra se dibuja con una vista negra detrás (`NeoBox`), por eso se ve igual en Android e iPhone.

## Tokens (3 niveles)
| Nivel | Archivo | Ejemplo |
|---|---|---|
| Globales (valores crudos) | `src/design/tokens/global.ts` | `yellow.500 = #FFC567`, `spacing.4 = 16` |
| Semánticos (propósito) | `src/design/tokens/semantic.ts` | `background.primary = cream.100` |
| De componente | `src/design/tokens/component.ts` | `button.primary.bg = action.primary` |

Paleta Retro: `#FFC567` `#FB7DA8` `#FD5A46` `#552CB7` `#00995E` `#058CD7`, más crema `#FBF7F0` y tinta `#0F0F0F`.

## Tipografía
- Títulos: **Archivo Black**
- Texto: **Space Grotesk** (500 y 700)

## Atomic Design
| Nivel | Carpeta | Ejemplos |
|---|---|---|
| Átomos | `src/components/atoms` | NeoBox, Text, Button, Input, Chip, Badge, Icon |
| Moléculas | `src/components/molecules` | FormField, SearchBar, MissionCard, ErrorMessage, StatTile |
| Organismos | `src/components/organisms` | AuthForm, MissionList, EvidenceCapture, TabBar, RankingList |
| Templates | `src/templates` | ScreenTemplate |
| Páginas | `src/screens` | Login, Misiones, Evidencia, Mapa, Ranking, Perfil |

## Reglas de internacionalización aplicadas
- Ningún botón tiene ancho fijo: crece con el texto y hace wrap.
- Las etiquetas del tab bar se truncan (`numberOfLines={1}`).
- Todos los textos viven en `src/i18n` (español e inglés), con una prueba que verifica que ambos idiomas tengan las mismas claves.
