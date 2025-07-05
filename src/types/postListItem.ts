import { PostDto } from "./post";

export type PostListItemProps = {
  item?: PostDto;
  onPress: (id: number) => void;
};