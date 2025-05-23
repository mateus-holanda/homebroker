import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from "flowbite-react";
import Link from "next/link";
import { AssetBox } from "./components/asset-box";
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
            <TableHeadCell>Quantity</TableHeadCell>
            <TableHeadCell>Buy/Sell</TableHeadCell>
          </TableHead>
          <TableBody className="border">
            {wallet.assets.map((walletAsset, key) => (
              <TableRow
                key={`${walletAsset._id}-${key}`}
                className="rounded-lg border shadow-sm hover:bg-slate-50"
              >
                <TableCell>
                  <AssetBox asset={walletAsset.asset} />
                </TableCell>
                <TableCell>${walletAsset.asset.price}</TableCell>
                <TableCell>{walletAsset.shares}</TableCell>
                <TableCell>
                  <Button
                    as={Link}
                    href={`/assets/${walletAsset.asset.symbol}?wallet_id=${walletId}`}
                    color="light"
                  >
                    Buy/Sell
                  </Button>
                </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
