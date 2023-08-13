import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Write=(props)=>{

const [click,setClick]=useState("");
  

const navigate=useNavigate();

    const formik=useFormik({
        initialValues:{
            title:"",text:"",topic:"",image:''
        },
        onSubmit:(values,SubmitProps)=>{
 
          const imageInput = document.getElementById('image_input');
          const file = imageInput.files[0];
          const formData = new FormData();
          formData.append('image', file);
          formData.append('title',values.title);
          formData.append('text',values.text);
          formData.append('topic',values.topic);
          
          if(click=="create")
          {
            fetch("http://127.0.0.1:3000/create", { method: "POST",
            headers: {
              'Authorization':localStorage.Authorization
              },
            body : formData
            })
  .then(response => {
    return response.json()} )
  .then(data => {
    console.log(data);
    SubmitProps.resetForm();
    props.setCreate(false);
    // navigate('/mypost');
  
  })
  .catch(error => {
    console.error('Error:', error);
    if(error=="Sign up or login")
    {
        navigate('/login');
    }
  });
          }
          else
          {
            fetch("http://127.0.0.1:3000/create_draft", { method: "POST",
            headers: {
              'Content-Type': 'application/json',
        
              'Authorization':localStorage.Authorization
              },
            body : JSON.stringify({
              title:formik.values.title,
              topic:formik.values.topic,
              text:formik.values.text
            })
            })
        .then(response => {
        return response.json()} )
        .then(data => {
        console.log(data);
        formik.resetForm();
        props.setCreate(false);
        })
        .catch(error => {
        console.error('Error:', error);
        });
          }

         


        },
        validationSchema:Yup.object({
            topic:Yup.string().required("Required"),
            title:Yup.string().required("Required"),
            // image:Yup.string().required("Required"),
            text:Yup.string().required("Required")
            
        })
    })


    return (
        <div>
        <form onSubmit={formik.handleSubmit}>
          <div className='newpost'>
          <div className='field'>
          <label for="title">Title</label>
          <input type="text" placeholder="Enter the title" name="title" onBlur={formik.handleBlur} value={formik.values.title} onChange={formik.handleChange}  />
          {formik.touched.title && formik.errors.title?<div className='error'>{formik.errors.title}</div>:null}
          </div>

          <div className='field'>
          <label for="topic">Topic</label>
          <input type="text" placeholder="Enter the topic" name="topic" onBlur={formik.handleBlur} value={formik.values.topic} onChange={formik.handleChange} />
            {formik.touched.topic && formik.errors.topic?<div className='error'>{formik.errors.topic}</div>:null}
            </div>


            <div className='field'>
          <label for="image">Image</label>
          <input type="file" accept="image/*" id='image_input' placeholder="Enter the image url" name="image" onBlur={formik.handleBlur}   />
          </div>

          <div className='field'>
          <label for="text">Text</label>
          <textarea rows="10" cols="100" type="text" placeholder="Enter the text" name="text" onBlur={formik.handleBlur} value={formik.values.text} onChange={formik.handleChange}  />
          {formik.touched.text && formik.errors.text?<div className='error'>{formik.errors.text}</div>:null}
          </div>

          <div>
            <button onClick={()=>{setClick("create")}}>Create</button>
          <button onClick={()=>{setClick("draft")}} >Save as draft</button></div>
          
          </div>
        </form>
      </div>
    )

}
export default Write;