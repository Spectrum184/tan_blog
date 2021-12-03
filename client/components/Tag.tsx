import Link from "next/link";
import cn from "classnames";

import { FC } from "react";

type PropTypes = {
  tag: string;
  isLayout: boolean;
};

const Tag: FC<PropTypes> = ({ tag, isLayout }) => {
  return (
    <span
      className={cn(
        "m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 text-sm leading-loose cursor-pointer",
        {
          "font-bold": isLayout,
        },
      )}
    >
      <Link href={`/tag/${tag}`}>
        <a>#{tag}</a>
      </Link>
    </span>
  );
};

export default Tag;
