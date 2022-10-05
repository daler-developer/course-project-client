import Container from "./Container";
import Header from "./Header";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <div className="pt-[70px] pb-[70px]">
        <Header />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default Layout;
