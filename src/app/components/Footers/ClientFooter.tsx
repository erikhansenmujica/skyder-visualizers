"use client";

import { FooterBase } from "./FooterBase";
import { useTranslation } from "../../i18n/client";
import { AppFooterProps } from "./AppFooter";

export const Footer = ({ lng }: AppFooterProps) => {
  const { t } = useTranslation(lng, "footer");
  return <FooterBase t={t} lng={lng} />;
};
