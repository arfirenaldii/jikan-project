const Pagination = (props) => {
  const { currentPage, maxPageLimit, minPageLimit } = props;
  const totalPages = props.totalPages - 1;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevClick = () => {
    props.onPrevClick();
  };

  const handleNextClick = () => {
    props.onNextClick();
  };

  const handlePageClick = (e) => {
    props.onPageChange(Number(e.target.id));
  };

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li
          key={page}
          id={page}
          onClick={handlePageClick}
          className={
            currentPage === page
              ? "active cursor-pointer text-red-500"
              : "cursor-pointer"
          }
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  let pageIncrementEllipses = null;
  if (pages.length > maxPageLimit) {
    pageIncrementEllipses = <li>&hellip;</li>;
  }
  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = <li>&hellip;</li>;
  }

  return (
    <div className={props.className}>
      <ul className="pageNumbers flex gap-3 justify-end">
        <li>
          <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>
            Prev
          </button>
        </li>
        {pageDecremenEllipses}
        {pageNumbers}
        {pageIncrementEllipses}
        <li>
          <button
            onClick={handleNextClick}
            disabled={currentPage === pages[pages.length - 1]}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
