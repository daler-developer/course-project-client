import { AxiosError } from "axios";

export type CollectionTopicType = "animals" | "furniture" | "books";

export interface IUser {
  _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  isBlocked: boolean;
}

export interface IItem {
  _id: string;
  likes_ids: string[];
  creatorId: string;
  fields: {
    integer: { [key: string]: number };
    date: { [key: string]: string };
    text: { [key: string]: string };
    multiLineText: { [key: string]: string };
    boolean: { [key: string]: boolean };
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
