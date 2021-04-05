import { useState, useEffect } from "react";

import TextBox from "./components/TextBox";
import Repos from "./components/Repos";
import Button from "./components/Button";
import Pagination from "./components/Pagination";

import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useQuery } from "urql";

const GET_REPOS = `
  query Repos($username: String!, $first: Int, $last: Int, $before: String, $after: String) {
    user(login: $username) {
      repositories(first: $first, last: $last, before: $before, after: $after) {
        totalCount
        pageInfo {
          startCursor
          hasNextPage
          hasPreviousPage
          endCursor
        }
        edges {
          node {
            id
            name
            url
            shortDescriptionHTML
            isFork
            defaultBranchRef {
              target {
                ... on Commit {
                  committedDate
                }
              }
            }
            issues {
              totalCount
            }
            pullRequests {
              totalCount
            }
          }
        }
      }
    }
  }
`;

const REPOS_PER_PAGE = 5;

const App = () => {
  const history = useHistory();
  const location = useLocation();

  const [username, setUsername] = useState(null);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage?.getItem("dark"))
  );
  const [first, setFirst] = useState(REPOS_PER_PAGE);
  const [last, setLast] = useState(null);
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);

  // Do our query
  const [{ data, fetching, error }, _] = useQuery({
    query: GET_REPOS,
    variables: { username, first, last, before, after },
  });

  const onTextboxFocus = (e) => e.target.select();

  // Set username on first render and enable darkmode
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    setUsername(queryString.parse(location.search).user);
  }, []);

  // Set user query parameter to username
  useEffect(() => {
    const params = new URLSearchParams();

    if (username) params.append("user", username);
    else params.delete("user");

    history.push({ search: params.toString() });
  }, [username, history]);

  const setQueryVars = (first, last, before, after) => {
    setFirst(first);
    setLast(last);
    setBefore(before);
    setAfter(after);
  };

  const onTextboxChange = (e) => {
    setUsername(e.target.value);
    // Reset query vars
    setQueryVars(REPOS_PER_PAGE, null, null, null);
  };

  const nextPage = () =>
    setQueryVars(
      REPOS_PER_PAGE,
      null,
      null,
      data.user.repositories.pageInfo.endCursor
    );

  const prevPage = () =>
    setQueryVars(
      null,
      REPOS_PER_PAGE,
      data.user.repositories.pageInfo.startCursor,
      null
    );

  const pageInfo = data?.user?.repositories?.pageInfo;

  const repos = data?.user?.repositories?.edges;

  const renderRepos = () => {
    if (!username) return null;
    if (fetching) return <p className="text-center">Loading...</p>;
    if (!data?.user)
      return <p className="text-center">User {username} not found.</p>;
    if (repos?.length <= 0)
      return (
        <p className="text-center">{username} has no public repositories.</p>
      );
    return <Repos repos={repos} />;
  };

  const onDarkModeClick = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("dark", false);
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("dark", true);
    }
  };

  return (
    <div className={`mx-auto max-w-3xl p-8 flex flex-col`}>
      <div className="flex flex-row items-center mb-10">
        <h1 className="text-2xl font-bold select-none flex-grow">
          Coding test
        </h1>
        <Button
          text={darkMode ? "☀️" : "🌙"}
          extraClasses="rounded-xl shadow-md"
          onClick={onDarkModeClick}
        />
      </div>
      <TextBox
        value={username || ""}
        onChange={onTextboxChange}
        onFocus={onTextboxFocus}
      />
      <div className="p-2">{renderRepos()}</div>
      <div className="flex justify-center">
        {repos?.length > 0 && (
          <Pagination
            nextPage={pageInfo?.hasNextPage ? nextPage : null}
            prevPage={pageInfo?.hasPreviousPage ? prevPage : null}
          />
        )}
      </div>
    </div>
  );
};

export default App;
