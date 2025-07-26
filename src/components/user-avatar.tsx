import type { AvatarProps } from "@radix-ui/react-avatar";
import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { User } from "better-auth";

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, "image" | "name">;
}

export const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
    return (
        <Avatar {...props}>
            {user.image ? (
                <div className="relative aspect-square h-full w-full">
                    <Image
                        fill
                        src={user.image}
                        alt="profile picture"
                        referrerPolicy="no-referrer"
                        loading="eager"
                    />
                </div>
            ) : (
                <AvatarFallback>
                    <span>{user.name.slice(0, 2).toUpperCase()}</span>
                </AvatarFallback>
            )}
        </Avatar>
    );
};
