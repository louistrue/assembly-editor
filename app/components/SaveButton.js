export default function SaveButton({ onClick }) {
  return (
    <div className="p-4">
      <button
        onClick={onClick}
        className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Download Updated IFC
      </button>
    </div>
  );
}
