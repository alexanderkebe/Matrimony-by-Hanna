# Matrimony by Hana

A faith-centered marriage preparation and enrichment platform for couples seeking spiritual growth and deeper connection in their marriage.

## Features

- **Courses**: Pre-marriage, Marriage, and Post-wedding courses with video lessons
- **Activities**: Weekly tasks, journaling, prayer, and discussion activities for couples
- **Community**: Connect with other couples on the same journey
- **Dashboard**: Track progress, continue watching videos, and manage your journey
- **Admin Portal**: Comprehensive admin dashboard for managing users, payments, and content
- **Multi-language**: English and Amharic support
- **Dark Mode**: Light and dark theme support
- **Payment Integration**: Chapa payment gateway and prepaid options

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Theme**: next-themes
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/matrimony-by-hana-app.git
cd matrimony-by-hana-app
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

The app will be automatically deployed on every push to the main branch.

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── (app)/             # Authenticated user pages
│   ├── (auth)/            # Authentication pages
│   ├── admin/             # Admin portal
│   ├── learn/             # Public informational pages
│   └── api/               # API routes
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   ├── courses/           # Course-related components
│   ├── community/         # Community components
│   └── ui/                # UI component library
├── lib/                   # Utilities and data
│   ├── i18n/             # Internationalization
│   └── mock-data.ts      # Mock data
└── public/                # Static assets
```

## Environment Variables

Create a `.env.local` file for environment variables:

```env
# Add your environment variables here
# For example:
# CHAPA_SECRET_KEY=your_chapa_secret_key
# DATABASE_URL=your_database_url
```

## License

This project is private and proprietary.

## Support

For support, email support@matrimonybyhana.com

