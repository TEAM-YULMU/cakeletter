import { Logo } from "./Logo";
import Nav from "./Nav";

export const Header = () => (
  <header>
    <div className="mt-10 mb-10 flex justify-center">
      <Logo />
    </div>
    <Nav />
  </header>
);
