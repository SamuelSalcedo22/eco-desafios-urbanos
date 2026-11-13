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

## Movimiento (animaciones)

Las animaciones usan **Reanimated 4** (corren en el hilo nativo, a 60 fps, y funcionan en Expo Go).
Sus valores viven en `src/design/tokens/motion.ts`, igual que colores y espacios: duraciones,
dos resortes (`bouncy` para bloques que caen, `snappy` para tarjetas y textos) y el retraso de cascada.

| Dónde | Qué pasa | Componente |
| --- | --- | --- |
| Al abrir la app | Los 4 bloques de categoría caen y rebotan, el título se estampa y la franja "URBANOS" entra de lado | `motion/AnimatedIntro` |
| Listas (misiones, ranking, recompensas, historial) | Las tarjetas entran en cascada; al filtrar misiones vuelven a entrar | `motion/StaggerItem` |
| Entre pantallas | Detalle desde la derecha, cámara desde abajo, resultado con fundido; pestañas con desplazamiento e icono que salta | `navigation/*`, `organisms/TabBar` |
| Foto aprobada | Confeti con la paleta Retro y los puntos suben de 0 al total | `motion/ConfettiBurst`, `motion/CountUp` |
| Foto rechazada | La tarjeta "niega con la cabeza" | `screens/ResultScreen` |

**Accesibilidad:** si el teléfono tiene activado *Reducir movimiento*, no hay confeti, los puntos
aparecen directo y la intro solo se desvanece.
