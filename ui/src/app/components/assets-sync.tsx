"use client";

import { Asset } from "@/models";
import { socket } from "@/socket-io";
import { useAssetStore } from "@/store";
import { useEffect } from "react";

interface AssetsSyncProps {
  assetsSymbols: string[];
};

export function AssetsSync({ assetsSymbols }: AssetsSyncProps) {
  const changeAsset = useAssetStore((state) => state.changeAsset);

  useEffect(() => {
    socket.connect();
    socket.emit('joinAssets', { symbols: assetsSymbols });
    socket.on('assets/price-change', (asset: Asset) => {
      changeAsset(asset);
    });

    return () => {
      socket.emit('leaveAssets', { symbols: assetsSymbols });
      socket.off('assets/price-change');
    };
  }, [assetsSymbols, changeAsset]);

  return null;
}