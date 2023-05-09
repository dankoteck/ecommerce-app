import CustomersAlsoPurchased from "./containers/CustomersAlsoPurchased";
import PerksHeading from "./containers/PerksHeading";
import PromotionBanner from "./containers/PromotionBanner";
import SaleOffProducts from "./containers/SaleOffProducts";
import ShopBySections from "./containers/ShopBySections";
import SuggestedForYou from "./containers/SuggestedForYou";
import WeekendSale from "./containers/WeekendSale";

export default function Home() {
  return (
    <main>
      {/* @ts-expect-error Async Server Component */}
      <PromotionBanner />

      {/* @ts-expect-error Async Server Component */}
      <SaleOffProducts />

      {/* @ts-expect-error Async Server Component */}
      <ShopBySections />

      {/* @ts-expect-error Async Server Component */}
      <CustomersAlsoPurchased />

      {/* @ts-expect-error Async Server Component */}
      <WeekendSale />

      {/* @ts-expect-error Async Server Component */}
      <SuggestedForYou />

      <PerksHeading />
    </main>
  );
}
