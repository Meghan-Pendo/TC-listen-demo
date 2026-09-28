import { useEffect, useState } from "react";
import { Settings2 } from "lucide-react";
import {
  DEFAULT_PENDO_CONFIG,
  initializePendo,
  launchPendoDesigner,
  loadGatedConfig,
  savePendoConfig,
  setUserEmail,
  USER_CHANGE_EVENT,
  type PendoConfig,
} from "@/lib/pendo";

export function DemoTools() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<PendoConfig>(DEFAULT_PENDO_CONFIG);
  const [draft, setDraft] = useState<PendoConfig>(DEFAULT_PENDO_CONFIG);
  const [status, setStatus] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => {
      const stored = loadGatedConfig();
      if (!stored) {
        // Wait for email gate before initializing Pendo
        setVisible(false);
        setOpen(false);
        return;
      }
      setVisible(stored.accountId === "Pendo");
      setConfig(stored);
      setDraft(stored);
      initializePendo(stored);
    };
    sync();
    window.addEventListener(USER_CHANGE_EVENT, sync);
    return () => window.removeEventListener(USER_CHANGE_EVENT, sync);
  }, []);

  const apply = () => {
    savePendoConfig(draft);
    setConfig(draft);
    if (draft.visitorId) setUserEmail(draft.visitorId);
    else initializePendo(draft);
    setStatus("Configuration saved. Reload if the app key changed.");
  };

  // Demo Tools are only shown to Pendo teammates
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
      {open && (
        <div
          className="demo-tools-panel w-80 rounded-lg border border-border bg-card p-4 shadow-xl"
          data-demo-tools="panel"
        >
          <h2 className="text-sm font-semibold text-foreground">Demo Tools</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Pendo configuration for this demo session.
          </p>

          <div className="mt-3 space-y-3">
            <label className="block text-xs font-medium text-muted-foreground">
              Pendo App Key
              <input
                className="demo-tools-app-key mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs text-foreground"
                value={draft.apiKey}
                onChange={(e) => setDraft({ ...draft, apiKey: e.target.value })}
                placeholder="Paste public app key"
              />
            </label>
            <label className="block text-xs font-medium text-muted-foreground">
              Visitor ID
              <input
                className="demo-tools-visitor-id mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs text-foreground"
                value={draft.visitorId}
                onChange={(e) => setDraft({ ...draft, visitorId: e.target.value })}
              />
            </label>
            <label className="block text-xs font-medium text-muted-foreground">
              Account ID
              <input
                className="demo-tools-account-id mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs text-foreground"
                value={draft.accountId}
                onChange={(e) => setDraft({ ...draft, accountId: e.target.value })}
              />
            </label>
          </div>

          <div className="mt-3 rounded-md bg-muted p-2 text-[11px] leading-relaxed text-muted-foreground">
            <div>App key: {config.apiKey || "not set"}</div>
            <div>Visitor: {config.visitorId}</div>
            <div>Account: {config.accountId}</div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              className="demo-tools-save flex-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              onClick={apply}
            >
              Save
            </button>
            <button
              className="demo-tools-launch-vds flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent"
              onClick={() =>
                setStatus(
                  launchPendoDesigner()
                    ? "Launching Visual Design Studio…"
                    : "Pendo agent not loaded yet.",
                )
              }
            >
              Launch VDS
            </button>
          </div>
          {status && (
            <p className="mt-2 text-[11px] text-muted-foreground">{status}</p>
          )}
        </div>
      )}

      <button
        className="demo-tools-toggle flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground"
        aria-label="Demo Tools"
        data-demo-tools="toggle"
        onClick={() => setOpen((v) => !v)}
      >
        <Settings2 className="h-4 w-4" />
      </button>
    </div>
  );
}
