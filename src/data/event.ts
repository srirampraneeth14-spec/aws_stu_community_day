export const EVENT_DATE = "Saturday, September 19";
export const EVENT_VENUE_NAME = "Raghu Engineering College";
export const VENUE_ADDRESS =
  "Raghu Engineering College, Dakamarri, Bheemunipatnam Mandal, Visakhapatnam - 531162";
export const VENUE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Raghu+Engineering+College,Dakamarri,Bheemunipatnam+Mandal,Visakhapatnam+531162";
export const REGISTRATION_URL = "https://konfhub.com/aws-student-community-day-rec";

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "why", label: "Why Attend" },
  { id: "agenda", label: "Agenda" },
  { id: "speakers", label: "Speakers" },
  { id: "workshops", label: "Workshops" },
  { id: "sponsors", label: "Sponsors" },
  { id: "organizers", label: "Organizers" },
  { id: "faq", label: "FAQ" },
  { id: "badge", label: "Badge" },
  { id: "contact", label: "Contact" },
] as const;

export const STATS = [
  { label: "Attendees", value: 500, suffix: "+" },
  { label: "Speakers", value: 6, suffix: "+" },
  { label: "Sessions", value: 9, suffix: "+" },
];

export const CLOUD_NODES = [
  "Compute",
  "Storage",
  "AI",
  "Containers",
  "Networking",
  "Security",
  "Serverless",
] as const;

export const CLOUD_NODE_SYNOPSIS: Record<(typeof CLOUD_NODES)[number], string> = {
  Compute:
    "Virtual servers and elastic capacity on demand. Scale from a single instance to thousands without provisioning hardware.",
  Storage:
    "Object, block, and archive storage built for any scale. Store and retrieve data with durability designed for critical workloads.",
  AI: "Machine learning and generative AI on managed infrastructure. Build, train, and deploy intelligent apps with foundation models and Bedrock.",
  Containers:
    "Run Docker and Kubernetes on ECS, EKS, and Fargate. Ship the same container from your laptop to production with less ops overhead.",
  Networking:
    "VPCs, load balancers, and global edge connectivity. Isolate workloads, route traffic securely, and reach users worldwide.",
  Security:
    "Identity, encryption, and threat detection at every layer. Enforce least privilege and compliance from your first deploy.",
  Serverless:
    "Functions and APIs that scale automatically with zero server management. Pay only for the compute you use — from zero to peak load.",
};

export const WHY_ATTEND = [
  {
    title: "Learn from Experts",
    body: "Talks from AWS Heroes, Community Builders, and senior engineers shipping real-world cloud systems.",
    icon: "GraduationCap",
  },
  {
    title: "Hands-on Workshops",
    body: "Bring your laptop. Leave with working code across serverless, AI, containers, and more.",
    icon: "Terminal",
  },
  {
    title: "Networking",
    body: "Meet the local cloud community — engineers, founders, students, and hiring teams.",
    icon: "Users",
  },
  {
    title: "Career Opportunities",
    body: "Connect with sponsor booths hiring across cloud, ML, DevOps, and platform roles.",
    icon: "Briefcase",
  },
  {
    title: "Community",
    body: "A welcoming, community-run event. First timers and students strongly encouraged.",
    icon: "Heart",
  },
  {
    title: "Swag & Giveaways",
    body: "Stickers, tees, credits, and surprise drops from sponsors throughout the day.",
    icon: "Gift",
  },
];

export const TRACKS = [
  { name: "Cloud Computing", tag: "core", icon: "Cloud" },
  { name: "AI & ML", tag: "ai", icon: "Sparkles" },
  { name: "DevOps", tag: "devops", icon: "GitBranch" },
  { name: "Containers", tag: "core", icon: "Boxes" },
  { name: "Serverless", tag: "core", icon: "Zap" },
  { name: "Security", tag: "sec", icon: "ShieldCheck" },
  { name: "Data", tag: "data", icon: "Database" },
  { name: "Frontend", tag: "web", icon: "Layout" },
  { name: "Career", tag: "grow", icon: "TrendingUp" },
];

export type AgendaParallelTrack = {
  title: string;
  track: "Cloud" | "AI" | "DevOps" | "Workshops";
  level?: string;
};

export type AgendaItem = {
  startTime: string;
  endTime: string;
  title: string;
  format?: string;
  speaker?: string;
  track: "Cloud" | "AI" | "DevOps" | "Workshops";
  parallelTracks?: AgendaParallelTrack[];
};

export const AGENDA: AgendaItem[] = [
  {
    startTime: "8:30 AM",
    endTime: "9:30 AM",
    title: "Registration and Welcome",
    format: "Check in and networking",
    track: "Cloud",
  },
  {
    startTime: "9:30 AM",
    endTime: "9:50 AM",
    title: "Opening Ceremony",
    format: "Welcome and introduction",
    track: "Cloud",
  },
  {
    startTime: "9:50 AM",
    endTime: "10:05 AM",
    title: "Keynote",
    format: "Jessica Gilmore",
    track: "Cloud",
  },
  {
    startTime: "10:10 AM",
    endTime: "11:00 AM",
    title: "Session 1: Discover AWS",
    format: "3 parallel talks",
    track: "Cloud",
    parallelTracks: [
      {
        title: "To Be Announced",
        track: "Cloud",
        level: "TBA",
      },
      {
        title: "To Be Announced",
        track: "AI",
        level: "TBA",
      },
      {
        title: "To Be Announced",
        track: "DevOps",
        level: "TBA",
      },
    ],
  },
  {
    startTime: "11:00 AM",
    endTime: "11:15 AM",
    title: "Tea and Networking Break",
    track: "Cloud",
  },
  {
    startTime: "11:15 AM",
    endTime: "12:05 PM",
    title: "Session 2: Build with AWS",
    format: "3 parallel talks",
    track: "DevOps",
    parallelTracks: [
      {
        title: "To Be Announced",
        track: "Cloud",
        level: "TBA",
      },
      {
        title: "To Be Announced",
        track: "AI",
        level: "TBA",
      },
      {
        title: "To Be Announced",
        track: "DevOps",
        level: "TBA",
      },
    ],
  },
  {
    startTime: "12:05 PM",
    endTime: "1:00 PM",
    title: "Lunch and Networking",
    format: "Community Networking",
    track: "Cloud",
  },
  {
    startTime: "1:10 PM",
    endTime: "3:30 PM",
    title: "Hands on Workshops",
    format: "3 parallel workshops",
    track: "Workshops",
    parallelTracks: [
      {
        title: "To Be Announced",
        track: "Workshops",
        level: "TBA",
      },
      {
        title: "To Be Announced",
        track: "Workshops",
        level: "TBA",
      },
      {
        title: "To Be Announced",
        track: "Workshops",
        level: "TBA",
      },
    ],
  },
  {
    startTime: "3:30 PM",
    endTime: "3:45 PM",
    title: "Break",
    track: "Cloud",
  },
  {
    startTime: "3:50 PM",
    endTime: "4:30 PM",
    title: "Panel Discussion",
    format: "Interactive",
    track: "Cloud",
  },
  {
    startTime: "4:30 PM",
    endTime: "5:00 PM",
    title: "Guest Felicitation & Closing Ceremony",
    format: "Vote of thanks and closing",
    track: "Cloud",
  },
];

export const KEYNOTE_SPEAKER = {
  name: "Jessica Gilmore",
  role: "Manager, Community Groups",
  company: "Amazon",
  image: "/speakers/Jessica.jpg",
  linkedin: "https://www.linkedin.com/in/jessicagilmore1",
};

export const SESSION_SPEAKERS = [
  {
    name: "Ramakant Yadav",
    role: "Founder",
    company: "Scalar Field",
    image: "/speakers/ramakant.png",
    linkedin: "https://www.linkedin.com/in/ramakant-yadav1",
  },
  {
    name: "Neha Prasad",
    role: "Analytics Specialist",
    company: "Amazon Web Services",
    image: "/speakers/neha prasad.jpg",
    linkedin: "https://www.linkedin.com/in/neha-prasad-66586a64",
  },
  {
    name: "Vishnu Rachapudi",
    role: "Cloud Engineer",
    company: "Sudo Consultants",
    image: "/speakers/Vishnu.jpg",
    linkedin: "https://www.linkedin.com/in/vishnu-rachapudi-28956920b",
  },
  {
    name: "Satyajith Samantray",
    role: "Principal Cloud Architect",
    company: "Searce Inc",
    image: "/speakers/satyajith.jpg",
    linkedin: "https://www.linkedin.com/in/satyajit-samantray-b30a7075",
  },
  {
    name: "Nagababu Medicherla",
    role: "Lead Cloud Architect",
    company: "Searce Inc",
    image: "/speakers/nagababu.jpg",
    linkedin: "https://www.linkedin.com/in/nagababu-medicharla-b2a91a117",
  },
];

// Backwards compatible combined export
export const SPEAKERS = [KEYNOTE_SPEAKER, ...SESSION_SPEAKERS];

export const WORKSHOPS = [
  {
    title: "To Be Announced",
    level: "TBA",
    duration: "1:45 PM – 4:15 PM",
    desc: "Hands-on lab session details and prerequisites will be announced soon.",
  },
  {
    title: "To Be Announced",
    level: "TBA",
    duration: "1:45 PM – 4:15 PM",
    desc: "Hands-on lab session details and prerequisites will be announced soon.",
  },
  {
    title: "To Be Announced",
    level: "TBA",
    duration: "1:45 PM – 4:15 PM",
    desc: "Hands-on lab session details and prerequisites will be announced soon.",
  },
];

export type SponsorItem = {
  name: string;
  desc: string;
  logo?: string;
};

export const SPONSORS: Record<string, SponsorItem[]> = {
  "Title Sponsor": [
    {
      name: "Amazon Web Services",
      desc: "Cloud infrastructure and AI services powering modern computing worldwide.",
      logo: "/aws_partner.jpeg",
    },
  ],
  "Venue Partner": [
    {
      name: "Raghu Engineering College",
      desc: "Premier engineering institution hosting AWS Student Community Day Vizag 2026.",
      logo: "/raghu_venue.jpeg",
    },
  ],
};

export const FACULTY = [
  {
    name: "Raghu Kalidindi",
    role: "Chairman",
    pill: "REC",
    image: "/faculty/raghu-kalidindi.png",
    linkedin: "https://www.linkedin.com/in/raghu-kalidindi-aab36158/",
  },
  {
    name: "Rahul Kalidindi",
    role: "Vice-Chairman",
    pill: "REC",
    image: "/faculty/rahul-kalidindi.png",
    linkedin: "https://www.linkedin.com/in/rahulkalidindi/",
  },
  {
    name: "A Vijay Kumar",
    role: "Principal",
    pill: "REC",
    image: "/faculty/a-vijay-kumar.png",
    linkedin: "https://www.linkedin.com/in/dr-a-vijay-kumar-64451468/",
  },
  {
    name: "P Satish Rama Chowdary",
    role: "Dean, Student Affairs",
    pill: "REC",
    image: "/faculty/p-satish-rama-chowdary.png",
    linkedin: "https://www.linkedin.com/in/chowdary-paladuga/",
  },
  {
    name: "S Srinadh Raju",
    role: "HOD-CSE",
    pill: "REC",
    image: "/faculty/s-srinadh-raju-2026.png",
    linkedin: "https://www.linkedin.com/in/dr-sagiraju-srinadhraju-044b431b0",
  },
  {
    name: "G Sridevi",
    role: "HOD-CSE(AI&ML)",
    pill: "REC",
    image: "/faculty/g-sridevi.png",
    linkedin: "https://www.linkedin.com/in/sridevi-gadde-02b4841b0",
  },
  {
    name: "K V Satyanarayana",
    role: "HOD-CSE(Data Science)",
    pill: "REC",
    image: "/faculty/k-v-satyanarayana-2026.png",
    linkedin: "https://www.linkedin.com/in/dr-v-satyanarayana-k-5a34a9329",
  },
  {
    name: "Varanasi Usha Bala",
    role: "HOD-CSE (Cyber Security & IoT)",
    pill: "REC",
    image: "/faculty/varanasi-usha-bala.png",
    linkedin: "https://www.linkedin.com/in/dr-varanasi-usha-bala-17345914",
  },
];

export const CREW = [
  {
    name: "T V Sathwik Sai",
    role: "Student Builder Group Leader",
    pill: "Core Team",
    image: "/crew/t-v-sathwik-sai.png",
    linkedin: "https://www.linkedin.com/in/sathwik-sai-t-v-ba202830a",
  },
  {
    name: "Ujwala Tadapaneni",
    role: "Projects & Industry Use Cases Lead",
    pill: "Core Team",
    image: "/crew/Ujwala.jpg",
    linkedin: "https://www.linkedin.com/in/ujwala-tadapaneni-59846633a",
  },
  {
    name: "Akshay Lingam",
    role: "Technical and Labs Lead",
    pill: "Core Team",
    image: "/crew/Akshay.jpg",
    linkedin: "https://www.linkedin.com/in/akshay-lingam-b00191387",
  },
  {
    name: "K Veena Lahari",
    role: "Event & Community Lead",
    pill: "Core Team",
    image: "/crew/veena.jpg",
    linkedin: "https://www.linkedin.com/in/karupathu-veena-lahari",
  },
  {
    name: "Prem Sai",
    role: "Operations & Logistics Lead",
    pill: "Core Team",
    image: "/crew/Prem.jpg",
    linkedin: "https://www.linkedin.com/in/prem-sai-50a97a337",
  },
  {
    name: "Varshini Samireddy",
    role: "Content & Designing Lead",
    pill: "Core Team",
    image: "/crew/varshini.jpeg",
    linkedin: "https://www.linkedin.com/in/varshini-samireddy-996b67328",
  },

  {
    name: "P Sri Ram Praneeth",
    role: "Technical and Labs Co-Ordinator",
    pill: "Co-Ordinators",
    image: "/crew/Sri Ram.png",
    linkedin: "https://www.linkedin.com/in/pediredla-sri-ram-praneeth-554aab315",
  },
  {
    name: "Pavan Surya Alla",
    role: "Content & Designing Co-Ordinator",
    pill: "Co-Ordinators",
    image: "/crew/pavan-surya-alla.png",
    linkedin: "https://www.linkedin.com/in/pavansurya-alla-458566342",
  },
  {
    name: "Ganesh Gowtham",
    role: "Content & Designing Co-Ordinator",
    pill: "Co-Ordinators",
    image: "/crew/ganesh-gowtham.png",
    linkedin: "https://www.linkedin.com/in/karri-ganesh-gowtham-10ab613ab",
  },
  {
    name: "Pujitha Devara",
    role: "Content & Designing Co-Ordinator",
    pill: "Co-Ordinators",
    image: "/crew/pujitha-devara.png",
  },
  {
    name: "Sai Preethi",
    role: "Operations & Logistics Co-Ordinator",
    pill: "Co-Ordinators",
    image: "/crew/sai-preethi.png",
    linkedin: "https://www.linkedin.com/in/sai-preethi-02b5bb3ba",
  },
  {
    name: "Varun Kumar",
    role: "Operations & Logistics Co-Ordinator",
    pill: "Co-Ordinators",
    image: "/crew/varun-kumar.png",
    linkedin: "https://www.linkedin.com/in/varunkumar-puti",
  },
  {
    name: "Yogitha Varri",
    role: "Event & Community Co-Ordinator",
    pill: "Co-Ordinators",
    image: "/crew/yogitha-varri.png",
    linkedin: "https://www.linkedin.com/in/yogitha-varri-594a36370",
  },
  {
    name: "Boddeti Durga",
    role: "Projects & Industry Use Cases Co-Ordinator",
    pill: "Co-Ordinators",
    image: "/crew/Boddeti_Durga(Projects and Industrial use cases Co-ordinator).jpg",
    linkedin: "https://www.linkedin.com/in/boddetidurga",
  },
  {
    name: "Killana Dilleswari",
    role: "Event & Community Co-Ordinator",
    pill: "Co-Ordinators",
    image: "/crew/killana-dilleswari.png",
    linkedin: "https://www.linkedin.com/in/killana-dilleswari-ab97b7394",
  },
];

export const FAQ = [
  {
    q: "What can I expect from the event?",
    a: "Expect keynote sessions, technical talks, hands-on workshops, networking opportunities, sponsor booths, community interactions, giveaways, and real-world insights from AWS experts and community leaders.",
  },
  {
    q: "Who can attend AWS Community Day?",
    a: "Students, Teachers/faculty, developers, software engineers, cloud professionals, startup founders, IT enthusiasts, educators, and anyone interested in cloud technology are welcome to attend.",
  },
  {
    q: "Do I need prior AWS or cloud experience?",
    a: "No! No prior experience is required. While AWS is a part of the event, we focus on exploring various tech domains and emerging technologies beyond AWS as well.",
  },
  {
    q: "Will food and refreshments be provided?",
    a: "Yes. Complimentary refreshments and lunch will be provided. Check the agenda for scheduled meal breaks.",
  },
  {
    q: "Will Transportation be provided?",
    a: "Yes — transportation will be provided for all attendees for Routes from Visakhapatnam,Vizianagaram to the venue and back. The timings will be shared with registered attendees.",
  },
  {
    q: "Do I need to bring a laptop?",
    a: "Recommended for workshops. Talks and keynotes can be enjoyed empty-handed with a coffee in the other.",
  },
  {
    q: "Is there Wi-Fi?",
    a: "Yes — venue Wi-Fi credentials are printed on your badge. Sponsors also provide backup networks.",
  },
];

export const EASTER_EGGS = [
  "Cloud > Limits",
  "Deploy Your Potential",
  "sudo attend aws-community-day",
  "Build Once. Scale Forever.",
  "404: Missing Opportunity?",
  'git commit -m "See you at AWS Community Day"',
];
