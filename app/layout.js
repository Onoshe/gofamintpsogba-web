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
  title: {
    default: 'Gofamint PS Ogba, Lagos',
    template:"%s - Gofamint PS Ogba",
  },
  description: 'This is the Official website for The Gospel Faith Mission International, Pacesetters Assembly, Ogba District Headquarters, Ogba, Ikeja, Lagos',
  metadataBase: new URL('https://gofamintpsogba.org'),
  // twitter: {
  //   card:'summary_large_image'
  // },
  openGraph: {
    title: 'Gofamint PS Ogba, Lagos',
    description: 'Fellowship with us at Gofamint PS Ogba and have a wonderful experience in the presence of God',
    url: 'https://gofamintpsogba.org', // Relative URL
    type: 'website',
    images: [
      {
        url: 'https://psogbaasset.gofamintpsogba.org/official_website/home_images/psOgbaBgPhotoShare.png', // Relative URL
        width: 1200,
        height: 630,
        alt: 'PS_Ogba_logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://psogbaasset.gofamintpsogba.org/official_website/home_images/psOgbaBgPhotoShare.png'], // Same as OG image
  },
}

/*export async function generateMetadata({ params,}, parent) {
  // read route params
  const id = (await params).id
 
  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}*/


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