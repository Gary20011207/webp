import { useState } from "react";
import "../Main_Pages/NewPost.css";
import preview from "../Graph/photo.png";
import { getFirestore } from "firebase/firestore";
import { collection,serverTimestamp,doc,setDoc } from "firebase/firestore";
import { useAuth, storage } from '../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from"firebase/storage";
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const db=getFirestore();
    const currentUser=useAuth();
    const [file,setFile]=useState();
    const imgUrl=file? URL.createObjectURL(file):preview;
    const [content,setContent]=useState('');
    const navigate=useNavigate();

    const handleSubmit=()=>{
        if(!file){
            alert('Please Choose The Photo To Update.');
            return;
        }
        if(!currentUser){
            alert('Please Login.');
            return;
        }
        if(!(currentUser.displayName)||!(currentUser.photoURL)){
            alert('Please Complete Your Profile.');
            return;
        }

        const collectionRef=doc(collection(db,"posts"));
        const storageRef=ref(storage,`post-images/${collectionRef.id}.jpg`);
        const metadata={
            contentType:file.type,
        }

        const uploadimg=uploadBytes(storageRef,file,metadata)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                const docRef=setDoc(collectionRef,{
                    content,
                    createdAt:serverTimestamp(),
                    author: {
                        displayName: currentUser ? currentUser.displayName: '',
                        photoURL:currentUser ? currentUser.photoURL: '',
                        uid: currentUser ? currentUser.uid: '',
                        email: currentUser ? currentUser.email: '',
                    },
                    url,
                })
                .then(()=>{
                    setContent('');
                    setFile();
                    alert('You Post Successfully!');
                    navigate('/');
                })
                .catch((err)=>{
                    console.log(err);
                })
            })
        })
        }
        
    return (
        <div>
            <center><h1>&#x767C;&#x5E03;&#x8CBC;&#x6587;</h1></center>
            <br></br>
            <center><img src={imgUrl} className="newpost_img"></img><br/></center>
            <br></br>
            <center><input type="file" accept="image/png, image/jpeg" onChange={(e)=>setFile(e.target.files[0])}></input></center>
            <br></br>
            <center><textarea className="content" rows="10" cols="60" placeholder="&#x8ACB;&#x64B0;&#x5BEB;&#x4F60;&#x7684;&#x8CBC;&#x6587;..." value={content} onChange={(e)=>setContent(e.target.value)}></textarea></center>
            <br></br>
            <center><button className="newpost_send" onClick={()=>handleSubmit()}>&#x767C;&#x5E03;</button></center>
        </div>
    );
}
 
export default NewPost;