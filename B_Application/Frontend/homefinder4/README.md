# HomeFinder - React Frontend

A modern React frontend for a Moroccan real estate platform where hosts can list properties for rent or sale, and visitors can browse, filter, and favorite properties.

## 🚀 Features

### For Visitors
- **Browse Properties**: View all available properties with rich media galleries
- **Advanced Filtering**: Filter by type (rent/sale), city, price range, amenities, and search
- **Property Details**: Detailed property pages with photos, videos, floor plans, and maps
- **Favorites System**: Save favorite properties (stored in localStorage)
- **Responsive Design**: Mobile-first design that works on all devices

### For Hosts
- **Property Management**: Add, edit, and delete property listings
- **Rich Media Support**: Upload photos, add feature icons, and embed video tours
- **Multi-stage Layouts**: Define different floors/areas with room details
- **Contact Management**: Manage contact information for each property

### Authentication
- **Mock Authentication**: Simple login/register system with localStorage
- **Role-based Access**: Different features for hosts vs visitors
- **Protected Routes**: Dashboard access restricted to hosts

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Data Storage**: localStorage (for user data) + JSON files (for demo data)
- **Routing**: Next.js App Router

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── login/page.tsx     # Login page
│   ├── register/page.tsx  # Registration page
│   ├── dashboard/page.tsx # Host dashboard
│   ├── favorites/page.tsx # User favorites
│   └── properties/[id]/page.tsx # Property details
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.tsx    # Navigation bar with auth
│   │   ├── Filters.tsx   # Property filtering interface
│   │   ├── ListingCard.tsx # Property card component
│   │   ├── ListingGrid.tsx # Grid of property cards
│   │   ├── MediaGallery.tsx # Photo/video gallery
│   │   ├── StageList.tsx # Property layout/rooms
│   │   └── MapEmbed.tsx  # Location map display
│   └── contexts/         # React Context providers
│       ├── AuthContext.tsx # Authentication state
│       ├── PropertiesContext.tsx # Property data management
│       └── FavoritesContext.tsx  # Favorites management
├── public/
│   └── data/
│       └── properties.json # Demo property data
├── tsconfig.json          # TypeScript configuration with path mapping
└── package.json
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd homefinder
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Clear Next.js cache and start development server**
   \`\`\`bash
   rm -rf .next
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Accounts

The app includes demo authentication. Use these credentials:

- **Host Account**: 
  - Email: `host@example.com`
  - Password: `password`
  - Access: Can add/manage properties

- **Visitor Account**:
  - Email: `visitor@example.com` 
  - Password: `password`
  - Access: Can browse and favorite properties

## 🔧 Path Resolution Configuration

The project uses TypeScript path mapping for clean imports:

\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
\`\`\`

This allows imports like:
- `@/contexts/AuthContext` → `src/contexts/AuthContext.tsx`
- `@/components/Navbar` → `src/components/Navbar.tsx`

## 📊 Data Structure

### Property Object
\`\`\`typescript
interface Property {
  id: string
  title: string
  type: 'rent' | 'sale'
  price: number
  currency: string
  description: string
  location: {
    city: string
    neighborhood: string
    address: string
    coordinates: { lat: number; lng: number }
  }
  tags: string[]
  media: Array<{
    type: 'photo' | 'icon' | 'video'
    url?: string
    name?: string
  }>
  stages: Array<{
    name: string
    rooms: string[]
  }>
  contacts: Array<{
    name: string
    phone: string
    email: string
  }>
  amenities: string[]
  bedrooms: number
  bathrooms: number
  area: number
  available: boolean
}
\`\`\`

## 🎨 Key Components

### Filters Component
- Type filter (All/Rent/Sale)
- City dropdown
- Price range inputs
- Tag/amenity checkboxes
- Search functionality

### MediaGallery Component
- Photo carousel with thumbnails
- Feature icons display
- Video tour links
- Lightbox for full-size images

### StageList Component
- Collapsible accordion layout
- Room details for each floor/area
- Responsive design

### MapEmbed Component
- Mock map display (ready for Google Maps integration)
- Property location marker
- Neighborhood information

## 🔧 Troubleshooting

### Module Resolution Issues
If you encounter "module not found" errors:

1. **Clear Next.js cache**
   \`\`\`bash
   rm -rf .next
   \`\`\`

2. **Restart development server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Verify tsconfig.json path mapping**
   Ensure the `baseUrl` and `paths` are correctly configured.

### Common Import Patterns
\`\`\`typescript
// ✅ Correct - using @ alias
import { useAuth } from "@/contexts/AuthContext"
import Navbar from "@/components/Navbar"

// ❌ Incorrect - relative paths from app directory
import { useAuth } from "../src/contexts/AuthContext"
\`\`\`

## 🚀 Deployment

### Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

### Deploy to Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## 🔮 Future Enhancements

### Backend Integration
- Replace mock data with real API calls
- Implement proper authentication with JWT
- Add image upload functionality
- Real-time property updates

### Advanced Features
- Google Maps integration
- Payment processing
- Advanced search with filters
- Property comparison
- Reviews and ratings
- Email notifications
- Multi-language support (Arabic/French)

### Performance
- Image optimization
- Lazy loading
- Caching strategies
- SEO optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**HomeFinder** - Making property discovery in Morocco simple and beautiful! 🏠✨
