import { getRequest } from "@/configs/getRequest";
//import { signJwtAccessToken } from "@/lib/jwt";
//import prisma from "@/lib/prisma";
//import * as bcrypt from "bcrypt";


export async function POST(request) {
  const body  = await request.json();

  /*const user = await prisma.user.findFirst({
    where: {
      userId: body.userId,
    },
  });*/

  /*
  const url = "https://countixpress-server.gofamintpsogba.org/server_churchSite.php?tableName=USERS_ACCOUNT";
  const users =  await getRequest(url);

  const user = users.coa.find((user)=> user.userId === body.sn);
  //return new Response(JSON.stringify(user));

  if (user && (await bcrypt.compare(body.password, user.secret))) {
    const { secret, ...userWithoutPass } = user;
    //console.log(user)
    //const accessToken = signJwtAccessToken(userWithoutPass);
    //const result = {
    //  ...userWithoutPass,
    //  accessToken,
    //};
    return new Response(JSON.stringify(userWithoutPass));
  } else return new Response(JSON.stringify(null));
   */
}

