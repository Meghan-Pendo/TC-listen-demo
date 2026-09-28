import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/submit-feedback")({
  head: () => ({
    meta: [
      { title: "Submit Feedback — Teammate Central" },
      {
        name: "description",
        content:
          "Share ideas and feedback with the Teammate Central team through the Listen Portal.",
      },
      { property: "og:title", content: "Submit Feedback — Teammate Central" },
      {
        property: "og:description",
        content:
          "Share ideas and feedback with the Teammate Central team through the Listen Portal.",
      },
    ],
  }),
  component: SubmitFeedback,
});

function SubmitFeedback() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <div className="flex items-center gap-4 bg-nav px-6 py-4 text-nav-foreground">
        <Link
          to="/"
          id="feedback-back-home"
          data-pendo-id="feedback-back-home"
          className="feedback-back-home flex items-center gap-1 font-display text-sm font-semibold hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Teammate Central
        </Link>
        <h1 className="font-display text-lg font-bold">Submit Feedback</h1>
      </div>

      <div
        id="listen-portal-embed"
        data-pendo-id="listen-portal-embed"
        className="listen-portal-embed flex-1"
      >
        <iframe
          src="https://portal.pendo.io/p/5ee24073-a359-4964-9d8d-8f125cc680c9/VzQKMbphyvreDQkzvLbLcFwrgpM?container=embed"
          title="Listen Portal"
          className="h-full min-h-[calc(100vh-4rem)] w-full"
          frameBorder="0"
        />
      </div>
    </div>
  );
}
