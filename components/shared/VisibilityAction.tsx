"use client";

import { toggleProductVisibility } from "@/lib/actions/product.action";
import { toggleVisibility } from "@/lib/actions/visibility.action";
import { usePathname } from "@/node_modules/next/navigation";
import React from "react";
import { Switch } from "../ui/switch";

interface Props {
  type: string;
  itemId: string;
  visibility: boolean;
}

const VisibilityAction = ({ type, itemId, visibility }: Props) => {
  const pathname = usePathname();
  const handleClick = async () => {
    if (type === "product") {
      await toggleProductVisibility({
        productId: itemId,
        hidden: visibility,
        path: pathname,
      });
    }
    if (type === "slider") {
      await toggleVisibility({
        visibilityId: itemId,
        hidden: visibility,
        path: pathname,
      });
    }
    if (type === "colections") {
      await toggleVisibility({
        visibilityId: itemId,
        hidden: visibility,
        path: pathname,
      });
    }
  };
  return (
    <>
      <Switch
        className={`primary-gradient scale-90 `}
        checked={visibility}
        onClick={handleClick}
      />
    </>
  );
};

export default VisibilityAction;
