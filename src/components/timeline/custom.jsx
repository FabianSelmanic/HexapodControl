import React from "react";

export const CustomRender0 = (action) => {
    const element = action.action
  return (
    <div className="grid place-items-center h-full">
      {element.effectId}
    </div>
  );
};

export const CustomRender1 = (action) => {
  const element = action.action
  return (
    <div className="grid place-items-center h-full bg-[../../../public/vite.svg]">
      {element.effect.effectId}
    </div>
  );
};