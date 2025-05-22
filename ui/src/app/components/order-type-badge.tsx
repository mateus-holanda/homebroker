import { OrderType } from "@/models";
import { Badge } from "flowbite-react";

interface OrderTypeBadgeProps {
  type: OrderType;
};

export function OrderTypeBadge({ type }: OrderTypeBadgeProps) {
  return (
    <Badge
      color={type === OrderType.BUY ? 'blue' : 'red'}
      className="w-fit"
    >
      {type.toLowerCase()}
    </Badge>
  )
}