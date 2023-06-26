const BASE_URI = "http://localhost:4000"; // where the backend is at

const appRoot = document.querySelector("#root");

const App = () => {
  const [currentListOfBlogEntries, setCurrentListOfBlogEntries] =
    React.useState([]);
  const [currentBlogElements, setCurrentBlogElements] = React.useState(null);

  React.useEffect(() => {
    // http://localhost:4000/blogEntry/all/list
    fetch(`${BASE_URI}/blogEntry/all/list`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCurrentListOfBlogEntries(json);
      });
  }, []);

  React.useEffect(() => {
    if (!currentListOfBlogEntries.length) {
      return;
    }

    const blogEntryElements = currentListOfBlogEntries.map((blogEntry) => {
      const nameHeader = React.createElement(
        "h2",
        { className: "nameHeader" },
        `${blogEntry.title}`
      );

      const dateDiv = React.createElement(
        "div",
        { className: "dateDiv" },
        `Date: ${blogEntry.create_date}`
      );

      const authorDiv = React.createElement(
        "div",
        { className: "authorDiv" },
        `Author: ${blogEntry.author}`
      );

      const contentDiv = React.createElement(
        "div",
        { className: "contentDiv" },
        `Content: ${blogEntry.content}`
      );

      const wrapper = React.createElement(
        "div",
        { className: "blogEntry-wrapper", key: `blogEntry-${blogEntry.id}` },
        nameHeader,
        dateDiv,
        authorDiv,
        contentDiv
      );
      return wrapper;
    });

    setCurrentBlogElements(blogEntryElements);
  }, [currentListOfBlogEntries, setCurrentBlogElements]);

  // THE FINAL DIV

  const blogEntryTitleH1 = React.createElement(
    "h1",
    { className: "blogEntryListHeader" },
    "Blog Entries"
  );

  const linkToCreatePage1 = React.createElement(
    "a",
    {
      href: "http://localhost:3000/create.html",
      className: "navToCreatePage1",
    },
    "Create Post"
  );

  const linkToCreatePage2 = React.createElement(
    "a",
    {
      href: "http://localhost:3000/create.html",
      className: "navToCreatePage2",
    },
    "Another Page Location"
  );

  const liElement = React.createElement(
    "li",
    { className: "liElement" },
    linkToCreatePage1,
    linkToCreatePage2
  );

  const navigationBar = React.createElement(
    "ul",
    { className: "navigationBar" },
    liElement
  );

  return React.createElement(
    "div",
    { className: "blogEntry-container" },
    navigationBar,
    blogEntryTitleH1,
    currentBlogElements
  );
};

const root = ReactDOM.createRoot(appRoot);
root.render(React.createElement(App));
