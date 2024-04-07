import adminTicketReducer from "@/views/AdminPanelView/Tickets/adminTicketsSlice";
import dustReducer from "@/views/DustView/lib/dust-slice";
import rewardsReducer from "@/views/RewardsView/lib/rewards-slice";
import swapAggregatorReducer from "@/views/SwapAggregator/lib/swap-slice";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import dappReducer from "./dapp/dapp-slice";
export function makeStore() {
  return configureStore({
    reducer: {
      dapp: dappReducer,
      dust: dustReducer,
      swapAggregator: swapAggregatorReducer,
      adminTicket: adminTicketReducer,
      rewards: rewardsReducer,
    },
  });
}
const store = makeStore();
setupListeners(store.dispatch);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
