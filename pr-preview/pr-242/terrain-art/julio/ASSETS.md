# JulioVII terrain textures

Stylized Grass & Dirt by **Julio Sillet / JulioVII**.

- Official source: https://juliovii.itch.io/ftpgrass-dirt
- Author store: https://juliosillet.gumroad.com/l/gsbsgn
- License: **CC-BY**, as stated on both official product pages; the public text does not specify a version. Commercial use is allowed except reselling the assets. The source ZIP contains no separate license file.
- Credit to display: **Stylized Grass & Dirt by Julio Sillet (JulioVII), CC-BY. Textures resized and recompressed.**
- Original archive: `Stylized_GrassAndDirt_JulioVII.zip`, retained locally in Downloads. SHA-256: `706bddc944f28c751a99fccbbd90f8b00cf5f89ea57f534b74aacc469733fd0d`.

## Prepared assets

Each family has `-basecolor.jpg`, `-normal.jpg`, and `-roughness.jpg` at 1024x1024. Exact source entries and file hashes are recorded in `manifest.json`.

| Family | Official material |
|---|---|
| grass | Stylized_HandpaintedGrass_01 |
| dirt | Stylized_HandpaintedDirt_01 |
| sand | Stylized_HandpaintedSand_01 |
| rock | Stylized_HandpaintedStones_02 |
| grass-dirt | Stylized_HandpaintedGrassAndDirt_01 |

## Import notes

Base color is sRGB. Normal and roughness images are linear data. Normals come from the source `normalogl` OpenGL +Y maps, with no green inversion or vertical flip. They were resized with Lanczos and renormalized before JPEG encoding. All images use their official source artwork; no substitute textures were generated.

`texture-preview.jpg` is a labeled contact sheet of the nine original base colors for review.

## Additional cliff material

`cliff-basecolor.jpg`, `cliff-normal.jpg`, and `cliff-roughness.jpg` use **Stone_04** from **Stylized Stone & Wood by Julio Sillet (JulioVII)**, licensed CC-BY (version not specified on the public product page). Official source: https://juliovii.itch.io/stylized-stone-wood . Credit this pack alongside Stylized Grass & Dirt. Resized to 1024 px and recompressed; OpenGL normals renormalized after resize.

Original archive retained in Downloads as `Materials_Stylized_01_JulioVII.zip`; SHA-256: `2c76254cf89e1f72efb8169f79225698a81ab1d9210d08c5625f057509d2df4f`.

## Study publication

Production builds publish the `grass`, `dirt`, `sand` and `cliff` base-color and normal maps used by the scene. They omit the unused `rock-*`, `grass-dirt-*`, all `*-roughness.jpg` maps and the two review contact sheets. This manifest and `manifest.json` remain published as provenance records for the complete prepared selection. The build prunes only its generated copies; all prepared source files remain in `public/terrain-art/julio/`.
