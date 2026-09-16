import { createFileRoute } from "@tanstack/react-router";
import { HackathonPage } from "@/components/HackathonPage";

export const Route = createFileRoute("/hackathon")({
  component: HackathonPage,
  head: () => ({
    meta: [
      {
        title:
          "AI Innovation Hackathon | AWS Student Community Day Vizag 2026",
      },
      {
        name: "description",
        content:
          "AI Innovation Hackathon — Build Something Real in any domain you're passionate about. Part of AWS Student Community Day Vizag 2026 at Raghu Engineering College. Build a working prototype, get judged by an industry panel, and win from a ₹30,000 prize pool of AI & developer tools.",
      },
    ],
  }),
});
