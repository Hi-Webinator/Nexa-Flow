# NexaFlow — Client

React 19 + Vite 8 single-page app for the NexaFlow landing site.

See the [root README](../README.md) for full documentation, setup, and deployment instructions.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run lint     # ESLint
```

Optional: copy `.env.example` to `.env` to point the AI chat widget at a non-default API URL.

Deployed to Vercel at [nexa-flow-fawn.vercel.app](https://nexa-flow-fawn.vercel.app). `vercel.json` holds the SPA rewrite that keeps deep links (`/about`, `/contact`) from 404ing.
