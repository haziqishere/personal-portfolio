// src/components/hero/background-beam.tsx
"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "../../../public/data/resume";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import BlurFade from "@/components/magicui/blur-fade";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"; // Install this from Aceternity

const BLUR_FADE_DELAY = 0.04;

export function BackgroundBeamSection() {
  return (
    <div className="h-[45rem] w-full rounded-md flex items-center justify-center relative overflow-hidden">
      <div className="p-4 relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mx-auto">
        {/* Profile Picture */}
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="relative group mb-12">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <Avatar className="relative h-40 w-40 rounded-full border-4 border-white shadow-xl transition duration-300 hover:scale-[1.02] bg-white">
              <AvatarImage
                alt={DATA.name}
                src={DATA.avatarUrl}
                className="object-cover"
              />
              <AvatarFallback>{DATA.initials}</AvatarFallback>
            </Avatar>
          </div>
        </BlurFade>

        {/* Text Content - Centered */}
        <div className="flex flex-col items-center space-y-6 w-full max-w-3xl mx-auto text-center">
          <div className="w-full flex justify-center">
            <BlurFadeText
              className="text-4xl md:text-7xl font-bold"
              delay={BLUR_FADE_DELAY}
              text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
            />
          </div>
          <BlurFadeText
            className="text-lg md:text-xl text-gray-500 max-w-2xl"
            delay={BLUR_FADE_DELAY}
            text={DATA.description}
          />
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mt-12">
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <a
                key={name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/90 rounded-full hover:scale-110 transition-transform duration-200 shadow-lg"
              >
                <social.icon className="w-5 h-5 text-gray-700" />
              </a>
            ))}
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
