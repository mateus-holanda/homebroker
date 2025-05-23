import { AssetContainer } from "@/app/components/asset-container";
import { OrderForm } from "@/app/components/order-form";
import { TabsItem } from "@/app/components/tabs";
import { WalletList } from "@/app/components/wallet-list";
import { OrderType } from "@/models";
import { Card, Tabs } from "flowbite-react";
import { getAsset, getMyWallet } from "../../queries/queries";
import { AssetChart } from "./asset-chart";

interface AssetDashboardPageProps {
  params: Promise<{ assetSymbol: string }>;
  searchParams: Promise<{ wallet_id: string}>;
};

export default async function AssetDashboardPage({ params, searchParams }: AssetDashboardPageProps) {
  const { wallet_id: walletId } = await searchParams;
    
  if (!walletId) {
    return <WalletList />;
  }

  const wallet = await getMyWallet(walletId);

  if (!wallet) {
    return <WalletList />;
  }

  const { assetSymbol } = await params;
  const asset = await getAsset(assetSymbol);

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <div className="flex flex-col space-y-2">
        <AssetContainer asset={asset} />
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