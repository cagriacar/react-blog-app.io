import useFetch from "./useFetch";
import BlogList from "./BlogList";
const Main = () => {
  const {
    error,
    isPending,
    data: blogs,
  } = useFetch("http://localhost:8000/blogs");
  return (
    <div className="main">
      {/* && tek true olup olmadığını kontrol eden operatordur. Bu arada obje olarak oluşturduğumuz veri bilgilerimizi kontorl ediyoruz. Önce Hata Controlu, sonra fetch durumu, Veri bilgisi */}
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Main;
