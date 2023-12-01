import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  fetchProducts() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  apiGetProductsByCatID(cid) {
    axios.get(`/api/customer/products/category/${cid}`).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get(`/api/customer/products/search/${keyword}`).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  renderProducts() {
    return this.state.products.map((item) => (
      <div key={item._id} className="max-w-xs mx-auto mb-8 overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
        <Link to={`/product/${item._id}`}>
          <img
            src={`data:image/jpg;base64,${item.image}`}
            className="w-full h-40 object-cover rounded"
            alt=""
          />
        </Link>
        <div className="text-center mt-2">
          <Link to={`/product/${item._id}`} className="text-blue-500 font-bold">
            {item.name}
          </Link>
          <div className="text-gray-600 dark:text-white font-bold">Price: ${item.price}</div>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="dark:bg-gray-900">
      <div className="container mx-auto text-center dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 dark:text-white">LIST PRODUCTS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {this.renderProducts()}
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(Product);
