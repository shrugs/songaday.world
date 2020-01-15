# Song A Day World

An experiment for the Song a Day project.

## Goals

1. provide a temporal, cozy space for super fans to interact with the song a day project
2. provide a creator-owned channel for interacting with super fans and releasing songs
3. leverage the catalog of old songs to bring in new fans and re-engage existing fans
4. leverage shared (digital) ownership of the catalog of songs

## Product

> This iteration is an experiment and subject to change.

The 4000+ songs in the Song a Day catalog have been categorized by:

- location,
- topic,
- instrument,
- and mood

and personified by generated minimann avatars. Within the Song a Day World, super fans will be able
to claim and 'own' a song from the catalog, granting them membership to the Song a Day World. Within
the World, their song and associated minimann identify them (with, optionally, a display name).
Due to the inherent scarcity of songs (currently ~4000), only so many fans will be able to
participate in the World. Membership could be given away first-come-first-serve, gated by an
automated market (i.e. bonding curve), or sold for a flat fee. Selection of a song is done via a
'create a character'-style interface, randomly, or by selecting a specific song by date or name.

Within the Song a Day World, fans can interact with the Song a Day Mann and each other in a daily
ephemeral social environment structured around the current song, embedded via YouTube.
When a new song is released, old spaces are archived into a read-only mode (or deleted entirely) and
a new space is created within the context of the latest song. The social space is a simple 2-layer
comment thread, though more interesting modes could be explored.

Another activity for fans, beyond owning a piece of the world record catalog of songs, is building
a dream minimannband, selecting their favorite songs from the catalog and displaying them along
their namesake minimann within the social space.

Optional email/web notifications can notify fans when a new song is released.

## Tasks

- [x] general project setup
- [x] magic code signup/login api
- [x] minimann header component
- [x] minimann avatar component
- [ ] frontend data/fetch/login
- [ ] profile page
  - [ ] auth gateways
  - [ ] edit display name
- [ ] create a minimann / onboarding
  - [ ] search api
  - [ ] claiming api
  - [ ] creation UI
- [ ] social layer
  - [ ] data model & demo seed
  - [ ] youtube embed
  - [ ] social layer api
  - [ ] social layer UI
- [ ] yup input validations
- [ ] rate limiting api endpoints like login/auth
