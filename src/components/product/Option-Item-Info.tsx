import { OptionItem } from "@/types/product";
import { TableCell, TableRow } from "../ui/table";

type Props = {
  item: OptionItem;
};

export default function OptionItemInfo({ item }: Props) {
  return (
    <TableRow className="border-primary-100 hover:bg-primary-100 border-b">
      <TableCell className="min-w-14 font-medium">{item.name}</TableCell>
      <TableCell className="text-sub-text w-full break-words whitespace-normal">{item.description}</TableCell>
    </TableRow>
  );
}
