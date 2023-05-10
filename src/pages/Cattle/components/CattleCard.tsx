import React from "react";
import { Link } from "react-router-dom";

type Breed = {
  breed: string;
  quantityInFraction: {
    numerator: number;
    denominator: number;
  };
};

type CattleCardProps = {
  id: string;
  image: string | undefined;
  name: string;
  sex: string;
  breeds: Breed[];
};

export default function CattleCard({ id, name, image, breeds, sex }: CattleCardProps) {
  return (
    <Link to={id} className="!no-underline">
      <div className="w-full bg-[#f7f7f7] px-5 py-3 rounded hover:bg-[#f0f0f0] cursor-pointer">
        <div className="flex items-center gap-5">
          <img src={image} alt="imagem do animal" className="w-24" draggable={false} />
          <div>
            <h2>{name}</h2>
            <span>{sex === "Male" ? "Macho" : "Fêmea"}</span>
            {breeds.map((breed) => (
              <div key={breed.breed}>
                {breed.breed} - {breed.quantityInFraction.numerator}/{breed.quantityInFraction.denominator}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
