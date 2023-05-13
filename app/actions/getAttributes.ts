import { cache } from "react";
import { prisma } from "~/lib/prisma";

async function getAttributes() {
  try {
    return await prisma.attribute.findMany({});
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default cache(getAttributes);
