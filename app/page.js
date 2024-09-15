"use client";

import { useState } from "react";
import FileUpload from "./components/FileUpload";
import ElementSelector from "./components/ElementSelector";
import LayerViewer from "./components/LayerViewer";
import LayerEditor from "./components/LayerEditor";
import SaveButton from "./components/SaveButton";
import { parseIFC } from "./utils/ifcParser";
import { getElementsWithMaterialLayerSet } from "./utils/getElementsWithMaterialLayerSet";
import { updateIFCProperties } from "./utils/updateIFCProperties";
import { exportIFC } from "./utils/exportIFC";

export default function Home() {
  const [ifcAPI, setIfcAPI] = useState(null);
  const [modelID, setModelID] = useState(null);
  const [elements, setElements] = useState([]);
  const [selectedElementID, setSelectedElementID] = useState(null);
  const [layers, setLayers] = useState([]);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(null);

  const handleFileSelect = async (file) => {
    const { ifcAPI, modelID } = await parseIFC(file);
    setIfcAPI(ifcAPI);
    setModelID(modelID);

    const elementsWithLayers = await getElementsWithMaterialLayerSet(
      ifcAPI,
      modelID
    );
    setElements(elementsWithLayers);
  };

  const handleElementSelect = async (value) => {
    const elementID = parseInt(value);
    setSelectedElementID(elementID);

    const materialLayerSetUsageID = ifcAPI.GetMaterialLayerSetUsage(
      modelID,
      elementID
    );

    if (materialLayerSetUsageID) {
      const materialLayerSetID = ifcAPI.GetMaterialLayerSet(
        modelID,
        materialLayerSetUsageID
      );

      if (materialLayerSetID) {
        const materialLayerSet = ifcAPI.GetLine(modelID, materialLayerSetID);
        const layersData = materialLayerSet.MaterialLayers.map((layerID) => {
          const layer = ifcAPI.GetLine(modelID, layerID);
          const material = ifcAPI.GetLine(modelID, layer.Material);

          return {
            LayerID: layerID,
            MaterialID: material.expressID,
            MaterialName: material.Name.value,
            LayerName: layer.LayerName ? layer.LayerName.value : "",
            Description: layer.Description ? layer.Description.value : "",
            LayerThickness: layer.LayerThickness.value,
          };
        });

        setLayers(layersData);
        setSelectedLayerIndex(null);
      }
    }
  };

  const handleLayerSelect = (index) => {
    setSelectedLayerIndex(index);
  };

  const handleLayerSave = (updatedLayerData) => {
    const updatedLayers = layers.map((layer, index) => {
      if (index === selectedLayerIndex) {
        return {
          ...layer,
          LayerName: updatedLayerData.LayerName,
          Description: updatedLayerData.Description,
          MaterialName: updatedLayerData.MaterialName,
          LayerThickness: parseFloat(updatedLayerData.LayerThickness),
        };
      }
      return layer;
    });

    setLayers(updatedLayers);

    // Update the IFC model
    updateIFCProperties(ifcAPI, modelID, selectedElementID, updatedLayers);
  };

  const handleExport = async () => {
    const url = await exportIFC(ifcAPI, modelID);
    const link = document.createElement("a");
    link.href = url;
    link.download = "updated.ifc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">IFC Material Layer Editor</h1>
      <FileUpload onFileSelect={handleFileSelect} />
      {elements.length > 0 && (
        <ElementSelector
          elements={elements}
          onSelectElement={handleElementSelect}
        />
      )}
      {layers.length > 0 && (
        <div className="flex">
          <LayerViewer
            layers={layers}
            onSelectLayer={handleLayerSelect}
            selectedLayerIndex={selectedLayerIndex}
          />
          {selectedLayerIndex !== null && (
            <LayerEditor
              layer={layers[selectedLayerIndex]}
              onSave={handleLayerSave}
            />
          )}
        </div>
      )}
      {modelID && <SaveButton onClick={handleExport} />}
    </div>
  );
}
