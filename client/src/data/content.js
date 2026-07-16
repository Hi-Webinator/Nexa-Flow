// ── Brands
export const brands = [
  { name: "Acme Corp", color: "#7c6fff,#6faaff" },
  { name: "Stratos", color: "#6fffd8,#6faaff" },
  { name: "Luminary", color: "#ff6fbd,#ff9a6f" },
  { name: "Meridian", color: "#6faaff,#7c6fff" },
  { name: "Axiom Labs", color: "#ffdb6f,#ff9a6f" },
  { name: "Vertex AI", color: "#6fffd8,#ff6fbd" },
  { name: "Quantum Co", color: "#7c6fff,#6fffd8" },
  { name: "Orbit HQ", color: "#6faaff,#6fffd8" },
];

// ── Features
export const features = [
  {
    id: 1,
    icon: "⚡",
    title: "Real-time collaboration engine",
    desc: "Work simultaneously with your entire team without conflicts. Live cursors, presence indicators, and instant sync — all with zero latency.",
    tag: "New in v3.4",
    wide: true,
  },
  {
    id: 2,
    icon: "🤖",
    title: "AI-native automation",
    desc: "Let intelligent agents handle repetitive tasks, write copy, analyze data, and route work — trained on your company's context.",
    tag: "AI-powered",
  },
  {
    id: 3,
    icon: "🔐",
    title: "Enterprise security",
    desc: "SOC 2 Type II, GDPR, and HIPAA compliant. End-to-end encryption with granular permissions and audit logs.",
  },
  {
    id: 4,
    icon: "📊",
    title: "Insights & analytics",
    desc: "Deep visibility into team velocity, bottlenecks, and output quality — with dashboards that actually make sense.",
  },
  {
    id: 5,
    icon: "🔌",
    title: "200+ integrations",
    desc: "Connect with Slack, GitHub, Figma, Jira, Salesforce, and 200+ other tools your team already uses.",
  },
  {
    id: 6,
    icon: "🌍",
    title: "Global edge network",
    desc: "Deployed across 32 regions for sub-50ms latency wherever your team is working.",
  },
];

// ── Stats
export const stats = [
  { count: 12000, display: "12K+", label: "Teams onboarded" },
  { count: 98, display: "98%", label: "Uptime SLA" },
  { count: 4.2, display: "4.2M", label: "Tasks automated daily" },
  { count: 200, display: "200+", label: "Integrations available" },
];

// ── Services
export const services = [
  {
    num: "01",
    title: "Product & Engineering",
    desc: "Sync roadmaps, manage sprints, review code, and ship faster — all in one place without the context-switching tax.",
  },
  {
    num: "02",
    title: "Marketing & Growth",
    desc: "Plan campaigns, track performance, create content, and iterate on what's working — with AI that learns your brand.",
  },
  {
    num: "03",
    title: "Sales & RevOps",
    desc: "Manage pipeline, automate follow-ups, generate proposals, and close deals with unprecedented efficiency.",
  },
  {
    num: "04",
    title: "HR & People Ops",
    desc: "Streamline hiring, onboarding, performance reviews, and team communication with human-centered automation.",
  },
  {
    num: "05",
    title: "Finance & Legal",
    desc: "Automate approvals, generate contracts, manage budgets, and stay compliant without the overhead.",
  },
  {
    num: "06",
    title: "Customer Success",
    desc: "Give your CS team a 360° view of every customer — with AI-drafted responses and proactive churn signals.",
  },
];

// ── Testimonials
export const testimonials = [
  {
    id: 1,
    text: '"NexaFlow cut our sprint planning time by 60%. The AI suggestions for task breakdown are genuinely impressive — it\'s like having a senior PM embedded in the tool."',
    name: "Alex Rivera",
    role: "CTO at Stratos",
    initials: "AR",
    gradient: "linear-gradient(135deg,#7c6fff,#6faaff)",
  },
  {
    id: 2,
    text: '"We replaced 5 tools with NexaFlow. The integration depth is remarkable — everything just flows. Our team\'s output increased measurably in the first month."',
    name: "Keiko Larson",
    role: "Head of Product, Luminary",
    initials: "KL",
    gradient: "linear-gradient(135deg,#ff6fbd,#ff9a6f)",
  },
  {
    id: 3,
    text: '"The security posture and enterprise controls were what convinced our CISO. And then the team fell in love with the UX. Rare to find both in one product."',
    name: "Marcus Johnson",
    role: "VP Engineering, Meridian",
    initials: "MJ",
    gradient: "linear-gradient(135deg,#6fffd8,#6faaff)",
  },
];

// ── Pricing
export const plans = [
  {
    name: "Starter",
    monthly: 29,
    yearly: 22,
    desc: "Perfect for small teams getting started.",
    features: [
      "Up to 10 team members",
      "5 active projects",
      "10GB storage",
      "Basic AI assistance",
      "50+ integrations",
    ],
    dimFeatures: ["Priority support", "Advanced analytics"],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Pro",
    monthly: 89,
    yearly: 67,
    desc: "For fast-growing teams that need more power.",
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "100GB storage",
      "Full AI suite",
      "200+ integrations",
      "Priority support",
      "Advanced analytics",
    ],
    dimFeatures: [],
    cta: "Start free trial →",
    featured: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    yearly: null,
    desc: "For large organizations with specific needs.",
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Custom AI training",
      "SSO & SAML",
      "Dedicated SLA",
      "24/7 premium support",
      "Custom contracts",
    ],
    dimFeatures: [],
    cta: "Contact sales",
    featured: false,
  },
];

// ── FAQ
export const faqs = [
  {
    q: "How does the free trial work?",
    a: "Start with a full-featured 14-day free trial of the Pro plan — no credit card required. After your trial, choose the plan that fits your team best or continue with our free tier.",
  },
  {
    q: "Can I switch plans at any time?",
    a: "Absolutely. Upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. Downgrades take effect at the next billing date.",
  },
  {
    q: "How does the AI work with our data?",
    a: "Your data is used to personalize the AI experience for your team and is never shared with other customers or used to train our global models. Enterprise customers can opt for fully isolated AI inference.",
  },
  {
    q: "What integrations are available?",
    a: "We support 200+ integrations including Slack, GitHub, Figma, Linear, Jira, Salesforce, HubSpot, Notion, and many more. We also offer a public API and Zapier/Make support for custom workflows.",
  },
  {
    q: "Is NexaFlow SOC 2 compliant?",
    a: "Yes. NexaFlow is SOC 2 Type II certified, GDPR compliant, and HIPAA eligible. We undergo annual third-party security audits and can provide our security reports on request.",
  },
];

// ── Contact channels
export const channelsAbt = [
  {
    icon: "💬",
    title: "Talk to sales",
    desc: "Interested in a custom plan or enterprise deal? Our team will get back to you within 1 business day.",
    cta: "Book a call",
    accent: "#7c6fff",
  },
  {
    icon: "🛟",
    title: "Customer support",
    desc: "Already a customer? Our support team is available 24/7 for Pro and Enterprise users.",
    cta: "Open a ticket",
    accent: "#6fffd8",
  },
  {
    icon: "✍️",
    title: "Press & media",
    desc: "Journalists and analysts — reach out for briefings, data, quotes, or embargo requests.",
    cta: "Contact PR",
    accent: "#ff6fbd",
  },
];

export const officesAbt = [
  {
    city: "San Francisco",
    address: "535 Mission St, 14th Floor",
    country: "United States",
    emoji: "🇺🇸",
    tz: "PST (UTC−8)",
  },
  {
    city: "London",
    address: "1 Canada Square, Canary Wharf",
    country: "United Kingdom",
    emoji: "🇬🇧",
    tz: "GMT (UTC+0)",
  },
  {
    city: "Singapore",
    address: "1 Raffles Place, #40-01",
    country: "Singapore",
    emoji: "🇸🇬",
    tz: "SGT (UTC+8)",
  },
];

export const topicsAbt = [
  "General enquiry",
  "Sales & pricing",
  "Technical support",
  "Partnership",
  "Press & media",
  "Careers",
];
