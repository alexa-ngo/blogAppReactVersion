const BASE_URI = "http://localhost:4000"; // where the backend server is at

const appRoot = document.querySelector("#root");

const App = () => {
  const [currTitle, setCurrTitle] = React.useState("");
  const [currDate, setCurrDate] = React.useState("");
  const [currAuthor, setCurrAuthor] = React.useState("");
  const [currContent, setCurrContent] = React.useState("");
  const [currErrorState, setCurrErrorState] = React.useState("");
  const [currWordLimitErrorState, setCurrWordLimitErrorState] =
    React.useState("");
  const [currInputValue, setCurrInputValue] = React.useState("");

  const onTitleChange = (evt) => {
    const value = evt.target.value;
    setCurrTitle(value);
  };

  const onDateChange = (evt) => {
    const value = evt.target.value;
    setCurrDate(value);
  };

  const onAuthorChange = (evt) => {
    const value = evt.target.value;
    setCurrAuthor(value);
  };

  const onContentChange = (evt) => {
    const value = evt.target.value;
    setCurrContent(value);
  };

  const handleSubmitClick = (evt) => {
    const eachEntry = {
      title: currTitle,
      create_date: currDate,
      author: currAuthor,
      content: currContent,
    };

    fetch(`${BASE_URI}/blogEntry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eachEntry),
    });
    setCurrInputValue(eachEntry);
    resetInputBoxesBlank();
    isErrorMessage();
    countWords(currContent, 15);
  };

  function resetInputBoxesBlank() {
    setCurrTitle("");
    setCurrDate("");
    setCurrAuthor("");
    setCurrContent("");
    setCurrErrorState("");
    setCurrWordLimitErrorState("");
  }

  function countWords(currContent, maxWordsInTextBox) {
    const str = currContent;
    const strTrimmed = str.trim();
    const strResult = strTrimmed.split(" ").length;
    if (strResult > maxWordsInTextBox) {
      setCurrWordLimitErrorState(true);
    }
  }

  function isErrorMessage() {
    if (currTitle === "" || currAuthor === "" || currContent === "") {
      setCurrErrorState(true);
    }
  }

  const titleInputBox = React.createElement("input", {
    className: "titleNameInput",
    type: "text",
    onChange: onTitleChange,
    value: currTitle,
  });

  const dateInputBox = React.createElement("input", {
    className: "dateOfEntryInput",
    type: "text",
    onChange: onDateChange,
    value: currDate,
  });

  const authorInputBox = React.createElement("input", {
    className: "authorInput",
    type: "text",
    onChange: onAuthorChange,
    value: currAuthor,
  });

  const contentInputBox = React.createElement("textarea", {
    className: "contentInput",
    type: "text",
    onChange: onContentChange,
    placeholder: "Please limit the comment to 15 words.",
    value: currContent,
  });

  const blogEntryTitle = React.createElement(
    "div",
    { className: "blogEntryTitle" },
    "Create a Blog Post"
  );
  const titleOfEntry = React.createElement(
    "div",
    { className: "titleOfEntry" },
    "Title of Entry: ",
    titleInputBox
  );
  const titleOfDate = React.createElement(
    "div",
    { className: "titleOfDate" },
    "Date: ",
    dateInputBox
  );
  const titleOfAuthor = React.createElement(
    "div",
    { className: "titleOfAuthor" },
    "Author: ",
    authorInputBox
  );
  const titleOfContent = React.createElement(
    "div",
    { className: "titleContent" },
    "Content: ",
    contentInputBox
  );

  const submitButton = React.createElement(
    "button",
    {
      className: "submitButton",
      onClick: handleSubmitClick,
    },
    "Submit"
  );

  const resetButton = React.createElement(
    "button",
    { className: "resetButton", onClick: resetInputBoxesBlank },
    "Reset"
  );

  const resultDiv = React.createElement("div", {
    className: "result-container",
  });

  const blogEntryFields = React.createElement(
    "div",
    null,
    blogEntryTitle,
    titleOfEntry,
    titleOfAuthor,
    titleOfContent,
    submitButton,
    resetButton,
    resultDiv
  );

  let errorMessageBox = React.createElement("div", { className: "" }, "");

  if (currErrorState === true) {
    errorMessageBox = React.createElement(
      "div",
      { className: "error" },
      "Error Message Box"
    );
  }

  let wordLimitMessageBox = React.createElement("div", { className: "" }, "");

  if (currWordLimitErrorState === true) {
    wordLimitMessageBox = React.createElement(
      "div",
      { className: "wordLimit" },
      "The word limit hs been exceeded."
    );
  }

  const navLinkToHomePage = React.createElement(
    "a",
    { href: "/", className: "homePageNavLink" },
    "Home"
  );
  const homePageDiv = React.createElement(
    "div",
    { className: "homePageDiv" },
    navLinkToHomePage
  );

  return React.createElement(
    "div",
    { className: "blogEntryContainer" },
    homePageDiv,
    errorMessageBox,
    wordLimitMessageBox,
    blogEntryFields
  );
};

const root = ReactDOM.createRoot(appRoot);
root.render(React.createElement(App));
