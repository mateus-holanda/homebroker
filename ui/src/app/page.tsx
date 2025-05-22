import { Wallet } from "@/models";
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { AssetBox } from "./components/asset-box";

interface MyWalletPageProps {
  searchParams: Promise<{ wallet_id: string}>;
};

export async function getMyWallet(walletId: string): Promise<Wallet> {
  const response = await fetch(`http://localhost:3000/wallets/${walletId}`);
  return response.json();
}

export default async function MyWalletPage({ searchParams }: MyWalletPageProps) {
  const { wallet_id: walletId } = await searchParams;
  const wallet = await getMyWallet(walletId);

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
            <TableHeadCell>Quantity</TableHeadCell>
            <TableHeadCell>Buy/Sell</TableHeadCell>
          </TableHead>
          <TableBody className="border">
            {wallet.assets.map((walletAsset, key) => (
              <TableRow key={`${walletAsset._id}-${key}`} className="rounded-lg border shadow-sm hover:bg-slate-50">
                <TableCell>
                  <AssetBox asset={walletAsset.asset} />
                </TableCell>
                <TableCell>${walletAsset.asset.price}</TableCell>
                <TableCell>{walletAsset.shares}</TableCell>
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
