
export default function PaginationLinks({meta, onPageClick}) {

  function onClick(ev, link){
    ev.preventDefault();
    if(!link.url) return;
    onPageClick(link);
  }


  return (
    <div className="d-flex align-items-center justify-content-between px-4 py-3 mt-4 shadow-sm">
      <div className="d-flex justify-content-between w-100 d-sm-none">
        <a
          href="#"
          onClick={ev => onClick(ev, meta.links[0])}
          className="btn btn-outline-secondary btn-sm"
        >
          Previous
        </a>
        <a
          href="#"
          onClick={ev => onClick(ev, meta.links[meta.links.length - 1])}
          className="btn btn-outline-secondary btn-sm ml-3"
        >
          Next
        </a>
      </div>
      <div className="d-none d-sm-flex align-items-center justify-content-center w-100">
        <div>
          {meta.total > meta.per_page &&
          <nav aria-label="Pagination" className="pagination">
            {meta.links && meta.links.map((link, ind) => (
              <a
                dangerouslySetInnerHTML={{__html: link.label}}
                onClick={ev => onClick(ev, link)}
                href="#"
                key={ind}
                aria-current="page"
                className={'page-link ' + (link.active ? 'active ' : '') + (ind === 0 ? 'rounded-l ': '') + (ind === meta.links.length - 1 ? 'rounded-r ' : '')}
              >
              </a>
            ))}
          </nav>
          }
        </div>
      </div>
    </div>

  )
}
