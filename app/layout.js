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
  title: 'Gofamint PS Ogba, Lagos Official Website',
  description: 'Official website for The Gospel Faith Mission International, Pacesetters Assembly, Ogba District Headquarters, Ogba, Ikeja, Lagos',
  keywords: 'Gofamint, Pacesetters, Ogba, Ikeja, Lagos, Pastor Corner, Salvation, Five Star, Resources, Programs, Events, Gallery, Photos, Videos, Contact, About, Home',
  metadataBase: new URL('https://gofamintpsogba.org'),
  openGraph: {
    title: 'Gofamint PS Ogba, Lagos',
    description: 'Fellowship with us at Gofamint PS Ogba and have a wonderful experience in the presence of God',
    url: '/about', // Relative URL
    images: [
      {
        url: '/gofamintPSLogo.png', // Relative URL
        width: 750,
        height: 580,
        alt: 'Gofamint PS Ogba logo',
      },
    ],
  },
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