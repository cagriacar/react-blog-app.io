import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  // url'deki " :id "  bilgisini yakalar ve bunu parametre olarak id objesine aktarırız.
  const { id } = useParams();

  // id bilgisini altından sonra tekrardan id bilgisine göre veri bilgisini alırız.
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const history = useHistory();
  // GET işleminden sonra bu eventimiz o veriyi silmen için Delete request göndeririz. Veri silinir ve bizi  ana sayfamıza yönlendirir.
  const handleClick = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      // anasayfa yönlendirme işlemi.
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
