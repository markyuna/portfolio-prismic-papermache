"use client";

import React, { useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ContentList from "./ContentList";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

const ContentIndex = ({ slice }: ContentIndexProps) => {
  const [items, setItems] = useState<any[]>([]);
  const contentType = slice.primary.content_type ?? "Blog";

  useEffect(() => {
    const fetchContent = async () => {
      const client = createClient();
      const data =
        contentType === "Blog"
          ? await client.getAllByType("blog_post")
          : await client.getAllByType("project");
      setItems(data);
    };

    fetchContent();
  }, [contentType]);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="md" className="mb-8">
        {slice.primary.heading}
      </Heading>

      {slice.primary.description && (
        <div className="prose-md prose prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}

      <ContentList
        items={items}
        contentType={contentType}
        viewMoreText={slice.primary.view_more_text}
        fallbackItemImage={slice.primary.fallback_item_image}
      />
    </Bounded>
  );
};

export default ContentIndex;
