import { createBrowserHistory } from "history";

let baseNameProd = "";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
  baseNameProd = "";
} else {
  // For staging: "/civiliancorpsadmindev"
  // For Prod: "/civcorpsadmin"
  baseNameProd = "/admin";
}

const customHistory = createBrowserHistory({
  basename: baseNameProd,
});

export default customHistory;
