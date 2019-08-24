# Migration `20190824102700-fresh`

This migration has been generated at 8/24/2019, 10:27:00 AM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "file:dev"."User"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,"email" TEXT NOT NULL DEFAULT '' ,"password" TEXT   ,"resetToken" TEXT   ,"resetTokenExpiry" INTEGER   ,"plan" TEXT   REFERENCES "Plan"(id) ON DELETE SET NULL,PRIMARY KEY ("id"));

CREATE TABLE "file:dev"."Plan"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,"name" TEXT   ,"level" INTEGER NOT NULL DEFAULT 0 ,"siteLimit" INTEGER   ,PRIMARY KEY ("id"));

CREATE TABLE "file:dev"."UserSite"("id" TEXT NOT NULL  ,"createdAt" DATE   ,"updatedAt" DATE   ,"associatesApiKey" TEXT   ,"contentSelector" TEXT   ,"scanFreq" TEXT   ,"user" TEXT   REFERENCES "User"(id) ON DELETE SET NULL,"site" TEXT   REFERENCES "Site"(id) ON DELETE SET NULL,PRIMARY KEY ("id"));

CREATE TABLE "file:dev"."Site"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,"hostname" TEXT NOT NULL DEFAULT '' ,PRIMARY KEY ("id"));

CREATE TABLE "file:dev"."Page"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,"url" TEXT NOT NULL DEFAULT '' ,"pageTitle" TEXT   ,"wordCount" INTEGER   ,"site" TEXT   REFERENCES "Site"(id) ON DELETE SET NULL,PRIMARY KEY ("id"));

CREATE TABLE "file:dev"."Link"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,"href" TEXT NOT NULL DEFAULT '' ,"affiliateTagged" BOOLEAN   ,"affiliateTagName" TEXT   ,"anchorText" TEXT   ,"page" TEXT   REFERENCES "Page"(id) ON DELETE SET NULL,"product" TEXT   REFERENCES "Product"(id) ON DELETE SET NULL,PRIMARY KEY ("id"));

CREATE TABLE "file:dev"."Product"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,"name" TEXT   ,"asin" TEXT NOT NULL DEFAULT '' ,"availability" TEXT NOT NULL DEFAULT 'AMAZON' ,PRIMARY KEY ("id"));

CREATE UNIQUE INDEX "file:dev"."User.id._UNIQUE" ON "User"("id")

CREATE UNIQUE INDEX "file:dev"."User.email._UNIQUE" ON "User"("email")

CREATE UNIQUE INDEX "file:dev"."Plan.id._UNIQUE" ON "Plan"("id")

CREATE UNIQUE INDEX "file:dev"."Plan.name._UNIQUE" ON "Plan"("name")

CREATE UNIQUE INDEX "file:dev"."Plan.level._UNIQUE" ON "Plan"("level")

CREATE UNIQUE INDEX "file:dev"."UserSite.id._UNIQUE" ON "UserSite"("id")

CREATE UNIQUE INDEX "file:dev"."Site.id._UNIQUE" ON "Site"("id")

CREATE UNIQUE INDEX "file:dev"."Site.hostname._UNIQUE" ON "Site"("hostname")

CREATE UNIQUE INDEX "file:dev"."Page.id._UNIQUE" ON "Page"("id")

CREATE UNIQUE INDEX "file:dev"."Page.url._UNIQUE" ON "Page"("url")

CREATE UNIQUE INDEX "file:dev"."Link.id._UNIQUE" ON "Link"("id")

CREATE UNIQUE INDEX "file:dev"."Product.id._UNIQUE" ON "Product"("id")

CREATE UNIQUE INDEX "file:dev"."Product.asin._UNIQUE" ON "Product"("asin")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20190824102700-fresh
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,91 @@
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
+  id               String     @default(cuid()) @id @unique
+  createdAt        DateTime   @default(now())
+  updatedAt        DateTime   @updatedAt
+  email            String     @unique
+  password         String?
+  resetToken       String?
+  resetTokenExpiry Int?
+  sites            UserSite[]
+  plan             Plan?
+}
+
+model Plan {
+  id          String   @default(cuid()) @id @unique
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @updatedAt
+  name        String?  @unique
+  level       Int      @unique
+  subscribers User[]
+  siteLimit   Int?
+}
+
+model UserSite {
+  id               String    @default(cuid()) @id @unique
+  createdAt        DateTime? @default(now())
+  updatedAt        DateTime? @updatedAt
+  associatesApiKey String?
+  contentSelector  String?
+  user             User
+  site             Site
+  scanFreq         String?
+}
+
+model Site {
+  id        String     @default(cuid()) @id @unique
+  createdAt DateTime   @default(now())
+  updatedAt DateTime   @updatedAt
+  hostname  String     @unique
+  pages     Page[]
+  userSites UserSite[]
+}
+
+model Page {
+  id        String   @default(cuid()) @id @unique
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  url       String   @unique
+  pageTitle String?
+  wordCount Int?
+  links     Link[]
+  site      Site
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
+  asin         String       @unique
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

You can use a specific Photon built for this migration (20190824102700-fresh)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190824102700-fresh'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
