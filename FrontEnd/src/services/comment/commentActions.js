import axios from "../../api/axios";
export const sendComment = async (cardId, comment) => {
  try {
    let data = {
      comment: comment,
    };
    let dataRes = await axios.post(`/comments/${cardId}`, data);
    return dataRes.data.commentNew;
  } catch (error) {
    alert(
      "hiện tại chức năng bình luận có 1 sự cố nhỏ chúng tôi sẽ khắc phục sớm nhất "
    );
  }
};

export const getComment = async (cardId) => {
  let dataComment = await axios.get(`/comments/${cardId}`);
  return dataComment.data.comments;
};
