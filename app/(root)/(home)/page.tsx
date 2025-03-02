import Carousel from "@/components/carousel/page";
import SlideCard from "@/components/cards/slideCard/page";
import { getSliders } from "@/lib/actions/slider.action";
import { getVisibility } from "@/lib/actions/visibility.action";
import { getColections } from "@/lib/actions/colection.action";
import ColectionCard from "@/components/cards/colectionCard/page";
import { getProducts } from "@/lib/actions/product.action";
import Card from "@/components/cards/productCard/page";

const Home = async () => {
  const result = (await getSliders()) || [];
  const colections = (await getColections()) || [];
  const visibleComponents = (await getVisibility()) || [];
  const slider = visibleComponents.find((item) => item.title === "Slider");
  const colection = visibleComponents.find(
    (item) => item.title === "Colections",
  );
  const filter = "mostViewed";
  const products = (await getProducts({ filter })) || [];
  const visibleProducts = products.filter((product) => !product.hidden);

  return (
    <div className="container">
      <div
        className={`flex h-full w-full items-center justify-center overflow-hidden border-b-4 border-primary-100 py-16 ${slider.hidden && "hidden"}`}
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
        className={`grid h-full w-full grid-cols-3 items-center justify-start gap-0 border-b-4 border-primary-100 px-[65px] py-16 ${colection.hidden && "hidden"}`}
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
      <div className={`h-full w-full border-b-4 border-primary-100 py-16`}>
        <h2 className="h1-bold pb-16 text-center text-primary-500">
          Najcesce gledano
        </h2>
        <div className="grid grid-cols-3 items-center justify-start gap-0 px-[65px]">
          {visibleProducts.length > 0 &&
            visibleProducts.slice(0, 3).map((product) => (
              <div key={product._id}>
                <Card
                  picture={product.image}
                  title={product.title}
                  price={product.price}
                  itemId={JSON.stringify(product.id)}
                />
              </div>
            ))}
        </div>
      </div>

      <p>orders</p>
      <p>paginacija</p>
      <p>paginacija</p>
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
