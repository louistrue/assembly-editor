import { IfcAPI } from "web-ifc";

export async function parseIFC(file) {
  const ifcAPI = new IfcAPI();
  await ifcAPI.Init();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      const modelID = ifcAPI.OpenModel(new Uint8Array(arrayBuffer));
      resolve({ ifcAPI, modelID });
    };
    reader.readAsArrayBuffer(file);
  });
}
