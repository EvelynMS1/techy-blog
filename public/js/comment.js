//Gets the input field and event listens on the button comment
const commentBtn = document.querySelector("#blogbtn");
//add the comment to the database

const comment = async () => {
  console.log("comment pressed");
  const inputComment = document.querySelector("#blog-text-comment").value;
  console.log(inputComment);

  const blogId = document.querySelector("#blogComment");

  const id = parseInt(blogId.dataset.id);
  console.log(id);
  const userId = parseInt(blogId.dataset.user_id);
  console.log(userId);

  if (inputComment && id && userId) {
    const response = await fetch(`/api/comments/createComment/${id}`, {
      method: "POST",
      body: JSON.stringify({
        comment: inputComment,
        user_id: userId,
        blog_id: id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();

      console.log(data);
      const { blog_id } = data;
      //same location of comment blog
      document.location.replace(`/comment/${blog_id}`);
      // document.location.replace(`/newComment/${id}`);
    } else {
      alert(response.statusText);
    }
  }
};

//Event Listener
commentBtn.addEventListener("click", comment);
