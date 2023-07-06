//get element div
const $blogDivs = document.querySelectorAll(".homepageBlog");
const blogsClickable = async (event) => {
  let blogId = event.currentTarget.dataset.id;
  const response = await fetch("/api/user/status");
  if (response.ok) {
    // If the response was OK, then the user is logged in.
    document.location.replace(`comment/${blogId}`);
    console.log(
      "blog with id",
      event.currentTarget.dataset.id,
      "is now clickable"
    );
  } else {
    // If the response was not OK, then the user is not logged in. Redirect them to the login page.
    document.location.replace(`login/`);
  }
};
// if person logged in then it can get the blog specifically and
// display on a different page by calling the comment route
// get comment page

//Click functionality applied to all blogs
//Event listener, blogsClickable function follows event
$blogDivs.forEach((blogDiv) => {
  blogDiv.addEventListener("click", blogsClickable);
});

//trigger a login/signup if not signed/logged in
//migrates you to a different page that displays the blogs content with text field
