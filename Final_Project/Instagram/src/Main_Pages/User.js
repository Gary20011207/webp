import "./User.css";
import user from "../Graph/usericon.png";
import MyPost from "../Component/MyPost";
import { useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteUser,updateProfile } from 'firebase/auth';
import { getFirestore,collection, doc,setDoc, deleteDoc,getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from"firebase/storage";
import { logout, storage, useAuth } from "../utils/firebase";

const User = () => {
    const db=getFirestore();
    const currentUser=useAuth();
    const navigate=useNavigate();
    const [file,setFile]=useState();
    const [photoURL,setPhotoURL]=useState();
    const imgUrl=photoURL? photoURL:user;
    const [name,setName]=useState('');
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        if(currentUser===undefined){
            setLoading(true);
        }
        else{
            setLoading(false);
            setName(currentUser.displayName);
            setPhotoURL(currentUser.photoURL);
        }
    },[currentUser])
    const handleLogout=()=>{
        logout()
        .then(()=>{
            navigate('/');
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    let deletepost=[];
    let deletenum=-1;

    const  handleDelete=async ()=>{
        if(!currentUser){
            alert('error');
            return;
        }
        const querySnapshot=await getDocs(collection(db,"posts"));
        querySnapshot.forEach((doc)=>{
            if(doc.data().author.uid===currentUser.uid){
                deletenum=deletenum+1;
                deletepost[deletenum]=doc.id;
            }                            
        })
        if(deletenum < 0){
            deleteUser(currentUser).then(()=>{
                console.log('delete succ');
                navigate('/');})
                .catch((err)=>{
                    console.log(err);
                })
            return;            
        }
        deletepost.map(async (post)=>{
            deleteDoc(doc(db,"posts",`${post}`));
            const deleteRef=ref(storage,`post-images/${post}.jpg`);
            deleteObject(deleteRef)
            .then(()=>{ })
            .catch((err)=>{
                console.log(err);
            })
        })
        const deletePhotoRef=ref(storage,`profile-images/${currentUser.uid}.jpg`);
        if(deletePhotoRef){
            deleteObject(deletePhotoRef)
            .then(()=>{ })
            .catch((err)=>{
                console.log(err);
            })
        }                    
        deleteUser(currentUser).then(()=>{
            console.log('D');
            navigate('/');})
            .catch((err)=>{
                console.log(err);
        })  
    }
    const handleUpdate=()=>{
        if(!name){
            alert('Please Enter Name.');
            return;
        }
        else if(!file){
            alert('Please Select Image.');
            return;
        }
        const collectionRef=doc(db,"profile",`${currentUser.uid}`);
        const storageRef=ref(storage,`profile-images/${currentUser.uid}.jpg`);
        const metadata={
            contentType:file.type,
        }
        const uploadimg=uploadBytes(storageRef,file,metadata)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                updateProfile(currentUser,{
                    displayName:name,
                    photoURL:url
                })
                .then(()=>{
                    setDoc(collectionRef,{
                        displayName:name,
                        photoURL:url
                    }).then(()=>{
                        alert('Update Successful!');
                        navigate('/user');
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                    
                })
                .catch((err)=>{
                    console.log(err);
                })
            })
        })
    }
    return (
        <div>
            {loading && <div className="user_loading">Loading...</div> }
            <div>
                <center><h1>&#x500B;&#x4EBA;&#x8CC7;&#x8A0A;</h1>
                </center>
            </div>
            <div>
            <center>{ file ? <img src={URL.createObjectURL(file)} className="photo"></img>:<img src={imgUrl} className="user_photo"></img>}</center>
            <br></br>
            <center>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<input className="upload-btn" type="file" accept="image/png, image/jpeg" onChange={(e)=>setFile(e.target.files[0])}></input></center>
                <div>
                <center>
                    <div>
                    <h2>Email Address :</h2>   <h1><b>{currentUser ? currentUser.email:<span>Loading...</span>}</b></h1>
                    </div>
                    <div>
                    <h2>UserName :</h2> <input className="user_name-input" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                </center>    
                </div>
            </div>
            <br></br>
            <center>
            <button onClick={()=>handleUpdate()} className="func_btn">&#x66F4;&#x6539;</button>
            &emsp;&emsp;
            <button onClick={()=>handleLogout()} className="func_btn">&#x767B;&#x51FA;</button>
            &emsp;&emsp;
            <button onClick={()=>handleDelete()} className="func_btn_delete">&#x522A;&#x9664;</button>
            </center>
            <br/>
            <MyPost />
        </div>
    );
}
 
export default User;