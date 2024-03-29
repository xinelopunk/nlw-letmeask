import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeType = {
  code: string;
}

export function RoomCode(props: RoomCodeType) { 
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code);
  }

  return(
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy Room Code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}