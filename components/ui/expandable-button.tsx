"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export const ExpandableButton = ({ children, cardContent }: { children: React.ReactNode, cardContent: any }) => {
  cardContent.content = renderContent(cardContent.contentType)
  const [active, setActive] = useState<(typeof cardContent) | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<any>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 h-full w-full z-[41]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[42]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}`}
              ref={ref}
              className="w-full max-w-4xl  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-center p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-2xl"
                    >
                      {active.title}
                    </motion.h3>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-sky-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <motion.div
        layoutId={`card-${cardContent.title}-${id}`}
        key={cardContent.title}
        onClick={() => setActive(cardContent)}
        className="w-max"
      >
        {children}
      </motion.div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const renderContent = (contentType:string) => {
  if (contentType === "prepTrackInfo") {
    return (
      <section id="learn-more">
        <p className="mb-3">
          PrepTrack is your <strong>personal placement companion</strong>, helping you stay
          <strong> consistent, accountable, and motivated</strong> throughout your job preparation journey.
          Whether you&apos;re mastering <strong>DSA, Web Development, AI, or Aptitude</strong>,
          PrepTrack ensures you never fall behind.
        </p>

        <h3 className="text-xl mb-2">📌 How It Works</h3>
        <ul className="mb-3">
          <li><strong>Post Weekly Updates</strong> – Share what you&apos;re learning every week.</li>
          <li><strong>Build a Learning Streak</strong> – Stay consistent and rank higher on the leaderboard.</li>
          <li><strong>Get Smart Reminders</strong> – Miss three weeks? Get an email nudge to get back on track!</li>
          <li><strong>Engage & Compete</strong> – See what your peers are learning and challenge yourself.</li>
        </ul>

        <h3 className="text-xl mb-2">🎯 Why Use PrepTrack?</h3>
        <ul className="mb-3">
          <li><strong>Stay Accountable</strong> – Never lose track of your progress.</li>
          <li><strong>Collaborate & Learn</strong> – Gain insights from peers’ experiences.</li>
          <li><strong>Boost Your Resume</strong> – Showcase continuous learning to recruiters.</li>
          <li><strong>Compete & Excel</strong> – Earn badges, climb the leaderboard, and stay ahead.</li>
        </ul>

        <p>
          👉 <strong>Start tracking your prep journey today with PrepTrack! 🚀</strong>
        </p>
      </section>
    );
  }
  return null; // Default case if contentType doesn't match
};


