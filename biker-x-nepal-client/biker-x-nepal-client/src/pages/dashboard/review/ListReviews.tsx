import * as React from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Stars} from "@mui/icons-material";
import {Rate} from "antd";

function ListReviews() {
    const navigate = useNavigate();

    const { data, refetch } = useQuery({
        queryKey: ["GET_TESTIMONIALS"],
        queryFn() {
            return axios.get("http://13.48.249.115:8080/testimonial/getAll");
        }
    });

    const deleteByIdApi = useMutation({
        mutationKey: ["DELETE_TESTIMONIAL_BY_ID"],
        mutationFn(id) {
            return axios.delete(`http://13.48.249.115:8080/testimonial/delete/${id}`);
        },
        onSuccess() {
            toast.success('Review Delete Success');
            refetch();
        }
    });

    return (
        <>
            <table border={1} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Full Name</th>
                    <th>Designation</th>
                    <th>Company</th>
                    <th style={{ wordWrap: 'break-word', maxWidth: '80px' , textAlign:'center'}}>Review Rating</th>
                    <th style={{ textAlign:'center'}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {data?.data.map((testimonial) => (
                    <tr key={testimonial.testimonialId} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ wordWrap: 'break-word', maxWidth: '30px' }}>{testimonial.testimonialId}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '80px' }}>{testimonial.title}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '80px' }}>{testimonial.description}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '50px' }}>{testimonial.fullName}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '50px' }}>{testimonial.designation}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '50px' }}>{testimonial.company}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '50px' , textAlign:'center'}}>

                            <Rate
                                value={testimonial.reviewRating}
                                disabled={true}
                                className="justify-evenly block text-center"
                            />

                            </td>
                        <td style={{ textAlign:'center'}}>
                            <button onClick={() => navigate(`/dashboard/testimonial/update/${testimonial.testimonialId}`)}>
                                <EditIcon />
                                Edit
                            </button>
                            <button onClick={() => deleteByIdApi.mutate(testimonial.testimonialId)}>
                                <DeleteIcon />
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
                <ToastContainer/>
            </table>
        </>
    );
}

export default ListReviews;
