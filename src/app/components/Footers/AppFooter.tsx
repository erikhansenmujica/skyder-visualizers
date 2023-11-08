import { serverUseTranslation } from "../../i18n";
import { FooterBase } from "./FooterBase";

export interface AppFooterProps {
  lng: string;
}

export const AppFooter = async ({ lng }: AppFooterProps) => {
  const { t } = await serverUseTranslation(lng, "footer");
  return <FooterBase t={t} lng={lng} />;
};
