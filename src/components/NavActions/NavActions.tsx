"use client";

import Login from "@/components/Login/Login";
import BuyEgldButton from "../BuyEgldButton/BuyEgldButton";
import MobileNav from "../MobileNav/MobileNav";
import { ModeToggle } from "../ModeToggle/ModeToggle";

const NavbarActions = () => {
  return (
    <div className="ml-auto flex items-center gap-x-2 md:gap-x-4">
      <div className="hidden sm:block">
        <BuyEgldButton />
      </div>

      <div className="hidden sm:block">
        <ModeToggle />
      </div>
      <Login />

      <MobileNav />
    </div>
  );
};

export default NavbarActions;
