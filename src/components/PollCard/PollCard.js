import { Link } from "react-router-dom";
import moment from "moment";

import { buttonClasses } from "../../common/button";
import { routes } from "../../constants/routes";

export const PollCard = ({ poll }) => {
  return (
    <div className="poll-preview_container | border border-gray-200 rounded">
      <div className="poll-preview_content | p-3 text-center border-b border-b-gray-200">
        <p className="font-semibold text-xl mb-0">{poll.author}</p>
        <p className="text-sm text-gray-400 font-thin">
          {moment(new Date(poll.timestamp)).format("h:mmA | MM/DD/YYYY")}
        </p>
      </div>

      <div className="poll-preview_footer | p-3">
        <Link
          to={`${routes.poll}/${poll.id}`}
          className={buttonClasses.greenOutlined + " block w-full"}
        >
          Show
        </Link>
      </div>
    </div>
  );
};
