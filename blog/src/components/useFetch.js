import { useState, useEffect } from "react";
const useFetch = (url) => {
  /* Data Management */
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  /* Sayfa yüklendikten sonra gelen url bilgisi değiştiğinde çalışan ve şu yaşam döndüleri taklit eden effect işlemi. ( componentDidUpdate - componentWillUnMount) */
  useEffect(() => {
    // Navbar içerisinde sayfalar arasında hızlı geçiş yapılırken verilen hatayı önlemek için kullanırız.
    const abortCont = new AbortController();

    setTimeout(() => {
      //request controlu
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            // error coming back from server
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    // abort the fetch
    return () => abortCont.abort();
  }, [url]);
  /* Bu component dışarıya export edilirken 3 değer döndürür. Veri bilgisi, Durumu, Hatası */
  return { data, isPending, error };
};

export default useFetch;
