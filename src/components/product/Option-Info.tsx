import { OptionCategory } from "@/types/product";
import { Table, TableBody } from "../ui/table";
import OptionItemInfo from "./Option-Item-Info";

type Props = {
  option: OptionCategory;
};

export default function OptionInfo({ option }: Props) {
  return (
    <div>
      <div className="flex flex-row items-center gap-4">
        <p className="f20 text-sub-text">{option.name}</p>
        {option.required ? <div className="text-primary-300 f16">필수 선택</div> : null}
        {option.multiple ? <div className="text-primary-300 f16">복수 선택 가능</div> : null}
      </div>
      <div className="mt-2 w-full overflow-hidden rounded-md">
        <Table className="w-full table-auto">
          <TableBody>
            {option.items.map((item) => (
              <OptionItemInfo key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
