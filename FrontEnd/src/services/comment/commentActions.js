import axios from "../../api/axios";
export const sendComment = async (cardId, comment) => {
  try {
    let data = {
      comment: comment,
    };
    let dataRes = await axios.post(`/comments/${cardId}`, data);
    return dataRes.data.commentNew;
  } catch (error) {
    console.log(error);
  }
};

export const getComment = async (cardId) => {
  let dataComment = await axios.get(`/comments/${cardId}`);
  return dataComment.data.comments;
};
