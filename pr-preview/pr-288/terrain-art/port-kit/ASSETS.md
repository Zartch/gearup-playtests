# Port kit: Quaternius Ultimate Fantasy RTS port pieces at RPG scale

Candidate asset (not promoted) for the port study of the terrain art scene (`terrain-art.html?scene=port`).
Provenance record: [abom.json](abom.json).

- Source: Quaternius **Ultimate Fantasy RTS** pack, `glTF/Dock_FirstAge.gltf`, `glTF/Port_FirstAge_Level1.gltf`,
  `glTF/Port_FirstAge_Level2.gltf` (hashes in abom.json).
- Plank textures: cropped from the House Lab kit trim sheet `T_WoodTrim_*` (Quaternius Medieval Village MegaKit).
- License: **CC0 1.0 Universal**, https://creativecommons.org/publicdomain/zero/1.0/. Original notice:
  [License_Source.txt](License_Source.txt), copied with CRLF line endings normalized to LF (it names the pack "Ultimate Platformer Pack" by mistake).

## Rebuild

```sh
python scripts/port-kit/derive_planks.py packages/client/public/house-lab/kit <tmp>/tex      # Python 3 + Pillow
blender -b --factory-startup --python scripts/port-kit/build_port_kit.py -- <rts_pack_dir> <tmp>/tex <tmp>/out
```

Copy `<tmp>/out/*` here and update the hashes in abom.json.

## Pieces

glTF frame: +Y up, water surface at y = 0, pier axis along -Z, pieces centred on x = 0.

| Node | Triangles | Size (m) | Notes |
| --- | ---: | --- | --- |
| `Pier_Deck_2m` | 324 | 2.08 × 2.00, top y 0.70 | One 2 m module; planks across the deck, stringers along it. |
| `Pier_Posts` | 20 | 2.23 wide, y -2.65..0.84 | One pile pair centred on z = 0; place every 2 m. |
| `Pier_End` | 172 | 2.11 × 0.52 | Plank end caps; extends to -z from z = 0, rotate π for the other end. |
| `Boat_Rowboat` | 252 | 2.12 × 4.55 × 0.99 | Long axis along z; inner floor at y 0.25; RTS hull × 0.7. |
| `Dock_Hut` | 612 | 4.77 × 2.81 × 4.17 | Canvas roof; back wall at -z, side wall at +x, two open sides. |
| `Prop_Barrel` | 316 | 0.77 × 1.07 | |
| `Prop_Sacks` | 480 | 2.05 × 1.34 × 0.48 | Pile of six sacks. |

Materials (one per name): `GU_WoodPlankDark`, `GU_WoodPlankLight` (plank textures, 1024 × 312 PNG),
`Fabric`, `Metal_Light` (flat RTS colours). Files: 1,429,864 bytes in total.
