import React from "react";
import DraggableColorBox from "../DraggableColorBox/DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";

const DraggableColorList = SortableContainer(({ colors, handleDelete }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((c, i) => (
        <DraggableColorBox
          handleDelete={() => handleDelete(c.name)}
          name={c.name}
          color={c.color}
					key={c.name}
					index={i}
        />
      ))}
    </div>
  );
})

export default DraggableColorList;
