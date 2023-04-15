import MemoBlock from "../MemoBlock/MemoBlock";
import './Board.css';

const Board = ({Backs, onClick}) => {

    return (
        <div className="board">         
            {Backs.map((value, index) => (
                <MemoBlock key={index} value={value} onClick={onClick} />
            ))}
        </div>
    );
};

export default Board;