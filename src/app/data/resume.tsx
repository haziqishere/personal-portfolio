import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Haziq Hakimi",
  initials: "Haziq",
  url: "https://haziqhakimi.tech",
  location: "Kuala Lumpur, Malasyia",
  locationLink: "https://www.google.com/maps/place/Kuala+Lumpur",
  description:
    "Final year student at Universiti Putra Malaysia, majoring in Computer Science. I am passionate about data and building data infrastructure. I am always looking for opportunities to learn and grow.",
  summary:
    "I have deep passion for software development and AI. I participated competitively in hackathons to improve my technical and problem-solving skills. I also sharpened my soft-skill by involving in leadership roles such as being Computer Science Faculty Representative Council and represented my university in intervarsity sport competition. My proudest achievement is being champion in both UM Hackathon 2024 and Sukan Institusi Pendidikan Tinggi (SUKIPT) 2024 while representing Universiti Putra Malaysia. ",
  avatarUrl: "/me.jpg",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Java",
    "C++",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "haziqhakimi02@gmail.com",
    tel: "+601164252195",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/haziqishere",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/haziqhakimimazlisham",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/Qimichanga",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Payment Network Malaysia (PayNet)",
      href: "https://paynet.my/index.html",
      badges: [],
      location: "On-Site",
      title: "Data Scientist Intern",
      logoUrl: "/company/paynetcircular.png",
      start: "March 2025",
      end: "Aug 2025",
      description:
        "Developed ecommerce website for client using Next.js, TailwindCSS, and Strapi for the front-end & utilizes AWS services such as Amazon RDS and S3 for the back-end. Built RESTFUL API for admin to upload new product into postgreSQL database and AWS S3 for storing product images enabling low-cost maintanence.  ",
    },
    {
      company: "Nexz Gen Studio",
      href: "https://nexzgen.com/",
      badges: [],
      location: "Hibrid",
      title: "Full Stack Web Developer Intern",
      logoUrl: "/company/nexzgencircular.png",
      start: "Aug 2024",
      end: "Oct 2024",
      description:
        "Developed ecommerce website for client using Next.js, TailwindCSS, and Strapi for the front-end & utilizes AWS services such as Amazon RDS and S3 for the back-end. Built RESTFUL API for admin to upload new product into postgreSQL database and AWS S3 for storing product images enabling low-cost maintanence.  ",
    },
  ],
  education: [
    {
      school: "Universiti Putra Malaysia",
      href: "https://upm.edu.my/",
      degree: "Bachelor of Computer Science (Multimedia Computing) Hons.",
      logoUrl: "/uni/upm.png",
      start: "2021",
      end: "2025",
    },
    {
      school: "Universiti Teknologi MARA",
      href: "https://asasi.uitm.edu.my/",
      degree: "Foundation in Science",
      logoUrl: "/uni/uitm.jpg",
      start: "2020",
      end: "2021",
    },
  ],
  projects: [
    {
      title: "Chat Collect",
      href: "https://chatcollect.com",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "Magic UI",
      href: "https://magicui.design",
      dates: "June 2023 - Present",
      active: true,
      description:
        "Designed, developed and sold animated UI components for developers.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://magicui.design",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "llm.report",
      href: "https://llm.report",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dillionverma/llm.report",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "Automatic Chat",
      href: "https://automatic.chat",
      dates: "April 2023 - March 2024",
      active: true,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
  ],
  hackathons: [
    {
      title: "PayHack 2024 Open Finance Hackathon",
      dates: "23 November - 1 Dec 2024",
      location: "Asia Business School, Kuala Lumpur",
      description:
        "Developed a fullstack React WebApp for SMEs to predict market performance based on NewsAPI and process it using NLP with BERT Transformers. On top of that, we use LLM to suggest Loan and Grant options for the SMEs.",
      image: "/hackathon/payhack.png",
      achievement: "Champion",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "JomHack MCMC Datathon",
      dates: "2-4 November 2024",
      location: "Amari Hotel, Kuala Lumpur",
      description:
        "Developed a fullstack React WebApp for SMEs to predict market performance based on NewsAPI and process it using NLP with BERT Transformers. On top of that, we use LLM to suggest Loan and Grant options for the SMEs.",
      image: "/hackathon/jomhack_datathon.jpg",
      achievement: "3rd Place",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Air Selangor Digital and Data Hackathon",
      dates: "29th April - 28th May 2024",
      location: "Avante Hotel Damansara, Kuala Lumpur",
      description:
        "Developed WebApp for Air Selangor for automate drone deployment for asset inspection. Integrate trained computer vision to detect threats and anr pomalies neaipeline and pumphouse.",
      image: "/hackathon/airselangor.jpg",
      achievement: "Top 15 Finalist",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Varsity Hackathon 2024",
      dates: "2nd - 20th April, 20244",
      location: "Universiti Sains Malaysia, Pulan Pinang",
      description:
        "2nd Place among 250+ teams with 900 participants globally in total. Ranked No.1 in SDG Zero Hunger category and No.1 among public universities including UM, USM, UTM and UiTM. Built Flutter app for paddy management integrated with Image Processing to identify plant desease. Implement on-site Raspberry Pi pest detector with custom Audio Classifier Tensorflow model.",
      image: "/hackathon/vhackusm.jpg",
      achievement: "1st Runner Up",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "UM Hackathon 2024",
      dates: "March 26th - 31st, 2024",
      location: "Universiti Malaya, Kuala Lumpur",
      description:
        "Developed a fullstack React WebApp for Security Comission Malaysia to automate PLC Shariah Compliance Assessment using custom python algorithm.",
      icon: "public",
      image: "/hackathon/umhackathon.jpg",
      achievement: "Champion",
      links: [],
    },
    {
      title: "MAP2U x USiM Big Data Hackathon",
      dates: "February 3rd - 4th, 2024",
      location: "USiM, Nilai",
      description:
        "Developed a Flutter mobile app to predict congestion in public transportation system and reroute user to faster path. ",
      image: "/hackathon/map2u.png",
      achievement: "Champion",
      links: [
        {
          title: "Github",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/cryptotrends/cryptotrends",
        },
      ],
    },
    {
      title: "Hack@10, AI Themed Hackathon",
      dates: "16th - 17th Decemebr, 2023",
      location: "Universiti Tenaga Nasional (UNITEN) , Bangi",
      description:
        "Developed a Flutter mobile app for plant health analysis using Image Processing.",
      image: "/hackathon/hack@10.png",
      achievement: "Champion",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/my6footprint",
        },
        {
          title: "ML",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/my6footprint-machine-learning",
        },
        {
          title: "iOS",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/CarbonWallet",
        },
        {
          title: "Server",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/wallet6-server",
        },
      ],
    },
    {
      title: "Thing-a-thon, IOT Hackathon",
      dates: "October 20th - 21st, 2023",
      location: "Universiti Putra Malaysia, Serdang",
      description:
        "Developed a miniature power plant with motors and IoT sensors. Flutter mobile app used to remotely monitor and control the readings. ",
      image: "/hackathon/Thing-a-thon.jpg",
      achievement: "Champion",
      links: [
        {
          title: "Organization",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/ethdocnet",
        },
      ],
    },
  ],
} as const;
