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

## Modo claro y oscuro

El usuario elige en **Perfil → Apariencia**: *Sistema* (sigue al teléfono, por defecto), *Claro* u *Oscuro*. La elección se guarda en el teléfono.

- **Tokens:** `semantic.ts` define dos esquemas (`schemes.light` y `schemes.dark`) para fondos, texto, bordes y sombra. Los colores Retro de acción y categoría son iguales en ambos.
- **Neo-Brutalism invertido:** en oscuro el fondo es casi negro cálido (`night`) y los bordes gruesos y sombras duras pasan de tinta a crema, así el estilo se mantiene.
- **Contraste automático:** `contentOn(bg)` (en `design/theme.ts`) elige texto tinta o crema según el fondo; `NeoBox`, `Badge`, `Chip` y la barra de pestañas lo aplican a su contenido con `OnSurface`. Todos los pares cumplen WCAG AA (≥ 4,5:1).
- **Detalles:** el mapa usa teselas nocturnas, la franja "URBANOS" de la intro pasa a crema con morado y la barra de estado cambia a texto claro.
