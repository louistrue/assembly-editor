import { useState } from "react";

export default function FileUpload({ onFileSelect }) {
  const [fileName, setFileName] = useState("");

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="p-4">
      <label
        htmlFor="ifc-file"
        className="flex items-center justify-center w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 cursor-pointer"
      >
        Upload IFC File
        <input
          type="file"
          accept=".ifc"
          id="ifc-file"
          className="hidden"
          onChange={handleFileInput}
        />
      </label>
      {fileName && (
        <p className="mt-2 text-gray-700">Selected File: {fileName}</p>
      )}
    </div>
  );
}
