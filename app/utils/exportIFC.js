export async function exportIFC(ifcAPI, modelID) {
  const arrayBuffer = ifcAPI.ExportFileAsIFC(modelID);
  const blob = new Blob([arrayBuffer]);
  const url = URL.createObjectURL(blob);
  return url;
}
