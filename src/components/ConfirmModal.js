const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="overlay">
      <div className="confirm-modal">
        <p>Bạn có chắc muốn xóa task này không?</p>
        <div className="confirm-modal__btn">
          <button onClick={onCancel} className="btn btn--cancel">
            Hủy
          </button>
          <button onClick={onConfirm} className="btn btn--add">
            Có
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
