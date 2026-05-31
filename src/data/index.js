export const NAV_LINKS = [
  { key: "A", label: "About", href: "#about" },
  { key: "E", label: "Experience", href: "#experience" },
  { key: "P", label: "Projects", href: "#projects" },
  { key: "C", label: "Contact", href: "#contact" },
  { key: "L", label: "LinkedIn", href: "https://linkedin.com/in/sauravkrlal" },
  { key: "G", label: "GitHub", href: "https://github.com/SauravKumarLal" },
];

export const ABOUT_BLURB =
  "Backend Engineer based in Chennai. At Ramco Systems I own end-to-end infrastructure for the rTask ecosystem — Kafka-driven microservices, enterprise OAuth2 flows, and production RAG pipelines on AWS Bedrock, serving 7,000+ users across 400+ enterprise customers. I led the effort that brought API failures from 8,000/day down to under 20. Formerly, I researched GAN-based video generation at Samsung R&D Institute.";

export const SKILLS = [
  {
    cat: "Backend & Distributed Systems",
    items:
      "Node.js, TypeScript, Express.js, REST APIs, Microservices, Apache Kafka, WebSockets, Redis",
  },
  { cat: "Auth & Security", items: "OAuth2, Azure AD, SSO, JWT, RBAC" },
  {
    cat: "AI/ML & GenAI",
    items: "AWS Bedrock, Claude, GPT, LangChain, RAG, MCP, Milvus, ChromaDB",
  },
  { cat: "Databases & Search", items: "MongoDB, Elasticsearch, MySQL" },
  {
    cat: "Infrastructure",
    items: "Linux, Nginx, IIS, Jenkins, PM2, Load Balancing",
  },
  { cat: "Programming", items: "JavaScript, TypeScript, Python, C++, SQL" },
];

export const EXPERIENCE = [
  {
    company: "Ramco Systems",
    role: "Software Engineer",
    period: "Feb 2025 — Present",
    location: "Chennai, India",
    bullets: [
      "Own and maintain end-to-end backend systems for the rTask ecosystem, serving 7,000+ users across 400+ enterprise customers and supporting 8–9 lakh API requests daily.",
      "Act as the primary technical owner for a 4-member engineering team, driving task planning, code reviews, release coordination, and production issue resolution.",
      "Reduced API failures from 8,000/day to less than 20/day through deep log analysis, root-cause debugging, and performance tuning.",
      "Design and maintain distributed backend services using Node.js, TypeScript, Kafka, Redis, MongoDB, Elasticsearch, and WebSockets.",
      "Design enterprise authentication flows using OAuth2, Azure AD, JWT access/refresh token lifecycles, and RBAC.",
      "Built secure Model Context Protocol (MCP) integrations with token-based authentication and per-user authorization for enterprise AI workflows.",
      "Implemented production-grade RAG pipelines using LangChain, AWS Bedrock, Milvus, and ChromaDB, improving AI response accuracy by 40%.",
      "Integrated Claude and GPT models via AWS Bedrock, enabling intelligent automation handling 10K+ monthly enterprise AI queries.",
    ],
  },
  {
    company: "Samsung R&D Institute",
    role: "Research Intern",
    period: "Dec 2023 — Apr 2024",
    location: "Bengaluru, India",
    bullets: [
      "Developed and optimized GAN-based generative models for automated video generation, reducing processing time by 20%.",
      "Implemented deep learning pipelines leveraging Open Sora Plan framework for efficient video format processing and model training.",
    ],
  },
  {
    company: "Clikin Tech",
    role: "SDE Intern",
    period: "Oct 2023 — Nov 2023",
    location: "",
    bullets: [
      "Improved the website's front-end performance and functionality by implementing lazy loading and collaborating with the team to optimize solutions.",
      "Developed a Chrome extension using JavaScript and Chrome Extension API to extract business details from JustDial.com, with an integrated Excel export feature for efficient data access and analysis.",
    ],
  },
];

export const PROJECTS = [
  {
    name: "CleanUpX",
    desc: "AI-Powered Waste Management",
    detail:
      "Intelligent waste management platform integrating Gemini AI for automated waste classification and quantity estimation. Location-based reporting with Google Maps API and token-based reward system.",
    stack: "Next.js, TypeScript, TailwindCSS, Gemini AI, Google Maps API",
    links: [
      { label: "Live", href: "https://cleanupx.vercel.app/" },
      { label: "Code", href: "https://github.com/SauravKumarLal/EcoSmart" },
    ],
  },
  {
    name: "DeepNPR",
    desc: "License Plate Recognition",
    detail:
      "Deep learning model for automatic localization and classification of Hindi/Nepalese license plates, recognizing all 34 Devanagari script characters using CNN architectures. Designed for real-time inference in resource-constrained environments.",
    stack: "Python, TensorFlow, CNN, OpenCV",
    links: [],
  },
  {
    name: "RealtyVue",
    desc: "Real Estate Application",
    detail:
      "Innovative real estate platform designed to streamline property discovery and communication. Features interactive map pinning and real-time chat via Socket.io, bridging the gap between buyers and sellers with a seamless browsing experience.",
    stack: "React, Node.js, MongoDB, Express.js, Socket.io, Cloudinary",
    links: [
      {
        label: "View Project",
        href: "https://github.com/SauravKumarLal/RealtyVue",
      },
    ],
  },
  {
    name: "KBC Web App",
    desc: "Quiz Game + Chat Application",
    detail:
      "Web-based quiz game modelled after Kaun Banega Crorepati with a dynamic UI and real-time feedback. Includes a live chat layer powered by Socket.io and Firebase, delivering an immersive knowledge-testing experience.",
    stack: "React, Node.js, MongoDB, Express.js, Socket.io, Firebase",
    links: [
      {
        label: "View Project",
        href: "https://github.com/SauravKumarLal/MERN_ChatFire",
      },
    ],
  },
];

export const CERTS = [
  {
    name: "AWS Certified Solutions Architect — Associate",
    desc: "AWS Certification",
    date: "Jan 2024",
    href: "https://www.credly.com/badges/2418975b-3e59-4801-9d3f-18b100fc8fc2/",
    credentialId: "8b2f4d642ae044119a95da7ca372fdbd",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    desc: "AWS Certification",
    date: "Dec 2023",
    href: "https://www.credly.com/badges/6add308d-f199-41b9-8418-a33ad229da96/",
    credentialId: "SEP1FGRJ5J1EQXSP",
  },
  {
    name: "AWS Academy Cloud Foundations",
    desc: "AWS Academy",
    href: "https://www.credly.com/badges/e81a48a8-fa35-4be2-a817-43c47c7139dd/",
    credentialId: "",
  },
  {
    name: "Samsung R&D Institute India",
    desc: "Research Internship",
    href: "https://drive.google.com/file/d/1svdJalMo1EILoQKGyM3FYoMDqpNnryyT/view?usp=sharing",
    credentialId: "SRIB_Internship",
  },
  {
    name: "Ramco Systems",
    desc: "Software Engineer Internship",
    href: "https://drive.google.com/file/d/1VPM15HRm8lRN0uPgzFQ1DSxgllOAf0x5/view?usp=sharing",
    credentialId: "Ramco_Internship",
  },
  {
    name: "Riviera PnM Certification",
    desc: "Co-Curricular Activity",
    href: "https://drive.google.com/file/d/16qbld_ac2Wa3-FohrslxNCv1uG2LHTUb/view?usp=sharing",
    credentialId: "Riviera PnM 2024",
  },
  {
    name: "LEO Club, VIT",
    desc: "Membership Certificate",
    href: "https://drive.google.com/file/d/110K8B12ao4hIRswousJheInbGFt8Kz7-/view?usp=sharing",
    credentialId: "LEO Club Membership",
  },
  {
    name: "Aashman Foundation",
    desc: "Internship Certificate",
    href: "https://drive.google.com/file/d/1GTZuzdFLUTzA0B4Tii9k1OmNzTk__heB/view?usp=sharing",
    credentialId: "Aashman_Foundation_Internship",
  },
];

export const ACHIEVEMENTS = [
  "1st Prize — Copilot Hackathon at Ramco Systems, building AI-driven solutions using LLM-based workflows.",
  "2nd Place — DEVSOC'23 (50-hour hackathon by Codechef-VIT) among 108 teams, 450+ participants, and 1,300+ registrations.",
  "AIR-7 — FNAT Campus Challenge by Firstnaukri.com.",
  "Finalist — Yantra Hack at VIT Vellore.",
  "500+ DSA problems solved on LeetCode and GeeksforGeeks.",
];

export const LEADERSHIP = [
  {
    role: "Design Lead",
    org: "LEO Club, VIT Vellore",
    period: "Feb 2023 — Oct 2023",
    bullets: [
      "Led a team of 20+ designers across 15+ on-campus and off-campus events, managing and executing end-to-end design strategies.",
      "Contributed to the club winning Best Outreach Club at RIVIERA'23 through cohesive visuals and cross-team collaboration.",
    ],
  },
];

export const EDUCATION = [
  {
    school: "Vellore Institute of Technology, Vellore",
    degree:
      "B.Tech — Computer Science & Engineering (Minor in Information Security)",
    period: "2021 — 2025",
    location: "Tamil Nadu, India",
    grade: "CGPA 9.27",
    note: "Ranked in the top 25 of a batch of 313 students",
  },
  {
    school: "Allen Career Institute, Kota",
    degree: "12th — CBSE",
    period: "May 2018 — Mar 2020",
    location: "Rajasthan, India",
    grade: "90.4%",
  },
  {
    school: "St. Joseph's Public School, Dalsinghsarai",
    degree: "10th — CBSE",
    period: "Jun 2008 — Mar 2018",
    location: "Bihar, India",
    grade: "94.8%",
  },
];
