import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    event.context.auth = null;
  } else {
    event.context.auth = session;
  }
});
