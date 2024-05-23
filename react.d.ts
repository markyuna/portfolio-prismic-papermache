declare module "react-dom" {
  function experimental_useFormStatus<Status>(
    action: (state: Status) => Promise<Status>,
    initialState: Status,
    permalink?: string,
  ): [state: Status, dispatch: () => void];
  function experimental_useFormStatus<Status, Payload>(
    action: (state: Status, payload: Payload) => Promise<Status>,
    initialState: Status,
    permalink?: string,
  ): [state: Status, dispatch: (payload: Payload) => void];
}
