import { trimText } from "@/utils/helper";
import { profile } from "console";
import { FC } from "react";
import { LatestUserProfile } from "../../../utils/types";
import ProfileIcon from "../ProfileIcon";

interface Props {
  users?: LatestUserProfile[];
}

const LatestUserTable: FC<Props> = ({ users }): JSX.Element => {
  return (
    <div>
      <table className="w-full text-left text-primary-dark, dark:text-primary">
        <tbody>
          <tr className="text-left bg-[#1F0309] text-primary min-w-fit text-sm">
            <th className="p-2">Profile</th>
            <th className="p-2">Email</th>
            <th className="p-2">Provider</th>
          </tr>

          {users?.map((profile) => {
            return (
              <tr
                className="border-b border-b-[#F8B8C5] text-sm"
                key={profile.id}
              >
                <td className="py-2">
                  <div className="flex items-center space-x-2">
                    <ProfileIcon
                      nameInitial={profile.name[0].toUpperCase()}
                      image={profile.image}
                    />
                    <p>{trimText(profile.name.toString(), 20)}</p>
                  </div>
                </td>
                <td className="p-2">{profile.email}</td>
                <td className="p-2">{profile.provider}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LatestUserTable;
