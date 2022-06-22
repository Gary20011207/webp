import { useParams, useNavigate } from "react-router-dom";
import { getFirestore,doc, getDoc,deleteDoc,updateDoc,arrayUnion,arrayRemove} from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../utils/firebase";
import dislike from "../Graph/heart.png";
import like from "../Graph/likedheart.png";
import "../Main_Pages/Post.css";

const Post = () => {

    const {id}=useParams();
    const db=getFirestore();
    const navigate=useNavigate();

    const currentUser=useAuth();
    const [post,setPost]=useState();
    const [name,setName]=useState();
    const [profileURL,setProfileURL]=useState();
    const [loading,setLoading]=useState(true);
    const [islike,setIsLike]=useState(false);
    const [likenum,setLikenum]=useState();
    const [comment,setComment]=useState('');
    const [edit,setEdit]=useState(false);
    const [editDone,setEditDone]=useState(false);
    const [editContent,setEditContent]=useState('');
    useEffect(()=>{
        fetchdata();
    },[])
    useEffect(()=>{
        if(post){
            if(post.likedby){
                setLikenum(post.likedby.length);
            }
            else{
                setLikenum(0);
            }
            fetchProfile(post.author.uid,currentUser.uid);
        }
    },[post])
    useEffect(()=>{
        if(name && profileURL){
            setLoading(false);
        }
    },[name])
    async function fetchdata(){
        const docRef = doc(db, "posts", `${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setPost(docSnap.data());
          } else {
            console.log("No such document!");
        }
    }
    async function fetchProfile(uid,currentUser){
        const docRef = doc(db, "profile", `${uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setName(docSnap.data().displayName);
            setProfileURL(docSnap.data().photoURL);
            post.likedby.map((l)=>{
                if(l===currentUser){
                    setIsLike(true);
                }
            })
        } else {
            console.log("No such document!");
        }
    }
    async function handleLike(t){
        if(t===true){
            const temp=likenum+1;
            setLikenum(temp);
            setIsLike(true);
            const docRef=doc(db,"posts",`${id}`);
            await updateDoc(docRef,{
                likedby:arrayUnion(currentUser.uid)
            })
        }
        else{
            const temp=likenum-1;
            setLikenum(temp);
            setIsLike(false);
            const docRef=doc(db,"posts",`${id}`);
            await updateDoc(docRef,{
                likedby:arrayRemove(currentUser.uid)
            })
        }
    }
    async function handleComment(){
        if(!comment){
            alert('please input some words');
            return;
        }
        const docRef=doc(db,"posts",`${id}`);
            await updateDoc(docRef,{
                comment:arrayUnion({'content':comment,'by':currentUser.displayName}),
            })
        window.location.href=`/${id}`;

    }
    async function commentDelete(by,c){
        const docRef=doc(db,"posts",`${id}`);
        await updateDoc(docRef,{
            comment:arrayRemove({'content':c,'by':by}),
        })
        window.location.href=`/${id}`;
    }
    async function deletePost(){
        await deleteDoc(doc(db,"posts",`${id}`));
        navigate('/');
    }
    async function handleEdit(){
        const docRef=doc(db,"posts",`${id}`);
        await updateDoc(docRef,{
            content:editContent,
        })    
        setEdit(false);
        setEditDone(false);
        window.location.href=`/${id}`;
    }
    useEffect(()=>{
        if(editDone){
            handleEdit();
        }
    },[editDone])
    return (
        <div className="postpage_wrapper">
            { loading && <h1>Loading...</h1> }
            { !(loading) && 
            <div className="post_wrapper">
                <div className="post_img-wrapper">
                    <img src={post.url} className="post_img"></img>
                </div>
                <div className="post_list-wrapper">
                    <div className="post_user_wrapper">
                        <img src={profileURL} className="post_user_img"></img>
                        <div className="post_user_name">{name}</div>
                        {(post.author.uid===currentUser.uid)&&<button className="post_edit" onClick={()=>setEdit(~edit)}>&#x7DE8;&#x8F2F;</button>}
                        {(post.author.uid===currentUser.uid)&&<button className="post_delete" onClick={()=>deletePost()}>&#x522A;&#x9664;</button>}
                    </div>
                    <div className="content_wrapper">
                        <div className="content_list"><b>{post.content}</b></div>
                        {edit && <input type="text" value={editContent} onChange={(e)=>setEditContent(e.target.value)} placeholder='&#x8ACB;&#x91CD;&#x65B0;&#x64B0;&#x5BEB;&#x4F60;&#x7684;&#x8CBC;&#x6587;' className="content_edit-input"></input>}
                        {edit && <button onClick={()=>setEditDone(true)} className="content_edit-btn">&#x5F35;&#x8CBC;</button> }
                    </div>
                    <div className="function_wrapper">
                        <div className="like_wrapper">
                            { islike ? <img className="like_icon" src={like} onClick={()=>handleLike(false)}></img> : <img className="like_icon" src={dislike} onClick={()=>handleLike(true)}></img>}
                            <div className="like_number">
                                <b>{likenum}</b> &#x500B;&#x559C;&#x6B61;
                            </div>
                        </div>
                    </div>
                    <div className="comment_wrapper">
                        <div className="comment_list">
                            { (post.comment) && post.comment.map((c,i)=>{
                                return <div className="comment_content">---<b>{c.content}</b>---<br></br><span className="comment_by"><b>{c.by}</b>&#x2014;&#x7684;&#x7559;&#x8A00;</span> { (c.by===currentUser.displayName) && <button className="comment_delete" onClick={()=>commentDelete(c.by,c.content)}>&#x522A;&#x9664;</button> }</div>
                            })}
                        </div>
                        <br></br>
                        <input className="comment_input" onChange={(e)=>setComment(e.target.value)} value={comment} placeholder='&#x8ACB;&#x5BEB;&#x4E0B;&#x4F60;&#x7684;&#x7559;&#x8A00;'></input>
                        <button className="comment_send" onClick={()=>handleComment()}>&#x767C;&#x9001;</button>
                    </div>
                </div>
            </div> }
        </div>
    );
}
 
export default Post;
