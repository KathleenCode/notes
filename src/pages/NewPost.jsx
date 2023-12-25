import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate, redirect, useActionData, Form, Navigate } from "react-router-dom";
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import PostStyles from "./NewPost.module.css";

export default function NewPost() {

    const navigate = useNavigate();
    // const actdat = useActionData();

    //states
    // const [title, setTitle] = useState('');
    // const [summary, setSummary] = useState('');
    const [ show, setShow ] = useState(true);


    // const handleClose = () => navigate("...");
    const handleClose = () => navigate(-1);
    // const handleShow = () => setShow(true);

    // const handleSubmit =async (e) => {
    //     e.preventDefault();
    //     const post = {
    //         title,
    //         summary
    //     }
    //     console.log(post);

    //     try {
    //     const request = await fetch( 'http://localhost:8000/posts', {
    //         method: "POST",
    //         body: JSON.stringify(post),
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     });

    //     if(request.ok) {
    //         console.log(request.json())
    //         // navigate("../");
    //     } 
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form action="create-post" method="POST">
           <Form.Group className="mb-3" controlId="formBasicEmail">
             <Form.Label>Title</Form.Label>
             <Form.Control type="text" placeholder="Enter title" name="title"/>
            <Form.Text className="text-muted">
               We'll never share your title with anyone else.
             </Form.Text>
           </Form.Group>

           <Form.Group className="mb-3" controlId="formBasicPassword">
             <Form.Label>Summary</Form.Label>
             <Form.Control type="text" placeholder="Enter summary" name="summary"/>
            </Form.Group>
           <Form.Group className="mb-3" controlId="formBasicCheckbox">
             <Form.Check type="checkbox" label="Check me out" />
           </Form.Group>
           <Button variant="primary" type="submit">
             Submit
           </Button>
         </Form> */}
         <Form action="/create-post" method="POST">
            <label htmlFor="title">Title</label>
            <br/>
            <input required className={PostStyles.input} type="text" name="title" id="title"/>
            <br/><br/>
            <label htmlFor="summary">Summary</label>
            <br/>
            <input required className={PostStyles.input} type="textarea" row={5} name="summary" id="summary"/>
            <br />
            <div>
                <button type="button" className={PostStyles.cancel_btn} onClick={handleClose}><IoMdCloseCircle />&nbsp;Close</button>
                <button className={PostStyles.add_btn} ><IoIosAddCircleOutline />&nbsp;Save</button>
            </div>
         </Form>
         {/* <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.title)} />
            <input type="text" name="summary" value={summary} onChange={(e) => setSummary(e.target.summary)}/>
         </form> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
        </>
    )
}

// export const newAction = async({request}) => {
//     const newData = await request.formData();
//     const data = {
//         title: newData.get("title"),
//         summary: newData.get("summary")
//     }
//     console.log(data);
//     return redirect('/');
// }

export async function newPostAction({request}) {
    const formData = await request.formData();

    const title = formData.get("title");
    const summary = formData.get("summary");

    console.log(title, summary);

    if(!title) {
      alert("The title is required");
      return null;
    }

    if(!summary) {
      alert("The summary is required");
      return null;
    }

    //checks
    // if(title === '' || summary === '') {
    //     alert("The title or summary field is required");
    //     return null;
    // }
    
    //for it to show on screen
    await fetch('http://localhost:8000/posts', {
        method: "POST",
        body: JSON.stringify({title, summary}),
        headers: {
            'Content-type': 'application/json',
        }
    });
    return redirect('/');
}
