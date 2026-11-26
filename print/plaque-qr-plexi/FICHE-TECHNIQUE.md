# Plaque QR — plexiglas transparent · YESIR DESIGN

Fiche à transmettre à l'atelier d'impression / découpe.

## Le QR code
- Lien encodé : `https://yesir-design-web.vercel.app/qr`
- Ce lien redirige vers la page Restaurants du site, avec le suivi `utm_source=qr · utm_medium=print · utm_campaign=plexi`
  (les scans de la plaque sont donc identifiables dans les statistiques).
- La destination peut être changée **sans réimprimer** la plaque (redirection `/qr` dans `next.config.ts`).
- QR version 4, correction d'erreur **Q** (≈ 25 %), 33 × 33 modules, module de 2 mm, QR de 66 mm.
- Testé : décodage OK avec ZXing et OpenCV sur le PDF d'impression et sur les maquettes.
- Distance de scan confortable : jusqu'à environ 60 à 80 cm.

## Support
| | |
|---|---|
| Format fini | **150 × 200 mm** (portrait), coins arrondis R 8 mm |
| Matière | Plexiglas (PMMA) **coulé transparent**, épaisseur **5 mm** (ou 8 mm pour un rendu plus luxueux) |
| Fixation | 4 trous **Ø 8 mm**, centres à **12 mm** des bords · entretoises inox Ø 19 mm (écarteurs 15–20 mm) |
| Découpe | Laser, chants polis flamme si possible |

## Impression (UV à plat, impression recto)
Les fichiers sont prévus pour une impression **recto** (face avant, vue de face).
Pour une impression **verso** (au dos, vue à travers le plexi), l'atelier doit **retourner en miroir** les couches et inverser l'ordre : couleur d'abord, blanc ensuite.

| Fichier / page PDF | Contenu | Encre |
|---|---|---|
| Page 1 · `…_1-COULEUR-CMJN.svg` | QR, accents bleus, textes en couleur | CMJN |
| Page 2 · `…_2-BLANC.svg` | Fond blanc du QR + sous-couche de tous les éléments (et textes blancs de la version sombre). **Le noir = encre blanche 100 %** | Blanc |
| Page 3 · `plaque-qr_3-DECOUPE.svg` | Contour + 4 trous, filet rouge 0,1 mm | Découpe laser |

- Ordre d'impression recto : **blanc d'abord, puis couleur** (le blanc rend la couleur opaque et le QR lisible).
- Le carré blanc derrière le QR est **obligatoire** : sans lui, le QR n'est pas lisible sur un support transparent.
- Tous les textes sont **vectorisés** (aucune police nécessaire). Aucune image matricielle : 100 % vectoriel.
- Couleurs : bleu YESIR `#2B63F0` (≈ C85 M60 J0 N0), bleu clair `#6B8BFF`, encre `#0B0B0D`.

## Deux versions
- **clair** : textes foncés → pour un mur clair, une vitre ou une porte vitrée.
- **sombre** : textes blancs → pour un mur foncé (bois sombre, peinture noire, pierre).

## Fichiers
| Fichier | Usage |
|---|---|
| `plaque-qr-clair_IMPRESSION.pdf` / `plaque-qr-sombre_IMPRESSION.pdf` | **À envoyer à l'atelier** (3 pages : couleur, blanc, découpe) |
| `…_1-COULEUR-CMJN.svg`, `…_2-BLANC.svg`, `plaque-qr_3-DECOUPE.svg` | Les mêmes couches en SVG (mm, échelle 1:1) pour Illustrator / logiciel RIP |
| `…_apercu.svg` | Aperçu composite (BAT) |
| `maquette-clair.png`, `maquette-sombre.png` | Maquettes pour validation et réseaux sociaux |
| `qr-seul_…` | Le QR seul (SVG + PNG) pour stickers, cartes, flyers |

## Avant de lancer la série
1. Vérifier que `https://yesir-design-web.vercel.app/qr` ouvre bien la page Restaurants (après le déploiement Vercel).
2. Demander un **BAT** (épreuve) ou une pièce test, et la scanner avec un iPhone **et** un Android, de face et de biais.
3. Contrôler sur place : pas de reflet direct d'un spot sur le QR (sinon incliner ou déplacer la plaque).
