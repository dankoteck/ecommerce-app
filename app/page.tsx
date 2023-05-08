import CustomersAlsoPurchased from "~/components/CustomersAlsoPurchased";
import PromoSection from "~/components/PromoSection";
import SaleOffProducts from "~/components/SaleOffProducts";
import SectionsStoreFront from "~/components/SectionsStorefront";

export default function Home() {
  return (
    <main className="">
      {/* @ts-expect-error Async Server Component */}
      <PromoSection />
      {/* @ts-expect-error Async Server Component */}
      <SaleOffProducts />
      {/* @ts-expect-error Async Server Component */}
      <SectionsStoreFront />
      {/* @ts-expect-error Async Server Component */}
      <CustomersAlsoPurchased />
    </main>
  );
}
