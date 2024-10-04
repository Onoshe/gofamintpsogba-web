import { postRequest } from "@/configs/postRequest";
//import * as bcrypt from "bcrypt";



export async function POST(request) {
  const body = await request.json();

  /*const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  });*/

 /*const url = "https://countixpress-server.gofamintpsogba.org/server_churchSite.php";
 const password =  await bcrypt.hash(body.password, 10)
 const user =  await postRequest(url, {   
    tableName:"USERS_ACCOUNT",
    insertQuery:"INSERT INTO USERS_ACCOUNT (userId, firstname, lastname, phoneNo, email, secret) VALUES",
    rows:[
        [body.sn, body.phoneNo, body.firstname, body.lastname, body.email, password]
    ] 
});
 
  //const { password, ...result } = user;
  return new Response(JSON.stringify(user));
  */
}