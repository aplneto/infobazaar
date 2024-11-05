import { useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { AxiosResponse } from "axios";

interface Prop {
  username?: string;
}

type UserProfile = {
  id: number;
  user: string;
  avatar: string;
  bio: string;
  active: boolean;
};

export function RoundAvatar({ username }: Prop) {
  const [profile, setProfile] = useState<UserProfile>({
    id: -1,
    user: "",
    avatar: "",
    bio: "",
    active: false,
  });

  AxiosInstance.get<UserProfile>(`profile/${username}/`).then(
    (response: AxiosResponse) => {
      setProfile({ ...profile, ...response.data });
    }
  );

  return (
    <img
      src={profile.avatar}
      alt={username}
      className="rounded-circle me-3"
      width="50"
      height="50"
    />
  );
}
