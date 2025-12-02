"use client";

import { useState } from "react";

export default function TableCardDemo() {
  const [isLaidDown, setIsLaidDown] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="table-container">
        <div
          className={`card ${isLaidDown ? "is-laid-down" : ""}`}
          id="myCard"
          onClick={() => setIsLaidDown(!isLaidDown)}
        >
          <div className="card-inner">
            <div className="card-front">
              <img
                src="https://picsum.photos/300/200"
                alt="Placeholder"
                className="card-image"
              />
              <h2 className="text-2xl font-bold mb-2">Vertical Card</h2>
              <p>Click the card or button to lay it down.</p>
            </div>
            <div className="card-back">
              <h1 className="text-2xl font-bold">Back Side</h1>
              <p>Now I'm flat!</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsLaidDown(!isLaidDown)}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Toggle Lay Down Effect
      </button>

      <style jsx>{`
        /* --- Scene Setup --- */
        .table-container {
          perspective: 1000px; /* Establishes the 3D viewing space */
          display: flex;
          justify-content: center;
          align-items: center;
          height: 600px;
          width: 100%;
          max-width: 800px;
          background-color: #4caf50; /* Green "table" background */
          overflow: hidden; /* Helps contain movement if the card dips below the container */
          border-radius: 12px;
        }

        /* --- Card Base Styling --- */
        .card {
          width: 250px;
          height: 350px;
          position: relative;
          transition: transform 1s ease-in-out; /* Smooth transition */
          transform-style: preserve-3d;
          /* Starts vertically upright (0 degrees rotation on X axis) */
          transform: rotateX(0deg);
          /* We pivot the card from its bottom edge to make it look like it's falling onto the table */
          transform-origin: bottom center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }

        /* --- The "Layed Down" State --- */
        .card.is-laid-down {
          /* Lays the card completely flat (90 degrees rotation) */
          transform: rotateX(90deg);
          box-shadow: 0 0 0 rgba(0, 0, 0, 0); /* Shadow disappears when flat */
        }

        /* --- Inner Card Content (for front/back functionality) --- */
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
          backface-visibility: hidden; /* Hides the reverse side */
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
          text-align: center;
          justify-content: center;
        }

        .card-front {
          background-color: white;
          color: #333;
        }

        .card-back {
          background-color: #333;
          color: white;
          transform: rotateX(180deg); /* Oriented correctly for when the card flips */
        }

        /* --- Content Styling --- */
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
