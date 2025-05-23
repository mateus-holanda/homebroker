import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { AssetBox } from "../components/asset-box";
import { WalletList } from "../components/wallet-list";
import { getAssets, getMyWallet } from "../queries/queries";

interface AssetsPageProps {
  searchParams: Promise<{ wallet_id: string}>;
};

export default async function AssetsPages({ searchParams }: AssetsPageProps) {
  const { wallet_id: walletId } = await searchParams;
  
  if (!walletId) {
    return <WalletList />;
  }

  const wallet = await getMyWallet(walletId);

  if (!wallet) {
    return <WalletList />;
  }

  const assets = await getAssets();

  return (
    <div className="flex flex-col flex-grow space-y-5">
      <article className="format">
        <h1>Assets</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Asset</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Buy/Sell</TableHeadCell>
          </TableHead>
          <TableBody className="border">
            {assets.map((asset, key) => (
              <TableRow key={`${asset._id}-${key}`} className="rounded-lg border shadow-sm hover:bg-slate-50">
                <TableCell>
                  <AssetBox asset={asset} />
                </TableCell>
                <TableCell>${asset.price}</TableCell>
                <TableCell>
                  <Button color="light">Buy/Sell</Button>
                </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
