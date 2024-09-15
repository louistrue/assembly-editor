export async function getElementsWithMaterialLayerSet(ifcAPI, modelID) {
  const elements = [];

  const allItems = ifcAPI.GetLineIDsWithType(
    modelID,
    ifcAPI.IFCENTITYTYPE.IFCELEMENT
  );
  const itemsArray = Array.from(allItems);

  for (const id of itemsArray) {
    const hasMaterial = ifcAPI.IsDefinedByMaterial(modelID, id);
    if (hasMaterial) {
      elements.push({ id, name: `Element ${id}` });
    }
  }

  return elements;
}
