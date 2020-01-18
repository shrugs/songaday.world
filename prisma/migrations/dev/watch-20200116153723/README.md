# Migration `watch-20200116153723`

This migration has been generated by Matt Condon (shrugs) at 1/16/2020, 3:37:23 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "songadayworld"."Song" DROP COLUMN "mood",
ADD COLUMN "mood" text  NOT NULL DEFAULT 'Pensive',
DROP COLUMN "topic",
ADD COLUMN "topic" text  NOT NULL DEFAULT 'Poetic';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration watch-20200116151005..watch-20200116153723
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("POSTGRES_URL")
 }
 generator photon {
   provider = "prisma-client-js"
@@ -9,8 +9,10 @@
 // via https://docs.google.com/spreadsheets/d/18jj0J-IiKvwdnhligRVQR_7dpxLKIIvDh9B4bCwtEM0/edit#gid=0
 enum Location {
   Vermont
+  LosAngeles
+  Oakland
 }
 enum Topic {
   Poetic
```

