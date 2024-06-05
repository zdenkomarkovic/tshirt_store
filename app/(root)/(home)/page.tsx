import Carousel from "@/components/carousel/page";
import SlideCard from "@/components/cards/slideCard/page";
import { getSliders } from "@/lib/actions/slider.action";
import { getVisibility } from "@/lib/actions/visibility.action";
import { getColections } from "@/lib/actions/colection.action";
import ColectionCard from "@/components/cards/colectionCard/page";

const Home = async () => {
  let result = await getSliders();
  let colections = await getColections();
  const visibleComponents = await getVisibility();
  const slider = visibleComponents.find((item) => item.title === "Slider");
  const colection = visibleComponents.find(
    (item) => item.title === "Colections"
  );

  return (
    <div className="container">
      <div
        className={` border-b-4 border-primary-100 py-16 w-full h-full flex items-center justify-center overflow-hidden ${slider.hidden && "hidden"}`}
      >
        {" "}
        <Carousel>
          {result.map((slide, i) => (
            <SlideCard
              key={i}
              picture={slide.image}
              title={slide.title}
              subtitle={slide.subtitle}
              link={slide.link}
            />
          ))}
        </Carousel>
      </div>
      <div
        className={` border-b-4 border-primary-100  py-16 w-full h-full grid grid-cols-3 gap-0 items-center justify-start px-[65px]  ${colection.hidden && "hidden"}`}
      >
        {colections.map((item) => {
          return (
            <ColectionCard
              key={item._id}
              picture={item.image}
              title={item.title}
              subtitle={item.subtitle}
              link={item.link}
            />
          );
        })}
      </div>
      <div
        className={` border-b-4 border-primary-100  py-16 w-full h-full grid grid-cols-3 gap-0 items-center justify-start px-[65px]  ${colection.hidden && "hidden"}`}
      >
        <h2 className="h2-bold">Najcesce gledano</h2>
      </div>
      <p className="h2-bold">products</p>
      <p>paginacija</p>
      <p>search</p>
      <p>pregled kategorija</p>
      <p>single product</p>
      <p className="h2-bold">Cart</p>
      <p className="h2-bold">Checkout</p>
    </div>
  );
};

export default Home;
