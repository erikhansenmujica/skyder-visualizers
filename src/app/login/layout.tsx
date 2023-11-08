import "../../../public/globals.css";

export const metadata = {
  title: "Login",
  description: "Login to Skyder AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
