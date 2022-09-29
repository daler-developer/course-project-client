import NextLink from "next/link";

const Home = () => {
  return (
    <div className="">
      <h1>Home Page</h1>
      <NextLink href="/admin">To admin</NextLink>
    </div>
  );
};

export default Home;
