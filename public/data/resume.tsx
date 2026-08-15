import { Icons } from "@/components/icons";
import {
  HomeIcon,
  NotebookIcon,
  RocketIcon,
  CodeSquareIcon,
} from "lucide-react";
import type { TechnologySlug } from "./technologies";

const projectSkills = {
  webApp: [
    "nextjs",
    "typescript",
    "prisma",
    "postgresql",
    "tailwindcss",
  ] as TechnologySlug[],
};

export const DATA = {
  name: "Haziq Hakimi",
  initials: "Haziq",
  url: "https://haziqhakimi.tech",
  location: "Kuala Lumpur, Malasyia",
  locationLink: "https://www.google.com/maps/place/Kuala+Lumpur",
  description:
    "24 • Kuala Lumpur 🇲🇾",
  summary:
    "I have deep passion for software development and AI. I participated competitively in hackathons to improve my technical and problem-solving skills. I also sharpened my soft-skill by involving in leadership " +
    "roles such as being Computer Science Faculty Representative Council and represented my university in intervarsity sport competition. My proudest achievement is being champion in both UM Hackathon 2024 and Sukan " +
    "Institusi Pendidikan Tinggi (SUKIPT) 2024 while representing Universiti Putra Malaysia. It highlights my competitive nature of whether sports or hackathon, I always strive to be the best.",
  avatarUrl: "/me.jpg",
  certifications: [
    {
      name: "AWS Cloud Solutions Architect",
      issuer: "AWS",
      badgeIcon: "/data/badge/aws-sa.svg",
      url: "https://www.credly.com/badges/1b3bdd4d-2ba4-47e0-9c2e-3e0bb1e4cf7e/linked_in?t=t82a5q",
    },
  ],
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
    { href: "/", icon: NotebookIcon, label: "About" },
    { href: "/", icon: RocketIcon, label: "Hackathons" },
    { href: "/", icon: CodeSquareIcon, label: "Projects" },
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
      company: "PayNet",
      href: "https://paynet.my/index.html",
      location: "On-Site",
      logoUrl: "/company/paynetcircular.png",
      start: "March 2025",
      end: "Aug 2025",
      roles: [
        {
          title: "Data Engineer",
          period: "Sep 2025 - Current",
          badges: [],
          employmentType: "Full-time",
          // TODO: fill in with slugs from public/data/skills.tsx TECHNOLOGIES
          skills: [] as TechnologySlug[],
          description:
            "- Worked in Fraud Data and Engineering team for National Fraud Portal (NFP) in collaboration with Bank Negara\n- Using Ray to better manage the ML pipeline and model deployment\n- Increase Data Scientist and Data Engineers efficiency by building monitoring and alerting system for ML Pipeline and Data Pipeline to better manage the model performance and data quality.",
        },
        {
          title: "Data Engineer Intern",
          period: "March 2025 - Aug 2025",
          badges: [],
          employmentType: "Internship",
          // TODO: fill in with slugs from public/data/skills.tsx TECHNOLOGIES
          skills: [] as TechnologySlug[],
          description:
            "- Worked in Fraud Data and Engineering team for National Fraud Portal (NFP) in collaboration with Bank Negara\n- Built data pipelines for ML Development by aggregating MyDebit and FPX transactions into Iceberg Table in Data Lake using Prefect running on AWS EKS. \n- Expand the Dataset for Fraud Detection ML to 150% \n- Increase fraudulent money trailing to 50% more (Just dummy numbers)",
        },
      ],
    },
    {
      company: "NexzGen Studio",
      href: "https://nexzgen.com/",
      location: "Hibrid",
      logoUrl: "/company/nexzgencircular.png",
      start: "Aug 2024",
      end: "Oct 2024",
      roles: [
        {
          title: "Full Stack Developer Intern",
          period: "Aug 2024 - Oct 2024",
          badges: [],
          employmentType: "Internship",
          // TODO: fill in with slugs from public/data/skills.tsx TECHNOLOGIES
          skills: [] as TechnologySlug[],
          description:
            "Developed ecommerce website for client using Next.js, TailwindCSS, and Strapi for the front-end & utilizes AWS services such as Amazon RDS and S3 for the back-end. Built RESTFUL API for admin to upload new product into postgreSQL database and AWS S3 for storing product images enabling low-cost maintanence.",
        },
      ],
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
      title: "Homelab",
      href: "https://github.com/haziqishere/haziq-homelab",
      slug: "homelab",
      dates: "Ongoing",
      active: true,
      is_selected_work: true,
      description:
        "Self-managed Kubernetes and data platform running on bare-metal at home. GitOps-driven via ArgoCD, with Prefect and the Spark Kubernetes Operator for data workloads, a Prometheus/Grafana observability stack, and Cloudflare Tunnel fronting everything without a single exposed port.",
      skills: [
        "kubernetes",
        "argocd",
        "helm",
        "prometheus",
        "grafana",
        "cloudflare",
        "apache-spark",
        "prefect",
        "docker",
      ] as TechnologySlug[],
      links: [
        {
          type: "Source",
          href: "https://github.com/haziqishere/haziq-homelab",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "RapidKL Bus Tracker",
      href: "https://medium.com/@haziqhakimi02/end-to-end-near-realtime-bus-tracker-with-lambda-architecture-46e153045bf5",
      slug: "bus-tracker",
      dates: "Feb 2026",
      active: true,
      is_selected_work: true,
      description:
        "End-to-end near real-time tracker for Rapid KL buses, built on a Lambda architecture: Kafka (Aiven) for ingestion, Spark Structured Streaming for processing, an Iceberg-on-S3 lakehouse for the batch layer, and Redis caching current vehicle state for the speed layer. Built with Tan Ze Han Dylan.",
      skills: [
        "apache-kafka",
        "apache-spark",
        "aws",
        "apache-iceberg",
        "duckdb",
        "redis",
        "kubernetes",
        "prefect",
        "nextjs",
      ] as TechnologySlug[],
      links: [
        {
          type: "Article",
          href: "https://medium.com/@haziqhakimi02/end-to-end-near-realtime-bus-tracker-with-lambda-architecture-46e153045bf5",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Chat Collect",
      href: "https://chatcollect.com",
      slug: "chat-collect",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      is_selected_work: true,
      description:
        "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      skills: projectSkills.webApp,
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
      slug: "",
      dates: "June 2023 - Present",
      active: true,
      is_selected_work: true,
      description:
        "Designed, developed and sold animated UI components for developers.",
      skills: projectSkills.webApp,
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
      slug: "",
      dates: "April 2023 - September 2023",
      active: true,
      is_selected_work: false,
      description:
        "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
      skills: projectSkills.webApp,
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
      slug: "",
      dates: "April 2023 - March 2024",
      active: true,
      is_selected_work: false,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
      skills: projectSkills.webApp,
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
    // DUMMY — remove once real unfeatured project exists.
    {
      title: "Dummy Repo",
      href: "https://github.com/haziqishere",
      slug: "",
      dates: "Jan 2025",
      active: false,
      is_selected_work: false,
      description: "Placeholder entry to preview the unfeatured project card layout.",
      skills: projectSkills.webApp,
      links: [
        {
          type: "Source",
          href: "https://github.com/haziqishere",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/hackathon/payhack.png",
      video: "",
    },
    // DUMMY — remove once real unfeatured project exists.
    {
      title: "Dummy Pipeline",
      href: "https://github.com/haziqishere",
      slug: "",
      dates: "Mar 2025",
      active: false,
      is_selected_work: false,
      description: "Placeholder entry with a data/ML stack, to test the tech filter.",
      skills: ["python", "apache-airflow", "apache-spark", "postgresql"] as TechnologySlug[],
      links: [
        {
          type: "Source",
          href: "https://github.com/haziqishere",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/hackathon/jomhack_datathon.jpg",
      video: "",
    },
    // DUMMY — remove once real unfeatured project exists.
    {
      title: "Dummy Cluster",
      href: "https://github.com/haziqishere",
      slug: "",
      dates: "May 2025",
      active: false,
      is_selected_work: false,
      description: "Placeholder entry with an infra/devops stack, to test the tech filter.",
      skills: ["docker", "kubernetes", "terraform", "grafana"] as TechnologySlug[],
      links: [
        {
          type: "Source",
          href: "https://github.com/haziqishere",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/hackathon/airselangor.jpg",
      video: "",
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
