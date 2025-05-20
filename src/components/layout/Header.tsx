import { Logo } from "./Logo";
import Nav from "./Nav";

export const Header = () => (
  <header className="w-full">
    <div className="mt-5 mb-5 flex justify-center">
      <Logo />
    </div>
    <Nav />
  </header>
);
