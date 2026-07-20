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

export type AgendaItem = {
  time: string;
  title: string;
  speaker?: string;
  track: "Cloud" | "AI" | "DevOps" | "Workshops";
  room: string;
};

export const AGENDA: AgendaItem[] = [
  { time: "08:30", title: "Registration & Coffee", track: "Cloud", room: "Foyer" },
  { time: "09:15", title: "Opening Keynote — Where Builders Meet the Cloud", speaker: "Aisha Rao", track: "Cloud", room: "Main Stage" },
  { time: "10:00", title: "Serverless Patterns at Scale", speaker: "David Chen", track: "Cloud", room: "Hall A" },
  { time: "10:45", title: "LLM Ops on AWS", speaker: "Priya Nair", track: "AI", room: "Hall B" },
  { time: "11:30", title: "Workshop: Build a RAG App with Bedrock", speaker: "Marco Silva", track: "Workshops", room: "Lab 1" },
  { time: "12:30", title: "Lunch & Networking", track: "Cloud", room: "Foyer" },
  { time: "13:30", title: "GitOps in Production", speaker: "Nadia Okonkwo", track: "DevOps", room: "Hall A" },
  { time: "14:15", title: "Zero Trust on AWS", speaker: "Leo Park", track: "Cloud", room: "Hall B" },
  { time: "15:00", title: "Workshop: Deploy an EKS Cluster in 45 minutes", speaker: "Jonas Weber", track: "Workshops", room: "Lab 2" },
  { time: "16:00", title: "Fine-tuning Foundation Models", speaker: "Sara Iqbal", track: "AI", room: "Hall B" },
  { time: "16:45", title: "Panel: Careers in the Cloud", track: "Cloud", room: "Main Stage" },
  { time: "17:30", title: "Closing + Community After-party", track: "Cloud", room: "Rooftop" },
];

export const SPEAKERS = [
  { name: "Aisha Rao", role: "Principal Engineer", company: "CloudScale", twitter: "aisha" },
  { name: "David Chen", role: "AWS Hero", company: "Serverless.co", twitter: "dchen" },
  { name: "Priya Nair", role: "ML Platform Lead", company: "Nimbus AI", twitter: "priyanair" },
  { name: "Marco Silva", role: "Solutions Architect", company: "Amazon Web Services", twitter: "marco" },
  { name: "Nadia Okonkwo", role: "Staff SRE", company: "Fintechly", twitter: "nadiaok" },
  { name: "Leo Park", role: "Security Engineer", company: "Fortify", twitter: "leopark" },
  { name: "Jonas Weber", role: "Community Builder", company: "K8sHub", twitter: "jonasw" },
  { name: "Sara Iqbal", role: "Applied Scientist", company: "OpenLab", twitter: "sara" },
];

export const WORKSHOPS = [
  { title: "Your First Lambda", level: "Beginner", duration: "60m", desc: "Ship a serverless API without ever leaving the browser." },
  { title: "Intro to S3 + CloudFront", level: "Beginner", duration: "60m", desc: "Deploy a globally cached static site in under an hour." },
  { title: "Build a RAG App with Bedrock", level: "Intermediate", duration: "90m", desc: "Combine embeddings, vector search, and Bedrock to answer questions from your docs." },
  { title: "GitOps with ArgoCD", level: "Intermediate", duration: "90m", desc: "Model production deploys as pull requests. Reproducible, reviewable, revertible." },
  { title: "Deploy an EKS Cluster in 45 minutes", level: "Advanced", duration: "90m", desc: "From zero to a hardened multi-node Kubernetes cluster with observability baked in." },
  { title: "Fine-tune a Foundation Model", level: "Advanced", duration: "120m", desc: "Prepare a dataset, train on SageMaker, and evaluate results — end to end." },
];

export const SPONSORS = {
  Platinum: [
    { name: "Amazon Web Services", desc: "Cloud infrastructure powering the modern internet." },
    { name: "Nimbus AI", desc: "Managed inference and fine-tuning for teams shipping AI products." },
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
  { name: "Raghu Kalidindi", role: "Chairman", pill: "REC", image: "/faculty/raghu-kalidindi.png", linkedin: "https://www.linkedin.com/in/raghu-kalidindi-aab36158/" },
  { name: "Rahul Kalidindi", role: "Vice-Chairman", pill: "REC", image: "/faculty/rahul-kalidindi.png", linkedin: "https://www.linkedin.com/in/rahulkalidindi/" },
  { name: "A Vijay Kumar", role: "Principal", pill: "REC", image: "/faculty/a-vijay-kumar.png", linkedin: "https://www.linkedin.com/in/dr-a-vijay-kumar-64451468/" },
  { name: "P Satish Rama Chowdary", role: "Dean, Student Affairs", pill: "REC", image: "/faculty/p-satish-rama-chowdary.png", linkedin: "https://www.linkedin.com/in/chowdary-paladuga/" },
  { name: "S Srinadh Raju", role: "HOD-CSE", pill: "REC", image: "/faculty/s-srinadh-raju-2026.png", linkedin: "https://www.linkedin.com/in/dr-sagiraju-srinadhraju-044b431b0" },
  { name: "G Sridevi", role: "HOD-CSE(AI&ML)", pill: "REC", image: "/faculty/g-sridevi.png", linkedin: "https://www.linkedin.com/in/sridevi-gadde-02b4841b0" },
  { name: "K V Satyanarayana", role: "HOD-CSE(Data Science)", pill: "REC", image: "/faculty/k-v-satyanarayana-2026.png", linkedin: "https://www.linkedin.com/in/dr-v-satyanarayana-k-5a34a9329" },
  { name: "Varanasi Usha Bala", role: "HOD-CSE (Cyber Security & IoT)", pill: "REC", image: "/faculty/varanasi-usha-bala.png", linkedin: "https://www.linkedin.com/in/dr-varanasi-usha-bala-17345914" },
  { name: "M Siva Kumar", role: "Faculty Co-Ordinator, AWS REC", pill: "REC", image: "/faculty/m-siva-kumar.png" },
];

export const CREW = [
  { name: "T V Sathwik Sai", role: "SBG Leader", pill: "Core Team", image: "/crew/t-v-sathwik-sai.png", linkedin: "https://www.linkedin.com/in/sathwik-sai-t-v-ba202830a" },
  { name: "Prem Sai", role: "Operations & Logistics Lead", pill: "Core Team",image: "/crew/Prem.jpg", linkedin: "https://www.linkedin.com/in/prem-sai-50a97a337" },
  { name: "Akshay Lingam", role: "Technical and Labs Lead", pill: "Core Team",image: "/crew/Akshay.jpg", linkedin: "https://www.linkedin.com/in/akshay-lingam-b00191387" },
  { name: "Varshini Samireddy", role: "Content & Designing Lead", pill: "Core Team", linkedin: "https://www.linkedin.com/in/varshini-samireddy-996b67328" },
  { name: "K Veena Lahari", role: "Event & Community Lead", pill: "Core Team", linkedin: "https://www.linkedin.com/in/karupathu-veena-lahari" },
  { name: "Ujwala Tadapaneni", role: "Projects & Industry Use Cases Lead", pill: "Core Team", image: "/crew/Ujwala.jpg", linkedin: "https://www.linkedin.com/in/ujwala-tadapaneni-59846633a" },
  { name: "P Sri Ram Praneeth", role: "Technical and Labs Co-Ordinator", pill: "Co-Ordinators", image: "/crew/Sri Ram.png", linkedin: "https://www.linkedin.com/in/pediredla-sri-ram-praneeth-554aab315" },
  { name: "Pavan Surya Alla", role: "Content & Designing Co-Ordinator", pill: "Co-Ordinators", image: "/crew/pavan-surya-alla.png", linkedin: "https://www.linkedin.com/in/pavansurya-alla-458566342" },
  { name: "Ganesh Gowtham", role: "Content & Designing Co-Ordinator", pill: "Co-Ordinators", image: "/crew/ganesh-gowtham.png", linkedin: "https://www.linkedin.com/in/karri-ganesh-gowtham-10ab613ab" },
  { name: "Pujitha Devara", role: "Content & Designing Co-Ordinator", pill: "Co-Ordinators", image: "/crew/pujitha-devara.png" },
  { name: "Sai Preethi", role: "Operations & Logistics Co-Ordinator", pill: "Co-Ordinators", image: "/crew/sai-preethi.png", linkedin: "https://www.linkedin.com/in/sai-preethi-02b5bb3ba" },
  { name: "Varun Kumar", role: "Operations & Logistics Co-Ordinator", pill: "Co-Ordinators", image: "/crew/varun-kumar.png", linkedin: "https://www.linkedin.com/in/varunkumar-puti" },
  { name: "Yogitha Varri", role: "Event & Community Co-Ordinator", pill: "Co-Ordinators", image: "/crew/yogitha-varri.png", linkedin: "https://www.linkedin.com/in/yogitha-varri-594a36370" },
  { name: "Boddeti Durga", role: "Projects & Industry Use Cases Co-Ordinator", pill: "Co-Ordinators",image: "/crew/Boddeti_Durga(Projects and Industrial use cases Co-ordinator).jpg", linkedin: "https://www.linkedin.com/in/boddetidurga" },
  { name: "Killana Dilleswari", role: "Event & Community Co-Ordinator", pill: "Co-Ordinators", image: "/crew/killana-dilleswari.png", linkedin: "https://www.linkedin.com/in/killana-dilleswari-ab97b7394" },
];

export const FAQ = [
  { q: "Is AWS Community Day free to attend?", a: "Yes — it's community-run and free, though registration is required so we can plan food, seating, and swag." },
  { q: "I've never touched the cloud. Should I come?", a: "Absolutely. There's a dedicated beginner track and mentors on-site all day. This event exists to help you take your first step." },
  { q: "Do I need to bring a laptop?", a: "Recommended for workshops. Talks and keynotes can be enjoyed empty-handed with a coffee in the other." },
  { q: "Will sessions be recorded?", a: "Main stage talks are recorded and released a few weeks after the event on our community channel." },
  { q: "Is there Wi-Fi?", a: "Yes — venue Wi-Fi credentials are printed on your badge. Sponsors also provide backup networks." },
  { q: "How do I become a speaker or sponsor next year?", a: "Reach out via the contact section below — the CFP and sponsor prospectus open a few months before each edition." },
];

export const EASTER_EGGS = [
  "Cloud > Limits",
  "Deploy Your Potential",
  "sudo attend aws-community-day",
  "Build Once. Scale Forever.",
  "404: Missing Opportunity?",
  'git commit -m "See you at AWS Community Day"',
];