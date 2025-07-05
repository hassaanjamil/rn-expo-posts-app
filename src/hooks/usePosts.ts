import JsonPlaceHolderService from "../services/JsonPlaceHolderService";
import { PostDto } from "../types/post";

const usePosts = () => {
  const getPosts = async () => {
    try {
      return JsonPlaceHolderService.getPosts<PostDto[]>();
    } catch (error) {
      console.error(error);
    }
  }

  const getPost = async (id: number) => {
    try {
      return JsonPlaceHolderService.getPost<PostDto>(id);
    } catch (error) {
      console.error(error);
    }
  }

  return { getPosts, getPost };
}

export default usePosts;