import { Asset } from "@/models";
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { AssetBox } from "../components/asset-box";

export async function getAssets(): Promise<Asset[]> {
  const response = await fetch(`http://localhost:3000/assets`);
  return response.json();
}

export default async function AssetsPages() {
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
