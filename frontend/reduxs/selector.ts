import _ from "lodash";

export const createLoadingSelector = (actions: any) => (state: any) => {
  // returns true only when all actions is not loading

  const loading = _(actions).some((action) =>
    _.get(state, `loading.${action}`)
  );

  return loading;
};

export const createErrorMessageSelector = (actions: any) => (state: any) => {
  // returns the first error messages for actions
  // assume when any request fails on a page that requires multiple API calls, show the first error

  const error =
    _(actions)
      .map((action) => _.get(state, `error.${action}`))
      .compact()
      .first() || "";

  return error;
};
