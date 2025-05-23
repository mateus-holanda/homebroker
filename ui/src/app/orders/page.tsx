import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { AssetContainer } from "../components/asset-container";
import { OrderStatusBadge } from "../components/order-status-badge";
import { OrderTypeBadge } from "../components/order-type-badge";
import { WalletList } from "../components/wallet-list";
import { getMyWallet, getOrders } from "../queries/queries";

interface OrdersPageProps {
  searchParams: Promise<{ wallet_id: string}>;
};

export default async function OrdersPages({ searchParams }: OrdersPageProps) {
  const { wallet_id: walletId } = await searchParams;
    
  if (!walletId) {
    return <WalletList />;
  }

  const wallet = await getMyWallet(walletId);

  if (!wallet) {
    return <WalletList />;
  }

  const orders = await getOrders(walletId);

  return (
    <div className="flex flex-col flex-grow space-y-5">
      <article className="format">
        <h1>My Orders</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Asset</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Shares</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
          </TableHead>
          <TableBody className="border">
            {orders.map((order, key) => (
              <TableRow key={`${order._id}-${key}`} className="rounded-lg border shadow-sm hover:bg-slate-50">
                <TableCell>
                  <AssetContainer asset={order.asset} />
                </TableCell>
                <TableCell>${order.asset.price}</TableCell>
                <TableCell>{order.shares}</TableCell>
                <TableCell>
                  <OrderTypeBadge type={order.type} />
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
