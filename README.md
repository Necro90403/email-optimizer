# SubjectLine.ai — AI Email Subject Line Optimizer

Micro-SaaS tool that generates 10 AI-optimized email subject lines ranked by predicted open rate.

**Live:** https://email-optimizer-agentic-services-llc.vercel.app

## Stack

- Next.js 16 + TypeScript + Tailwind CSS
- Claude Haiku 4.5 for generation
- Stripe for Pro subscriptions ($9/mo)
- In-memory rate limiting (3 free/day per IP)

## Launch a New Micro-SaaS in 30 Minutes

This project is the **reusable template** for the micro-SaaS launcher strategy. To create a new tool:

1. **Clone this project:**
   ```bash
   cp -r ~/Projects/micro-saas/email-optimizer ~/Projects/micro-saas/NEW-TOOL-NAME
   ```

2. **Swap the skill** — edit `src/lib/skills/` to define your new AI skill config (system prompt, model, max tokens)

3. **Update the landing page** — edit `src/app/page.tsx` with new copy, hero, and branding

4. **Update metadata** — edit `src/app/layout.tsx` for SEO

5. **Set env vars** — copy `.env.local` and update `STRIPE_PRICE_ID` for the new product

6. **Deploy:** Create GitHub repo, push, create Vercel project linked to repo

## Reusable Architecture

```
src/
  lib/
    skill-runner.ts       # Generic Anthropic skill executor (any model, any prompt)
    rate-limit.ts         # IP-based rate limiter (configurable limits)
    stripe.ts             # Stripe checkout + subscription verification
    skills/
      email-optimizer.ts  # Skill config (swap this for new tools)
  components/
    ResultCard.tsx         # Result display component
    PricingTable.tsx       # Free/Pro pricing UI + Stripe checkout
  app/
    page.tsx              # Landing page (hero + demo + pricing + FAQ)
    api/generate/route.ts # POST /api/generate — runs the skill
    api/stripe/           # Checkout + webhook handlers
```

## Environment Variables

| Key | Required | Description |
|-----|----------|-------------|
| ANTHROPIC_API_KEY | Yes | Claude API key for Haiku generation |
| STRIPE_SECRET_KEY | For payments | Stripe secret key |
| STRIPE_WEBHOOK_SECRET | For payments | Stripe webhook signing secret |
| STRIPE_PRICE_ID | For payments | Stripe price ID for Pro plan |
| NEXT_PUBLIC_APP_URL | Yes | Base URL for redirects |
