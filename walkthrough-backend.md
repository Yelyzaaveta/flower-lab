# FlowerLab Backend — Walkthrough

## Що було зроблено

Повна реалізація бекенду FlowerLab: REST API на **Node.js + Express** з **PostgreSQL** та **Cloudinary**.

## Структура бекенду

```
apps/backend/
├── Dockerfile
├── package.json
├── migrations/
│   ├── 001_create_categories.sql
│   ├── 002_create_bouquets.sql
│   ├── 003_create_admins.sql    ← admin: admin@flowerstore.com / admin123
│   └── 004_seed_categories.sql  ← 12 категорій
└── src/
    ├── index.js                 ← Entry point
    ├── config/
    │   ├── db.js                ← PostgreSQL pool
    │   ├── cloudinary.js        ← Cloudinary SDK
    │   └── migrate.js           ← npm run migrate
    ├── models/
    │   ├── bouquet.js           ← CRUD + cursor пагінація + search
    │   ├── category.js          ← CRUD + bouquetsAmount
    │   └── admin.js             ← findByEmail
    ├── middleware/
    │   ├── errorHandler.js      ← { error: { code, message } }
    │   ├── auth.js              ← JWT Bearer
    │   └── upload.js            ← Multer + Cloudinary
    ├── controllers/
    │   ├── bouquetController.js
    │   ├── categoryController.js
    │   ├── authController.js
    │   └── searchController.js
    └── routes/
        ├── bouquets.js
        ├── categories.js
        ├── auth.js
        └── search.js
```

## API Endpoints

| Method | Path              | Auth | Опис                                 |
| ------ | ----------------- | :--: | ------------------------------------ |
| GET    | `/bouquets`       |  —   | Список з cursor-пагінацією + фільтри |
| GET    | `/bouquets/:id`   |  —   | Деталі + 3 related букети            |
| POST   | `/bouquets`       |  ✅  | Створити букет (multipart з фото)    |
| PUT    | `/bouquets/:id`   |  ✅  | Оновити букет                        |
| DELETE | `/bouquets/:id`   |  ✅  | Видалити букет                       |
| GET    | `/categories`     |  —   | Список категорій                     |
| GET    | `/categories/:id` |  —   | Категорія + кількість букетів        |
| POST   | `/categories`     |  ✅  | Створити категорію (multipart з prewiewImgUrl) |
| PUT    | `/categories/:id` |  ✅  | Оновити категорію                    |
| DELETE | `/categories/:id` |  ✅  | Видалити категорію                   |
| POST   | `/auth/login`     |  —   | JWT токен на 24 год                  |
| POST   | `/auth/logout`    |  —   | Logout (200)                         |
| GET    | `/search?q=...`   |  —   | Пошук по name + shortDescription     |

## Тестування — 37/37 ✅

```
--- AUTH ---
  ✅ POST /auth/login → 200
  ✅ Login returns token
  ✅ Login returns role=admin

--- BOUQUET CRUD ---
  ✅ POST /bouquets → 201
  ✅ Created bouquet has id
  ✅ Created 4 bouquets total

--- BOUQUET LIST ---
  ✅ GET /bouquets → 200
  ✅ Returns data array
  ✅ Returns meta with hasMore
  ✅ List has 4 bouquets

--- BOUQUET DETAIL ---
  ✅ GET /bouquets/:id → 200
  ✅ Detail has data.longDescription
  ✅ Detail has data.flowersAmount
  ✅ Detail has relatedBouquets array
  ✅ Related bouquets are from same category

--- BOUQUET UPDATE ---
  ✅ PUT /bouquets/:id → 200

--- ERROR FORMAT ---
  ✅ GET /bouquets/999999 → 404
  ✅ Error format: error.code=NOT_FOUND
  ✅ Error format: error.message exists
  ✅ POST /bouquets without auth → 401
  ✅ Unauth error code=UNAUTHORIZED

--- CATEGORIES CRUD ---
  ✅ 1. Create Category → 201
  ✅ 2. Update Category → 200
  ✅ 3. Delete Category → 200
  ✅ 4. GET /categories → 200
  ✅ Category list has 12 items
  ✅ 5. GET /categories/:id → 200
  ✅ Category has name
  ✅ Category has description
  ✅ Category has bouquetsAmount

--- SEARCH ---
  ✅ GET /search?q=весн → 200
  ✅ Search returns data array
  ✅ Search returns meta
  ✅ Search finds spring bouquets

--- BOUQUET DELETE ---
  ✅ DELETE /bouquets/:id → 200
  ✅ Deleted bouquet returns 404

--- LOGOUT ---
  ✅ POST /auth/logout → 200

RESULTS: 37 passed, 0 failed
```

## Як запустити

```bash
# 1. Запустити PostgreSQL
docker-compose up -d db

# 2. Встановити залежності
cd apps/backend && npm install

# 3. Створити .env (скопіювати .env, заповнити Cloudinary та JWT_SECRET)
mkdir .env

# 4. Запустити міграції
npm run migrate

# 5. Запустити dev сервер
npm run dev
# 🌸 FlowerLab API running on port 3001
```

## Дефолтний адмін

- **Email:** `admin@flowerstore.com`
- **Password:** `admin123`

