import React, { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import moment from "moment";


export const AllUser = () => {

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(2);
    const [pageCount, setPageCount] = useState(0);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1);
    };

    useEffect(() => {
        const getAllUser = async () => {
            const response = await fetch("http://localhost:3001/user/all_users");
            let data = await response.json();
            data = data.allUsers;
            const slice = data.slice(offset, offset + perPage);

            const postData = slice.map((pd) => (

                <tr key={pd._id}>
                    <td>{pd.name}</td>
                    <td>{pd.email}</td>
                    <td>{pd.gender}</td>
                    <td>{pd.phone}</td>
                    <td>{pd.status}</td>
                    <td>{moment(pd.createdAt).format("DD-MMM-YYYY")}</td>
                </tr>

            ))

            setData(postData);
            setPageCount(Math.ceil(data.length / perPage));
        }
        getAllUser();
    }, [offset, perPage])

    // console.log(users);
    return (
        <div>
            <p>All Users</p>


            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>gender</th>
                        <th>phone</th>
                        <th>status</th>
                        <th>created@</th>
                    </tr>
                </thead>

                <tbody>
                    {data}
                </tbody>

            </table>

            <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"breal-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />


            {/* <table border={"2px"}>
            <thead>
                <tr>
                <th>name</th>
                <th>email</th>
                <th>gender</th>
                <th>phone</th>
                <th>status</th>
                <th>created@</th>
                </tr>
            </thead>
            
            <tbody>
                {   data && ( 
                    data.map((item)=>(
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.gender}</td>
                            <td>{item.phone }</td>
                            <td>{item.status}</td>
                            <td>{item.createdAt}</td>
                        </tr>
                        )
                    ))
                }
            </tbody>
        </table> */}
        </div>
    )
}
