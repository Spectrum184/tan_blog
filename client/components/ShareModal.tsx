import { FC } from "react";
import {
  LinkedinShareButton,
  LinkedinIcon,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

type PropTypes = {
  url: string;
};

const BLOG_URL = process.env.BLOG_URL || "http://localhost:3000";

const ShareModal: FC<PropTypes> = ({ url }) => {
  return (
    <div className="flex items-center">
      <div className="hidden md:block">Chia sẻ: </div>
      <FacebookShareButton className="ml-1" url={`${BLOG_URL}/${url}`}>
        <FacebookIcon round={true} size={32} />
      </FacebookShareButton>
      <TwitterShareButton className="m-1" url={`${BLOG_URL}/${url}`}>
        <TwitterIcon round={true} size={32} />
      </TwitterShareButton>
      <LinkedinShareButton url={`${BLOG_URL}/${url}`}>
        <LinkedinIcon round={true} size={32} />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareModal;
