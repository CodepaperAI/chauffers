# Docklands 1998

Premium Next.js website for Docklands 1998 chauffeur services in Melbourne and Victoria.

## Local Development

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js, usually `http://localhost:3000`.

## Email Enquiries With Resend

The enquiry form posts to `src/app/api/enquiry/route.ts`. It validates the lead details server-side, sends the booking email through Resend when configured, and shows a WhatsApp fallback link if email is unavailable.

Create `.env.local` from `.env.example`:

```bash
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=Docklands 1998 <bookings@your-domain.com.au>
RESEND_TO_EMAIL=bookings@your-domain.com.au
RESEND_REPLY_TO=bookings@your-domain.com.au
UPLIFTAI_API_TOKEN=uai_your_upliftai_token_here
```

For production, verify the sending domain in Resend and use that verified domain in `RESEND_FROM_EMAIL`. Add the same variables in the hosting provider environment settings before deployment.

## Blog Feed With UpliftAI

The blog pages use the server-side UpliftAI API from `src/lib/upliftai.ts`. The token must be stored as `UPLIFTAI_API_TOKEN` in `.env.local` for local development and in the hosting provider environment variables for production. Do not prefix this variable with `NEXT_PUBLIC_`; the token should never be exposed to the browser.

- `/blog` lists published blog summaries.
- `/blog/[slug]` loads a single post by slug.
- The footer and primary navigation include a Blog link.

## Image Credits

- Puffing Billy Railway image: [Philip Mallis via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Puffing_Billy_locomotive_8A_hauling_train_towards_Belgrave_on_Gembrook_Railway_near_Belgrave_-_June_2023_-_01.jpg), [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).

## Checks

```bash
npm run lint
npm run build
```
