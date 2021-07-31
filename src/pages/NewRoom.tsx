import {FormEvent} from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/button';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { database } from '../services/firebase';


export function NewRoom() {
  const {vLoginContext} = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault();

    if (newRoom.trim() == ''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: vLoginContext?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }
  
  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Imagem de perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask"/>
          <h1>{vLoginContext?.name}</h1> 
          <h2>Criar uma nova Sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da Sala"
              onChange={event => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar sala</Button>

          </form> 
          <p>Caso queira entrar em uma sala existente <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}