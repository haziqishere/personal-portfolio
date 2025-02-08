// src/components/pipeline/container-scroll.tsx
"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Database, ServerCog, LineChart } from "lucide-react";

const etlStages = [
  {
    title: "Extract",
    description: "Ingesting data from multiple sources",
    icon: Database,
    items: [
      "REST APIs Integration",
      "Database Connectors",
      "File System Watchers",
      "Real-time Streaming",
    ],
  },
  {
    title: "Transform",
    description: "Processing and cleaning data pipeline",
    icon: ServerCog,
    items: [
      "Data Cleaning & Validation",
      "Schema Normalization",
      "Custom Business Logic",
      "Data Quality Checks",
    ],
  },
  {
    title: "Load",
    description: "Loading into data warehouse",
    icon: LineChart,
    items: [
      "Dimensional Modeling",
      "Incremental Loading",
      "Historical Tracking",
      "Performance Optimization",
    ],
  },
];

export function ETLPipelineShowcase() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-center mb-8">
              Building Scalable Data Pipelines
            </h1>
            <p className="text-muted-foreground">
              Architecting end-to-end ETL solutions using modern data stack
            </p>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          {etlStages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.title}
                className="relative group rounded-lg border p-6 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Icon className="w-8 h-8 text-blue-500" />
                  <h3 className="text-xl font-semibold">{stage.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  {stage.description}
                </p>
                <ul className="space-y-2">
                  {stage.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </ContainerScroll>
    </div>
  );
}

export default ETLPipelineShowcase;
