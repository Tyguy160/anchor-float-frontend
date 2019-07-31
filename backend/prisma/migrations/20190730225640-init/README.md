# Migration `20190730225640-init`

This migration has been generated at 7/30/2019, 10:56:40 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "file:dev"."User"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,PRIMARY KEY ("id"));

CREATE TABLE "file:dev"."Credential"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,"email" TEXT NOT NULL DEFAULT '' ,"password" TEXT NOT NULL DEFAULT '' ,"user" TEXT NOT NULL  REFERENCES User(id),PRIMARY KEY ("id"));

CREATE TABLE "file:dev"."Domain"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,"hostname" TEXT NOT NULL DEFAULT '' ,PRIMARY KEY ("id"));

CREATE TABLE "file:dev"."Page"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,"url" TEXT NOT NULL DEFAULT '' ,"pageTitle" TEXT   ,"wordCount" INTEGER   ,PRIMARY KEY ("id"));

CREATE TABLE "file:dev"."Link"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,"href" TEXT NOT NULL DEFAULT '' ,"affiliateTagged" BOOLEAN   ,"affiliateTagName" TEXT   ,"anchorText" TEXT   ,"page" TEXT NOT NULL  REFERENCES Page(id),"product" TEXT   REFERENCES Product(id),PRIMARY KEY ("id"));

CREATE TABLE "file:dev"."Product"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,"name" TEXT   ,"asin" TEXT NOT NULL DEFAULT '' ,"availability" TEXT NOT NULL DEFAULT 'AMAZON' ,PRIMARY KEY ("id"));

CREATE UNIQUE INDEX "file:dev"."User.id._UNIQUE" ON "User"("id")

CREATE UNIQUE INDEX "file:dev"."Credential.id._UNIQUE" ON "Credential"("id")

CREATE UNIQUE INDEX "file:dev"."Credential.email._UNIQUE" ON "Credential"("email")

CREATE UNIQUE INDEX "file:dev"."Domain.id._UNIQUE" ON "Domain"("id")

CREATE UNIQUE INDEX "file:dev"."Page.id._UNIQUE" ON "Page"("id")

CREATE UNIQUE INDEX "file:dev"."Link.id._UNIQUE" ON "Link"("id")

CREATE UNIQUE INDEX "file:dev"."Product.id._UNIQUE" ON "Product"("id")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20190730225640-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,71 @@
+datasource db {
+  provider = "sqlite"
+  url      = "file:dev.db"
+  default  = true
+}
+
+generator photon {
+  provider = "photonjs"
+}
+
+model User {
+  id         String       @default(cuid()) @id @unique
+  createdAt  DateTime     @default(now())
+  updatedAt  DateTime     @updatedAt
+  credential Credential[]
+}
+
+model Credential {
+  id        String   @default(cuid()) @id @unique
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  email     String   @unique
+  password  String
+  user      User
+}
+
+model Domain {
+  id        String   @default(cuid()) @id @unique
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  hostname  String
+}
+
+model Page {
+  id        String   @default(cuid()) @id @unique
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  url       String
+  pageTitle String?
+  wordCount Int?
+  links     Link[]
+}
+
+model Link {
+  id               String   @default(cuid()) @id @unique
+  createdAt        DateTime @default(now())
+  updatedAt        DateTime @updatedAt
+  page             Page
+  href             String
+  affiliateTagged  Boolean?
+  affiliateTagName String?
+  product          Product?
+  anchorText       String?
+}
+
+model Product {
+  id           String       @default(cuid()) @id @unique
+  createdAt    DateTime     @default(now())
+  updatedAt    DateTime     @updatedAt
+  name         String?
+  asin         String
+  links        Link[]
+  availability Availability
+}
+
+enum Availability {
+  AMAZON
+  THIRDPARTY
+  UNAVAILABLE
+  NOTFOUND
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190730225640-init)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190730225640-init'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
