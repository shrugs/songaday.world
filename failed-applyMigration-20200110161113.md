# Failed applyMigration at 2020-01-10T22:11:13.191Z
## RPC One-Liner
```json
{"id":15,"jsonrpc":"2.0","method":"applyMigration","params":{"projectInfo":"","force":true,"migrationId":"watch-20200110161113","steps":[{"tag":"UpdateArgument","location":{"tag":"Source","source":"db"},"argument":"url","newValue":"env(\"POSTGRES_URL\")"}],"sourceConfig":"datasource db {\n  provider = \"postgresql\"\n  url      = env(\"POSTGRES_URL\")\n}\n\ngenerator photon {\n  provider = \"photonjs\"\n}\n\nmodel User {\n  id    String  @default(cuid()) @id\n  email String  @unique\n  name  String?\n  posts Post[]\n}\n\nmodel Post {\n  id        String   @default(cuid()) @id\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  published Boolean\n  title     String\n  content   String?\n  author    User?\n}\n"}}
```

## RPC Input Readable
```json
{
  "id": 15,
  "jsonrpc": "2.0",
  "method": "applyMigration",
  "params": {
    "projectInfo": "",
    "force": true,
    "migrationId": "watch-20200110161113",
    "steps": [
      {
        "tag": "UpdateArgument",
        "location": {
          "tag": "Source",
          "source": "db"
        },
        "argument": "url",
        "newValue": "env(\"POSTGRES_URL\")"
      }
    ],
    "sourceConfig": "datasource db {\n  provider = \"postgresql\"\n  url      = env(\"POSTGRES_URL\")\n}\n\ngenerator photon {\n  provider = \"photonjs\"\n}\n\nmodel User {\n  id    String  @default(cuid()) @id\n  email String  @unique\n  name  String?\n  posts Post[]\n}\n\nmodel Post {\n  id        String   @default(cuid()) @id\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  published Boolean\n  title     String\n  content   String?\n  author    User?\n}\n"
  }
}
```

## Stack Trace
```bash
Jan 10 16:09:36.305  INFO migration_engine: Starting migration engine RPC server git_hash="e7579bd35e0938dbf773f1706c098a0d14a5a038"
Jan 10 16:09:36.323  INFO quaint::single: Starting a postgresql pool with 1 connections.    
Jan 10 16:09:36.343  INFO ListMigrations: migration_engine::commands::list_migrations: Returning 0 migrations (0 pending).
Jan 10 16:09:36.383  INFO ListMigrations: migration_engine::commands::list_migrations: Returning 0 migrations (0 pending).
Jan 10 16:10:25.180  INFO ListMigrations: migration_engine::commands::list_migrations: Returning 1 migrations (0 pending).
Jan 10 16:10:31.024  INFO ListMigrations: migration_engine::commands::list_migrations: Returning 2 migrations (0 pending).
Jan 10 16:10:34.361  INFO ListMigrations: migration_engine::commands::list_migrations: Returning 3 migrations (0 pending).
Jan 10 16:11:13.122  INFO ListMigrations: migration_engine::commands::list_migrations: Returning 3 migrations (0 pending).
```
