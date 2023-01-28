import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import { API } from '../config';

const Home = ({ categories }) => {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        loadPopular();
    }, []);

    const loadPopular = async () => {
        const response = await axios.get(`${API}/link/popular`);
        console.log(response.data);
        setPopular(response.data);
    };

    const handleClick = async linkId => {
        const response = await axios.put(`${API}/click-count`, { linkId });
        loadPopular();
    };

    const listOfLinks = () =>
        popular.map((l, i) => (
            <div key={i} className="col-md-3 mb-4">
                <div className='col-md-'>
                    <div className='card  p-5'>
                        <div className="col-md-12 d-flex justify-content-center" onClick={() => handleClick(l._id)}>
                            <a href={l.url} target="_blank" className='text-decoration-none'>
                                <h5 className="pt-2 text-center text-decoration-none">{l.title}</h5>
                                <h6 className="pt-2 text-danger" style={{ fontSize: '12px' }}>
                                    {l.url}
                                </h6>
                            </a>
                        </div>

                        <div className="col-md-12 pt-2 d-flex justify-content-center">
                            <span className="pull-right fw-light" style={{ fontSize: '12px' }}>
                                {moment(l.createdAt).fromNow()} by {l.postedBy.name}
                            </span>
                        </div>

                        <div className="col-md-12 d-flex justify-content-center mt-4">
                            <span className="badge text-dark">
                                {l.type} {l.medium}
                            </span>
                            {l.categories.map((c, i) => (
                                <span key={i} className="badge text-success">
                                    {c.name}
                                </span>
                            ))}
                            <span className="badge rounded-pill bg-primary text-white pull-right">{l.clicks} clicks</span>
                        </div>
                    </div>
                </div>
            </div>
        ));

    const listCategories = () =>
        categories.map((c, i) => (
            <Link key={i} href={`/links/${c.slug}`} legacyBehavior>
                <a style={{ border: '1px solid white' }} className=" p-2 col-md-2 text-decoration-none">
                    <div>
                        <div className="row d-sm-flex flex-sm-row">
                            <div className="col-sm-12">
                                <img
                                    src={c.image && c.image.url}
                                    alt={c.name}
                                    style={{ width: '100px', height: 'auto' }}
                                    className="pr-3 rounded-lg"
                                />
                                <p className='text-decoration-none'>{c.name}</p>
                            </div>
                            {/* <div className="col-md-7 d-flex">
                                <p className='text-decoration-none'>{c.name}</p>
                            </div> */}
                        </div>
                    </div>
                </a>
            </Link>
        ));

    return (
        <Layout>
            <div className='container pt-5'>
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="fw-bold">Browse Tutorials</h2>
                        {/* <br /> */}
                    </div>
                </div>

                <div className="row">{listCategories()}</div>

                <div className="row pt-5">
                    <h2 className="fw-bold pb-3">Trending ({popular.length})</h2>
                    {/* {<div className="overflow-hidden">{listOfLinks()}</div>} */}
                </div>
                <div className='row'>
                    {listOfLinks()}
                </div>
            </div>
        </Layout>
    );
};

Home.getInitialProps = async () => {
    const response = await axios.get(`${API}/categories`);
    return {
        categories: response.data
    };
};

export default Home;
