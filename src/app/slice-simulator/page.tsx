"use client";
import { SliceSimulator } from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices";

const SliceZoneComponent = (props: any) => (
  <SliceZone {...props} components={components} />
);

export default function SliceSimulatorPage() {
  return <SliceSimulator background="#121b2f" sliceZone={SliceZoneComponent} />;
}
