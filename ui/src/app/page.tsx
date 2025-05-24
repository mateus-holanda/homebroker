import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";
import { AssetsSync } from "./components/assets-sync";
import { TableWalletAssetRow } from "./components/table-wallet-asset-row";
import { WalletList } from "./components/wallet-list";
import { getMyWallet } from "./queries/queries";

interface MyWalletPageProps {
  searchParams: Promise<{ wallet_id: string}>;
};

export default async function MyWalletPage({ searchParams }: MyWalletPageProps) {
  const { wallet_id: walletId } = await searchParams;

  if (!walletId) {
    return <WalletList />;
  }

  const wallet = await getMyWallet(walletId);

  if (!wallet) {
    return <WalletList />;
  }

  return (
    <div className="flex flex-col flex-grow space-y-5">
      <article className="format">
        <h1>My Wallet</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Asset</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Shares</TableHeadCell>
            <TableHeadCell>Buy / Sell</TableHeadCell>
          </TableHead>
          <TableBody className="border">
            {wallet.assets.map((walletAsset, key) => (
              <TableWalletAssetRow
                key={`${walletAsset._id}-${key}`}
                walletId={walletId}
                walletAsset={walletAsset}
              />
              ))}
          </TableBody>
        </Table>
      </div>
      <AssetsSync assetsSymbols={wallet.assets.map((walletAsset) => walletAsset.asset.symbol)} />
    </div>
  );
}
