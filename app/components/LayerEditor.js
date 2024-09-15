import { useForm } from "react-hook-form";

export default function LayerEditor({ layer, onSave }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      LayerName: layer.LayerName || "",
      Description: layer.Description || "",
      MaterialName: layer.MaterialName || "",
      LayerThickness: layer.LayerThickness || 0,
    },
  });

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 space-y-4 bg-gray-100 rounded-md"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Layer Name
        </label>
        <input
          {...register("LayerName")}
          placeholder="Layer Name"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          {...register("Description")}
          placeholder="Description"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Material Name
        </label>
        <input
          {...register("MaterialName")}
          placeholder="Material Name"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Layer Thickness
        </label>
        <input
          {...register("LayerThickness")}
          type="number"
          step="0.001"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Layer Properties
      </button>
    </form>
  );
}
