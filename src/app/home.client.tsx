"use client";
import useAuthentication from "@/hooks/useAuthentication";
import Home from "@/views/HomeView/Home";
import SwapAggregator from "@/views/SwapAggregator";

const HomeClient = () => {
  const { isLoggedIn } = useAuthentication();
  return <>{isLoggedIn ? <SwapAggregator /> : <Home />}</>;
};

export default HomeClient;
