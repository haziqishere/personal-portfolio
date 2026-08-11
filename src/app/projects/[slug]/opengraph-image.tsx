import { ImageResponse } from "next/og";
import { DATA } from "../../../../public/data/resume";
import { getProjectSource } from "../../../../public/data/projects";

export const runtime = "nodejs";
export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image({ params }: { params: { slug: string } }) {
  const project = DATA.projects.find((p) => p.slug === params.slug);
  const post = getProjectSource(params.slug);

  const title = post?.frontmatter.title || project?.title || "Project";
  const summary = post?.frontmatter.summary || project?.description || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          backgroundColor: "white",
          border: "4px solid black",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: 44, fontWeight: 700, color: "black", lineHeight: 1.2 }}>
            {title}
          </div>
          {summary && (
            <div style={{ fontSize: 26, fontWeight: 500, color: "#4A4A4A", lineHeight: 1.5 }}>
              {summary}
            </div>
          )}
        </div>
        <div style={{ display: "flex", fontSize: 22, fontWeight: 600, color: "black" }}>
          {DATA.name}
        </div>
      </div>
    ),
    { width: size.width, height: size.height },
  );
}
