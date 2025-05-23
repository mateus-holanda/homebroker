"use client";

import {
  Navbar as FlowbiteNavbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const searchParams = useSearchParams();
  const walletId = searchParams.get("wallet_id");

  return (
    <FlowbiteNavbar fluid rounded className="border-b shadow-lg">
      <NavbarBrand href="#">
        <Image
          src="/globe.svg"
          alt="Devin Vest logo"
          width={24}
          height={24}
          className="mr-3"
        />
        <span className="text-xl">Devin Vest</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <div className="content-center">
          Hello {walletId?.substring(0, 8)}...
        </div>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <Link href={`/?wallet_id=${walletId}`} passHref legacyBehavior>
          <NavbarLink className="text-xl">Wallet</NavbarLink>
        </Link>
        <Link href={`/assets?wallet_id=${walletId}`} passHref legacyBehavior>
          <NavbarLink className="text-xl">Assets</NavbarLink>
        </Link>
        <Link href={`/orders?wallet_id=${walletId}`} passHref legacyBehavior>
          <NavbarLink href="#" className="text-xl">Orders</NavbarLink>
        </Link>
      </NavbarCollapse>
    </FlowbiteNavbar>
  )
}