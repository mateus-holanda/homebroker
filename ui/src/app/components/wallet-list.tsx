import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from "flowbite-react";
import Link from "next/link";
import { getWallets } from "../queries/queries";

export async function WalletList() {
  const wallets = await getWallets();

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <Alert color="failure">No wallet chosen</Alert>
      <article className="format">
        <h1>Existing wallets</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Access</TableHeadCell>
          </TableHead>
          <TableBody>
            {wallets.map((wallet, key) => (
              <TableRow key={`${wallet._id}-${key}`}>
                <TableCell>{wallet._id}</TableCell>
                <TableCell>
                  <Link href={`/?wallet_id=${wallet._id}`}>Access</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}