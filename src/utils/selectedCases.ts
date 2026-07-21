import data from "../data/site-content.json";

const selectedCaseSlugs = ["assence", "iver", "veganic", "clicknship"];

type Metric = {
  label: string;
  value: string;
};

type CasePreview = {
  image?: string;
  imageAlt?: string;
  imageFit?: "contain";
  industry: string;
  headline: string;
  summary: string;
  services?: string[];
};

type CaseDetailSection = {
  body: string;
  label: string;
  title: string;
};

type CaseScreenshot = {
  alt: string;
  caption: string;
  label: string;
  src: string;
  type: "desktop" | "mobile";
};

type CaseDetail = {
  decisions: string[];
  eyebrow: string;
  introduction: string;
  journey: {
    body: string;
    label: string;
  };
  screenshots: CaseScreenshot[];
  sections: CaseDetailSection[];
  takeaway: {
    body: string;
    label: string;
  };
  title: string;
};

export type SelectedCase = {
  client: string;
  detail?: CaseDetail;
  featured: boolean;
  headline: string;
  image: string;
  imageAlt: string;
  impact: string;
  industry: string;
  metrics: Metric[];
  number: string;
  preview?: CasePreview;
  problem: string;
  services: string[];
  slug: string;
  solution: string;
  summary: string;
  technologies: string[];
  theme: {
    accent: string;
    background: string;
    foreground: string;
  };
};

const assenceCase = {
  number: "01",
  slug: "assence",
  client: "Assence",
  industry: "Apparel / DTC E-commerce",
  headline: "Turning a bold product promise into a focused e-commerce journey.",
  summary:
    "Assence needed an e-commerce experience that matched its provocative brand identity without losing product clarity. The journey was structured to capture attention, communicate benefits, reinforce trust, and guide customers into a bundle-based PDP.",
  problem:
    "The creative direction had to feel memorable and disruptive while still explaining material, construction, comfort, proof, bundle value, sizing, and purchase decisions.",
  solution:
    "We connected the homepage hero and PDP into one direct path: attention, product benefits, proof, offer selection, size selection, and purchase.",
  impact:
    "A bold brand experience structured to make the product easier to understand, compare, configure, and buy.",
  services: [
    "E-commerce UX",
    "Hero Strategy",
    "Product Storytelling",
    "PDP Design",
  ],
  technologies: ["Figma", "Shopify UX", "Responsive Design"],
  metrics: [
    {
      value: "1",
      label: "Focused product journey",
    },
    {
      value: "3",
      label: "Bundle tiers clarified",
    },
    {
      value: "8",
      label: "Size inputs organized",
    },
  ],
  theme: {
    background: "#F2E3C8",
    foreground: "#15100D",
    accent: "#D75634",
  },
  image: "/images/cases/assence/01-assence-hero-desktop.png?v=20260721",
  imageAlt:
    "Assence homepage hero featuring boxer products, social proof, benefits and Shop Now CTA",
  featured: true,
  preview: {
    industry: "Apparel / DTC E-commerce",
    headline: "Turning a bold product promise into a focused e-commerce journey.",
    summary:
      "We combined Assence's provocative brand identity with a clear product-first journey, moving customers from attention and social proof to bundle selection, sizing, and purchase.",
    image: "/images/cases/assence/01-assence-hero-desktop.png?v=20260721",
    imageAlt:
      "Assence desktop hero with bold product messaging, boxer imagery, reviews, benefits and Shop Now CTA",
    imageFit: "contain",
    services: [
      "E-commerce UX",
      "Hero Strategy",
      "Product Storytelling",
      "PDP Design",
    ],
  },
  detail: {
    eyebrow: "Assence",
    title: "Turning a bold product promise into a focused e-commerce journey.",
    introduction:
      "Assence uses a provocative, attention-first identity, but the website still needs to sell a real product with tangible benefits, social proof, bundle value, sizing clarity, and a clear path to purchase.",
    sections: [
      {
        label: "The Challenge",
        title: "Balancing provocative branding with product clarity",
        body: "The experience could not rely on attitude alone. It had to keep the product credible and easy to understand while explaining bamboo material, dual-pouch construction, comfort, proof, multi-pack offers, and sizing.",
      },
      {
        label: "Hero Strategy",
        title: "Using the hero as the first product pitch",
        body: "The desktop hero combines a bold headline, product-in-use imagery, review proof, benefit chips, percentage-based trust blocks, and a direct Shop Now CTA so the first viewport starts selling immediately.",
      },
      {
        label: "Benefit Hierarchy",
        title: "Turning features into fast visual signals",
        body: "Compact benefit chips communicate organic bamboo, dual-pouch construction, and cleaner material cues quickly, creating a readable hierarchy between construction, material quality, comfort, and functional performance.",
      },
      {
        label: "Social Proof",
        title: "Supporting the claim with visible proof",
        body: "Ratings, review volume, percentage-based proof blocks, and buyer language help balance the aggressive creative message with trust signals that make the product feel more credible.",
      },
      {
        label: "PDP Structure",
        title: "Turning one product into a clear offer ladder",
        body: "The PDP presents entry, mid-tier, and highest-value bundles so customers can compare quantity, price, savings, included colors, and perceived value without losing the purchase CTA.",
      },
      {
        label: "Mobile UX",
        title: "Preserving impact on smaller screens",
        body: "Mobile reorganizes the journey around immediate headline clarity, visible proof, dominant CTA treatment, stacked benefits, touch-friendly selectors, and product imagery that still carries the brand attitude.",
      },
    ],
    screenshots: [
      {
        src: "/images/cases/assence/01-assence-hero-desktop.png?v=20260721",
        alt: "Assence homepage hero featuring boxer products, social proof, benefits and Shop Now CTA",
        label: "Desktop hero",
        caption:
          "A dominant first viewport that turns brand attention into a product explanation with proof, benefits, and a direct shopping action.",
        type: "desktop",
      },
      {
        src: "/images/cases/assence/02-assence-hero-mobile.png?v=20260721",
        alt: "Mobile Assence homepage hero with product imagery, benefits, reviews and proof blocks",
        label: "Mobile hero",
        caption:
          "The mobile hierarchy keeps the headline, proof, CTA, benefits, and product story readable without shrinking the desktop composition.",
        type: "mobile",
      },
      {
        src: "/images/cases/assence/04-assence-pdp-desktop.png?v=20260721",
        alt: "Assence desktop product page with boxer bundle options, size selectors and Buy It Now CTA",
        label: "Desktop PDP",
        caption:
          "The PDP uses feature-led visuals, pricing, payment cues, bundle options, savings comparison, size selectors, and a clear buy action.",
        type: "desktop",
      },
      {
        src: "/images/cases/assence/03-assence-pdp-mobile.png?v=20260721",
        alt: "Assence mobile product page with product gallery, price, size options and quantity selector",
        label: "Mobile PDP",
        caption:
          "The mobile PDP prioritizes readable product details, interaction size, size selection, quantity controls, and visible purchase momentum.",
        type: "mobile",
      },
    ],
    decisions: [
      "Attention-led hero with product context",
      "Benefit chips for fast scanning",
      "Trust signals integrated near the claim",
      "Bundle options structured as an offer ladder",
      "Multiple size selectors kept inside one readable flow",
      "Mobile layout sequenced for touch and scanability",
    ],
    journey: {
      label: "Homepage to PDP Journey",
      body: "The experience moves customers through a focused path: attention, product benefits, social proof, Shop Now, product details, bundle selection, size selection, and purchase. That direct transition matters for a store centered around one primary product.",
    },
    takeaway: {
      label: "Strategic Takeaway",
      body: "Bold creative direction works best when the shopping journey stays clear. Assence uses personality to earn attention, then product benefits, proof, bundles, sizing, and purchase structure to turn that attention into a concrete buying path.",
    },
  },
} satisfies SelectedCase;

// Health-related on-page claims shown inside IVER screenshots are client-supplied
// marketing content and should receive legal/platform review before publication.
const iverCase = {
  number: "02",
  slug: "iver",
  client: "IVER",
  industry: "Health & Wellness E-commerce",
  headline:
    "Structuring a high-information PDP around one clear purchase decision.",
  summary:
    "IVER's PDP needed to present product imagery, promotional offers, bundle savings, subscription messaging, trust signals, and educational content without making the purchase journey feel fragmented.",
  problem:
    "The page contained competing decision elements: product media, displayed trust signals, bundle tiers, bonuses, subscription terms, pricing, urgency, education, and purchase actions.",
  solution:
    "We organized the PDP around a cleaner sequence: product understanding, trust signals, offer comparison, subscription choice, Buy Now, and supporting education.",
  impact:
    "A high-information product page structured to help customers compare offers, understand the purchase model, and keep the primary action visible.",
  services: [
    "PDP Strategy",
    "Offer Architecture",
    "Responsive UX",
    "E-commerce CRO",
  ],
  technologies: ["Shopify UX", "Offer Design", "Responsive Design"],
  metrics: [
    {
      value: "1",
      label: "Primary PDP path",
    },
    {
      value: "3",
      label: "Offer tiers structured",
    },
    {
      value: "Sticky",
      label: "Purchase support",
    },
  ],
  theme: {
    background: "#EFF6FB",
    foreground: "#121821",
    accent: "#2F80ED",
  },
  image: "/images/cases/iver/01-iver-pdp-desktop.png?v=20260721",
  imageAlt:
    "IVER product detail page with product gallery, bundle offers, subscription option and Buy Now button",
  featured: true,
  preview: {
    industry: "Health & Wellness E-commerce",
    headline:
      "Structuring a high-information PDP around one clear purchase decision.",
    summary:
      "We organized IVER's product, offer tiers, subscription option, educational content, and purchase actions into a clearer single-product shopping journey.",
    image: "/images/cases/iver/01-iver-pdp-desktop.png?v=20260721",
    imageAlt:
      "IVER desktop PDP showing product gallery, offer tiers, subscription option and Buy Now CTA",
    imageFit: "contain",
    services: [
      "PDP Strategy",
      "Offer Architecture",
      "Responsive UX",
      "E-commerce CRO",
    ],
  },
  detail: {
    eyebrow: "IVER",
    title:
      "Structuring a high-information PDP around one clear purchase decision.",
    introduction:
      "IVER's product page needed to present product imagery, promotional offers, bundle savings, subscription messaging, displayed trust signals, and educational content through one focused product-detail experience.",
    sections: [
      {
        label: "The Challenge",
        title: "Making a dense product page easier to navigate",
        body: "The PDP contains several competing information types: product media, promotional messaging, social proof visuals, bundle tiers, bonuses, subscription terms, pricing, urgency, and educational content. The work was to create enough hierarchy for customers to identify what mattered at each stage.",
      },
      {
        label: "Product Anchor",
        title: "Giving the product a clear visual anchor",
        body: "The desktop layout separates the product gallery from the offer and purchase interface. The main visual establishes the item immediately, while supporting gallery assets remain available for customers seeking more context.",
      },
      {
        label: "Decision Signals",
        title: "Placing trust and attention signals near the title",
        body: "The design places the brand's supplied trust and attention signals close to the product title, making them visible during initial evaluation without presenting those claims as independently verified by PCL.",
      },
      {
        label: "Offer Architecture",
        title: "Turning purchase options into a clear offer ladder",
        body: "The three-tier offer structure helps customers compare quantity, displayed price, displayed savings, included bonuses, shipping inclusion, and recommended options. Brand-supplied merchandising labels guide comparison between tiers.",
      },
      {
        label: "Subscription UX",
        title: "Keeping subscription separate but connected",
        body: "The subscription choice appears after bundle selection and before the main CTA, creating a clean sequence: choose quantity, choose purchase model, then buy now.",
      },
      {
        label: "Education",
        title: "Extending product education beyond the offer box",
        body: "Supporting sections organize the brand's supplied product-positioning content into individual cards, making a long explanation easier to scan after the primary purchase decision area.",
      },
    ],
    screenshots: [
      {
        src: "/images/cases/iver/01-iver-pdp-desktop.png?v=20260721",
        alt: "IVER product detail page with product gallery, bundle offers, subscription option and Buy Now button",
        label: "Desktop PDP",
        caption:
          "A split PDP structure keeps product media and offer selection visible at the same time, helping customers move from evaluation into purchase decisions.",
        type: "desktop",
      },
      {
        src: "/images/cases/iver/02-iver-pdp-mobile-top.png?v=20260721",
        alt: "Mobile IVER product page showing product image, gallery, trust signals and product title",
        label: "Mobile product view",
        caption:
          "Mobile shifts the experience into a vertical flow: navigation, main product image, gallery access, displayed trust signals, title, and product context.",
        type: "mobile",
      },
      {
        src: "/images/cases/iver/03-iver-offer-mobile.png?v=20260721",
        alt: "Mobile IVER bundle selection with pricing, savings, subscription and Buy Now action",
        label: "Mobile offer view",
        caption:
          "Offer cards use strong selected states, stacked pricing, readable savings badges, bonus rows, subscription selection, and a full-width Buy Now action.",
        type: "mobile",
      },
      {
        src: "/images/cases/iver/04-iver-benefits-desktop.png?v=20260721",
        alt: "IVER product information section with supporting image and benefit cards",
        label: "Desktop education",
        caption:
          "The educational section gives the brand space to organize supplied product-positioning information without crowding the core purchase interface.",
        type: "desktop",
      },
    ],
    decisions: [
      "Product gallery separated from offer controls",
      "Displayed trust signals placed near evaluation",
      "Three offer tiers built into a clear comparison ladder",
      "Selected package made visually explicit",
      "Subscription choice sequenced before Buy Now",
      "Sticky purchase support designed for longer PDPs",
    ],
    journey: {
      label: "PDP Purchase Journey",
      body: "The page follows one focused path: product image, product information, displayed trust signals, bundle selection, subscription choice, Buy Now, and supporting education. It keeps attention on one primary product and one purchase objective.",
    },
    takeaway: {
      label: "Strategic Takeaway",
      body: "High-information PDPs need stronger hierarchy, not more noise. The IVER experience gives each decision a clear place so product imagery, offers, subscription messaging, educational content, and purchase actions support the next customer decision.",
    },
  },
} satisfies SelectedCase;

const normalizedCases = data.caseStudies.items as SelectedCase[];

export const selectedCases: SelectedCase[] = [
  assenceCase,
  iverCase,
  ...normalizedCases,
]
  .filter((caseStudy) => selectedCaseSlugs.includes(caseStudy.slug))
  .map((caseStudy, index) => ({
    ...caseStudy,
    number: String(index + 1).padStart(2, "0"),
  }));

export function getSelectedCaseIndexBySlug(slug?: string) {
  if (!slug) {
    return 0;
  }

  const index = selectedCases.findIndex((caseStudy) => caseStudy.slug === slug);

  return index >= 0 ? index : 0;
}
