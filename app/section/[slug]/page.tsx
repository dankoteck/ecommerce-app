import { Metadata } from "next";

import { getAttributes, getSectionPage } from "~/app/actions";
import Breadcrumbs from "~/app/components/Breadcrumbs";
import { getIdFromSlugify } from "~/utils";
import Products from "./Products";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const id = getIdFromSlugify(params.slug);
  const section = await getSectionPage(id);
  return { title: section?.name };
}

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const sectionId = getIdFromSlugify(params?.slug);
  const section = await getSectionPage(sectionId);
  const attributes = await getAttributes();
  const breadcrumbItems = [
    { title: "Home", path: "/" },
    { title: "Sections", path: "/sections" },
    { title: section?.name, path: `/section/${section?.slug}` },
  ];

  const filters = attributes.map((attr) => ({
    id: attr.id,
    label: attr.name,
    value: attr.value,
  }));

  return (
    <div className="max-w-2xl px-4 mx-auto lg:max-w-7xl sm:px-6 lg:px-8">
      <div className="py-4 border-b boder-b-slate-200">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <Products filters={filters} section={section} />
    </div>
  );
}
