
import { FC } from "react";
import { MdUndo, MdRestartAlt } from "react-icons/md";

interface NavProps {
  restartGame: () => void;
  handleReverteMove: () => void;
  hasMoves: boolean;
}

const Nav: FC<NavProps> = ({ handleReverteMove, hasMoves, restartGame }) => {
  return (
    <nav>
      <button
        className='btn btn-restart'
        onClick={restartGame}
        disabled={!hasMoves}
        title='Reiniciar'
      >
        <MdRestartAlt />
      </button>
      <button
        className='btn btn-undo'
        onClick={handleReverteMove}
        disabled={!hasMoves}
        title='Desfazer'
      >
        <MdUndo />
      </button>
    </nav>
  );
};

export default Nav;
