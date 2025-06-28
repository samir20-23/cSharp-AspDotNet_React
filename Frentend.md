# HomeFinder React‑Only Frontend Tutorial
 
## Prerequisites

* Node.js (v14+)
* npm (v6+)
* Basic JS and command‑line familiarity

---

## 1. Scaffold the React App

Open your terminal and run:

```bash
PS C:\C-PROJECT\cSharp-AspDotNet_React\B_Application> npx create-react-app HomeFinder
PS C:\C-PROJECT\cSharp-AspDotNet_React\B_Application> cd HomeFinder
```

### 1.1 Install Dependencies

```bash
npm install react-router-dom@6 axios react-icons
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 1.2 Configure Tailwind

**tailwind.config.js**:

```js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

**src/index.css**:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

In **src/index.js**, import the CSS:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

---

## 2. Project Structure

```
HomeFinder/
├─ public/
├─ src/
│  ├─ api/
│  │  └─ mockApi.js
│  ├─ components/
│  │  ├─ dashboard/
│  │  │  ├─ DashboardLayout.jsx
│  │  │  ├─ ListingForm.jsx
│  │  │  └─ ListingList.jsx
│  │  ├─ listings/
│  │  │  ├─ FilterPanel.jsx
│  │  │  ├─ ListingCard.jsx
│  │  │  ├─ ListingGrid.jsx
│  │  │  └─ ListingDetail.jsx
│  │  │  ├─ StageNavigator.jsx
│  │  │  ├─ MediaGallery.jsx
│  │  │  ├─ MapEmbed.jsx
│  │  │  └─ ContactInfo.jsx
│  │  └─ favorites/
│  │     └─ FavoritesContext.jsx
│  ├─ data.json
│  ├─ App.jsx
│  └─ index.js
├─ tailwind.config.js
├─ package.json
└─ README.md
```

---

## 3. Fake Data JSON

Create **src/data.json**:

```json
{
  "listings": [
    {
      "id": "1",
      "title": "Villa Saada",
      "type": "rent",
      "price": 12000,
      "location": { "city": "Casablanca", "neighborhood": "Maarif" },
      "tags": ["sea view", "pet-friendly"],
      "media": [
        { "type": "photo", "url": "/images/villa1.jpg" },
        { "type": "icon", "name": "FaSwimmingPool" },
        { "type": "video", "url": "https://www.youtube.com/embed/xyz" }
      ],
      "contact": { "name": "Amina El Idrissi", "phone": "+212600000000", "email": "amina@example.com" }
    }
    // add more entries as needed
  ]
}
```

---

## 4. Mock API Layer

**src/api/mockApi.js**:

```js
import data from '../data.json';

let listings = [...data.listings];
const delay = ms => new Promise(res => setTimeout(res, ms));

export async function getListings() {
  await delay(300);
  return listings;
}

export async function getListingById(id) {
  await delay(200);
  return listings.find(l => l.id === id);
}

export async function addListing(listing) {
  await delay(200);
  listings.push(listing);
  return listing;
}

export async function updateListing(id, updates) {
  await delay(200);
  listings = listings.map(l => l.id === id ? { ...l, ...updates } : l);
  return listings.find(l => l.id === id);
}

export async function deleteListing(id) {
  await delay(200);
  listings = listings.filter(l => l.id !== id);
  return true;
}
```

---

## 5. Routing & App Setup

**src/App.jsx**:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ListingGrid from './components/listings/ListingGrid';
import ListingDetail from './components/listings/ListingDetail';
import { FavoritesProvider } from './components/favorites/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListingGrid />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
```

---

## 6. Favorites Context

**src/components/favorites/FavoritesContext.jsx**:

```jsx
import { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const add = id => setFavorites(f => [...new Set([...f, id])]);
  const remove = id => setFavorites(f => f.filter(x => x !== id));
  const isFavorite = id => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
```

---

## 7. Dashboard Components

### 7.1 DashboardLayout

**DashboardLayout.jsx**:

```jsx
import { NavLink, Routes, Route } from 'react-router-dom';
import ListingList from './ListingList';
import ListingForm from './ListingForm';

export default function DashboardLayout() {
  return (
    <div className="flex">
      <nav className="w-1/4 p-4 bg-gray-100">
        <NavLink to="/dashboard" end>Listings</NavLink>
        <NavLink to="add">Add Listing</NavLink>
      </nav>
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<ListingList />} />
          <Route path="add" element={<ListingForm />} />
          <Route path="edit/:id" element={<ListingForm editMode />} />
        </Routes>
      </main>
    </div>
  );
}
```

### 7.2 ListingList

**ListingList.jsx**:

```jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../api/mockApi';

export default function ListingList() {
  const [listings, setListings] = useState([]);
  useEffect(() => { api.getListings().then(setListings); }, []);

  return (
    <div className="space-y-4">
      {listings.map(l => (
        <div key={l.id} className="border p-4 flex justify-between">
          <span>{l.title}</span>
          <div>
            <Link to={`edit/${l.id}`} className="mr-2">Edit</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 7.3 ListingForm

**ListingForm.jsx**:

```jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from '../../api/mockApi';

export default function ListingForm({ editMode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: '', type: 'rent', price: '', location: {city:'',neighborhood:''}, tags:[], media:[], contact:{} });

  useEffect(() => {
    if (editMode) api.getListingById(id).then(data => setForm(data));
  }, [editMode, id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    if (editMode) await api.updateListing(id, form);
    else await api.addListing({ ...form, id: Date.now().toString() });
    nav('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full" />
      {/* add inputs for type, price, location, tags (comma separated), media URLs, contact info */}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
    </form>
  );
}
```

---

## 8. Listing Browsing

### 8.1 FilterPanel

**FilterPanel.jsx**:

```jsx
import { useState, useEffect } from 'react';

export default function FilterPanel({ filters, setFilters }) {
  // UI controls: select type, city/neighborhood, tags, price range
  return (
    <div className="p-4 border rounded space-y-3">
      {/* implement select and inputs, call setFilters on change */}
    </div>
  );
}
```

### 8.2 ListingCard

**ListingCard.jsx**:

```jsx
import { Link } from 'react-router-dom';
import { useFavorites } from '../favorites/FavoritesContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function ListingCard({ data }) {
  const { isFavorite, add, remove } = useFavorites();
  const fav = isFavorite(data.id);

  return (
    <div className="border rounded p-4 relative">
      <img src={data.media.find(m=>m.type==='photo').url} alt="" className="h-40 w-full object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{data.title}</h3>
      <p>{data.location.city}</p>
      <p>{data.type === 'rent' ? `${data.price} MAD/mo` : `${data.price} MAD`}</p>
      <button onClick={() => (fav? remove(data.id): add(data.id))} className="absolute top-2 right-2">
        {fav ? <FaHeart /> : <FaRegHeart />}
      </button>
      <Link to={`/listings/${data.id}`} className="block mt-2 underline">View</Link>
    </div>
  );
}
```

### 8.3 ListingGrid

**ListingGrid.jsx**:

```jsx
import { useState, useEffect } from 'react';
import * as api from '../../api/mockApi';
import FilterPanel from './FilterPanel';
import ListingCard from './ListingCard';

export default function ListingGrid() {
  const [all, setAll] = useState([]);
  const [filters, setFilters] = useState({ type:'', city:'', tags:[], price:[0,Infinity] });

  useEffect(() => { api.getListings().then(setAll); }, []);

  const filtered = all.filter(/* apply filters logic */);

  return (
    <div className="flex">
      <FilterPanel filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {filtered.map(l => <ListingCard key={l.id} data={l} />)}
      </div>
    </div>
  );
}
```

---

## 9. Listing Detail

**ListingDetail.jsx**:

```jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as api from '../../api/mockApi';
import StageNavigator from './StageNavigator';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [stage, setStage] = useState(0);

  useEffect(() => { api.getListingById(id).then(setListing); }, [id]);
  if (!listing) return <p>Loading...</p>;

  const stages = [
    { label: 'Description', component: <p>{listing.title} in {listing.location.neighborhood}, {listing.location.city}</p> },
    { label: 'Media', component: <StageNavigator media={listing.media} /> },
    { label: 'Map', component: <iframe src={`https://maps.google.com?q=${listing.location.city}`} className="w-full h-64" /> },
    { label: 'Contact', component: <p>{listing.contact.name} – {listing.contact.phone}</p> }
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <StageNavigator stages={stages} current={stage} onChange={setStage} />
      <div className="mt-4">{stages[stage].component}</div>
    </div>
  );
}
```

**StageNavigator.jsx** can handle both media and tab stages—implement as needed.

---

## 10. Styling and Icons

* Use Tailwind class names in JSX (e.g., `p-4`, `rounded-lg`, `shadow`).
* Icons: `npm install react-icons` and import e.g. `FaSwimmingPool`, `FaPaw`.
* Format components responsively with grid/Flex combinations.
 # HomeFinder React‑Only Frontend Tutorial
 
## Prerequisites

* Node.js (v14+)
* npm (v6+)
* Basic JS and command‑line familiarity

---

## 1. Scaffold the React App

Open your terminal and run:

```bash
PS C:\C-PROJECT\cSharp-AspDotNet_React\B_Application> npx create-react-app HomeFinder
PS C:\C-PROJECT\cSharp-AspDotNet_React\B_Application> cd HomeFinder
```

### 1.1 Install Dependencies

```bash
npm install react-router-dom@6 axios react-icons
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 1.2 Configure Tailwind

**tailwind.config.js**:

```js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

**src/index.css**:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

In **src/index.js**, import the CSS:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

---

## 2. Project Structure

```
HomeFinder/
├─ public/
├─ src/
│  ├─ api/
│  │  └─ mockApi.js
│  ├─ components/
│  │  ├─ dashboard/
│  │  │  ├─ DashboardLayout.jsx
│  │  │  ├─ ListingForm.jsx
│  │  │  └─ ListingList.jsx
│  │  ├─ listings/
│  │  │  ├─ FilterPanel.jsx
│  │  │  ├─ ListingCard.jsx
│  │  │  ├─ ListingGrid.jsx
│  │  │  └─ ListingDetail.jsx
│  │  │  ├─ StageNavigator.jsx
│  │  │  ├─ MediaGallery.jsx
│  │  │  ├─ MapEmbed.jsx
│  │  │  └─ ContactInfo.jsx
│  │  └─ favorites/
│  │     └─ FavoritesContext.jsx
│  ├─ data.json
│  ├─ App.jsx
│  └─ index.js
├─ tailwind.config.js
├─ package.json
└─ README.md
```

---

## 3. Fake Data JSON

Create **src/data.json**:

```json
{
  "listings": [
    {
      "id": "1",
      "title": "Villa Saada",
      "type": "rent",
      "price": 12000,
      "location": { "city": "Casablanca", "neighborhood": "Maarif" },
      "tags": ["sea view", "pet-friendly"],
      "media": [
        { "type": "photo", "url": "/images/villa1.jpg" },
        { "type": "icon", "name": "FaSwimmingPool" },
        { "type": "video", "url": "https://www.youtube.com/embed/xyz" }
      ],
      "contact": { "name": "Amina El Idrissi", "phone": "+212600000000", "email": "amina@example.com" }
    }
    // add more entries as needed
  ]
}
```

---

## 4. Mock API Layer

**src/api/mockApi.js**:

```js
import data from '../data.json';

let listings = [...data.listings];
const delay = ms => new Promise(res => setTimeout(res, ms));

export async function getListings() {
  await delay(300);
  return listings;
}

export async function getListingById(id) {
  await delay(200);
  return listings.find(l => l.id === id);
}

export async function addListing(listing) {
  await delay(200);
  listings.push(listing);
  return listing;
}

export async function updateListing(id, updates) {
  await delay(200);
  listings = listings.map(l => l.id === id ? { ...l, ...updates } : l);
  return listings.find(l => l.id === id);
}

export async function deleteListing(id) {
  await delay(200);
  listings = listings.filter(l => l.id !== id);
  return true;
}
```

---

## 5. Routing & App Setup

**src/App.jsx**:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ListingGrid from './components/listings/ListingGrid';
import ListingDetail from './components/listings/ListingDetail';
import { FavoritesProvider } from './components/favorites/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListingGrid />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
```

---

## 6. Favorites Context

**src/components/favorites/FavoritesContext.jsx**:

```jsx
import { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const add = id => setFavorites(f => [...new Set([...f, id])]);
  const remove = id => setFavorites(f => f.filter(x => x !== id));
  const isFavorite = id => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
```

---

## 7. Dashboard Components

### 7.1 DashboardLayout

**DashboardLayout.jsx**:

```jsx
import { NavLink, Routes, Route } from 'react-router-dom';
import ListingList from './ListingList';
import ListingForm from './ListingForm';

export default function DashboardLayout() {
  return (
    <div className="flex">
      <nav className="w-1/4 p-4 bg-gray-100">
        <NavLink to="/dashboard" end>Listings</NavLink>
        <NavLink to="add">Add Listing</NavLink>
      </nav>
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<ListingList />} />
          <Route path="add" element={<ListingForm />} />
          <Route path="edit/:id" element={<ListingForm editMode />} />
        </Routes>
      </main>
    </div>
  );
}
```

### 7.2 ListingList

**ListingList.jsx**:

```jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../api/mockApi';

export default function ListingList() {
  const [listings, setListings] = useState([]);
  useEffect(() => { api.getListings().then(setListings); }, []);

  return (
    <div className="space-y-4">
      {listings.map(l => (
        <div key={l.id} className="border p-4 flex justify-between">
          <span>{l.title}</span>
          <div>
            <Link to={`edit/${l.id}`} className="mr-2">Edit</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 7.3 ListingForm

**ListingForm.jsx**:

```jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from '../../api/mockApi';

export default function ListingForm({ editMode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: '', type: 'rent', price: '', location: {city:'',neighborhood:''}, tags:[], media:[], contact:{} });

  useEffect(() => {
    if (editMode) api.getListingById(id).then(data => setForm(data));
  }, [editMode, id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    if (editMode) await api.updateListing(id, form);
    else await api.addListing({ ...form, id: Date.now().toString() });
    nav('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full" />
      {/* add inputs for type, price, location, tags (comma separated), media URLs, contact info */}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
    </form>
  );
}
```

---

## 8. Listing Browsing

### 8.1 FilterPanel

**FilterPanel.jsx**:

```jsx
import { useState, useEffect } from 'react';

export default function FilterPanel({ filters, setFilters }) {
  // UI controls: select type, city/neighborhood, tags, price range
  return (
    <div className="p-4 border rounded space-y-3">
      {/* implement select and inputs, call setFilters on change */}
    </div>
  );
}
```

### 8.2 ListingCard

**ListingCard.jsx**:

```jsx
import { Link } from 'react-router-dom';
import { useFavorites } from '../favorites/FavoritesContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function ListingCard({ data }) {
  const { isFavorite, add, remove } = useFavorites();
  const fav = isFavorite(data.id);

  return (
    <div className="border rounded p-4 relative">
      <img src={data.media.find(m=>m.type==='photo').url} alt="" className="h-40 w-full object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{data.title}</h3>
      <p>{data.location.city}</p>
      <p>{data.type === 'rent' ? `${data.price} MAD/mo` : `${data.price} MAD`}</p>
      <button onClick={() => (fav? remove(data.id): add(data.id))} className="absolute top-2 right-2">
        {fav ? <FaHeart /> : <FaRegHeart />}
      </button>
      <Link to={`/listings/${data.id}`} className="block mt-2 underline">View</Link>
    </div>
  );
}
```

### 8.3 ListingGrid

**ListingGrid.jsx**:

```jsx
import { useState, useEffect } from 'react';
import * as api from '../../api/mockApi';
import FilterPanel from './FilterPanel';
import ListingCard from './ListingCard';

export default function ListingGrid() {
  const [all, setAll] = useState([]);
  const [filters, setFilters] = useState({ type:'', city:'', tags:[], price:[0,Infinity] });

  useEffect(() => { api.getListings().then(setAll); }, []);

  const filtered = all.filter(/* apply filters logic */);

  return (
    <div className="flex">
      <FilterPanel filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {filtered.map(l => <ListingCard key={l.id} data={l} />)}
      </div>
    </div>
  );
}
```

---

## 9. Listing Detail

**ListingDetail.jsx**:

```jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as api from '../../api/mockApi';
import StageNavigator from './StageNavigator';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [stage, setStage] = useState(0);

  useEffect(() => { api.getListingById(id).then(setListing); }, [id]);
  if (!listing) return <p>Loading...</p>;

  const stages = [
    { label: 'Description', component: <p>{listing.title} in {listing.location.neighborhood}, {listing.location.city}</p> },
    { label: 'Media', component: <StageNavigator media={listing.media} /> },
    { label: 'Map', component: <iframe src={`https://maps.google.com?q=${listing.location.city}`} className="w-full h-64" /> },
    { label: 'Contact', component: <p>{listing.contact.name} – {listing.contact.phone}</p> }
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <StageNavigator stages={stages} current={stage} onChange={setStage} />
      <div className="mt-4">{stages[stage].component}</div>
    </div>
  );
}
```

**StageNavigator.jsx** can handle both media and tab stages—implement as needed.

---

## 10. Styling and Icons

* Use Tailwind class names in JSX (e.g., `p-4`, `rounded-lg`, `shadow`).
* Icons: `npm install react-icons` and import e.g. `FaSwimmingPool`, `FaPaw`.
* Format components responsively with grid/Flex combinations.
 # HomeFinder React‑Only Frontend Tutorial
 
## Prerequisites

* Node.js (v14+)
* npm (v6+)
* Basic JS and command‑line familiarity

---

## 1. Scaffold the React App

Open your terminal and run:

```bash
PS C:\C-PROJECT\cSharp-AspDotNet_React\B_Application> npx create-react-app HomeFinder
PS C:\C-PROJECT\cSharp-AspDotNet_React\B_Application> cd HomeFinder
```

### 1.1 Install Dependencies

```bash
npm install react-router-dom@6 axios react-icons
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 1.2 Configure Tailwind

**tailwind.config.js**:

```js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

**src/index.css**:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

In **src/index.js**, import the CSS:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

---

## 2. Project Structure

```
HomeFinder/
├─ public/
├─ src/
│  ├─ api/
│  │  └─ mockApi.js
│  ├─ components/
│  │  ├─ dashboard/
│  │  │  ├─ DashboardLayout.jsx
│  │  │  ├─ ListingForm.jsx
│  │  │  └─ ListingList.jsx
│  │  ├─ listings/
│  │  │  ├─ FilterPanel.jsx
│  │  │  ├─ ListingCard.jsx
│  │  │  ├─ ListingGrid.jsx
│  │  │  └─ ListingDetail.jsx
│  │  │  ├─ StageNavigator.jsx
│  │  │  ├─ MediaGallery.jsx
│  │  │  ├─ MapEmbed.jsx
│  │  │  └─ ContactInfo.jsx
│  │  └─ favorites/
│  │     └─ FavoritesContext.jsx
│  ├─ data.json
│  ├─ App.jsx
│  └─ index.js
├─ tailwind.config.js
├─ package.json
└─ README.md
```

---

## 3. Fake Data JSON

Create **src/data.json**:

```json
{
  "listings": [
    {
      "id": "1",
      "title": "Villa Saada",
      "type": "rent",
      "price": 12000,
      "location": { "city": "Casablanca", "neighborhood": "Maarif" },
      "tags": ["sea view", "pet-friendly"],
      "media": [
        { "type": "photo", "url": "/images/villa1.jpg" },
        { "type": "icon", "name": "FaSwimmingPool" },
        { "type": "video", "url": "https://www.youtube.com/embed/xyz" }
      ],
      "contact": { "name": "Amina El Idrissi", "phone": "+212600000000", "email": "amina@example.com" }
    }
    // add more entries as needed
  ]
}
```

---

## 4. Mock API Layer

**src/api/mockApi.js**:

```js
import data from '../data.json';

let listings = [...data.listings];
const delay = ms => new Promise(res => setTimeout(res, ms));

export async function getListings() {
  await delay(300);
  return listings;
}

export async function getListingById(id) {
  await delay(200);
  return listings.find(l => l.id === id);
}

export async function addListing(listing) {
  await delay(200);
  listings.push(listing);
  return listing;
}

export async function updateListing(id, updates) {
  await delay(200);
  listings = listings.map(l => l.id === id ? { ...l, ...updates } : l);
  return listings.find(l => l.id === id);
}

export async function deleteListing(id) {
  await delay(200);
  listings = listings.filter(l => l.id !== id);
  return true;
}
```

---

## 5. Routing & App Setup

**src/App.jsx**:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ListingGrid from './components/listings/ListingGrid';
import ListingDetail from './components/listings/ListingDetail';
import { FavoritesProvider } from './components/favorites/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListingGrid />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
```

---

## 6. Favorites Context

**src/components/favorites/FavoritesContext.jsx**:

```jsx
import { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const add = id => setFavorites(f => [...new Set([...f, id])]);
  const remove = id => setFavorites(f => f.filter(x => x !== id));
  const isFavorite = id => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
```

---

## 7. Dashboard Components

### 7.1 DashboardLayout

**DashboardLayout.jsx**:

```jsx
import { NavLink, Routes, Route } from 'react-router-dom';
import ListingList from './ListingList';
import ListingForm from './ListingForm';

export default function DashboardLayout() {
  return (
    <div className="flex">
      <nav className="w-1/4 p-4 bg-gray-100">
        <NavLink to="/dashboard" end>Listings</NavLink>
        <NavLink to="add">Add Listing</NavLink>
      </nav>
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<ListingList />} />
          <Route path="add" element={<ListingForm />} />
          <Route path="edit/:id" element={<ListingForm editMode />} />
        </Routes>
      </main>
    </div>
  );
}
```

### 7.2 ListingList

**ListingList.jsx**:

```jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../api/mockApi';

export default function ListingList() {
  const [listings, setListings] = useState([]);
  useEffect(() => { api.getListings().then(setListings); }, []);

  return (
    <div className="space-y-4">
      {listings.map(l => (
        <div key={l.id} className="border p-4 flex justify-between">
          <span>{l.title}</span>
          <div>
            <Link to={`edit/${l.id}`} className="mr-2">Edit</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 7.3 ListingForm

**ListingForm.jsx**:

```jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from '../../api/mockApi';

export default function ListingForm({ editMode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: '', type: 'rent', price: '', location: {city:'',neighborhood:''}, tags:[], media:[], contact:{} });

  useEffect(() => {
    if (editMode) api.getListingById(id).then(data => setForm(data));
  }, [editMode, id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    if (editMode) await api.updateListing(id, form);
    else await api.addListing({ ...form, id: Date.now().toString() });
    nav('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full" />
      {/* add inputs for type, price, location, tags (comma separated), media URLs, contact info */}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
    </form>
  );
}
```

---

## 8. Listing Browsing

### 8.1 FilterPanel

**FilterPanel.jsx**:

```jsx
import { useState, useEffect } from 'react';

export default function FilterPanel({ filters, setFilters }) {
  // UI controls: select type, city/neighborhood, tags, price range
  return (
    <div className="p-4 border rounded space-y-3">
      {/* implement select and inputs, call setFilters on change */}
    </div>
  );
}
```

### 8.2 ListingCard

**ListingCard.jsx**:

```jsx
import { Link } from 'react-router-dom';
import { useFavorites } from '../favorites/FavoritesContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function ListingCard({ data }) {
  const { isFavorite, add, remove } = useFavorites();
  const fav = isFavorite(data.id);

  return (
    <div className="border rounded p-4 relative">
      <img src={data.media.find(m=>m.type==='photo').url} alt="" className="h-40 w-full object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{data.title}</h3>
      <p>{data.location.city}</p>
      <p>{data.type === 'rent' ? `${data.price} MAD/mo` : `${data.price} MAD`}</p>
      <button onClick={() => (fav? remove(data.id): add(data.id))} className="absolute top-2 right-2">
        {fav ? <FaHeart /> : <FaRegHeart />}
      </button>
      <Link to={`/listings/${data.id}`} className="block mt-2 underline">View</Link>
    </div>
  );
}
```

### 8.3 ListingGrid

**ListingGrid.jsx**:

```jsx
import { useState, useEffect } from 'react';
import * as api from '../../api/mockApi';
import FilterPanel from './FilterPanel';
import ListingCard from './ListingCard';

export default function ListingGrid() {
  const [all, setAll] = useState([]);
  const [filters, setFilters] = useState({ type:'', city:'', tags:[], price:[0,Infinity] });

  useEffect(() => { api.getListings().then(setAll); }, []);

  const filtered = all.filter(/* apply filters logic */);

  return (
    <div className="flex">
      <FilterPanel filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {filtered.map(l => <ListingCard key={l.id} data={l} />)}
      </div>
    </div>
  );
}
```

---

## 9. Listing Detail

**ListingDetail.jsx**:

```jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as api from '../../api/mockApi';
import StageNavigator from './StageNavigator';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [stage, setStage] = useState(0);

  useEffect(() => { api.getListingById(id).then(setListing); }, [id]);
  if (!listing) return <p>Loading...</p>;

  const stages = [
    { label: 'Description', component: <p>{listing.title} in {listing.location.neighborhood}, {listing.location.city}</p> },
    { label: 'Media', component: <StageNavigator media={listing.media} /> },
    { label: 'Map', component: <iframe src={`https://maps.google.com?q=${listing.location.city}`} className="w-full h-64" /> },
    { label: 'Contact', component: <p>{listing.contact.name} – {listing.contact.phone}</p> }
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <StageNavigator stages={stages} current={stage} onChange={setStage} />
      <div className="mt-4">{stages[stage].component}</div>
    </div>
  );
}
```

**StageNavigator.jsx** can handle both media and tab stages—implement as needed.

---

## 10. Styling and Icons

* Use Tailwind class names in JSX (e.g., `p-4`, `rounded-lg`, `shadow`).
* Icons: `npm install react-icons` and import e.g. `FaSwimmingPool`, `FaPaw`.
* Format components responsively with grid/Flex combinations.
 