import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product`, {
          params: {
            search,
            page,
            limit: limit === -1 ? null : limit,
          },
        });

        if (Array.isArray(response.data.data.result)) {
          setProducts(response.data.data.result);
          setTotalPages(response.data.data.totalPages);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [search, page, limit]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>Product List</h1>
          <div className="row d-flex">
            <div className="col-md-2 d-flex mb-3">
              <label htmlFor="limit" className="form-label mt-3">
                Show:
              </label>
              <select
                id="limit"
                className="form-select ms-2 bg-dark text-white m-3"
                value={limit}
                onChange={handleLimitChange}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="col-md-10 d-flex justify-content-end">
              <input
                type="text"
                className="form-control w-25 bg-dark text-white custom-placeholder m-3"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12 table-responsive">
              <table className="table table-bordered table-dark">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Screen_size</th>
                    <th>Color</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <td>{(page - 1) * limit + index + 1}</td>
                      <td>{product.brand}</td>
                      <td>{product.model}</td>
                      <td>{product.screen_size}</td>
                      <td>{product.color}</td>
                      <td>{product.price}</td>
                      <td>
                        <button className="btn btn-secondary">
                          Detail Product
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-end align-items-center mt-3">
                <div>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                  >
                    <FaChevronLeft /> Previous
                  </button>
                  <span className="me-2">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="btn btn-secondary"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                  >
                    Next <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
