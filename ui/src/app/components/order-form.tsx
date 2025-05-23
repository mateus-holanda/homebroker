"use client";

import { Asset, Order, OrderType } from "@/models";
import { socket } from "@/socket-io";
import { Button, Label, TextInput } from "flowbite-react";
import { FormEvent } from "react";
import { toast } from "react-toastify";

interface OrderFormProps {
  walletId: string;
  asset: Asset;
  type: OrderType;
};

export function OrderForm({ walletId, asset, type }: OrderFormProps) {
  const color = type === OrderType.BUY ? 'text-blue-700' : 'text-red-700';

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    socket.connect();
    const newOrder: Order = await socket.emitWithAck("orders/create", data);

    toast(
      `Order of type ${newOrder.type} of ${newOrder.shares} ${asset.symbol} shares created successfully!`,
      { type: "success", theme: "colored", position: "top-right" },
    );
  }

  return (
    <form onSubmit={onSubmit}>
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
      <Button
        type="submit"
        className="shadow-md"
        color={type === OrderType.BUY ? 'blue' : 'failure'}
      >
        {type}
      </Button>
    </form>
  )
}