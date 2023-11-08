import "../../../../public/globals.css";
import { languages } from "../../i18n/settings";
import { dir } from "i18next";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
export const metadata = {
  title: "Checkout",
  description: "Checkout",
};

export default function RootLayout({
  params: { lng },
  children,
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body>{children}</body>
    </html>
  );
}
