# Nahrávání momentek — nastavení (Cloudflare R2)

架itektura: statický web + `api/presign.ts` (Vercel funkce) vydává podepsané
PUT URL; soubory jdou z prohlížeče přímo do R2. Sdílená pravidla formátů a
limitů: `shared/upload-config.ts`.

## 1. Cloudflare R2

1. Cloudflare dashboard → **R2** → aktivovat (vyžaduje platební kartu).
2. **Create bucket** — název `svatba-media`, location *Eastern Europe (eeur)*.
3. **Manage R2 API Tokens → Create API Token** — permission **Object Read & Write**,
   scope pouze na bucket `svatba-media`. Uložit `Access Key ID` a `Secret Access Key`.
4. `Account ID` je na R2 overview stránce.

## 2. CORS na bucketu

Bucket → **Settings → CORS policy** → vložit:

```json
[
  {
    "AllowedOrigins": [
      "https://svatbamarkovi.cz",
      "https://www.svatbamarkovi.cz",
      "http://localhost:3000",
      "http://localhost:4173"
    ],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["Content-Type"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

## 3. Env proměnné

Ve Vercelu (Settings → Environment Variables, prostředí Production + Preview)
podle `.env.example`: `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`,
`R2_BUCKET`, `UPLOADS_ENABLED=true`.

## 4. Vypnutí uploadů po akci

Ve Vercelu přepnout `UPLOADS_ENABLED` na `false` (bez redeploye se projeví při
další invokaci funkce). Web pak hostům ukáže „Nahrávání je momentálně vypnuté.“

## 5. Stažení všech souborů

```ini
# ~/.config/rclone/rclone.conf
[r2]
type = s3
provider = Cloudflare
access_key_id = <ACCESS_KEY_ID>
secret_access_key = <SECRET_ACCESS_KEY>
endpoint = https://<ACCOUNT_ID>.r2.cloudflarestorage.com
```

```bash
rclone copy r2:svatba-media/uploads ~/svatba-momentky --progress
```

Egress je u R2 zdarma — stažení nic nestojí. Soubory jsou členěné
`uploads/<datum>/<jméno-hosta>/<náhodný-prefix>-<název>.<ext>`.

## Lokální vývoj

`npm run dev` obsahuje mock endpointů (`vite.config.ts` → `devUploadMock`),
takže UI lze testovat bez R2 klíčů. Ostrý test: `vercel dev` s vyplněným `.env`,
nebo preview deploy.

## Poznámky k limitům

- Fotky ≤ 50 MB, videa ≤ 500 MB (`shared/upload-config.ts`).
- Whitelist podle přípony (HEIC mívá prázdný MIME): jpg/jpeg/png/heic/heif/webp/avif/gif,
  mp4/mov/m4v/webm/3gp/mkv.
- Presigned PUT neumí vynutit velikost serverově — limit hlídá klient a podepsaný
  Content-Type; nejhorší scénář zneužití = jednotky dolarů za uložiště.
