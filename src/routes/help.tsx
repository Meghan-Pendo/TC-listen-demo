import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — Teammate Central" },
      {
        name: "description",
        content: "Find answers, guides and support resources in the Teammate Central Help Center.",
      },
      { property: "og:title", content: "Help Center — Teammate Central" },
      {
        property: "og:description",
        content: "Find answers, guides and support resources in the Teammate Central Help Center.",
      },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <div className="flex items-center gap-4 bg-nav px-6 py-4 text-nav-foreground">
        <Link
          to="/"
          id="help-back-home"
          data-pendo-id="help-back-home"
          className="help-back-home flex items-center gap-1 font-display text-sm font-semibold hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Teammate Central
        </Link>
        <h1 className="font-display text-lg font-bold">Help Center</h1>
      </div>

      <div
        id="help-portal-embed"
        data-pendo-id="help-portal-embed"
        className="help-portal-embed flex-1"
      >
        <iframe
          src="https://portal.pendo.io/p/2d9ca49c-d4fd-4132-59ea-72018c9e5d77/9aaWfHMq-5mqvxaOBvZw-hggnec?container=embed"
          title="Help Center"
          className="h-full min-h-[calc(100vh-4rem)] w-full"
          frameBorder="0"
        />
      </div>
    </div>
  );
}
