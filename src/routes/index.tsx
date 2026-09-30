import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EmailGate } from "@/components/EmailGate";
import { clearUserEmail, getUserEmail, USER_CHANGE_EVENT } from "@/lib/pendo";
import {
  Grid3x3,
  Search,
  Settings,
  HelpCircle,
  Compass,
  UploadCloud,
  LayoutGrid,
  Cloud,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  HeartHandshake,
  SquarePen,
  Play,
  TriangleAlert,
  ClipboardCheck,
  ReceiptText,
  PiggyBank,
  Clock,
  Heart,
  Star,
  Lightbulb,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Teammate Central — DaVita Intranet Home" },
      {
        name: "description",
        content:
          "Teammate Central home: company news, applications, pay, benefits, time & PTO and recognition in one place.",
      },
      { property: "og:title", content: "Teammate Central — DaVita Intranet Home" },
      {
        property: "og:description",
        content:
          "Teammate Central home: company news, applications, pay, benefits, time & PTO and recognition in one place.",
      },
    ],
  }),
  component: GatedHome,
});

function GatedHome() {
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    const sync = () => {
      const e = getUserEmail();
      setEmail(e && /@(davita\.com|pendo\.io)$/i.test(e) ? e : null);
    };
    sync();
    window.addEventListener(USER_CHANGE_EVENT, sync);
    return () => window.removeEventListener(USER_CHANGE_EVENT, sync);
  }, []);
  if (email === undefined) return <div className="min-h-screen bg-surface" />;
  if (!email) return <EmailGate />;
  return <Index email={email} />;
}

const navItems = [
  { label: "Applications", caret: false },
  { label: "Clinical Central", caret: true },
  { label: "Services", caret: true },
  { label: "Starting at DaVita", caret: true },
  { label: "Pay & Benefits", caret: true },
  { label: "Career & Growth", caret: true },
  { label: "Creating a Special Place", caret: true },
  { label: "Our Village", caret: true },
];

const apps = [
  "Coupa (Non-Tx Related Purchasing)",
  "StarLearning (Legacy)",
  "Axis",
  "ELIE (Facility Demographics)",
  "DaVita AI Assistant",
  "Workday (HR System)",
  "Anaplan (Bus…",
];

const dashboard = [
  {
    icon: ClipboardCheck,
    title: "Action Needed",
    lines: ["2 Approvals"],
    bold: true,
  },
  {
    icon: ReceiptText,
    title: "Orders & Expenses",
    lines: ["Approvals, order statuses, & attestations"],
  },
  {
    icon: PiggyBank,
    title: "Pay",
    strong: "Last paid 08/07",
    lines: ["Update withholdings, direct deposit or set up DailyPay"],
  },
  {
    icon: Clock,
    title: "Time & PTO",
    lines: ["Manage your time-clock, PTO & LOA"],
  },
  {
    icon: Heart,
    title: "Benefits",
    lines: ["Access and learn about your DaVita Benefits"],
  },
];

const rail = [
  { icon: Compass, label: "Discover", id: "discover" },
  { icon: UploadCloud, label: "Publish", id: "publish" },
  { icon: LayoutGrid, label: "Build", id: "build" },
  { icon: Cloud, label: "OneDrive", id: "onedrive" },
  { icon: Lightbulb, label: "Submit feedback", id: "submit-feedback" },
];

function Index({ email }: { email: string }) {
  return (
    <div className="min-h-screen bg-surface font-sans text-foreground">
      {/* SharePoint suite bar */}
      <header className="flex h-12 items-center gap-3 bg-sp-bar px-3 text-sp-bar-foreground">
        <button aria-label="App launcher" className="rounded p-1 hover:bg-sp-bar-foreground/15">
          <Grid3x3 className="h-5 w-5" />
        </button>
        <span className="text-lg font-semibold">SharePoint</span>
        <div className="mx-auto w-full max-w-xl">
          <div className="flex items-center gap-2 rounded bg-sp-search px-3 py-1.5 text-muted-foreground">
            <Search className="h-4 w-4" />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Search Teammate Central"
              aria-label="Search Teammate Central"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs sm:inline">
            <span className="user-email opacity-90">{email}</span>{" "}
            <button
              type="button"
              id="switch-user"
              data-pendo-id="switch-user"
              onClick={clearUserEmail}
              className="switch-user underline opacity-90 hover:opacity-100"
            >
              Not you? Switch user
            </button>
          </span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-sp-bar-foreground text-[11px] font-bold text-brand-orange">
            Tx
          </span>
          <Settings className="h-5 w-5 opacity-90" />
          <span id="suitebar-help" data-pendo-id="suitebar-help" className="suitebar-help">
            <HelpCircle className="h-5 w-5 opacity-90" />
          </span>

          <span className="h-8 w-8 rounded-full bg-sp-bar-foreground/30" aria-hidden />
        </div>
      </header>

      <div className="flex">
        {/* Left rail */}
        <nav
          aria-label="Site rail"
          className="hidden w-20 shrink-0 flex-col items-center gap-6 bg-background py-4 md:flex"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-nav text-xs font-bold text-nav">
              Tx
            </span>
            <span className="text-[10px] text-muted-foreground">Teammat…</span>
          </div>
          {rail.map(({ icon: Icon, label, id }) => {
            const props = {
              id: `rail-${id}`,
              "data-pendo-id": `rail-${id}`,
              className: "rail-item flex flex-col items-center gap-1 text-muted-foreground",
              children: (
                <>
                  <Icon className="h-6 w-6" />
                  <span className="w-16 text-center text-[10px] leading-tight">{label}</span>
                </>
              ),
            };
            return id === "submit-feedback" ? (
              <Link key={label} to="/submit-feedback" {...props} />
            ) : (
              <button key={label} type="button" {...props} />
            );
          })}
        </nav>

        <main className="min-w-0 flex-1 bg-background pb-16">
          {/* Site nav */}
          <div className="flex items-center gap-6 overflow-x-auto bg-nav px-6 py-4 text-nav-foreground">
            <span className="flex shrink-0 items-center gap-2 font-display text-sm font-bold">
              DaVita<span className="text-brand-orange">✦</span>
              <span className="border-l border-nav-foreground/40 pl-2 leading-3">
                TEAMMATE
                <br />
                CENTRAL
              </span>
            </span>
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex shrink-0 items-center gap-1 font-display text-sm font-semibold hover:underline"
              >
                {item.label}
                {item.caret && <ChevronDown className="h-4 w-4" />}
              </button>
            ))}
            <MoreHorizontal className="h-5 w-5 shrink-0" />
          </div>

          <div className="px-6 py-6">
            {/* Hero tiles */}
            <section className="grid gap-0 lg:grid-cols-3">
              <div className="relative overflow-hidden bg-brand-orange p-6 text-nav">
                <p className="font-display text-lg font-bold">DaVita.</p>
                <h1 className="mt-3 font-display text-4xl leading-none font-extrabold">
                  Happy Field Leader
                  <br />
                  Appreciation!
                </h1>
                <p className="mt-3 max-w-xs text-sm font-medium">
                  Show your gratitude with a Gateway Bravo e-card.
                </p>
                <span className="absolute -right-6 top-6 h-28 w-28 rounded-full bg-tile-teal/40" />
              </div>

              <div className="grid grid-rows-2">
                <HeroTile
                  className="bg-tile-teal"
                  title="New Weight, Heart and Diabetes Support is Here!"
                  icon={HeartHandshake}
                />
                <HeroTile
                  className="bg-tile-blue"
                  title="Hear from Javier on the Village's Commitment to Compliance"
                  icon={Play}
                />
              </div>

              <div className="grid grid-rows-2">
                <HeroTile
                  className="bg-tile-navy"
                  title="Share Feedback: Workday-BenefitsforDaVita-Clinician's Portal"
                  icon={SquarePen}
                />
                <HeroTile
                  className="bg-tile-navy"
                  title="Participate in Water Surge: Complete a Leak Detection Walkthrough of Your Center by Aug. 28"
                  icon={TriangleAlert}
                />
              </div>
            </section>

            {/* My Applications */}
            <section className="mt-8">
              <div className="flex items-center gap-4">
                <h2 className="font-display text-2xl font-bold">My Applications</h2>
                <a className="text-sm text-link hover:underline" href="#">
                  See all
                </a>
                <a className="ml-auto text-sm text-link hover:underline" href="#">
                  My Favorites
                </a>
              </div>
              <div className="mt-4 flex items-stretch gap-3">
                <button
                  aria-label="Previous applications"
                  className="grid w-10 shrink-0 place-items-center bg-muted text-muted-foreground"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex flex-1 gap-3 overflow-hidden">
                  {apps.map((app) => (
                    <button
                      key={app}
                      className="shrink-0 rounded border border-border px-4 py-3 text-sm text-link hover:bg-accent"
                    >
                      {app}
                    </button>
                  ))}
                </div>
                <button
                  aria-label="Next applications"
                  className="grid w-10 shrink-0 place-items-center bg-sp-bar text-sp-bar-foreground"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </section>

            {/* Dashboard */}
            <section className="mt-8">
              <div className="flex items-center">
                <h2 className="font-display text-2xl font-bold">Dashboard</h2>
                <a className="ml-auto text-sm text-link hover:underline" href="#">
                  See all
                </a>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {dashboard.map(({ icon: Icon, title, lines, strong }) => (
                  <article
                    key={title}
                    className="min-h-52 rounded border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-link" />
                      <h3 className="font-display text-base font-semibold">{title}</h3>
                    </div>
                    {strong && <p className="mt-4 text-sm font-bold">{strong}</p>}
                    {lines.map((line) => (
                      <p key={line} className="mt-2 text-sm text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </article>
                ))}
                <article className="min-h-52 overflow-hidden rounded border border-border bg-card shadow-sm">
                  <div className="grid h-24 place-items-center bg-sp-bar">
                    <Star className="h-12 w-12 text-sp-bar-foreground" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-link" />
                      <h3 className="font-display text-base font-semibold">Recognition</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Recognize milestones or a job well done
                    </p>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function HeroTile({
  className,
  title,
  icon: Icon,
}: {
  className: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className={`flex items-center justify-between gap-4 p-5 text-nav-foreground ${className}`}>
      <p className="font-display text-sm leading-snug font-bold">{title}</p>
      <Icon className="h-9 w-9 shrink-0" />
    </div>
  );
}
