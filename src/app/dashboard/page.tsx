import localFont from "next/font/local";
import { serverUseTranslation } from "../i18n";
const calibri = localFont({ src: "../../fonts/calibri-regular.ttf" });
const druk = localFont({ src: "../../fonts/druk.wide.ttf" });
export default async function ResultPage({}: {
  searchParams: { session_id: string; email: string; artist: string };
}): Promise<JSX.Element> {
  return (
    <div className={calibri.className}>
      <h1>Admin Dashboard</h1>
    </div>
  );
}
