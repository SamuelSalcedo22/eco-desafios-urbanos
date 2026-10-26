# Probar la app, generar el APK y usar iPhone

## Probar en tu Android con Expo Go (más rápido)
```powershell
npm install
npx expo start
```
Escanea el QR con la app **Expo Go**. Si el celular y el computador no están en la misma red Wi-Fi:
```powershell
npx expo start --tunnel
```

## Generar el APK instalable (Android)
1. Crea tu cuenta en https://expo.dev e instala la herramienta:
   ```powershell
   npm install -g eas-cli
   eas login
   eas init
   ```
2. Si usas Supabase, agrega las variables públicas en `eas.json` dentro de `build.preview.env`:
   ```json
   "env": {
     "EXPO_PUBLIC_SUPABASE_URL": "https://xxxx.supabase.co",
     "EXPO_PUBLIC_SUPABASE_ANON_KEY": "eyJ..."
   }
   ```
   (La *anon key* es pública por diseño. La `service_role` jamás.)
3. Construye:
   ```powershell
   eas build -p android --profile preview
   ```
   El plan gratuito usa una cola, puede tardar de 15 a 60 minutos o más.
4. Al terminar te da un enlace/QR para **descargar el `.apk`**. Ábrelo en tu Android y permite "instalar apps de orígenes desconocidos".

## iPhone sin pagar
- Con **Expo Go** (gratis) escaneas el mismo QR de `npx expo start` con la cámara del iPhone. Sirve para probar y para la sustentación, pero la app funciona dentro de Expo Go, no queda instalada como app propia.
- Si Expo Go dice que la versión del proyecto no es compatible, actualiza Expo Go desde la App Store.
- Un archivo instalable para iPhone (TestFlight o App Store) **requiere** la cuenta Apple Developer (99 USD/año). Sin ella no es posible.

## Comandos útiles
| Comando | Qué hace |
|---|---|
| `npm run typecheck` | Revisa los tipos de TypeScript |
| `npm test` | Ejecuta las pruebas automáticas |
| `npx expo start --clear` | Arranca limpiando la caché |
