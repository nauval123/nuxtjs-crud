export const useUseCashIn = <T extends { id: string | number }>(
  endpoint: string
) => {
  // READ action
  const {
    data: list,
    pending,
    error,
    refresh,
  } = useFetch<T[]>(`/api/${endpoint}`, {
    lazy: true,
    default: () => [],
  });

  const performAction = async (action: Promise<any>) => {
    try {
      const result = await action;
      await refresh();
      return result;
    } catch (e: any) {
      console.error(`error: "${endpoint}" failed:`, e);
      throw e;
    }
  };

  // CREATE action
  const addCashIn = (payload: Omit<T, "id">) =>
    performAction(
      $fetch(`/api/${endpoint}`, { method: "POST", body: payload })
    );

  // UPDATE action
  const updateCashIn = (id: string | number, payload: Partial<Omit<T, "id">>) =>
    performAction(
      $fetch(`/api/${endpoint}/${id}`, {
        method: "PUT",
        body: payload,
      })
    );

  // DELETE action
  const deleteCashIn = (id: string | number) =>
    performAction($fetch(`/api/${endpoint}/${id}`, { method: "DELETE" }));

  return {
    list,
    pending,
    error,
    addCashIn,
    updateCashIn,
    deleteCashIn,
  };
};
