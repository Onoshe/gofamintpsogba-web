import IndexAdmin from "@/container/admin/IndexAdmin";
import { getUserSession } from "@/lib/authActions/getUserSession";


export default function Admin(){
  const user = getUserSession();

    return (
      <IndexAdmin ssUser={user}/>
  );
}
