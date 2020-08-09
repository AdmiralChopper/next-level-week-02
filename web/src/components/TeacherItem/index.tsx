import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css'

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars0.githubusercontent.com/u/59832418?s=460&u=f3fc286c2b56a19368f7d605ca3754f14f5d4a4b&v=4" alt="Imagem de perifl" />
        <div>
          <strong>Carlos Castro</strong>
          <span>Matemática</span>
        </div>
      </header>

      <p>
        Professor muito bom
            <br /><br />
            Sério mesmo cara.
          </p>

      <footer>
        <p>
          Preço/hora <strong>R$ 00,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
              Entrar em contato
            </button>
      </footer>
    </article>
  );
};

export default TeacherItem;