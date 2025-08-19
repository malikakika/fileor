import { useTranslation } from "react-i18next";

export default function AnkletsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        {t("products.anklets")}
      </h1>
      <p className="text-center text-lg text-ink">
        {t("products.soon")}
      </p>
    </div>
  );
}
