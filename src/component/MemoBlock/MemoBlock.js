import './MemoBlock.css';

const MemoBlock = ({ value, onClick }) => {

    return (
      <div className="memo-front" value={value} onClick={onClick}>
        <p>{value}</p>
      </div>
    );
};

export default MemoBlock;