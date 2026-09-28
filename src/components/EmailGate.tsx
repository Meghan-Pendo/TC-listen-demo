import { useState } from "react";
import { z } from "zod";
import { setUserEmail } from "@/lib/pendo";

const emailSchema = z.string().trim().email("Please enter a valid work email").max(255);

export function EmailGate() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return setError("Work email is required");
    const r = emailSchema.safeParse(value);
    if (!r.success) return setError(r.error.issues[0]?.message ?? "Invalid email");
    setUserEmail(r.data.toLowerCase());
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface font-sans text-foreground">
      <header className="flex h-12 items-center bg-sp-bar px-4 text-sp-bar-foreground">
        <span className="text-lg font-semibold">SharePoint</span>
      </header>
      <div className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={submit}
          noValidate
          id="email-gate"
          data-pendo-id="email-gate"
          className="email-gate w-full max-w-md overflow-hidden rounded border border-border bg-card shadow-lg"
        >
          <div className="flex items-center gap-2 bg-nav px-6 py-4 font-display text-sm font-bold text-nav-foreground">
            DaVita<span className="text-brand-orange">✦</span>
            <span className="border-l border-nav-foreground/40 pl-2 leading-3">
              TEAMMATE
              <br />
              CENTRAL
            </span>
          </div>
          <div className="p-6">
            <h1 className="font-display text-2xl font-bold">Welcome, teammate</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your work email to continue to Teammate Central.
            </p>
            <label className="mt-5 block text-sm font-semibold" htmlFor="email-gate-input">
              Work email
            </label>
            <input
              id="email-gate-input"
              data-pendo-id="email-gate-input"
              type="email"
              required
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(null);
              }}
              placeholder="name@davita.com"
              aria-invalid={!!error}
              className="email-gate-input mt-1 w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-link"
            />
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
            <button
              type="submit"
              id="email-gate-continue"
              data-pendo-id="email-gate-continue"
              className="email-gate-continue mt-5 w-full rounded bg-sp-bar px-4 py-2 font-display text-sm font-semibold text-sp-bar-foreground hover:opacity-90"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
