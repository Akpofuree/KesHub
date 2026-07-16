# KESHub Deployment Plan

## Project Status: Ready for Deployment

**Pre-deployment fixes completed:**

- ✅ Fixed build error by moving icon.png to public folder
- ✅ Updated next.config.mjs for proper image optimization (Cloudinary, Unsplash)
- ✅ Production build successful (53 pages generated)
- ✅ Database schema synced with Prisma
- ✅ Created vercel.json configuration
- ✅ Created .vercelignore file

## Recommended Platform: Vercel

**Why Vercel is the best choice:**

- Built by the creators of Next.js - native support and optimization
- Free tier with generous limits (100GB bandwidth/month)
- Automatic deployments from GitHub
- Edge network for global performance
- Built-in environment variable management
- Perfect for full-stack Next.js apps with API routes
- Zero-config deployment for Next.js projects

## External Services Required

All services have free tiers suitable for initial deployment:

1. **Neon PostgreSQL** - Database (Free tier: 0.5GB, 3 projects)
2. **Clerk** - Authentication (Free tier: 5,000 MAUs)
3. **Cloudinary** - Image uploads (Free tier: 25GB storage, 25GB bandwidth/month)
4. **Upstash Redis** - Rate limiting (Free tier: 10,000 commands/day)
5. **Resend** - Email (Free tier: 3,000 emails/month)

## Day 1: Pre-Deployment & Initial Deploy

### Step 1: Vercel Setup (30 minutes)

1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Connect GitHub repository to Vercel
4. Import project from GitHub

### Step 2: Production Environment Setup (1 hour)

**Neon Database:**

- Create production project in Neon dashboard
- Copy production DATABASE_URL and DIRECT_URL
- Run `npx prisma db push` on production database

**Clerk Authentication:**

- Create production application in Clerk dashboard
- Copy production keys:
  - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  - CLERK_SECRET_KEY
- Configure webhook endpoint: `https://your-domain.vercel.app/api/webhooks/clerk`
- Set allowed domains for production

**Cloudinary:**

- Create account (or use existing)
- Copy production credentials:
  - CLOUDINARY_CLOUD_NAME
  - CLOUDINARY_API_KEY
  - CLOUDINARY_API_SECRET

**Upstash Redis:**

- Create Redis database in Upstash dashboard
- Copy REST URL and token
- Add to environment variables

**Resend:**

- Create account at [resend.com](https://resend.com)
- Copy API key
- Configure email templates if needed

### Step 3: Configure Vercel Environment Variables (30 minutes)

Add all environment variables in Vercel dashboard:

```
NEXT_PUBLIC_CURRENCY_SYMBOL='₦'
DATABASE_URL=your_neon_production_url
DIRECT_URL=your_neon_direct_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
ADMIN_SIGNUP_CODE=your_admin_code
KESHUB_KEY_NAME=KesHub
KESHUB_API_KEY=your_keshub_api_key
KESHUB_PRODUCT_ENVIRONMENT=production
KESHUB_SECRET_KEY=your_keshub_secret
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

### Step 4: Deploy to Vercel (15 minutes)

1. Push code to GitHub
2. Vercel auto-triggers deployment
3. Monitor build logs
4. Wait for deployment to complete

### Step 5: Post-Deploy Database Setup (30 minutes)

1. Access Vercel deployment URL
2. Run Prisma migrations on production:
   - Use Vercel CLI: `vercel env pull .env.production`
   - Run: `npx prisma db push`
3. Verify database schema matches

### Step 6: Initial Testing (30 minutes)

1. Test homepage loads
2. Test authentication flow
3. Test navigation
4. Test basic API routes

## Day 2: Post-Deployment Configuration

### Step 1: Custom Domain (Optional, 30 minutes)

1. Purchase domain (if needed)
2. Add domain in Vercel dashboard
3. Configure DNS records
4. Enable SSL (automatic on Vercel)

### Step 2: Webhook Configuration (30 minutes)

1. Update Clerk webhook URL to production domain
2. Test webhook endpoints
3. Verify user sync works

### Step 3: Image Upload Testing (30 minutes)

1. Test product image uploads
2. Verify Cloudinary integration
3. Check image optimization

### Step 4: Email Testing (30 minutes)

1. Test Resend email delivery
2. Verify email templates
3. Check spam filters

### Step 5: Payment Integration Testing (1 hour)

1. Test Paystack webhook endpoint
2. Verify order creation
3. Test payment flow end-to-end

### Step 6: Performance Optimization (30 minutes)

1. Enable Vercel Analytics
2. Check Core Web Vitals
3. Optimize images if needed
4. Enable caching headers

### Step 7: Monitoring Setup (30 minutes)

1. Set up Vercel alerts
2. Configure error tracking (optional: Sentry)
3. Set up uptime monitoring

## Pre-Deployment Checklist

**Already Completed:**

- [x] Build error fixed (icon.png moved to public folder)
- [x] next.config.mjs updated for image optimization
- [x] Production build successful (53 pages)
- [x] Database schema synced with Prisma
- [x] vercel.json configuration created
- [x] .vercelignore file created

**User Actions Required:**

- [ ] Push code to GitHub (including new vercel.json and .vercelignore files)
- [ ] All environment variables configured in Vercel
- [ ] Production database created and schema migrated
- [ ] Clerk production app configured with correct domain
- [ ] Cloudinary production credentials added
- [ ] Upstash Redis production database created
- [ ] Resend API key configured
- [ ] Webhook endpoints updated to production URLs
- [ ] Admin signup code set
- [ ] KesHub API keys configured

## Potential Issues & Solutions

**Issue: Build fails due to missing dependencies**

- Solution: Check package.json, ensure all dependencies are listed

**Issue: Database connection fails**

- Solution: Verify DATABASE_URL format, ensure SSL mode is enabled

**Issue: Clerk authentication fails**

- Solution: Verify domain is allowed in Clerk dashboard, check webhook secret

**Issue: Image uploads fail**

- Solution: Verify Cloudinary credentials, check upload limits

**Issue: Webhooks not working**

- Solution: Verify webhook URLs are correct, test with webhook testing tools

## Estimated Timeline

**Project is now ready for deployment - all technical issues resolved**

**Day 1 (2-3 hours):**

- Push code to GitHub: 10 min
- Vercel setup and import: 30 min
- Configure environment variables: 45 min
- Initial deployment: 15 min
- Database setup: 30 min
- Basic testing: 30 min

**Day 2 (2-3 hours):**

- Webhook configuration: 30 min
- Integration testing: 1 hour
- Performance optimization: 30 min
- Monitoring setup: 30 min

**Total: 4-6 hours across 2 days** (reduced from 8 hours due to pre-deployment fixes)

## Post-Deployment Maintenance

- Monitor Vercel dashboard for errors
- Check database usage limits
- Monitor API rate limits
- Review Clerk usage monthly
- Update dependencies regularly
- Backup database periodically
