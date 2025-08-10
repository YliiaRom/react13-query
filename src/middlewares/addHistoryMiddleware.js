import { addItemActionToLS } from "@/utils/localeStorageOperations";

export const addHistoryMDL = () => (next) => (action) => {
  if (action.type === "payments/addPayment") {
    console.log(`---action`, action);

    next(action);
    addItemActionToLS(action, "history-money");
  }
  return next(action);
};
