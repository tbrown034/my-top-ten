import "./globals.css";

export const metadata = {
  title: "Top Ten",
  description: "It's time to make your list.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
