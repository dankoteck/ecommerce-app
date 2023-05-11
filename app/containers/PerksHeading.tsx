import Image from "next/image";

const availablePerks = [
  {
    title: "Free returns",
    description:
      "Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.",
    image: "https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg",
  },
  {
    title: "Same day delivery",
    description:
      "We offer a delivery service that has never been done before. Checkout today and receive your products within hours.",
    image: "https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg",
  },
  {
    title: "All year discount",
    description: `Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.`,
    image:
      "https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg",
  },
  {
    title: "For the planet",
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
    image: "https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg",
  },
];

export default function PerksHeading() {
  return (
    <section
      aria-labelledby="perks-heading"
      className="bg-slate-50 border-y border-y-slate-200"
    >
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <h2
          id="perks-heading"
          className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0"
        >
          Our perks
        </h2>
        {/* Title */}
        <h2 className="text-2xl font-normal text-center">
          Our Perks, just for you
        </h2>

        {/* List of perks */}
        <div className="px-4 mx-auto mt-10 max-w-7xl ">
          <div className="grid grid-cols-1 min-[1100px]:grid-cols-4 md:grid-cols-2 md:gap-6 gap-y-12 ">
            {availablePerks.map((perk) => (
              <div
                key={perk.title}
                className="text-center lg:text-left lg:gap-4 lg:flex min-[1100px]:text-center min-[1100px]:block lg:items-start"
              >
                {/* Illustrator */}
                <div className="relative flow-root mx-auto w-28 h-28 lg:flex-shrink-0">
                  <Image
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center w-full h-full"
                    src={perk.image}
                    alt="Perk illustration"
                  />
                </div>

                <div className="mt-6 lg:mt-2 min-[1100px]:mt-6">
                  <h3>{perk.title}</h3>
                  <p className="mt-3 text-sm text-slate-500">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
