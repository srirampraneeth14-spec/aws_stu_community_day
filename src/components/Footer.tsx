import { Cloud, Instagram, Linkedin, Mail, MapPin, Youtube } from "lucide-react";
import { NAV_LINKS } from "@/data/event";

const VENUE_ADDRESS =
  "Raghu Engineering College, Dakamarri, Bheemunipatnam Mandal, Visakhapatnam - 531162";
const VENUE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Raghu+Engineering+College,Dakamarri,Bheemunipatnam+Mandal,Visakhapatnam+531162";

const SOCIAL_LINKS = [
  {
    name: "linkedin",
    href: "https://www.linkedin.com/company/aws-cloud-club/",
    Icon: Linkedin,
    iconClass: "text-[#38BDF8]",
  },
  {
    name: "instagram",
    href: "https://www.instagram.com/awsclub_rec?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    Icon: Instagram,
    iconClass: "text-[#FF9900]",
  },
  {
    name: "youtube",
    href: "https://youtube.com/@awsstudentbuildergroupatrec?si=Sj6Osho1EiC_-6D0",
    Icon: Youtube,
    iconClass: "text-[#FF9900]",
  },
  {
    name: "meetup",
    href: "https://www.meetup.com/aws-cloud-club-at-raghu-eng-college",
    Icon: MeetupIcon,
    iconClass: "text-[#FF9900]",
  },
] as const;

function MeetupIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M6.5 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/5 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <a href="#top" className="flex items-center gap-2 text-white">
            <span
              className="grid h-9 w-9 place-items-center rounded-lg"
              style={{ background: "linear-gradient(135deg,#FF9900,#8B5CF6)" }}
            >
              <Cloud className="h-4 w-4 text-black" />
            </span>
            <span className="text-base font-bold tracking-tight">AWS Community Day</span>
          </a>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
            A community-run conference by builders, for builders. Talks, hands-on workshops,
            and the kind of hallway conversations that turn into your next role, project,
            or startup.
          </p>
          <a
            href={VENUE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-start gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF9900]" />
            <span>{VENUE_ADDRESS}</span>
          </a>
          <a
            href="mailto:awscloudclubrecofficial@gmail.com"
            className="mt-2 flex items-center gap-2 text-sm text-white/60 hover:text-white"
          >
            <Mail className="h-4 w-4 text-[#38BDF8]" />
            awscloudclubrecofficial@gmail.com
          </a>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Quick Links
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 md:grid-cols-1">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Social
          </p>
          <ul className="mt-4 space-y-2">
            {SOCIAL_LINKS.map(({ name, href, Icon, iconClass }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Icon className={`h-4 w-4 shrink-0 ${iconClass}`} />
                  <span>{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-4 font-mono text-xs text-white/70">
          <p>
            <span className="text-[#22C55E]">$</span> echo &quot;Thank you for building with the community.&quot;
          </p>
          <p className="mt-1 text-white/40">
            <span className="text-[#22C55E]">$</span> exit 0
          </p>
        </div>
        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-white/30">
          © {new Date().getFullYear()} AWS Community Day · Independently organized · Built with ☁ + ❤
        </p>
      </div>
    </footer>
  );
}