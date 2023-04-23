import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Common/Button";

import notFoundImage from "../../assets/img/notFoundImage.webp";

// TODO: contact functionality

const NotFound = () => {
  return (
    <div className="flex items-center justify-center bg-white rounded-md h-screen w-screen px-4">
      <div className="flex flex-col gap-3 text-center">
        <img
          src={notFoundImage}
          alt="imagem de página não encontrada"
          className="w-80 mx-auto"
        />
        <h2 className="text-center text-3xl lg:text-7xl">
          Página não encontrada
        </h2>
        <span className="text-center text-xl lg:text-2xl md:max-w-xl lg:max-w-3xl mt-5">
          Desculpe, a página que você está procurando não existe. Se você acha
          que há um problema, contate-nos.
        </span>
        <div className="flex justify-center max-w-3xl gap-5 lg:gap-8 mt-5">
          <div>
            <Button ariaLabel="voltar para página inicial">
              <Link to="/home" className="!no-underline">
                Página inicial
              </Link>
            </Button>
          </div>
          <div>
            <Button ariaLabel="contatar" transparent>
              Contate-nos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
