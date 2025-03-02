import ColectionList from "@/components/colectionList/page";
import VisibilityForm from "@/components/forms/VisibilityForm";
import VisibilityAction from "@/components/shared/VisibilityAction";
import SlideList from "@/components/slideList/page";

import { getVisibility } from "@/lib/actions/visibility.action";

import React from "react";

const page = async () => {
  const visibleComponents = (await getVisibility()) || [];
  const slider = visibleComponents.find((item: any) => item.title === "Slider");
  const colections = visibleComponents.find(
    (item: any) => item.title === "Colections",
  );

  return (
    <div>
      <div className="mt-10">
        <VisibilityForm />
      </div>
      <div className="mt-14">
        <div className="flex gap-10 border-y-2">
          {" "}
          <p>{slider.title} </p>{" "}
          <VisibilityAction
            type={"slider"}
            itemId={slider._id}
            visibility={slider.hidden}
          />
          {slider.hidden ? (
            <p className="text-red-500">Slider is Hidden from Home page</p>
          ) : (
            <p>Slider is on Home page</p>
          )}
        </div>
        <div className={`${slider.hidden && "opacity-30"} `}>
          <SlideList />
        </div>
      </div>
      <div className="mt-14">
        <div className="flex gap-10 border-y-2">
          {" "}
          <p>{colections.title} </p>{" "}
          <VisibilityAction
            type={"colections"}
            itemId={colections._id}
            visibility={colections.hidden}
          />
          {colections.hidden ? (
            <p className="text-red-500">Colections are Hidden from Home page</p>
          ) : (
            <p>Colections are on Home page</p>
          )}
        </div>
        <div className={`${colections.hidden && "opacity-30"} `}>
          <ColectionList />
        </div>
      </div>
    </div>
  );
};

export default page;
