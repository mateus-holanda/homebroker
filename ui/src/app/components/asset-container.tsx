import { Asset } from "@/models";
import Image from "next/image";

interface AssetContainerProps {
  asset: Asset
}

export function AssetContainer({ asset }: AssetContainerProps) {
  return (
    <div className="flex space-x-2 items-center">
      <div className="content-center">
        <Image
          src={asset.image_url}
          alt={asset.symbol}
          width={30}
          height={30}
        />
      </div>
      <div className="flex gap-3 items-center">
        <span className="text-lg font-semibold">{asset.name}</span>
        <span className="text-xs text-slate-500">{asset.symbol}</span>
      </div>
    </div>
  )
}