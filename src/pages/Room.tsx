import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/button';

import '../styles/room.scss';

export function Room() {
  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letMeAsk" />
          <div>código da sala</div>
        </div>
      </header>
      <main id="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>
        <form>
          <textarea placeholder="Escreva sua pergunta aqui" />

          <div className="form-footer">
            <span>Para enviar uma pergunta, <button>faça seu login</button></span>
            <Button type="submit">Enviar Pergunta</Button> 
          </div>
        </form>
      </main>
    </div>
  );
}