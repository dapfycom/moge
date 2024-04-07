// import {
//   DustIcon,
//   FarmIcon,
//   FireIcon,
//   PlayIcon,
//   SwapIcon,
// } from "components/icons/ui-icons";
// import Layout from "components/Layout/MainLayout";
// import React from "react";
// import { RouteObject } from "react-router-dom";

import { SendMessageIcon } from "@/components/ui-system/icons/ui-icons";
import { SendIcon, Table2 } from "lucide-react";

// const SwapView = React.lazy(() => import("views/SwapView"));
// const PlayView = React.lazy(() => import("views/PlayView"));
// const TheForgeView = React.lazy(() => import("views/TheForgeView"));
// const SwapLpTab = React.lazy(() => import("views/SwapView/commons/SwapLpTab"));
// const FarmView = React.lazy(() => import("views/FarmView"));
// const CoinFlipView = React.lazy(() => import("views/CoinFlipView"));
// const SwapTab = React.lazy(() => import("views/SwapView/commons/SwapCard"));
// const DustView = React.lazy(() => import("views/DustView/DustView"));

export const routeNames = {
  home: "/",
  rewards: "/multiversx/rewards",
  play: "/multiversx/play",
  pvp: "/multiversx/pvp",
  dust: "/multiversx/dust",
  aggregator: "/multiversx/aggregator",
  admin: "/admin",
  help: "/help",
};

export const externnalLinks = {
  twitter: "https://twitter.com/MogeMvx",
  telegram: "https://t.me/+B1CfxQzwJXwxOWNk",
  whitepaper:
    "https://drive.google.com/file/d/1OlFqHy_uvEJ6Prq2-RJkbMAcQ_7QkzuZ/view",
  dextools:
    "https://www.dextools.io/app/en/multiversx/pair-explorer/erd1qqqqqqqqqqqqqpgqh3j3dzk0u2fjadup6ghzs5clymdruuk82jpst5847e?t=1711663852195",
  octools: "https://octools.app/chart/MOGE-3aadc7",
};

export const mainSiteRoutes = [
  {
    path: routeNames.rewards,
    title: "Earn",
  },
  {
    path: routeNames.aggregator,
    title: "Swap",
  },

  {
    title: "Play",
    path: routeNames.pvp,
  },
  {
    path: routeNames.dust,
    title: "Dust",
  },

  {
    title: "Admin",
    path: routeNames.admin,
    onlyAdmin: true,
  },
];

export const adminRoutes = [
  {
    path: routeNames.admin,
    title: "Rewards",
    icon: <Table2 />,
  },

  {
    path: routeNames.admin + "/newsletter",
    title: "Newsletter",
    icon: <SendIcon />,
  },
  {
    path: routeNames.admin + "/tickets",
    title: "Tickets",
    icon: <SendMessageIcon />,
  },
];
