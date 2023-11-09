import localFont from "next/font/local";
import { serverUseTranslation } from "../../i18n";
const calibri = localFont({ src: "../../../fonts/calibri-regular.ttf" });
const druk = localFont({ src: "../../../fonts/druk.wide.ttf" });
export default async function ResultPage({
  searchParams,
  params: { lng },
}: {
  searchParams: { session_id: string; email: string; artist: string };
  params: { lng: string };
}): Promise<JSX.Element> {
  const { t } = await serverUseTranslation(lng, "dashboard");

  return <div className={calibri.className}></div>;
}
