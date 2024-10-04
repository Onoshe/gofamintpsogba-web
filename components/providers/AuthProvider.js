"use client"
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
//https://stackoverflow.com/questions/78169281/usesearchparams-should-be-wrapped-in-a-suspense-boundary-at-page
import { ErrorBoundary, ErrorFallback } from "../Errors/ErrorFallback";


const AuthProvider = ({children}) => {
  return (

    <SessionProvider>
     
      <ErrorBoundary FallbackComponent={ErrorFallback}>
       
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
       
      </ErrorBoundary>
    </SessionProvider>
    
  )
}

export default AuthProvider;


/*
<SessionProvider>
  {/ Wrap the Suspense fallback with the ErrorBoundary /}
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  </ErrorBoundary>
</SessionProvider>

<SessionProvider>
  <Suspense fallback={<div>Loading</div>}>
    {children}
  </Suspense>
</SessionProvider>

*/

/*
//https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout

next.config.mjs

const nextConfig = {};
export default nextConfig;



changed to:

const nextConfig = {
  experimental: {
      missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;


*/