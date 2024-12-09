import localFont from "next/font/local";
import "./globals.css";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "QuickRecords Accounting Bookkeeping",
  description: "QuickRecords Accounting Bookkeeping helps you to record all your transactions such as Sale, Purchase, Payments and Expenses in an extremely simple manner.",
  keywordds:"QuickRecords, Accounting, Bookkeeping, Sale, Purchase, Payments, Expenses, Journals, Reports, Profit, Loss, Capital, Transaction, Inventory, Pdf, receipt, payments, Online, store, device, management",
  author:"OziTech Studio",
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
          {children}
        </body>
      </>
    </html>
  );

}


/*
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
*/