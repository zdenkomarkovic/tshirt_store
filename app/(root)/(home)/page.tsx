import { UserButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <h2>Home</h2>
      <h2>Home</h2>
      <h2>Home</h2>
      <h2>Home</h2>
    </div>
  );
};

export default Home;
