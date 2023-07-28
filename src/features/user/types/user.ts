/**
 * This represents a single user.
 */
export type TUser = {
    username: string; // This identifies the user and needs to be unique
    displayName: string; // This is the name that is displayed to other users
    bio: string;
    avatarUrl?: string;
    socials: TUserSocials[];
    location?: string;
}

/**
 * This contains all the variants of social links that a user can have.
 */
export type TUserSocialType = 'email' | 'linkedin' | 'location' | 'company';

/**
 * This represents a single social link of a user.
 */
//TODO: Improve this so url is not required if its a special type like location
export type TUserSocials = {
    type: TUserSocialType;
    label: string;
    url: string;
} | {
    type: 'location';
    label: string;
}