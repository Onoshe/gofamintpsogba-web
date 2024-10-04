import IndexHome from "@/container/_home/_IndexHome";
import { getUserSession } from "@/lib/authActions/getUserSession";

export default function Home() {
  const user = getUserSession();
  return (
      <IndexHome ssUser={user}/>
  );
}
