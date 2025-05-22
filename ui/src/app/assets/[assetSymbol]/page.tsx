import { AssetBox } from "@/app/components/asset-box";
import { OrderForm } from "@/app/components/order-form";
import { TabsItem } from "@/app/components/tabs";
import { Asset, OrderType } from "@/models";
import { Card, Tabs } from "flowbite-react";
import { AssetChart } from "./asset-chart";

interface AssetDashboardPageProps {
  params: Promise<{ assetSymbol: string }>;
  searchParams: Promise<{ wallet_id: string}>;
};

export async function getAsset(symbol: string): Promise<Asset> {
  const response = await fetch(`http://localhost:3000/assets/${symbol}`);
  return response.json();
}

export default async function AssetDashboardPage({ params, searchParams }: AssetDashboardPageProps) {
  const { wallet_id: walletId } = await searchParams;
  const { assetSymbol } = await params;
  const asset = await getAsset(assetSymbol);

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <div className="flex flex-col space-y-2">
        <AssetBox asset={asset} />
        <div className="ml-2 font-bold text-2xl">${asset.price}</div>
      </div>
      <div className="grid grid-cols-5 flex-grow gap-2">
        <div className="col-span-2">
          <Card>
            <Tabs>
              <TabsItem active title={<div className="text-blue-700">Buy</div>}>
                <OrderForm asset={asset} walletId={walletId} type={OrderType.BUY} />
              </TabsItem>
              <TabsItem title={<div className="text-red-700">Sell</div>}>
                <OrderForm asset={asset} walletId={walletId} type={OrderType.SELL} />
              </TabsItem>
            </Tabs>
          </Card>
        </div>
        <div className="col-span-3 flex flex-grow">
          <AssetChart asset={asset} />
        </div>
      </div>
    </div>
  )
}