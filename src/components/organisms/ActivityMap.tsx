import React, { useMemo } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { CATEGORY_META } from '../../content/categories';
import { globalTokens as g, neoBorder } from '../../design';
import type { MapActivity } from '../../types';

type Props = { activities: MapActivity[]; center: { latitude: number; longitude: number } };

/** Escapa < para que ningún texto pueda cerrar la etiqueta <script>. */
const safeJson = (v: unknown) => JSON.stringify(v).replace(/</g, '\\u003c');

/**
 * Mapa con Leaflet + OpenStreetMap dentro de un WebView.
 * No necesita API key de Google, así que funciona igual en Expo Go y en el APK.
 */
export function ActivityMap({ activities, center }: Props) {
  const html = useMemo(() => {
    const points = activities.map((a) => ({
      lat: a.latitude,
      lng: a.longitude,
      title: a.title,
      color: CATEGORY_META[a.category].color,
    }));
    return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<style>html,body,#map{height:100%;margin:0}.leaflet-container{background:#FBF7F0;font-family:sans-serif}</style></head>
<body><div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
var pts=${safeJson(points)};var c=${safeJson([center.latitude, center.longitude])};
var map=L.map('map',{zoomControl:true}).setView(c,14);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap'}).addTo(map);
pts.forEach(function(p){L.circleMarker([p.lat,p.lng],{radius:11,color:'#0F0F0F',weight:3,fillColor:p.color,fillOpacity:1}).addTo(map).bindPopup(p.title);});
</script></body></html>`;
  }, [activities, center.latitude, center.longitude]);

  return (
    <View style={[neoBorder('thick'), { height: 460, borderRadius: g.radius.md, overflow: 'hidden' }]}>
      <WebView originWhitelist={['*']} source={{ html }} style={{ flex: 1 }} javaScriptEnabled />
    </View>
  );
}
