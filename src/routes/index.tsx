import { createFileRoute } from "@tanstack/react-router";
import { AchievementPopup } from "@/components/AchievementPopup";
import { BackgroundLayers } from "@/components/BackgroundLayers";
import { Footer } from "@/components/Footer";
import { KonamiEgg } from "@/components/KonamiEgg";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { About } from "@/components/sections/About";
import { Agenda } from "@/components/sections/Agenda";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { Organizers } from "@/components/sections/Organizers";
import { RegisterCTA } from "@/components/sections/RegisterCTA";
import { Speakers } from "@/components/sections/Speakers";
import { Sponsors } from "@/components/sections/Sponsors";
import { Tracks } from "@/components/sections/Tracks";
import { WhyAttend } from "@/components/sections/WhyAttend";
import { Workshops } from "@/components/sections/Workshops";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-white">
      <BackgroundLayers />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyAttend />
        <Tracks />
        <Agenda />
        <Speakers />
        <Workshops />
        <Sponsors />
        <Organizers />
        <FAQ />
        <RegisterCTA />
      </main>
      <Footer />
      <AchievementPopup />
      <KonamiEgg />
    </div>
  );
}
