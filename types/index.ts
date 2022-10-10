import { AxiosError } from "axios";

export type ThemeType = "light" | "dark";

export type LangType = "ru" | "en";

export type CollectionTopicType = "animals" | "furniture" | "books";

export interface IUser {
  _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  isBlocked: boolean;
  theme: ThemeType;
  lang: LangType;
}

export interface ITag {
  _id: string;
  label: string;
}

export interface IItem {
  _id: string;
  name: string;
  likes_ids: string[];
  creatorId: string;
  creator: IUser;
  _collection: ICollection;
  tags: string[];
  fields: {
    integer?: { [key: string]: number };
    date?: { [key: string]: string };
    text?: { [key: string]: string };
    multiLineText?: { [key: string]: string };
    boolean?: { [key: string]: boolean };
  };
}

export interface IComment {
  _id: string;
  text: string;
  creator: IUser;
}

export interface ICollection {
  _id: string;
  topic: CollectionTopicType;
  name: string;
  desc: string;
  imageUrl?: string;
  creator: IUser;
  numItems: number;
  creatorId: string;
  fields: {
    boolean: string[];
    date: string[];
    text: string[];
    multiLineText: string[];
    integer: string[];
  };
}

export type AxiosErrorResponseType = AxiosError<{
  message: string;
}>;

export interface CreateCollectionDto {
  name: string;
  topic: CollectionTopicType;
  desc: string;
  fields: {
    integer: string[];
    date: string[];
    text: string[];
    boolean: string[];
    multiLineText: string[];
  };
  image: File | null;
}
