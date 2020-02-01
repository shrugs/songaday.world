# Song A Day World

An experiment for the Song a Day project.

## Goals

1. provide a temporal, cozy space for fans to interact with the song a day project
2. provide benfits for superfans to own parts of the song catalog
3. provide a creator-owned channel for interacting with fans and releasing songs
4. leverage discovery of the catalog to bring in new fans and re-engage existing fans
5. leverage shared (digital) ownership of the catalog of songs

## Product

> This iteration is an experiment and subject to change.

The 4000+ songs in the Song a Day catalog have been categorized by:

- location,
- topic,
- mood,
- beard,
- and instrument,

and personified by generated minimann avatars. Within the Song a Day World, fans will be able explore the catalog of songs and collect their favorites. Superfans can claim and 'own' a song from the catalog, granting them some sort of benefit in the Song a Day World. Within the World, their song and associated minimannband identify them (with a display name). Due to the inherent scarcity of songs (currently ~4000), only so many fans will be able to become superfans in the World. Song ownership could be given away first-come-first-serve, gated by an automated market (i.e. bonding curve), sold for a flat fee, or given to users for secrets achievements like being the first to comment 5 days in a row. Selection of a song is done via a 'create a character'-style interface, randomly, or by selecting a specific song by date or name. Exploration is done the same way, searching by the various tags available in the database.

Within the Song a Day World, fans can interact with the Song a Day Mann and each other in a daily ephemeral social environment structured around the current song, embedded via YouTube. When a new song is released, old spaces are archived into a read-only mode (or deleted entirely) and a new space is created within the context of the latest song. The social space is a simple 2-layer comment thread, though more interesting modes could be explored.

Another activity for fans, beyond owning a piece of the world record catalog of songs, is building a dream minimannband, selecting their favorite songs from the catalog and displaying them along their namesake minimann within the social space.

Optional email/web notifications can notify fans when a new song is released.

## Tasks

- [x] general project setup
- [x] magic code signup/login api
- [x] minimann header component
- [x] minimann avatar component
- [x] frontend data/fetch/login
- [x] profile page
  - [x] auth gateways with redirect
  - [x] edit display name
- [ ] create-a-minimann / onboarding
  - [x] search api
    - [ ] seed database with songs to search through
  - [x] sync filters to query parameters
  - [x] clicking song tags should start a search with that constraint /songs?tags=[]
  - [x] claiming api
  - [ ] creation UI
- [ ] social layer
  - [ ] data model & demo seed
  - [x] youtube embed
  - [x] basic social layer api
  - [x] social layer UI
  - [ ] admin delete comment functionality
- [ ] yup input validations
- [ ] rate limiting api endpoints like login/auth
- [x] purgecss that actually works
- [ ] early-exit on fetcher and mutator if token/auth is required, to avoid fetching every render lol
- [ ] generate enum/model types for frontend
  - see if we can remove the need for them at all, since they'll be loaded SSR with availableSongs
  - attempting to import @photon/client enums is broken af
- [ ] update minimann layouts
  - [x] make the background images much wider or provide wider variants for larger screens
  - [ ] export the non-background content as 1:1 squares & reposition
- [x] make sure function invocations don't exhause postgres `max_connection`s
  - [ ] use https://aws.amazon.com/blogs/compute/using-amazon-rds-proxy-with-aws-lambda/ with aurora?
- [x] implement getInitialProps & transition to cookie auth so it works on the server
  - [x] on the client, after recieving token, put the token into cookies instead of localstorage
  - [x] pull token from cookie in getInitialProps
  - [x] include credentials in fetch requests (this seems to be the default)
  - [x] create a getInitialProps wrapper that handles throws ala api route handler
  - [x] accept that initial data in the useSWR hook
  - [x] make sure useSWR is using our cached results for child components that request the same data
    - this doesn't seem to be automatic?
    - maybe pages with getInitialProps should be the only components with data fetching? seems limiting.
- [ ] youtube data sync
  - [ ] sign up for youtube api & setup api key
  - [ ] subscribe to video publish events by jonathan & filter for songaday videos
  - [ ] on publish, create video
  - [ ] on update, update title and description
- [ ] beard clean cutdown
- [x] login/auth pages should respect to param
- [x] implement email sending for auth flow
  - [ ] make sure links include ?to= param for redirects
  - [ ] auth page should accept code, perform login, and then redirect, just like login page
- [ ] return only .song from user/get instead of all of their collected songs if we're only showing a single song per user as avatar
- [x] figure out why setToken(undefined) doesn't let the cache reset
  - what's happening is that initialData is still known for a pageload that occurs while logged in so when we nuke the token, we end up calling useSWR with the old initial data
  - a solution is to only provide initialData on the first invocation at all
- [ ] include spotify, bandcamp, etc links in model/ui
- [ ] on instrumental tracks, don't show mood, beard, or instrument
- [ ] replace react-spring with basic css animations
