import { Marquee } from "@/components/ui/marquee";

const logos = [
  {
    name: "Microsoft",
    img: "/mypic/anugerah.jpeg",
  },
  {
    name: "Apple",
    img: "/mypic/piala.jpg",
  },
  {
    name: "Google",
    img: "/mypic/masum.jpeg",
  },
  {
    name: "Facebook",
    img: "/mypic/kolej.jpeg",
  },
  {
    name: "LinkedIn",
    img: "/mypic/masummedal.jpeg",
  },
  {
    name: "Twitter",
    img: "/mypic/penghargaancomcil.jpg",
  },
];

export function Marquee3D() {
  return (
    <div className="relative flex h-full w-96 flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-background px-20">
      <div className="flex flex-row gap-4 [perspective:300px]">
        <Marquee
          className="h-96 justify-center overflow-hidden [--duration:25s] [--gap:1rem]"
          vertical
          style={{
            transform:
              "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
          }}
        >
          {logos.map((data, idx) => (
            <img
              key={idx}
              src={data.img}
              alt={data.name}
              className="mx-auto h-full w-3/4 cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
            />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
