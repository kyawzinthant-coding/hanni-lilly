"use client";

import { motion } from "framer-motion";
import { useChapterInView } from "@/hooks/use-chapter-in-view";

type Memory = {
  id: number;
  date: string;
  location: string;
  caption: string;
  subCaption?: string;
  myanmarDetail?: string;
  images: string[];
};

const MEMORIES: Memory[] = [
  {
    id: 1,
    date: "October 1, 2025",
    location: "Yankin House",
    caption: "He brought Lilly flowers. Their first date. 🌸",
    images: [
      "/images/first-date-1.png",
      "/images/first-date-2.png",
      "/images/first-date-3.png",
    ],
  },
  {
    id: 2,
    date: "October 6, 2025",
    location: "Dear Tokyo 2.0",
    caption: "The night he told her. The night she said yes.",
    images: ["/images/becomes-together.png"],
  },
  {
    id: 3,
    date: "October 22, 2025",
    location: "Plant House",
    caption:
      "Surrounded by green. Just the two of them. They kept coming back.",
    images: ["/images/plant-house.png"],
  },
  {
    id: 4,
    date: "October 10, 2025",
    location: "Vintage 36, North Dagon",
    caption: "Vintage vibes. North Dagon.",
    images: [],
  },
  {
    id: 5,
    date: "November 5, 2025",
    location: "Bangkok Vibe restaurant",
    caption: "Nov 5, 2025",
    images: [],
  },
  {
    id: 6,
    date: "November 13, 2025",
    location: "Bagan",
    caption: "He put cartoon band-aids on her hand before she left.",
    myanmarDetail:
      "မသွားခင် ရှေ့ရက်က ဘုရားမှာ လက်ခိုက်မိပြီး လက်မနဲ့ လက်မှာ အနာဖြစ်သွားလို့ ကာတွန်းရုပ်ပလာစတာလေးတွေ ကပ်ပေးဖူးတယ်",
    images: [],
  },
  {
    id: 7,
    date: "November 6, 2025",
    location: "1 Month Anniversary",
    caption: "1 Month 🤍 He gave her a bracelet.",
    subCaption: "She sent him a photo wearing it. He kept it.",
    images: ["/images/1-month-anni.png", "/images/braclet-anni-gift.png"],
  },
  {
    id: 8,
    date: "December 9, 2025",
    location: "Jealousy Cartoon Day",
    caption: "ပူတူး 😤 — Dec 9, 2025",
    myanmarDetail:
      "ကားကွေ့တော့ ဘေးက ကောင်မလေးကို လိုက်ကြည့်တယ်ထင်ပြီး သဝန်တိုတာ",
    images: ["/images/her-jealousy-cartoon.png"],
  },
  {
    id: 9,
    date: "December 22, 2025",
    location: "Cooking for her",
    caption: "He cooked for her.",
    subCaption: "Dec 22, 2025",
    myanmarDetail: "ပြည်ကြီးငါးဟင်းနဲ့ ထမင်းဘူး",
    images: [],
  },
  {
    id: 10,
    date: "November 19 & December 24, 2025",
    location: "Born in Japan",
    caption:
      "She was watching her phone. He took the photo anyway. Christmas Eve too.",
    images: ["/images/born-in-japan-date.png"],
  },
  {
    id: 11,
    date: "December 2025",
    location: "2 Month Anniversary",
    caption: "2 Months 🌹 BBQ together. She held flowers. He held on.",
    images: ["/images/2-month-anni.png"],
  },
];

function MemoryBlock({
  memory,
  index,
  isInView,
}: {
  memory: Memory;
  index: number;
  isInView: boolean;
}) {
  const hasImages = memory.images.length > 0;
  const firstImage = memory.images[0];

  return (
    <motion.section
      className="flex w-full max-w-xl flex-col items-center justify-center gap-5 px-6 py-8 scroll-mt-0"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {hasImages ? (
        <div className="w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-[var(--gold)]/20">
          {memory.images.length === 1 ? (
            <img
              src={firstImage}
              alt={memory.caption}
              className="h-[280px] w-full object-cover md:h-[340px]"
            />
          ) : (
            <div className="flex gap-1.5 p-1.5">
              {memory.images.slice(0, 3).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${memory.caption} ${i + 1}`}
                  className="h-[220px] flex-1 object-cover md:h-[280px]"
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
          className="h-[200px] w-full max-w-md rounded-2xl md:h-[260px]"
          style={{
            background:
              "linear-gradient(135deg, var(--rose) 0%, var(--gold) 100%)",
            opacity: 0.4,
          }}
        />
      )}
      <div className="flex w-full max-w-lg flex-col items-center gap-2 text-center">
        <p className="font-body text-[15px] text-[var(--gold)]">
          {memory.date}
        </p>
        <p className="font-body text-[13px] text-[var(--ivory)] opacity-50">
          {memory.location}
        </p>
        <p className="font-handwritten text-xl text-[var(--ivory)] md:text-2xl">
          {memory.caption}
        </p>
        {memory.subCaption && (
          <p className="font-body text-[12px] text-[var(--ivory)] opacity-60">
            {memory.subCaption}
          </p>
        )}
        {memory.myanmarDetail && (
          <p className="font-myanmar mt-1 line-clamp-2 text-sm text-[var(--ivory)] opacity-70">
            {memory.myanmarDetail}
          </p>
        )}
      </div>
    </motion.section>
  );
}

export default function Chapter6_Festival() {
  const [ref, isInView] = useChapterInView(0.3);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="chapter vignette relative overflow-hidden"
      style={{ background: "var(--burgundy)" }}
    >
      <div className="absolute inset-0 z-0 h-full w-full overflow-y-auto overflow-x-hidden">
        <div className="flex min-h-full flex-col items-center gap-6 pb-10 pt-10">
          <motion.p
            className="font-display text-xl italic text-[var(--gold)] md:text-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our Dates
          </motion.p>
          <p className="mb-2 font-body text-sm text-[var(--ivory)] opacity-50">
            Scroll to see each moment
          </p>
          {MEMORIES.map((memory, i) => (
            <MemoryBlock
              key={memory.id}
              memory={memory}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
