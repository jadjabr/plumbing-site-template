// Service catalogue shared by the Services grid and the Quote form dropdown.
// Edit this list when reskinning for a client.
import type { ComponentType } from "react";
import {
  BackflowIcon,
  BuildingIcon,
  ClipboardCheckIcon,
  DrainIcon,
  DropletIcon,
  FaucetIcon,
  FilterIcon,
  GaugeIcon,
  HardHatIcon,
  HomeIcon,
  PipeIcon,
  SewerIcon,
  SirenIcon,
  SumpPumpIcon,
  WaterHeaterIcon,
} from "../components/icons";

export type IconType = ComponentType<{ className?: string }>;
export type Service = {
  icon: IconType;
  name: string;
  description: string;
  // A featured card spans the full row and carries a call button.
  featured?: boolean;
};

export const categories: {
  id: "residential" | "commercial";
  label: string;
  icon: IconType;
  services: Service[];
}[] = [
  {
    id: "residential",
    label: "Residential",
    icon: HomeIcon,
    services: [
      {
        icon: SirenIcon,
        name: "Emergency Plumbing",
        description:
          "Burst pipe, flooding or no water? A licensed plumber at your door fast, any hour of the day or night.",
        featured: true,
      },
      {
        icon: DropletIcon,
        name: "Leak Repair",
        description:
          "Find and fix hidden leaks before they turn into water damage.",
      },
      {
        icon: DrainIcon,
        name: "Drain Cleaning",
        description:
          "Clear slow and clogged drains, from kitchen sinks to main lines.",
      },
      {
        icon: WaterHeaterIcon,
        name: "Water Heater Installation & Repair",
        description: "Tank and tankless units repaired, replaced or upgraded.",
      },
      {
        icon: PipeIcon,
        name: "Pipe Repair & Replacement",
        description:
          "Burst, corroded or frozen pipes fixed, up to full re-pipes.",
      },
      {
        icon: FaucetIcon,
        name: "Toilet & Fixture Installation",
        description:
          "Toilets, faucets, sinks and showers installed right the first time.",
      },
      {
        icon: SumpPumpIcon,
        name: "Sump Pump Service",
        description:
          "Install, test and repair sump pumps to keep your basement dry.",
      },
    ],
  },
  {
    id: "commercial",
    label: "Commercial",
    icon: BuildingIcon,
    services: [
      {
        icon: SewerIcon,
        name: "Commercial Drain & Sewer",
        description:
          "Camera inspection, jetting and line repair that keep you operating.",
      },
      {
        icon: BackflowIcon,
        name: "Backflow Prevention",
        description:
          "Backflow testing, installation and repair to stay code-compliant.",
      },
      {
        icon: GaugeIcon,
        name: "Water Heater & Boiler Systems",
        description:
          "High-capacity water heaters and boilers serviced and installed.",
      },
      {
        icon: FilterIcon,
        name: "Grease Trap Services",
        description:
          "Installation, cleaning and repair for restaurants and kitchens.",
      },
      {
        icon: ClipboardCheckIcon,
        name: "Plumbing Maintenance Contracts",
        description:
          "Scheduled inspections that catch problems before they cause downtime.",
      },
      {
        icon: HardHatIcon,
        name: "New Construction Plumbing",
        description:
          "Rough-in to final fixtures, coordinated with your build schedule.",
      },
    ],
  },
];
