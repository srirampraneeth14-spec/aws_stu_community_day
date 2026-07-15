import { Cloud, Instagram, Linkedin, Mail, MapPin, Youtube } from "lucide-react";

const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/HN03AQ6Dt4PFbuRYFewatv";
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
            Follow
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
          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-white/40">
            Join our community
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </li>
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