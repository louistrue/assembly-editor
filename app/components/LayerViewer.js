export default function LayerViewer({
  layers,
  onSelectLayer,
  selectedLayerIndex,
}) {
  const totalThickness = layers.reduce(
    (sum, layer) => sum + layer.LayerThickness,
    0
  );

  return (
    <div className="m-4">
      <svg width="200" height="400" className="border rounded-md">
        {layers.map((layer, index) => {
          const layerHeight = (layer.LayerThickness / totalThickness) * 400;
          const yPosition = layers
            .slice(0, index)
            .reduce(
              (sum, l) => sum + (l.LayerThickness / totalThickness) * 400,
              0
            );

          return (
            <rect
              key={index}
              x="0"
              y={yPosition}
              width="200"
              height={layerHeight}
              fill={selectedLayerIndex === index ? "#4F46E5" : "#9CA3AF"}
              stroke="#000"
              className="cursor-pointer hover:opacity-80"
              onClick={() => onSelectLayer(index)}
            >
              <title>{layer.LayerName || `Layer ${index + 1}`}</title>
            </rect>
          );
        })}
      </svg>
    </div>
  );
}
