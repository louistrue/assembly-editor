export async function updateIFCProperties(
  ifcAPI,
  modelID,
  elementID,
  updatedLayers
) {
  // Fetch the material layer set usage
  const materialLayerSetUsageID = ifcAPI.GetMaterialLayerSetUsage(
    modelID,
    elementID
  );

  if (materialLayerSetUsageID) {
    // Get the material layer set
    const materialLayerSetID = ifcAPI.GetMaterialLayerSet(
      modelID,
      materialLayerSetUsageID
    );

    if (materialLayerSetID) {
      // Update the layers
      const materialLayerSet = ifcAPI.GetLine(modelID, materialLayerSetID);
      materialLayerSet.MaterialLayers = updatedLayers.map((layer) => {
        // Create or update the material
        const materialID =
          layer.MaterialID ||
          ifcAPI.CreateMaterial(modelID, layer.MaterialName);

        return ifcAPI.CreateMaterialLayer(
          modelID,
          materialID,
          layer.LayerThickness,
          layer.LayerName,
          layer.Description
        );
      });

      // Update the material layer set in the model
      ifcAPI.WriteLine(modelID, materialLayerSet);
    }
  }
}
