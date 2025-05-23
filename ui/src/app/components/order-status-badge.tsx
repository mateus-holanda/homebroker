import { OrderStatus } from "@/models";
import { Badge } from "flowbite-react";

interface OrderStatusBadgeProps {
  status: OrderStatus;
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  let color: string;

  switch (status) {
    case OrderStatus.PENDING:
      color = 'info';
      break;
    case OrderStatus.OPEN:
      color = 'warning';
      break;
    case OrderStatus.CLOSED:
      color = 'success';
      break;
    case OrderStatus.FAILED:
      color = 'failure';
      break;
  }

  return <Badge color={color} className="w-fit shadow-md">{status}</Badge>
}