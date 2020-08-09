import React from "react";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import "./styles.css";
import api from "../../services/api";

export interface Proffy {
  id: number;
  name: string;
  subject: string;
  cost: number;
  avatar: string;
  bio: string;
  whatsapp: string;
}
export interface ProffyItemProps {
  info: Proffy;
}

const ProffyItem: React.FC<ProffyItemProps> = ({ info }) => {
  const createConnection = () => {
    api.post("/connections", {
      user_id: info.id,
    });
  };

  return (
    <article className="teacher-item">
      <header>
        <img src={info.avatar} alt="Imagem de perifl" />
        <div>
          <strong>{info.name}</strong>
          <span>{info.subject}</span>
        </div>
      </header>

      <p>{info.bio}</p>

      <footer>
        <p>
          Preço/hora <strong>R$ {info.cost}</strong>
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://wa.me/${info.whatsapp}`}
          onClick={createConnection}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default ProffyItem;
