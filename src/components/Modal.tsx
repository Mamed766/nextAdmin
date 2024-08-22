export default function Modal({
  card,
  onClose,
}: {
  card: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded w-[400px]">
        <h2 className="text-xl font-bold mb-4">{card?.projectName}</h2>
        <p className="text-gray-700 mb-2">{card?.projectDesc}</p>
        <p className="text-gray-700 mb-2">
          Assigned Date: {card?.assignedDate}
        </p>
        <p className="text-gray-700 mb-2">Due Date: {card?.dueDate}</p>
        <p className="text-gray-700 mb-2">Status: {card?.status}</p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white p-2 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}
