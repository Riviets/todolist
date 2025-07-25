type ModalProps = {
  title: string;
  text: string;
  closeFunction: () => void;
};
const Modal = ({ title, text, closeFunction }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-zinc-900/70 p-5 flex-center">
      <div className="bg-white p-3 md:p-5 rounded-sm">
        <p className="font-bold text-xl md:text-3xl text-center mb-2">
          {title}
        </p>
        <p className="text-lg md:text-xl mb-2 md:mb-4">{text}</p>
        <button onClick={closeFunction} className="btn">
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
