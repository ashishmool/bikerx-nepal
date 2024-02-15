import * as React from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ListReviews() {
    const navigate = useNavigate();

    const { data, refetch } = useQuery({
        queryKey: ["GET_TESTIMONIALS"],
        queryFn() {
            return axios.get("http://localhost:8080/testimonial/getAll");
        }
    });

    const deleteByIdApi = useMutation({
        mutationKey: ["DELETE_TESTIMONIAL_BY_ID"],
        mutationFn(id) {
            return axios.delete(`http://localhost:8080/testimonial/delete/${id}`);
        },
        onSuccess() {
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
                        <td>{testimonial.testimonialId}</td>
                        <td>{testimonial.title}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '160px' }}>{testimonial.description}</td>
                        <td>{testimonial.fullName}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '80px' }}>{testimonial.designation}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '80px' }}>{testimonial.company}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '80px' , textAlign:'center'}}>{testimonial.reviewRating}</td>
                        <td style={{ textAlign:'center'}}>
                            <button onClick={() => navigate(`/dashboard/testimonial/update/${testimonial.testimonialId}`)}>
                                <EditIcon />
                                Edit
                            </button>
                            <br/><br/>
                            <button onClick={() => deleteByIdApi.mutate(testimonial.testimonialId)}>
                                <DeleteIcon />
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default ListReviews;
