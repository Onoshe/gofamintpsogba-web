import FooterIndex from '@/footer/_Index';
import './globals.css';
import { Inter } from 'next/font/google'
import Sidebar from '@/sidebar/Sidebar';
import HeaderContainer from '@/header/Container';
import { getDataLink } from '@/lib/apis/urlLinks';
import { getRequest } from '@/lib/apis/getRequest';
import { getUserSession } from '@/lib/authActions/getUserSession';
import { GoogleAnalytics } from '@next/third-parties/google'


const inter = Inter({ subsets: ['latin'] })
const gaId = process.env.NEXT_PUBLIC_GOOGLE_TAG;


export const metadata = {
  title: 'Gofamint PS Official Website',
  description: 'Official website for The Gospel Faith Mission Internationa, Pacesetters Assembly, Ogba District Headquarters, Ogba, Ikeja, Lagos',
}


export default async function RootLayout({ children }) {
  const dataLink = getDataLink({table:'official_site_pastorcorner'});
  const pastorCorners = await getRequest(dataLink);
  const user = getUserSession();

 // console.log(dataLink);

  return (
    <html  data-theme='light' lang="en">
      <body className={inter.className}>
          <main>
            <HeaderContainer pastorCorners={pastorCorners} 
              ssUser={user}/>
            {children}
            <GoogleAnalytics gaId={gaId} />      
            <Sidebar />
          </main>
       <FooterIndex />
      </body>
    </html>
  )
}

/*
export default async function RootLayout({ children }) {
  const dataLink = getDataLink({table:'official_site_pastorcorner'});
  const pastorCorners = await getRequest(dataLink);
  const user = getUserSession();

  return (
    <html  data-theme='light' lang="en">
      <body className={inter.className}>
          <main>
            <HeaderContainer pastorCorners={pastorCorners} ssUser={user}/>
            {children}
            <GoogleAnalytics gaId={gaId} />      
            <Sidebar />
          </main>
       <FooterIndex />
      </body>
    </html>
  )
}

export default async function RootLayout({ children }) {  
  return (
    <html  data-theme='light' lang="en">
      <body className={inter.className}>
          <main>
            {children}
          </main>
      </body>
    </html>
  )
}
*/