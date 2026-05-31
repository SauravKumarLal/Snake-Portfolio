import { motion } from "framer-motion";
import { useRef, useState } from "react";

export function DraggableCardContainer({ children }) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: 580,
        width: "100%",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.01)",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

export function DraggableCardBody({ children, style, rotate = 0 }) {
  const [zIndex, setZIndex] = useState(1);
  const dragMoved = useRef(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => {
        dragMoved.current = false;
        setZIndex(50);
      }}
      onDrag={(_, info) => {
        if (Math.abs(info.offset.x) > 4 || Math.abs(info.offset.y) > 4) {
          dragMoved.current = true;
        }
      }}
      onDragEnd={() => {
        setZIndex(1);
        // keep flag alive long enough for child click handler to read it
        setTimeout(() => { dragMoved.current = false; }, 200);
      }}
      style={{
        position: "absolute",
        zIndex,
        rotate,
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        ...style,
      }}
      whileDrag={{ cursor: "grabbing" }}
    >
      {/* intercept clicks that follow a drag */}
      <div
        onClick={(e) => {
          if (dragMoved.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
