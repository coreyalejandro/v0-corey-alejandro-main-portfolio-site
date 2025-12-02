"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";

type PathCardProps = {
  index: number;
  total: number;
  title: string;
  body: string;
};

export function PathCard({ index, total, title, body }: PathCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // In-view detection
  const inView = useInView(ref, {
    amount: 0.7,
    margin: "0px 0px -10% 0px",
  });

  // We only want the transition once: when the user has "read" the card.
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (inView) {
      setActivated(true);
    }
  }, [inView]);

  // 1. Upright → laying down (tilt toward the user then flatten)
  const tilt = useSpring(activated ? 6 : 72, {
    stiffness: 130,
    damping: 18,
    mass: 0.7,
  });

  // 2. Vertical offset: cards start floating, then drop to ground plane
  const lift = useSpring(activated ? 0 : 80, {
    stiffness: 140,
    damping: 20,
    mass: 0.8,
  });

  // 3. Glow intensity for already-read cards
  const glow = useSpring(activated ? 1 : 0, {
    stiffness: 120,
    damping: 22,
  });

  const glowShadow = useMotionTemplate`
    0 0 0 1px rgba(148, 163, 184, ${glow}),
    0 0 30px rgba(56, 189, 248, ${glow}),
    0 0 60px rgba(59, 130, 246, ${glow})
  `;

  // Slight depth + stagger to imply a forward path
  const depth = -index * 80; // push each card a bit "forward"
  const forwardOffset = index * 24; // gentle slope away from the user

  const isLast = index === total - 1;
  
  // Use useTransform for transforming the MotionValue to a computed value
  // Original prompt code had: y: lift.to(...) which is not standard in newer framer-motion
  // We use useTransform(lift, (v) => ...) instead
  const y = useTransform(lift, (v) => forwardOffset + v * -1);

  return (
    <motion.div
      ref={ref}
      className="card-path-item"
      style={{
        rotateX: tilt,
        y, // transformed value
        z: depth,
        boxShadow: glowShadow,
      }}
      transition={{ type: "spring" }}
    >
      <div
        className={
          "card-path-surface" +
          (activated ? " card-path-surface--active" : "")
        }
      >
        <div className="card-path-inner">
          <p className="card-path-eyebrow">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h2 className="card-path-title">{title}</h2>
          <p className="card-path-body">{body}</p>
        </div>

        {isLast && (
          <div className="card-path-portal" aria-hidden="true">
            <div className="card-path-portal-core" />
            <div className="card-path-portal-glow" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
