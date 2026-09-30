/**
 * Pendo installation + demo configuration helpers.
 * Single-page app install: the agent snippet is injected once, then
 * pendo.initialize() / pendo.identify() are called on config changes and
 * route changes are tracked automatically by the SPA agent.
 * Docs: https://support.pendo.io/hc/en-us/articles/360031862272
 */

export type PendoConfig = {
  apiKey: string;
  visitorId: string;
  accountId: string;
};

export const DEFAULT_PENDO_CONFIG: PendoConfig = {
  // Public Pendo app key (safe to ship client-side).
  apiKey: "7d291d57-8efb-4ba1-b416-331444ec08f6",
  visitorId: "teammate.demo@davita.com",
  accountId: "DaVita",
};

const STORAGE_KEY = "pendo-demo-config";

// Previous default app key. Browsers that saved it get the current default instead.
const RETIRED_API_KEYS = ["5ee24073-a359-4964-9d8d-8f125cc680c9"];

declare global {
  interface Window {
    pendo?: any;
  }
}

export function loadPendoConfig(): PendoConfig {
  if (typeof window === "undefined") return DEFAULT_PENDO_CONFIG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PENDO_CONFIG;
    const merged = { ...DEFAULT_PENDO_CONFIG, ...JSON.parse(raw) } as PendoConfig;
    if (!merged.apiKey || RETIRED_API_KEYS.includes(merged.apiKey.trim())) {
      merged.apiKey = DEFAULT_PENDO_CONFIG.apiKey;
    }
    return merged;
  } catch {
    return DEFAULT_PENDO_CONFIG;
  }
}

export function savePendoConfig(config: PendoConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

/** Injects the standard Pendo agent snippet for the given app key. */
export function installPendoAgent(apiKey: string) {
  if (typeof window === "undefined" || !apiKey) return;
  if (document.getElementById("pendo-agent-script")) return;

  const p = window as any;
  const o: any = (p.pendo = p.pendo || {});
  o._q = o._q || [];
  const v = ["initialize", "identify", "updateOptions", "pageLoad", "track"];
  v.forEach((m: string) => {
    o[m] =
      o[m] ||
      function (this: unknown, ...args: unknown[]) {
        o._q[m === v[0] ? "unshift" : "push"]([m].concat(args as never[]));
      };
  });
  const y = document.createElement("script");
  y.async = true;
  y.id = "pendo-agent-script";
  y.src = "https://cdn.pendo.io/agent/static/" + apiKey + "/pendo.js";
  const z = document.getElementsByTagName("script")[0];
  z?.parentNode?.insertBefore(y, z);

}

/** Initializes (or re-identifies) the Pendo agent with the demo metadata. */
export function initializePendo(config: PendoConfig) {
  if (typeof window === "undefined" || !config.apiKey) return;
  installPendoAgent(config.apiKey);
  const payload = {
    visitor: { id: config.visitorId },
    account: { id: config.accountId },
  };
  const pendo = window.pendo;
  if (!pendo) return;
  if (typeof pendo.isReady === "function" && pendo.isReady()) {
    pendo.identify(payload);
  } else {
    pendo.initialize(payload);
  }
}

/** Opens the Pendo Visual Design Studio. */
export function launchPendoDesigner() {
  const pendo = typeof window !== "undefined" ? window.pendo : undefined;
  if (pendo?.designerv2?.launchInAppDesigner) {
    pendo.designerv2.launchInAppDesigner();
    return true;
  }
  return false;
}

/* ---------- Email gate (visitor identity) ---------- */
const EMAIL_KEY = "tc-user-email";
export const USER_CHANGE_EVENT = "tc-user-change";

export function getUserEmail(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(EMAIL_KEY);
}

export function setUserEmail(email: string) {
  window.localStorage.setItem(EMAIL_KEY, email);
  window.dispatchEvent(new Event(USER_CHANGE_EVENT));
}

export function clearUserEmail() {
  window.localStorage.removeItem(EMAIL_KEY);
  window.pendo?.clearSession?.();
  window.dispatchEvent(new Event(USER_CHANGE_EVENT));
}

/** Config with the gated email as visitor ID (null if no email yet). */
export function loadGatedConfig(): PendoConfig | null {
  const email = getUserEmail();
  if (!email) return null;
  const accountId = email.toLowerCase().endsWith("@pendo.io") ? "Pendo" : "DaVita";
  return { ...loadPendoConfig(), visitorId: email, accountId };
}
