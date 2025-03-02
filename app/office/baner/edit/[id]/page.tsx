import ColectionForm from "@/components/forms/ColectionForm";
import SliderForm from "@/components/forms/SliderForm";
import { getColectionById } from "@/lib/actions/colection.action";
import { ParamsProps } from "@/lib/actions/sharedTypes";
import { getSliderById } from "@/lib/actions/slider.action";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const slider = await getSliderById({ sliderId: params.id });
  const colection = await getColectionById({ colectionId: params.id });

  return (
    <>
      <div className={`${!slider && "hidden"}`}>
        <h2 className="h2-bold my-10 text-center text-gray-900">Edit Slider</h2>
        <div>
          <SliderForm type="Edit" sliderDetails={JSON.stringify(slider)} />
        </div>
      </div>
      <div className={`${!colection && "hidden"}`}>
        <h2 className="h2-bold my-10 text-center text-gray-900">
          Edit Colection
        </h2>
        <div>
          <ColectionForm
            type="Edit"
            colectionDetails={JSON.stringify(colection)}
          />
        </div>
      </div>
    </>
  );
};

export default page;
