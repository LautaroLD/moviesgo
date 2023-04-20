export type userSession = {
  avatar: Avatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

export type Avatar = {
  gravatar: Gravatar;
  tmdb: Tmdb;
};

export type Gravatar = {
  hash: string;
};

export type Tmdb = {
  avatar_path: null;
};
