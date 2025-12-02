"use client";

import { PathCard } from "./path-card";

export type CardData = {
  id: string;
  title: string;
  body: string;
};

type CardPathSceneProps = {
  cards: CardData[];
};

export function CardPathScene({ cards }: CardPathSceneProps) {
  return (
    <div className="card-path-root">
      <div className="card-path-list">
        {cards.map((card, index) => (
          <PathCard
            key={card.id}
            index={index}
            total={cards.length}
            title={card.title}
            body={card.body}
          />
        ))}
      </div>
    </div>
  );
}
