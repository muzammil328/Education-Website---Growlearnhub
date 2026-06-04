import { PlanOption } from '../types/user.type';

// ─────────────────────────────────────────────────────────────────────────────
// 1. Plan Definitions
// ─────────────────────────────────────────────────────────────────────────────

// ── 1a. Free ─────────────────────────────────────────────────────────────────

export const FREE_PLAN = {
  id: 'free',
  variantId: '1701464',
  billingModel: 'flat',
  tier: 'free',
  name: 'Freemium',
  price: 0,
  yearlyPrice: 0,
  responses: 100,
  users: 1,
  popular: false,
  features: [
    'Free forever',
    '100 responses/month',
    '1 form',
    'Basic features',
    'Upgrade anytime',
  ],
} as const satisfies PlanOption;

// ── 1b. Flat ──────────────────────────────────────────────────────────────────

export const FLAT_PLANS = [
  {
    id: 'flat-basic',
    variantId: '',
    billingModel: 'flat',
    tier: 'basic',
    name: 'Basic',
    price: 15,
    yearlyPrice: 12,
    responses: 250,
    users: 5,
    popular: false,
    features: [
      'Up to 5 forms',
      '250 responses/month',
      'Basic analytics',
      'Email support',
      '5 team members',
    ],
  },
  {
    id: 'flat-pro',
    variantId: '',
    billingModel: 'flat',
    tier: 'pro',
    name: 'Pro',
    price: 29,
    yearlyPrice: 23,
    responses: 1_000,
    users: 10,
    popular: true,
    features: [
      'Up to 30 forms',
      '1,000 responses/month',
      'Advanced analytics',
      'Email support',
      '10 team members',
    ],
  },
  {
    id: 'flat-business',
    variantId: '',
    billingModel: 'flat',
    tier: 'business',
    name: 'Business',
    price: 99,
    yearlyPrice: 79,
    responses: 10_000,
    users: Infinity,
    popular: false,
    features: [
      'Unlimited forms',
      '10,000 responses/month',
      'Integrations',
      'Priority support',
      'Unlimited team members',
    ],
  },
  {
    id: 'flat-enterprise',
    variantId: '',
    billingModel: 'flat',
    tier: 'enterprise',
    name: 'Enterprise',
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: Infinity,
    popular: false,
    features: [
      'Unlimited everything',
      'Custom SLAs',
      'Priority support',
      'Dedicated account manager',
      'Custom integrations',
    ],
  },
] as const satisfies PlanOption[];

// ── 1c. Usage-based ───────────────────────────────────────────────────────────

export const USAGE_PLANS = [
  {
    id: 'usage-basic',
    variantId: '1701464',
    billingModel: 'usage',
    tier: 'basic',
    name: 'Basic',
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: 5,
    popular: false,
    features: [
      'Pay only for what you use',
      '$0.10 per response',
      'Up to 5 forms',
      'Email support',
      '5 team members',
    ],
  },
  {
    id: 'usage-pro',
    variantId: '',
    billingModel: 'usage',
    tier: 'pro',
    name: 'Pro',
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: 10,
    popular: true,
    features: [
      'Pay only for what you use',
      '$0.08 per response',
      'Up to 30 forms',
      'Advanced analytics',
      '10 team members',
    ],
  },
  {
    id: 'usage-business',
    variantId: '',
    billingModel: 'usage',
    tier: 'business',
    name: 'Business',
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: Infinity,
    popular: false,
    features: [
      'Pay only for what you use',
      '$0.05 per response',
      'Unlimited forms',
      'Priority support',
      'Unlimited team members',
    ],
  },
  {
    id: 'usage-enterprise',
    variantId: '',
    billingModel: 'usage',
    tier: 'enterprise',
    name: 'Enterprise',
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: Infinity,
    popular: false,
    features: [
      'Custom per-response rate',
      'Unlimited forms',
      'Dedicated account manager',
      'Custom SLAs',
      'Custom integrations',
    ],
  },
] as const satisfies PlanOption[];

// ── 1d. Dynamic pricing ───────────────────────────────────────────────────────

export const DYNAMIC_PLANS = [
  {
    id: 'dynamic-basic',
    variantId: '',
    billingModel: 'dynamic',
    tier: 'basic',
    name: 'Basic',
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: 5,
    popular: false,
    features: [
      'Dynamic pricing based on demand',
      'Lower rates during off-peak',
      'Up to 5 forms',
      'Email support',
      '5 team members',
    ],
  },
  {
    id: 'dynamic-pro',
    variantId: '',
    billingModel: 'dynamic',
    tier: 'pro',
    name: 'Pro',
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: 10,
    popular: true,
    features: [
      'Dynamic pricing based on demand',
      'Lower rates during off-peak',
      'Up to 30 forms',
      'Advanced analytics',
      '10 team members',
    ],
  },
  {
    id: 'dynamic-business',
    variantId: '',
    billingModel: 'dynamic',
    tier: 'business',
    name: 'Business',
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: Infinity,
    popular: false,
    features: [
      'Dynamic pricing based on demand',
      'Best off-peak rates',
      'Unlimited forms',
      'Priority support',
      'Unlimited team members',
    ],
  },
  {
    id: 'dynamic-enterprise',
    variantId: '',
    billingModel: 'dynamic',
    tier: 'enterprise',
    name: 'Enterprise',
    price: 0,
    yearlyPrice: 0,
    responses: Infinity,
    users: Infinity,
    popular: false,
    features: [
      'Custom dynamic rate',
      'Guaranteed off-peak pricing',
      'Unlimited forms',
      'Dedicated account manager',
      'Custom integrations',
    ],
  },
] as const satisfies PlanOption[];

// ─────────────────────────────────────────────────────────────────────────────
// 2. Plan Registry
// ─────────────────────────────────────────────────────────────────────────────

/** Every plan in display order: free → flat → usage → dynamic. */
export const ALL_PLANS: PlanOption[] = [
  FREE_PLAN,
  ...FLAT_PLANS,
  ...USAGE_PLANS,
  ...DYNAMIC_PLANS,
];

/** O(1) lookup map keyed by stable plan id. */
export const PLAN_MAP: Readonly<Record<PlanOption['id'], PlanOption>> =
  ALL_PLANS.reduce((acc, plan) => {
    acc[plan.id] = plan;
    return acc;
  }, {} as Record<PlanOption['id'], PlanOption>);

/**
 * Return all plans for a given billing model.
 *
 * @example getPlansByBillingModel('flat')    // → [Freemium, Basic, Pro, Business, Enterprise]
 * @example getPlansByBillingModel('usage')   // → [Basic, Pro, Business, Enterprise]
 * @example getPlansByBillingModel('dynamic') // → [Basic, Pro, Business, Enterprise]
 */
export function getPlansByBillingModel(billingModel: 'flat' | 'usage' | 'dynamic'): PlanOption[] {
  return ALL_PLANS.filter(p => p.billingModel === billingModel);
}

/** Look up a plan by its stable id. */
export function getPlanById(id: PlanOption['id']): PlanOption {
  return PLAN_MAP[id];
}

/** Return the equivalent plan under another billing model. */
export function switchBillingModel(plan: PlanOption, billingModel: 'flat' | 'usage' | 'dynamic'): PlanOption {
  if (plan.id === 'free') {
    return FREE_PLAN;
  }

  const targetId = `${billingModel}-${plan.tier}` as PlanOption['id'];
  return PLAN_MAP[targetId];
}

/** Return the default plan. */
export function getDefaultPlan(): PlanOption {
  return FREE_PLAN;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Display Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Human-readable monthly price string.
 *
 * | Plan                       | Output          |
 * |----------------------------|-----------------|
 * | Freemium                   | "Free"          |
 * | flat-basic/pro/business    | "$15/mo"        |
 * | flat-enterprise            | "Custom"        |
 * | usage-* / dynamic-*        | "Pay-as-you-go" |
 */
export function getPlanPrice(plan: PlanOption): string {
  switch (plan.billingModel) {
    case 'flat':
      if (plan.tier === 'free') return 'Free';
      if (plan.tier === 'enterprise') return 'Custom';
      return `$${plan.price}/mo`;
    case 'usage':
    case 'dynamic':
      return 'Pay-as-you-go';
  }
}

/**
 * Human-readable yearly price string. Returns null if plan has no yearly price.
 *
 * @example getPlanYearlyPrice(flatBasicPlan) // → "$12/mo"
 * @example getPlanYearlyPrice(freePlan)      // → null
 */
export function getPlanYearlyPrice(plan: PlanOption): string | null {
  if (!plan.yearlyPrice) return null;
  return `$${plan.yearlyPrice}/mo`;
}

/**
 * Human-readable response limit.
 *
 * @example formatResponses(1_000)    // → "1,000"
 * @example formatResponses(Infinity) // → "Unlimited"
 */
export function formatResponses(responses: number): string {
  return isFinite(responses) ? responses.toLocaleString() : 'Unlimited';
}

/**
 * Human-readable seat limit.
 *
 * @example formatUsers(5)        // → "5 members"
 * @example formatUsers(1)        // → "1 member"
 * @example formatUsers(Infinity) // → "Unlimited members"
 */
export function formatUsers(users: number): string {
  if (!isFinite(users)) return 'Unlimited members';
  return `${users} ${users === 1 ? 'member' : 'members'}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Predicate Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** True when the plan is the free/freemium tier. */
export function isFreePlan(plan: PlanOption): boolean {
  return plan.tier === 'free';
}

/** True when the plan requires contacting sales (Enterprise). */
export function isCustomPricingPlan(plan: PlanOption): boolean {
  return plan.tier === 'enterprise' && plan.billingModel === 'flat';
}

/** True when the plan uses pay-as-you-go or dynamic billing. */
export function isUsageBasedPlan(plan: PlanOption): boolean {
  return plan.billingModel === 'usage' || plan.billingModel === 'dynamic';
}

/** True when the plan uses flat monthly/yearly billing. */
export function isFlatBillingPlan(plan: PlanOption): boolean {
  return plan.billingModel === 'flat';
}

/** True when the plan is marked as the most popular tier. */
export function isPopularPlan(plan: PlanOption): boolean {
  return plan.popular === true;
}