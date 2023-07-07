//Creates a new blog with POST fetch request to back-end
const bloghandler = async (event) => {
  event.preventDefault();
  //create a fetch post
  //need all the data that we collected from the user by querying the elements
  //title ,text
  const title = document.querySelector("#blog-title").value;
  const content = document.querySelector("#blog-text").value;
  console.log(title, content);

  if (title && content) {
    //
    const response = await fetch("/api/blog/createblog", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      //destructre data
      const { id } = data;
      document.location.replace(`/blog/${id}`);
    } else {
      alert("failed to create blog post");
    }
  }
};
if (document.querySelector("#blogbtn")) {
  document.querySelector("#blogbtn").addEventListener("click", bloghandler);
}
//clicks on the button and then the blog post fields pop up how
//do i get it to display?
const $blogsDivs = document.querySelectorAll(".createdBlog");

if ($blogsDivs.length > 0) {
  const blogsClickable = async (event) => {
    event.preventDefault();
    let blogId = event.currentTarget.dataset.id;
    const response = await fetch("/api/user/status");

    if (response.ok) {
      document.location.replace(`/blog/${blogId}`);
      console.log(
        "blog with id",
        event.currentTarget.dataset.id,
        "is now clickable"
      );
    } else {
      console.log("No blog element");
    }
  };

  $blogsDivs.forEach((blogDiv) => {
    blogDiv.addEventListener("click", blogsClickable);
  });
} else {
  console.log("No blogs found");
}
document.querySelectorAll("textarea").forEach((textarea) => {
  textarea.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

//Once blog is created; Edit button trigger event
const editingBlog = async (event) => {
  event.preventDefault();
  console.log("updatebtn clicked");
  //will need to have this as a variable for all blogs
  const idelement = document.querySelector("#dashboardblog");
  const titleel = document.querySelector("#updatedblogtitle");
  const contentel = document.querySelector("#updatedblogtext");
  //select the elements that will be used for the fetch api
  //we get the blog with the blog id
  if (idelement && titleel && contentel) {
    const id = idelement.dataset.id;
    const parseid = parseInt(id);
    const title = titleel.value;
    const content = contentel.value;

    // const blogidint = parseInt(blogid);
    console.log(parseid, title, content);

    if (parseid && title && content) {
      //fetch api get blog syntax for path may be wrong
      const response = await fetch(`/api/blog/blogupdate/${parseid}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const { id } = data;
        document.location.replace(`/blog/${id}`);
        // blogid}
      } else {
        alert("failed to display blog");
      }
    }
  }
};
if (document.querySelector("#updatebtn")) {
  document.querySelector("#updatebtn").addEventListener("click", editingBlog);
}

// deleting post that was created
const deleteBlog = async (event) => {
  event.preventDefault();
  const idelement = document.querySelector("#dashboardblog");
  if (idelement) {
    const id = idelement.dataset.id;
    const parseid = parseInt(id);
    let response;
    if (parseid) {
      response = await fetch(`/api/blog/blog/${parseid}`, {
        method: "DELETE",
      });
    }
    if (response && response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to delete project");
    }
  }
};

if (document.querySelector("#deletebtn")) {
  document.querySelector("#deletebtn").addEventListener("click", deleteBlog);
}


