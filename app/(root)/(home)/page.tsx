import Card from "@/components/card/page";
import Carousel from "@/components/carousel/page";
import { getProducts } from "@/lib/actions/product.action";

const CARDS = 10;

// const Card = ({ title, content }) => (
//   <div className="w-[100%] h-[100%] p-[2rem] rounded-[1rem] bg-custom-color text-justify transition-all duration-300 ease-out">
//     <h2>{title}</h2>
//     <p>{content}</p>
//   </div>
// );

const Home = async () => {
  let result = await getProducts();

  return (
    <div className="container">
      <div className="my-20 py-10 w-full h-full bg-gradient-to-r from-gray-100 to-gray-400 flex items-center justify-center overflow-hidden ">
        <Carousel>
          {result.map((product, i) => (
            <Card
              key={i}
              picture={product.image}
              title={product.title}
              price={product.price}
              itemId={JSON.stringify(product.id)}
            />
          ))}
        </Carousel>
      </div>
      <h1 className="h1-bold text-dark100_light900 text-center mt-10">Home</h1>
      <h1 className="h1-bold text-dark100_light900 text-center mt-10">Home</h1>
      <h1 className="h1-bold text-dark100_light900 text-center mt-10">Home</h1>
      <h1 className="h1-bold text-dark100_light900 text-center mt-10">Home</h1>
    </div>
  );
};

export default Home;
