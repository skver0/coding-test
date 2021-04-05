const Repos = ({ repos }) => {
  const reformatDate = (dateString) => {
    let date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <>
      {repos.map(({ node: repo }) => {
        const committedDate = repo?.defaultBranchRef?.target?.committedDate;

        return (
          <div
            key={repo.id}
            className="mb-2 p-3 rounded-xl shadow-md bg-white dark:bg-gray-800"
          >
            <a href={repo.url} className="block text-blue-600 hover:underline">
              {repo.name}
            </a>
            <p
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: repo.shortDescriptionHTML }}
            />
            <p>Is it a fork? {repo.isFork ? "✔" : "❌"}</p>
            <p className="flex flex-wrap text-gray-500">
              <span className="mr-4">
                {committedDate
                  ? `Last commit at ${reformatDate(committedDate)}`
                  : "No commits"}
              </span>
              <span className="mr-4">{repo.issues.totalCount} issues</span>
              <span>{repo.pullRequests.totalCount} pull requests</span>
            </p>
          </div>
        );
      })}
    </>
  );
};

export default Repos;
