import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "../../i18n/settings";

interface FooterBaseProps {
  t: any;
  lng: string;
}

export const FooterBase = ({ t, lng }: FooterBaseProps) => {
  return (
    <footer className="flex-1 w-full w-full z-10">
      <div className="container mx-auto text-center">
        <p className="text-gray-100">
          &copy; {new Date().getFullYear()} Skyder
        </p>
      </div>
      <div className="flex justify-center w-screen">
        <Trans i18nKey="languageSwitcher" t={t}>
          <span className="text-white mx-1">
            Switch from <strong>{lng}</strong> to:{" "}
          </span>
        </Trans>
        {languages
          .filter((l) => lng !== l)
          .map((l, index) => {
            return (
              <span key={l} className="mx-1 text-white r z-10">
                {index > 0 && " or "}
                <Link
                  className="border-b-[3px] border-white cursor-pointe"
                  href={`/${l}`}
                >
                  {l}
                </Link>
              </span>
            );
          })}
      </div>
    </footer>
  );
};
