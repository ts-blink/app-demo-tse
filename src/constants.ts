import { Action } from "@thoughtspot/visual-embed-sdk";

export const USERNAME = `demo-user`;
// See https://github.com/thoughtspot/node-token-auth-server-example
// for the implementation of the below endpoint.
export const TOKEN_SERVER =
  "https://node-token-auth-server-example-eta.vercel.app";
export const TOKEN_ENDPOINT = `${TOKEN_SERVER}/api/gettoken/${USERNAME}`;
// If you change this to `demo-user` the request starts failing with 403
export const TOKEN_ENDPOINT_API = `${TOKEN_SERVER}/api/v2/gettoken/ashish.shubham@thoughtspot.com`;

// Cluster details
export const TS_HOST = `900-109-tse.thoughtspotdev.cloud`;

// Liveboard
export const LiveboardId = "4ee17df7-ea21-4c44-9437-55a4f001d147";

// Options for Select filter- EQ
export const filterName = "Lo Shipmode";
export const filterValues = ["air", "fob", "mail", "ship", "null", "invalid"];

// Vizzes to show for 'Selected Vizs' button

export const visibleVizIds = ["9a2388fe-49ea-4921-ac19-171668984590"];

// Options for Actions Disabled
export const actionsToDisable = [Action.Edit, Action.Share];
export const disabledReason = "Action disabled";

// Options for Actions hidden
export const actionsToHide = [Action.Schedule];

// Create a custom action and update the name here.- ignore
// Selecting the action should only show the current viz.
export const customActionNameForShowThisViz = "show-json";
