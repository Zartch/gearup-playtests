# Quaternius nature assets for the terrain art study

This is a minimal, unchanged subset of **Stylized Nature MegaKit [Standard]** by Quaternius, obtained from the author's free itch.io download on 2026-10-23. The Standard edition contains 68 of the complete pack's 116 models. No paid models or engine-specific shaders are included.

- Author's page: https://quaternius.com/packs/stylizednaturemegakit.html
- Download source: https://quaternius.itch.io/stylized-nature-megakit
- License: **CC0 1.0 Universal (CC0 1.0), Public Domain Dedication**.
- License URL: https://creativecommons.org/publicdomain/zero/1.0/
- Original license notice: [License_Standard.txt](License_Standard.txt).
- Original archive: `Stylized Nature MegaKit[Standard].zip`, 104,088,529 bytes.
- Archive SHA-256: `298f6732b872e4cf7b30e6e7abf9641c7f6dc6b326df37ac089533ed7e3d58c9`.

## Models

Load these URLs with the existing Three.js GLTFLoader. Keep the adjacent `.bin` and `.png` files at the same relative paths. Each glTF has one named mesh node and no node transform. Model geometry extends slightly below local Y=0; preserve that shallow ground penetration when placing it.

| Relative URL | Role | Triangles | glTF + buffer bytes | Approximate height |
| --- | --- | ---: | ---: | ---: |
| `CommonTree_1.gltf` | Broadleaf tree | 6,265 | 495,445 | 7.265 |
| `CommonTree_3.gltf` | Taller broadleaf silhouette | 3,505 | 300,848 | 9.425 |
| `Pine_2.gltf` | Pine silhouette | 3,648 | 262,169 | 7.376 |
| `Rock_Medium_1.gltf` | Large rounded rock | 342 | 15,115 | 2.260 |
| `Rock_Medium_2.gltf` | Low rock | 244 | 11,257 | 1.899 |
| `Bush_Common.gltf` | Low shrub | 900 | 93,901 | 1.582 |
| `Grass_Common_Short.gltf` | Grass clump | 155 | 9,075 | 1.334 |

The heights describe each complete geometry bounding box in its original coordinates. No scale or pivot changes have been baked into these files. The subset contains no LOD variants, animation, rig, wind shader or placement metadata.

## Shared textures and materials

| Texture | Size | Bytes | Used by |
| --- | --- | ---: | --- |
| `Bark_NormalTree.png` | 2048 x 2048 | 3,894,788 | All three tree trunks |
| `Bark_NormalTree_Normal.png` | 2048 x 2048 | 4,384,496 | All three tree trunk normal maps |
| `Leaves_NormalTree_C.png` | 1024 x 1024 | 158,796 | Both broadleaf trees |
| `Leaf_Pine_C.png` | 2048 x 2048 | 70,055 | Pine leaves |
| `Leaves_TwistedTree_C.png` | 1024 x 1024 | 70,353 | Bush |
| `Rocks_Diffuse.png` | 2048 x 2048 | 2,517,398 | Both rocks |
| `Grass.png` | 512 x 512 | 33,605 | Grass |

All files use core glTF 2.0 metallic-roughness materials, with metallic factor zero. None declares `extensionsUsed` or `extensionsRequired`; no Draco, meshopt, KTX2, custom shader or extra decoder is needed. Material names are `Bark_NormalTree`, `Leaves_NormalTree`, `Leaves_Pine`, `Leaves_TwistedTree`, `Rocks` and `Grass`.

Tree bark, tree leaves and bush use `alphaMode: MASK`, cutoff approximately 0.2, and double-sided rendering. Rock and grass materials are opaque and double-sided. Material names and image URLs repeat across models; consumers can reuse matching materials/textures when instancing the study scene. The glTF assets contain the source materials separately for each file.

The unchanged selection comprises seven glTF files, seven binary buffers, seven PNG textures and the original license notice: **22 files, 12,318,153 bytes**, excluding this manifest. Texture resolution and double-sided foliage are retained from the author; this selection has not been optimized or benchmarked for mobile.

## Verification

- Every external buffer and image reference resolves within this directory.
- Buffer byte lengths match the declarations in each glTF.
- Extracted files retain the archive filenames and original bytes.
- No application code, terrain data, gameplay rules or Paint tools were changed to prepare this subset.

## Optional neutral bush texture

`Leaves_TwistedTree.png` is one additional unchanged PNG from the same Standard archive (`glTF/Leaves_TwistedTree.png`, 69,611 bytes, 1024 x 1024). It is the author's neutral white version of the bush texture. The original `Bush_Common.gltf` continues to reference its burgundy `Leaves_TwistedTree_C.png`; no source glTF or source PNG was overwritten.

For this temperate presentation, the runtime may substitute `/terrain-art/quaternius/Leaves_TwistedTree.png` for the material named `Leaves_TwistedTree` and tint that material green. Preserve the glTF texture conventions: sRGB color, `flipY = false`, alpha-mask cutoff approximately 0.2 and double-sided rendering. A green multiplier over the original burgundy texture cannot produce the same result. The neutral and colored versions share identical alpha channels.

This optional image raises the original-source selection to 23 files and 12,387,764 bytes, excluding this manifest. It is a presentation choice, not a claim that the author labels these variants as seasonal states.

## Study loading and publication

The study's `createNatureAssetLoader` maps the bush image URI to the neutral PNG before requesting or decoding it. Its manager-scoped image cache shares decoded sources across the seven glTF parsers while preserving separate texture sampler and color-space settings. It does not enable the global Three.js cache.

Production builds omit only `Leaves_TwistedTree_C.png` from this directory; the study loader supplies its neutral replacement. All seven source glTFs, their buffers, the seven used PNGs, this manifest and the original license notice remain published. The complete source selection, including the burgundy PNG, remains unchanged in `public/terrain-art/quaternius/` for provenance. Loading a published glTF independently requires the same bush URI mapping.
