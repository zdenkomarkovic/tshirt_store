import SliderForm from "@/components/forms/SliderForm";
import EditDeleteAction from "@/components/shared/EditDeleteAction";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getSliders } from "@/lib/actions/slider.action";
import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import React from "react";

const SlideList = async () => {
  const result = await getSliders();

  return (
    <div>
      <div>
        <SliderForm />
      </div>
      <div className="container">
        <div className="w-full">
          <Table className="w-[900px] border-y-2">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Subtitle</TableHead>
                <TableHead>Link to</TableHead>

                <TableHead className="text-right">opcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result?.map((slider: any) => {
                return (
                  <TableRow key={slider._id} className="">
                    <TableCell className="">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Image
                        src={slider.image}
                        width={50}
                        height={50}
                        alt="slider-image"
                      />
                    </TableCell>
                    <TableCell>{slider.title}</TableCell>
                    <TableCell>{slider.subtitle}</TableCell>
                    <TableCell>
                      <Link href={slider.link}>{slider.link}</Link>
                    </TableCell>

                    <TableCell className="text-right">
                      <EditDeleteAction type="Slider" itemId={slider._id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SlideList;
