"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollCardDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isLaidDown, setIsLaidDown] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update state based on visibility
          setIsLaidDown(entry.isIntersecting);
        });
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% visible
      }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Spacer to force scrolling */}
      <div className="spacer flex items-center justify-center text-2xl text-gray-500 font-mono">
        ↓ Scroll Down to see the card...
      </div>

      {/* Scene Container */}
      <div className="table-container">
        <div
          ref={cardRef}
          id="myCard"
          className={`card ${isLaidDown ? "is-laid-down" : ""}`}
        >
          <div className="card-inner">
            <div className="card-front">
              <img
                src="https://picsum.photos/300/200"
                alt="Placeholder"
                className="card-image"
              />
              <h2 className="text-2xl font-bold mb-2">Vertical Card</h2>
              <p>Watch me lay down as you scroll!</p>
            </div>
            <div className="card-back">
              <h1 className="text-2xl font-bold">Back Side</h1>
              <p>Now I'm flat!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to allow scrolling past */}
      <div className="spacer flex items-center justify-center text-2xl text-gray-500 font-mono">
        ↑ You scrolled past the card!
      </div>

      <style jsx>{`
        .spacer {
          height: 100vh;
          background-color: #eee;
          border-bottom: 1px dashed #ccc;
        }

        /* --- Scene Setup --- */
        .table-container {
          perspective: 1000px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 600px;
          width: 100%;
          background-color: #4caf50;
          overflow: hidden;
        }

        /* --- Card Base Styling --- */
        .card {
          width: 250px;
          height: 350px;
          position: relative;
          transition: transform 1s ease-in-out;
          transform-style: preserve-3d;
          /* Starts vertically upright (0 degrees rotation on X axis) */
          transform: rotateX(0deg);
          /* Pivot from bottom edge */
          transform-origin: bottom center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        /* --- The "Laid Down" State --- */
        .card.is-laid-down {
          transform: rotateX(90deg);
          box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        }

        /* --- Inner Card Content --- */
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transform-style: preserve-3d;
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }

        .card-front {
          background-color: white;
          color: #333;
        }

        .card-back {
          background-color: #333;
          color: white;
          transform: rotateX(180deg);
        }

        .card-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 15px;
          object-fit: cover;
        }
      `}</style>
    </main>
  );
}

