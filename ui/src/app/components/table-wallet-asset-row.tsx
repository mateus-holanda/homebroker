"use client";

import { WalletAsset } from "@/models";
import { useAssetStore } from "@/store";
import { Button, TableCell, TableRow } from "flowbite-react";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { AssetContainer } from "./asset-container";

interface TableWalletAssetRowProps {
  walletId: string;
  walletAsset: WalletAsset;
};

export function TableWalletAssetRow({ walletId, walletAsset }: TableWalletAssetRowProps) {
  const assetFound = useAssetStore(
    useShallow((state) => state.assets.find((a) => a.symbol === walletAsset.asset.symbol))
  );

  const asset = assetFound || walletAsset.asset;

  return (
    <TableRow className="rounded-lg border shadow-sm hover:bg-slate-50">
      <TableCell>
        <AssetContainer asset={asset} />
      </TableCell>
      <TableCell>${asset.price}</TableCell>
      <TableCell>{walletAsset.shares}</TableCell>
      <TableCell>
        <Button
          as={Link}
          href={`/assets/${asset.symbol}?wallet_id=${walletId}`}
          color="light"
          className="w-fit shadow-md"
        >
          Buy/Sell
        </Button>
      </TableCell>
    </TableRow>
  )
}