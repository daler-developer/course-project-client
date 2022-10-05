import { AxiosError } from "axios";

export type CollectionTopicType = "animals" | "furniture" | "books";

export interface IUser {
  _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  isBlocked: boolean;
}

export interface ICollection {
  _id: string;
  topic: CollectionTopicType;
  name: string;
  desc: string;
  imageUrl?: string;
  creator: IUser;
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
