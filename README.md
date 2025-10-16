# Mineers Smile Center - Inventory Management System

A modern, full-stack inventory management system built with Next.js and Supabase for tracking dental/medical supplies.

## Features

- 📦 Complete inventory tracking with categories, brands, and suppliers
- 📊 Real-time stock level monitoring with low-stock alerts
- 🔐 Role-based access control (Admin, Staff, Viewer)
- 📱 Responsive design with Tailwind CSS
- 🗄️ PostgreSQL database with Supabase
- 📈 Dashboard with inventory statistics
- 📝 Audit trail for all stock transactions
- ⚡ Built with Next.js 14+ App Router

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **ORM**: Direct Supabase Client

## Database Schema

The system uses 7 core tables:

1. **categories** - Product categories
2. **brands** - Brand information
3. **suppliers** - Supplier contacts
4. **storage_locations** - Physical storage locations
5. **items** - Main inventory table
6. **users** - User management with roles
7. **stock_transactions** - Inventory movement history

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for complete documentation.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up Supabase**:

   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the migration files in order:
     - `supabase/migrations/001_initial_schema.sql`
     - `supabase/migrations/002_row_level_security.sql`
     - `supabase/migrations/003_sample_data.sql` (optional)

3. **Configure environment variables**:

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
mineers-inventory/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard page
│   │   ├── inventory/          # Inventory management page
│   │   └── api/                # API routes
│   ├── components/             # React components
│   │   ├── inventory/          # Inventory-specific components
│   │   └── ui/                 # Reusable UI components
│   ├── lib/                    # Utility functions and configs
│   │   └── supabase.ts         # Supabase client
│   └── types/                  # TypeScript type definitions
│       └── database.types.ts   # Database types
├── supabase/
│   └── migrations/             # SQL migration files
├── public/                     # Static assets
└── DATABASE_SCHEMA.md          # Database documentation
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Usage

### User Roles

- **Admin**: Full access to all features including user management
- **Staff**: Can create, update items, suppliers, and transactions
- **Viewer**: Read-only access to inventory data

### Key Features

- **Low Stock Alerts**: Automatically highlights items below minimum stock level
- **Expiry Tracking**: Monitor expiration dates for time-sensitive items
- **Stock Transactions**: Complete audit trail of all inventory movements
- **Multiple Storage Locations**: Track items across different physical locations

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Supabase Documentation](https://supabase.com/docs) - learn about Supabase
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is private and proprietary to Mineers Smile Center.
