// src/components/infrastructure/container-scroll.tsx
"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const STATUS_PAGE_URL = "https://kuma.haziqhakimi.online/status/self-hosted-apps";

export function StatusShowcase() {
  return (
    <div className="flex flex-col">
      <ContainerScroll
        titleComponent={
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-center mb-8">
              My Homelab
            </h1>
            <p className="text-muted-foreground">
              Real-time uptime for the apps I self-host
            </p>
          </div>
        }
      >
        <iframe
          src={STATUS_PAGE_URL}
          title="Self-hosted apps status"
          loading="lazy"
          className="h-full w-full rounded-2xl border-0"
        />
      </ContainerScroll>
    </div>
  );
}

export default StatusShowcase;
