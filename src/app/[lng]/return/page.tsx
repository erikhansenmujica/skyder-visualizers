import type { Stripe } from "stripe";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import localFont from "next/font/local";
import { createInvoiceAndAddToOrder } from "@/actions";
import { AppHeader } from "../../components/Headers/AppHeader";
import { LogoParallax } from "../../components/Parallaxs/LogoParallax";
import CustomTick from "./lottie";
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
  const { t } = await serverUseTranslation(lng, "returnpage");
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;
  const id = paymentIntent.id;
  if (id && searchParams.email && searchParams.artist) {
    await createInvoiceAndAddToOrder(
      decodeURI(searchParams.email),
      decodeURI(searchParams.artist),
      id
    );
  }
  return (
    <div
      className={
        "flex flex-col items-center text-center text-white h-screen bg-[url('/cardbg.jpeg')] bg-no-repeat bg-cover " +
        calibri.className
      }
    >
      <AppHeader lng="en" />
      <LogoParallax isVisible={false} main />
      <div className="z-10 flex flex-col justify-evenly items-center h-[75%] w-[100%] md:h-[450px] md:w-[390px]   0 mt-[15%] md:mt-[8%] bg-black bg-opacity-70 ">
        <div className="bg-blue-700 text-white text-xl p-4 font-bold">
          {checkoutSession.line_items?.data.map((lineItem) => (
            <div key={lineItem.id}>
              {t("yourorder")} {lineItem.description} -{" "}
              {lineItem.amount_total === 6900 ? "$69.00" : "$25.00"}
            </div>
          ))}
        </div>
        <h2 className={druk.className}>
          {t("status")} {paymentIntent.status}
        </h2>
        <h2 className={calibri.className}>
          {t("deliverpart1")} {decodeURI(searchParams.email)}{" "}
          {t("deliverpart2")}
        </h2>

        <CustomTick></CustomTick>
        <h2>
          {" "}
          {t("anyquestions")} <u>skyderdigital@gmail.com</u>
        </h2>
        <Link href="/">
          <button className="hover:text-gray-200">{t("returnhome")}</button>
        </Link>
      </div>
    </div>
  );
}
