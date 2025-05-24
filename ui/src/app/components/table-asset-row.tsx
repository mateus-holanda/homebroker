"use client";

import { Asset } from "@/models";
import { useAssetStore } from "@/store";
import { Button, TableCell, TableRow } from "flowbite-react";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { AssetContainer } from "./asset-container";

interface TableAssetRowProps {
  walletId: string;
  asset: Asset;
};

export function TableAssetRow({ walletId, asset }: TableAssetRowProps) {
  const assetFound = useAssetStore(
    useShallow((state) => state.assets.find((a) => a.symbol === asset.symbol))
  );

  const asset_ = assetFound || asset;

  return (
    <TableRow className="rounded-lg border shadow-sm hover:bg-slate-50">
      <TableCell>
        <AssetContainer asset={asset_} />
      </TableCell>
      <TableCell>${asset_.price}</TableCell>
      <TableCell>
        <Button
          as={Link}
          href={`/assets/${asset_.symbol}?wallet_id=${walletId}`}
          color="light"
          className="w-fit shadow-md"
        >
          Buy/Sell
        </Button>
      </TableCell>
    </TableRow>
  )
}