import DashboardIndex from '@/container/dashboard/DashboardIndex';
import NotificationHeaderBar from '@/navigation/notificationHeaderBar/NotificationHeaderBar';
import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper';
import { getUserSession } from "@/lib/authActions/getUserSession";




const Dashboad = () => {
  const user = getUserSession();

  return (
      <PageWrapper>
          {/*<NotificationHeaderBar/>*/}
          <DashboardIndex ssUser={user}/>
      </PageWrapper>
  )
}


export default Dashboad;