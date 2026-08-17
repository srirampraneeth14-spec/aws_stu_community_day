export const EVENT_DATE = "Saturday, September 19";
export const EVENT_VENUE_NAME = "Raghu Engineering College";
export const VENUE_ADDRESS =
  "Raghu Engineering College, Dakamarri, Bheemunipatnam Mandal, Visakhapatnam - 531162";
export const VENUE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Raghu+Engineering+College,Dakamarri,Bheemunipatnam+Mandal,Visakhapatnam+531162";

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "why", label: "Why Attend" },
  { id: "tracks", label: "Tracks" },
  { id: "agenda", label: "Agenda" },
  { id: "speakers", label: "Speakers" },
  { id: "workshops", label: "Workshops" },
  { id: "sponsors", label: "Sponsors" },
  { id: "organizers", label: "Organizers" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
] as const;

export const STATS = [
  { label: "Attendees", value: 1000, suffix: "+" },
  { label: "Speakers", value: 20, suffix: "+" },
  { label: "Sessions", value: 15, suffix: "+" },
  { label: "Sponsors", value: 10, suffix: "+" },
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
    format: "AWS or industry speaker",
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
        title: "AWS and Cloud Computing: From Zero to Your First Cloud Application",
        track: "Cloud",
      },
      {
        title: "Building with Generative AI on AWS",
        track: "AI",
      },
      {
        title: "Your AWS Journey: Certifications, Skills and Cloud Careers",
        track: "Cloud",
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
        title: "From Website to Serverless: Building Modern Web Apps on AWS",
        track: "Cloud",
      },
      {
        title: "Cloud Security 101: Keeping Your Applications Safe on AWS",
        track: "Cloud",
      },
      {
        title: "From Code to Cloud: DevOps and Containers on AWS",
        track: "DevOps",
      },
    ],
  },
  {
    startTime: "12:05 PM",
    endTime: "12:45 PM",
    title: "Panel Discussion",
    format: "4 panelists and moderator",
    track: "Cloud",
  },
  {
    startTime: "12:45 PM",
    endTime: "1:45 PM",
    title: "Lunch and Networking",
    format: "Community networking",
    track: "Cloud",
  },
  {
    startTime: "1:45 PM",
    endTime: "4:15 PM",
    title: "Hands on Workshops",
    format: "3 parallel workshops",
    track: "Workshops",
    parallelTracks: [
      {
        title: "Build Your First Serverless Web App",
        track: "Workshops",
        level: "Beginner",
      },
      {
        title: "Build a GenAI App with Amazon Bedrock",
        track: "Workshops",
        level: "Beginner to Intermediate",
      },
      {
        title: "Docker to AWS: Deploy Your First Container",
        track: "Workshops",
        level: "Intermediate",
      },
    ],
  },
  {
    startTime: "4:15 PM",
    endTime: "4:30 PM",
    title: "Break",
    track: "Cloud",
  },
  {
    startTime: "4:30 PM",
    endTime: "5:20 PM",
    title: "Panel Discussion",
    format: "Interactive",
    track: "Cloud",
  },
  {
    startTime: "5:20 PM",
    endTime: "5:30 PM",
    title: "Closing Ceremony",
    format: "Vote of thanks and closing",
    track: "Cloud",
  },
];

export const SPEAKERS = [
  {
    name: "Neha Prasad",
    role: "Analytics Specialist",
    company: "Amazon Web Services",
    image: "/speakers/neha prasad.jpg",
    linkedin: "https://www.linkedin.com/in/neha-prasad-66586a64 ",
  },
  {
    name: "Nikita Mourya",
    role: "Staff Cloud Platform Engineer",
    company: "Appdirect",
    image: "/speakers/Nikita_Mourya.jpg",
    linkedin: "https://www.linkedin.com/in/nikita-mourya ",
  },
  {
    name: "Vishnu Rachapudi",
    role: "Cloud Engineer",
    company: "Sudo Consultants",
    image: "/speakers/Vishnu.jpg",
    linkedin: "https://www.linkedin.com/in/vishnu-rachapudi-28956920b ",
  },
  {
    name: "Satyajith Samantray",
    role: "Principal Cloud Architect",
    company: "Searce Inc",
    image: "/speakers/satyajith.jpg",
    linkedin: "https://www.linkedin.com/in/satyajit-samantray-b30a7075 ",
  },
  {
    name: "Nagababu Medicherla",
    role: "Lead Cloud Architect",
    company: "Searce Inc",
    image: "/speakers/nagababu.jpg",
    linkedin: "https://www.linkedin.com/in/nagababu-medicharla-b2a91a117 ",
  },
];

export const WORKSHOPS = [
  {
    title: "Build Your First Serverless Web App",
    level: "Beginner",
    duration: "1:45 PM – 4:15 PM",
    desc: "Hands-on lab to build and deploy your first serverless web application on AWS.",
  },
  {
    title: "Build a GenAI App with Amazon Bedrock",
    level: "Beginner to Intermediate",
    duration: "1:45 PM – 4:15 PM",
    desc: "Create a generative AI application using Amazon Bedrock in a guided workshop.",
  },
  {
    title: "Docker to AWS: Deploy Your First Container",
    level: "Intermediate",
    duration: "1:45 PM – 4:15 PM",
    desc: "Containerize an application and deploy it to AWS in this practical session.",
  },
];

export const SPONSORS = {
  Platinum: [
    { name: "Amazon Web Services", desc: "Cloud infrastructure powering the modern internet." },
    {
      name: "Nimbus AI",
      desc: "Managed inference and fine-tuning for teams shipping AI products.",
    },
  ],
  Gold: [
    { name: "CloudScale", desc: "Cost-aware scaling for serverless workloads." },
    { name: "Fortify", desc: "Runtime security for containers and Kubernetes." },
    { name: "K8sHub", desc: "The community-run Kubernetes learning platform." },
  ],
  Silver: [
    { name: "Serverless.co", desc: "Framework for building event-driven cloud apps." },
    { name: "Fintechly", desc: "Cloud-native banking infrastructure." },
    { name: "OpenLab", desc: "Open research collective for foundation models." },
    { name: "DataForge", desc: "Streaming + lakehouse platform for the AWS ecosystem." },
  ],
  Community: [
    { name: "Devs Meetup", desc: "Monthly meetup for the local developer community." },
    { name: "WomenInCloud", desc: "Supporting women pursuing careers in cloud engineering." },
    { name: "StudentCloud", desc: "Student chapter across regional universities." },
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
  {
    name: "M Siva Kumar",
    role: "Faculty Co-Ordinator, AWS REC",
    pill: "REC",
    image: "/faculty/m-siva-kumar.png",
  },
];

export const CREW = [
  {
    name: "T V Sathwik Sai",
    role: "SBG Leader",
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
    q: "Is AWS Community Day free to attend?",
    a: "The event is paid, with affordable pricing for students and dedicated ticket categories for working professionals. Select the appropriate ticket during registration.",
  },
  {
    q: "Who can attend AWS Community Day?",
    a: "Students, Teachers/faculty, developers, software engineers, cloud professionals, startup founders, IT enthusiasts, educators, and anyone interested in cloud technology are welcome to attend.",
  },
  {
    q: "Do I need prior AWS or cloud experience?",
    a: "Not at all. No prior AWS experience is required. Bring your curiosity, and you'll leave with new knowledge, practical insights, and valuable connections.",
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
    q: "Will sessions be recorded?",
    a: "Main stage talks are recorded and released a few weeks after the event on our community channel.",
  },
  {
    q: "Is there Wi-Fi?",
    a: "Yes — venue Wi-Fi credentials are printed on your badge. Sponsors also provide backup networks.",
  },
  {
    q: "How do I become a speaker or sponsor next year?",
    a: "Reach out via the contact section below — the CFP and sponsor prospectus open a few months before each edition.",
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
