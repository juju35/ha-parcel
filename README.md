# ha-parcel

[![HACS Badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![Validate](https://github.com/juju35/ha-parcel/actions/workflows/validate.yml/badge.svg)](https://github.com/juju35/ha-parcel/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Intégration Home Assistant pour [Parcel](https://parcelapp.net) : consultez vos colis suivis dans Parcel et ajoutez-en de nouveaux, avec une carte Lovelace incluse.

<img src="https://raw.githubusercontent.com/juju35/ha-parcel/main/screenshots/parcel-card-0.1.6.png" alt="parcel-card" width="380">

## Fonctionnalités

- Capteur **Colis** : nombre de colis en cours, avec tous les colis (statut, transporteur, événements, date prévue) en attributs
- Action `parcel.add_delivery` pour ajouter un colis depuis une automatisation, un script ou la carte
- Action `parcel.refresh` pour forcer une mise à jour
- Carte `custom:parcel-card` **incluse dans l'intégration** et chargée automatiquement : liste des colis, détail des événements au clic, formulaire d'ajout avec recherche du transporteur
- Clé d'API saisie dans l'interface, jamais dans le YAML
- Français / anglais

## Prérequis

- Un abonnement **Parcel Premium** (l'API y est réservée)
- Une clé d'API, à générer sur [web.parcelapp.net](https://web.parcelapp.net)

## Installation via HACS (recommandé)

[![Ajouter à HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=juju35&repository=ha-parcel&category=integration)

Ou manuellement :

1. Ouvrir HACS → ⋮ → **Dépôts personnalisés**
2. Ajouter `https://github.com/juju35/ha-parcel` — Catégorie : **Intégration**
3. Rechercher **Parcel** et l'installer
4. Redémarrer Home Assistant

La carte est **incluse dans l'intégration** : au démarrage, elle est ajoutée automatiquement aux ressources du tableau de bord (`/parcel_static/parcel-card.js`, type module). Après une installation ou une mise à jour, redémarrez Home Assistant puis rafraîchissez le navigateur (vider le cache de l'application mobile si besoin).

Si vos tableaux de bord sont en mode YAML, la carte est chargée sur toutes les pages sans passer par les ressources.

## Installation manuelle

Copiez le dossier `custom_components/parcel/` dans `/config/custom_components/parcel/`, puis redémarrez Home Assistant.

## Configuration

[![Ajouter l'intégration](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=parcel)

**Paramètres → Appareils et services → Ajouter une intégration → Parcel**, puis collez votre clé d'API.

Options (bouton **Configurer**) :

| Option | Défaut | Description |
|---|---|---|
| Colis à afficher | Récents | `recent` : en cours et livrés récemment. `active` : en cours uniquement |
| Intervalle de mise à jour | 10 min | Minimum 5 min : Parcel limite l'API à 20 requêtes par heure |

## Carte

```yaml
type: custom:parcel-card
```

| Option | Défaut | Description |
|---|---|---|
| `entity` | détectée | Capteur Parcel à afficher (utile avec plusieurs comptes) |
| `title` | « Colis » | Titre de la carte |
| `show_icon` | `true` | Afficher l'icône Parcel à côté du titre |
| `show_delivered` | `true` | Afficher les colis livrés |
| `show_add` | `true` | Afficher le bouton d'ajout |
| `show_refresh` | `true` | Afficher le bouton d'actualisation (compte dans la limite de 20 requêtes par heure) |
| `max_events` | `5` | Nombre d'événements affichés quand un colis est déplié |

Cliquez sur un colis pour voir ses événements, sur le numéro de suivi pour le copier.

## Ajouter un colis depuis une automatisation

```yaml
action: parcel.add_delivery
data:
  tracking_number: "6A12345678901"
  carrier_code: colissimo
  description: Casque audio
  send_push_confirmation: true
```

Les codes transporteurs sont listés dans [supported_carriers.json](https://api.parcel.app/external/supported_carriers.json). Utilisez `pholder` pour un colis sans suivi.

> Parcel limite les ajouts à **20 par jour**, échecs compris. Un colis ajouté apparaît après la prochaine mise à jour côté Parcel.

## Statuts

| Code | Statut |
|---|---|
| 0 | Livré |
| 1 | Sans mise à jour |
| 2 | En transit |
| 3 | À retirer |
| 4 | En cours de livraison |
| 5 | Introuvable |
| 6 | Échec de livraison |
| 7 | Problème |
| 8 | Annoncé |

## Licence

MIT
