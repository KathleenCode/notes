import { useNavigate, useNavigation } from "react-router-dom";
import { IoTrashBinOutline } from "react-icons/io5";
import { CiPen } from "react-icons/ci";
import { Modal } from "react-bootstrap";
// import { Form } from "react-bootstrap";
import { useState } from "react";
import PostStyles from "./NewPost.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";



export default function Post({ post }) {

    const route = useNavigate();
    const navigation = useNavigation();

    const [ show, setShow ] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [summary, setSummary] = useState(post.summary);

    
    // const handleClose = () => navigate(-1);
    const handleClose = () => useState(false);
    const handleOpen = () => setShow(true);

    async function updtPost(id) {
      try {
         await new Promise((resolve, reject) => 
         setTimeout(resolve("resolved"), 6000));
        const request = await fetch(`http://localhost:8000/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({title, summary}),
            headers: {
                "Content-type": "application/json"
            }
        });

        handleClose();
        route("/");

        if(!request.ok) throw Error("post could not be updated");

    } catch(err) {
        console.log(err);
    }
    }

    async function delPost(id) {
        if( confirm('are you sure you want to delete')) {
        try {
        await fetch(`http://localhost:8000/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        });

        route("/");
    } catch(err) {
        console.log(err)
    }
    } }

    {
        if(navigation.state === 'loading') {
            return (
            <div style={{fontSize: "3rem", color: "red", margin: "0 auto"}}>Loading ... </div>
            );
        }
    }

  return (
    <>
    <div style={{backgroundColor: "#654E92", padding: "1rem 3rem", borderRadius: "5px", margin: "1rem", width: "25%", position: "relative"}}>
        <CiPen size={33} 
          // onClick={() => updtPost(post.id)} 
          onClick={handleOpen} 
          style={{position: "absolute", right: "57px", top: "10px", color: "#FF6969"}}/>
       
        <IoTrashBinOutline onClick={() => delPost(post.id)} size={29} style={{position: "absolute", right: "10px", top: "10px", color: "#FF6969"}} />
         <p>{post.title}</p>
         <p>{post.summary}</p>
    </div>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
         <form>
            <label htmlFor="title">Title</label>
            <br/>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required className={PostStyles.input} type="text" name="title" id="title"/>
            <br/><br/>
            <label htmlFor="summary">Summary</label>
            <br/>
            <input value={summary} onChange={(e) => setSummary(e.target.value)} required className={PostStyles.input} type="textarea" row={5} name="summary" id="summary"/>
            <br />
            <div>
                <button type="button" className={PostStyles.cancel_btn} onClick={handleClose}><IoMdCloseCircle />Close</button>
                <button className={PostStyles.add_btn} onClick={() => updtPost(post.id)} ><IoIosAddCircleOutline />Save Changes</button>
            </div>
         </form>

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
