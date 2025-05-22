import { Asset, OrderType } from "@/models";
import { Button, Label, TextInput } from "flowbite-react";

interface OrderFormProps {
  walletId: string;
  asset: Asset;
  type: OrderType;
};

export function OrderForm({ walletId, asset, type }: OrderFormProps) {
  const color = type === OrderType.BUY ? 'text-blue-700' : 'text-red-700';

  return (
    <form action="">
      <input type="hidden" name="walletId" defaultValue={walletId} />
      <input type="hidden" name="assetId" defaultValue={asset._id} />
      <input type="hidden" name="type" defaultValue={type} />
      <div>
        <div className="mb-2">
          <Label htmlFor="shares" value="Quantity" className={color} />
        </div>
        <TextInput
          id="shares"
          name="shares"
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          color={type === OrderType.BUY ? 'info' : 'failure'}
          required
        />
      </div>
      <br />
      <div>
        <div className="mb-2">
          <Label htmlFor="price" value="Price ($)" className={color} />
        </div>
        <TextInput
          id="price"
          name="price"
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          color={type === OrderType.BUY ? 'info' : 'failure'}
          required
        />
      </div>
      <br />
      <Button type="submit" color={type === OrderType.BUY ? 'blue' : 'failure'}>
        {type}
      </Button>
    </form>
  )
}