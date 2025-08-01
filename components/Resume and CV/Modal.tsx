interface ModalProps {
  onClose: () => void;
  title: string;
}

export const Modal = ({ onClose, title }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-700">
            ×
          </button>
        </div>
        <input
          type="text"
          placeholder="Add a title for your new resume"
          className="w-full p-2 border border-zinc-300 rounded-md mb-4 dark:bg-zinc-800 dark:text-white"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md text-black"
          >
            Cancel
          </button>
          <button className="bg-purple-600 px-4 py-2 rounded-md text-white">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
