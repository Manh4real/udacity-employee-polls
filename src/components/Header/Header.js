import { AccountSection } from "../AccountSection/AccountSection";
import { Nav } from "../Nav/Nav";

export const Header = () => {
  return (
    <div className="flex justify-between border-b border-b-gray-200 p-5">
      <Nav />
      <AccountSection />
    </div>
  );
};
