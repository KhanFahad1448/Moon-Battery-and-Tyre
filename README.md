# Moon Battery and Tyre — Full Stack

Migrated from a TanStack Start single-app project into a proper full-stack setup:

- **`frontend/`** — React 19 + Vite, react-router-dom, Tailwind v4, shadcn/ui components (unchanged), TanStack Query pre-wired for future API calls
- **`backend/`** — Node + Express API, Cloudinary image uploads, optional MongoDB/Mongoose

## What changed from the original project

- Removed `@tanstack/react-start`, `@tanstack/react-router`, `nitro`, and the Lovable TanStack Vite config — this is now a plain client-rendered Vite SPA
- All 30 pages moved from file-based routes (`src/routes/*.jsx`) into `frontend/src/pages/`, wired up in `frontend/src/App.jsx` with `react-router-dom`
- Page `<title>`/meta tags now set via a small `useMeta()` hook instead of TanStack's `head()` export
- All UI components (`components/site`, `components/ui`) carried over as-is, only their router imports were swapped
- Product/blog/service data still lives in `frontend/src/lib/data.js` for now — see "Next steps" below for moving it to the backend
- New `backend/` folder scaffolded with Express, Cloudinary image upload endpoints, and an example Product CRUD + Mongoose model you can adapt

## Getting started

### 1. Frontend

```bash
cd frontend
npm install
cp .env.example .env      # optional for now, only needed once you wire up API calls
npm run dev
```

Runs at `http://localhost:5173`.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Then fill in `.env`:
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — from your [Cloudinary dashboard](https://cloudinary.com/console)
- `MONGO_URI` — optional to start; the server boots fine without it, you'll just get a console warning. Fill this in once you've picked a MongoDB Atlas cluster (or swap `config/db.js` for Postgres/MySQL if you'd rather use those)

```bash
npm run dev
```

Runs at `http://localhost:5000`. Health check: `GET http://localhost:5000/api/health`

## Backend folder structure

```
backend/
├── config/
│   ├── db.js            # MongoDB connection (optional, guarded)
│   └── cloudinary.js    # Cloudinary SDK config
├── controllers/
│   ├── uploadController.js   # image upload/delete logic
│   └── productController.js  # example CRUD, adapt or replace
├── middlewares/
│   ├── upload.js         # multer memory-storage + file validation
│   └── errorHandler.js   # central error handler
├── models/
│   └── Product.js        # example Mongoose schema
├── routes/
│   ├── uploadRoutes.js
│   └── productRoutes.js
├── utils/
│   ├── asyncHandler.js   # avoids try/catch boilerplate
│   └── streamUpload.js   # streams multer buffer to Cloudinary
└── server.js
```

### Testing image upload

Once `.env` is filled in and the server is running:

```bash
curl -X POST http://localhost:5000/api/upload \
  -F "image=@/path/to/photo.jpg"
```

Returns `{ url, publicId }` — `url` is the Cloudinary-hosted image URL you'd save and display; `publicId` is what you'd pass to the delete endpoint later.

## Next steps (not done yet — for you to tackle next)

1. **Pick a database.** `MONGO_URI` is left blank — decide on MongoDB Atlas (free tier works fine) or another DB, then fill it in.
2. **Move `frontend/src/lib/data.js` into the backend.** Right now all tyres/batteries/services/blog posts are hardcoded in the frontend. Once your DB is connected, seed that same data into MongoDB via the `Product` model, and swap the frontend's direct imports (e.g. in `TyresList.jsx`, `Home.jsx`) for calls to `frontend/src/lib/api.js` hitting `GET /api/products`.
3. **Wire up image uploads in the UI** — e.g. an admin form that posts to `/api/upload` and saves the returned URL against a product.
4. **Cart/orders** currently live in `localStorage` via `frontend/src/lib/store.jsx`. Whenever you're ready, that's the natural next thing to move server-side (orders should really live in a database, not just the browser).
5. **Deploy** — frontend to Vercel/Netlify, backend to Render/Railway (both have free tiers and support environment variables the same way as your local `.env`).
