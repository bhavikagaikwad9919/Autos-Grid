import PageLink from "./PageLink";
import "./Pagination.css";

export type Props = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  totalItemsOnPage: number;
  from: number;
  to: number;
  total: number;
  message: string;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  lastPage,
  setCurrentPage,
  totalItemsOnPage,
  from,
  to,
  total,
  message,
}: Props) {
  return (
    <>
      <div className="flex space-x-10 justify-end bg-white items-center px-4">
        <span className="text-slate-500 text-sm ">
          {message}: {totalItemsOnPage}
        </span>
        <span className="text-slate-500 text-sm">
          {from} - {to} of {total}
        </span>
        <nav className="pagination" aria-label="Pagination">
          <PageLink
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            <i className="fa-solid fa-angles-left self-center"></i>
          </PageLink>

          <PageLink
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className="fa-solid fa-chevron-left self-center"></i>
          </PageLink>

          <PageLink
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <i className="fa-solid fa-chevron-right self-center"></i>
          </PageLink>
          <PageLink
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage(lastPage)}
          >
            <i className="fa-solid fa-angles-right self-center"></i>
          </PageLink>
        </nav>
      </div>
    </>
  );
}
