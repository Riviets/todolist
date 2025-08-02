type ConfirmModalProps = {
  text: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmText?: string;
  declineText?: string;
};

const ConfirmModal = ({
  text,
  onConfirm,
  onClose,
  confirmText = "Yes",
  declineText = "No",
}: ConfirmModalProps) => {
  return (
    <div className="h-screen bg-black/70 fixed inset-0 flex-center z-10 px-10">
      <div className="bg-white rounded-sm px-4 md:px-6 py-4 md:py-8 md:max-w-[450px]">
        <p className="font-semibold text-center mb-2 md:mb-4">{text}</p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="cursor-pointer border-1 rounded-sm shadow-md px-3 text-lg hover:bg-zinc-200 transition-all duration-300"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="cursor-pointer border-1 rounded-sm shadow-md px-3 text-lg hover:bg-zinc-200 transition-all duration-300"
          >
            {declineText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
