import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  //   console.log("middleware server");
  //   console.log(event);
  if (!session) {
    event.context.auth = null;
  } else {
    event.context.auth = session;
  }
});
