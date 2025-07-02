const baseURL = "https://6861235f8e74864084450954.mockapi.io/api/v1";

export default defineEventHandler(async (event) => {
  const endpoint = event.context.params?.endpoint ?? "";

  const urlFinal = `${baseURL}/${endpoint}`;

  // mengatur headers
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await $fetch(urlFinal, {
      method: event.method,
      headers: headers,
      query: getQuery(event),
      body: event.method !== "GET" ? await readBody(event) : undefined,
    });
    return response;
  } catch (error: any) {
    console.error(`API Proxy Error for ${urlFinal}:`, error);
    throw createError({
      statusCode: error.response?.status ?? 500,
      statusMessage: `Error API`,
    });
  }
});
