import "./globals.css";
import Header from "./UI/Header";
import Footer from "./UI/Footer";

export const metadata = {
  title: "Top Ten",
  description: "It's time to make your list.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white bg-teal-900">
        <Header />
        <main className="container max-w-5xl p-6 mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
