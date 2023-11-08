import "../../../public/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import { serverUseTranslation } from "../i18n";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
interface HomeProps {
  params: {
    lng: string;
  };
}
const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(props: HomeProps): Promise<Metadata> {
  const { t } = await serverUseTranslation(
    props.params.lng,
    "titlesandsubtitles"
  );
  const metadata = await serverUseTranslation(props.params.lng, "metadata");
  return {
    title: t("maintitle"),
    description: metadata.t("metadescription"),
    keywords: t("mainkeywords"),
    icons: {
      icon: "/favicon.ico",
      shortcut: "/faviconlogo.png",
      apple: "/faviconlogo.png",
    },
    metadataBase: new URL("https://app.skyderdigital.com"),
    verification: {
      // google: "Oo_6jAoHQzYV4P5UpM-TDI99dFhfcEro7Tfokc6VOHU",
    },
    alternates: {
      canonical: `https://app.skyderdigital.com`,
    },
  };
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
