# Impedex.ro

Electronics repair business website for Impedex, a family-run repair shop.

## Live Site
[impedex.ro](https://impedex.ro)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Authentication |
| Email | Resend API |
| Animations | Framer Motion |
| Icons | Lucide React, custom SVG |
| Hosting | Hetzner VPS behind Cloudflare |

## Features

- **Home page** with animated PCB canvas showcasing repair services
- **Repair request form** with validation, saved to Supabase database
- **Email notifications** sent automatically via Resend on form submission
- **User authentication** via Supabase
- **Account page** where logged-in customers can track their repair request status
- **Admin dashboard** to manage repair requests and inventory
- **Legal pages** — GDPR, Privacy Policy, Terms of Service, Cookie Policy

## How It Works

1. Customer submits a repair request through the contact form
2. Data is validated and saved to Supabase
3. Confirmation email is sent automatically via Resend
4. Logged-in customers can track their request status from their account page
5. Admins manage all requests and inventory from the dashboard

## Project Structure

```
impedex-website/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Admin dashboard
│   ├── account/          # User account & request tracking
│   └── api/              # API routes
├── components/           # Reusable React components
├── lib/                  # Supabase client, utilities
└── public/               # Static assets
```

## Purpose

Built to digitize the repair request workflow for a real electronics business — replacing phone calls and manual tracking with an automated, user-friendly system.
