import BackgroundCard from '@/container/admin/components/reusableComponents/BackgroundCard';


const Dashboard = ({}) => {

    
  return (
    <div className='p-4 w-full'>
        <div className='flex w-full flex-col lg:flex-row'>
                <BackgroundCard
                    title={'Activities'}
                    style={'flex flex-col gap-3 mr-5 h-fit'}
                >
                    <p>Table actions</p>

                </BackgroundCard>
        </div>
    </div>
  )
}

export default Dashboard;
