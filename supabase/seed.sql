insert into public.missions (id, category, points, evidence_mode, vision_hint, requires_location) values
 ('m-parque-limpieza','parque',50,'before_after','Dos fotos del mismo lugar en un parque o zona pública: la primera con basura visible y la segunda con la zona notablemente más limpia.',true),
 ('m-reciclaje-punto','reciclaje',30,'single','Un contenedor, caneca o estación de reciclaje claramente visible, con colores o símbolos de separación de residuos.',true),
 ('m-deterioro-reporte','deterioro',40,'single','Un espacio público con deterioro visible: basura acumulada, grafiti, mobiliario roto, andén dañado o zona abandonada.',true),
 ('m-residuos-separar','residuos',25,'single','Residuos separados en al menos dos grupos o recipientes distintos (por ejemplo plástico, papel, orgánico).',false)
on conflict (id) do update set
  category = excluded.category, points = excluded.points, evidence_mode = excluded.evidence_mode,
  vision_hint = excluded.vision_hint, requires_location = excluded.requires_location;
