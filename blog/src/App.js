import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./components/Create";
import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header */}
        <Navbar />
        {/* Content - Main */}
        <div className="content">
          {/* Sayfa içi yönlendirmeler için react-router-dom kullandık. */}
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            {/* sayfa url isteğinin dışında yazılan url bilgisini bu sayfaya yönlendirmek için ' * ' kullandık.*/}
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
