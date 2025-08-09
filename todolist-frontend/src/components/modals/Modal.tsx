type ModalProps = {
  title: string;
  text: string;
  closeFunction: () => void;
};
const Modal = ({ title, text, closeFunction }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-zinc-900/70 p-5 flex-center px-10 z-40">
      <div className="bg-white p-3 md:p-5 rounded-sm max-w-[450px] flex flex-col items-center">
        <p className="font-bold text-xl md:text-2xl mb-2">{title}</p>
        <p className="text-base md:text-lg mb-2 md:mb-4">{text}</p>
        <button onClick={closeFunction} type="button" className="btn">
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
