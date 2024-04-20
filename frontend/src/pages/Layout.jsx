import Header from "../components/Header";

function Layout({ children }) {
  return (
    <div className="bg-black w-full min-h-[100dvh]">
      <div className="container mx-auto">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;
