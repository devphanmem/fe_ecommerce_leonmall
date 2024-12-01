import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Chatbot from "../../pages/Chatbot";

const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen relative">
    {/* Header */}
    <header className="fixed top-0 left-0 w-full z-10">
      <Header />
    </header>

    {/* Main Content */}
    <main className="flex-grow pt-[64px] pb-[64px]">{children}</main>

    {/* Footer */}
    <footer className="fixed bottom-0 left-0 w-full z-10">
      <Footer />
    </footer>

    {/* Chatbot */}
    <Chatbot />
  </div>
);

export default MainLayout;
