"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const RoleContent = ({ role }: { role: (typeof rolesData)[0] }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          {role.highlight}
        </span>{" "}
        {role.description}
      </p>
      <Image
        src={role.contentImage}
        alt={role.title}
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
    </div>
  );
};

export function RolesCarousel() {
  const cards = rolesData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 bg-gradient-to-t from-white to-slate-50">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Roles I've Played
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const rolesData: Array<{
  category: string;
  title: string;
  src: string;
  highlight: string;
  description: string;
  contentImage: string;
  content: JSX.Element;
}> = [];

rolesData.push(
  {
    category: "Current Role",
    title: "Data Scientist",
    src: "/company/paynetcircular.png",
    highlight: "Transforming data into actionable insights.",
    description:
      "Building end-to-end data pipelines and ML models to solve complex business problems.",
    contentImage: "/placeholder/ds-content.jpg",
    content: <RoleContent role={rolesData[0]} />,
  },
  {
    category: "Past Role",
    title: "Software Engineer",
    src: "/mypic/swe.jpg",
    highlight: "Building scalable solutions.",
    description:
      "Developing full-stack applications with modern technologies and best practices.",
    contentImage: "/placeholder/swe-content.jpg",
    content: <RoleContent role={rolesData[1]} />,
  },
  {
    category: "Hackathon",
    title: "Hackathoner",
    src: "/mypic/hackathoner.jpg",
    highlight: "From ideation to MVP in 48 hours.",
    description:
      "Multiple hackathon wins demonstrating rapid prototyping and problem-solving skills.",
    contentImage: "/placeholder/hackathon-content.jpg",
    content: <RoleContent role={rolesData[2]} />,
  },
  {
    category: "Community",
    title: "Mentor",
    src: "/mypic/mentor.jpeg",
    highlight: "Guiding the next generation.",
    description:
      "Supporting junior developers and hackathon participants in their technical journey.",
    contentImage: "/placeholder/mentor-content.jpg",
    content: <RoleContent role={rolesData[3]} />,
  },
  {
    category: "Community",
    title: "Speaker",
    src: "/mypic/speaker.png",
    highlight: "Sharing knowledge and experiences.",
    description:
      "Speaking at hackathons and tech events to inspire and educate others.",
    contentImage: "/placeholder/speaker-content.jpg",
    content: <RoleContent role={rolesData[4]} />,
  },
  {
    category: "Leadership",
    title: "Faculty Representative",
    src: "/mypic/leadership.png",
    highlight: "Organize events and represent the faculty.",
    description:
      "Oranizing events and representing the faculty in various university-level events.",
    contentImage: "/placeholder/speaker-content.jpg",
    content: <RoleContent role={rolesData[5]} />,
  },
  {
    category: "Hackathon",
    title: "Judge",
    src: "/mypic/judge.jpeg",
    highlight: "Providing feedback and selecting groups.",
    description:
      "Judging hackathon projects based on creativity, technical complexity, and impact.",
    contentImage: "/placeholder/hackathon-content.jpg",
    content: <RoleContent role={rolesData[2]} />,
  },
  {
    category: "National-Level and Hobby",
    title: "Athlete",
    src: "/mypic/athlete.jpeg",
    highlight: "Represented Pahang in SUKMA and Represented UPM.",
    description: "Represented Pahang in SUKMA and Represented UPM in MASUM.",
    contentImage: "/placeholder/speaker-content.jpg",
    content: <RoleContent role={rolesData[5]} />,
  }
);

export default RolesCarousel;
