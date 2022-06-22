import { getFirestore,collection,query,getDocs, orderBy} from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../utils/firebase";
import { Link } from "react-router-dom";
import "../Main_Pages/Main.css";

const Main = () => {
    const db=getFirestore();
    const currentUser=useAuth();
    const [imgurls,setImgurls]=useState([]);
    const [loading,setLoading]=useState(true);
    const [postid,setPostid]=useState([]);
    const [post,setPost]=useState([]);

    useEffect(()=>{
        fetchdata();
    },[])
    async function fetchdata(){
        const collectionRef=collection(db,"posts");
        const q=query(collectionRef,orderBy("createdAt","desc"));
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((docs)=>{
            setPost((prev)=>[...prev,docs.data()]);
            setPostid((prev)=>[...prev,docs.id]);
            setImgurls((prev)=>[...prev,docs.data().url]);
        })
        setLoading(false);
    }

    return (
        <body>
        <div className="mainPage_wrapper">
            { !(loading) && 
                ( post.map((p,i)=>{
                    return(
                        <div className="mainPage_post-wrapper">
                            <Link to={`/${postid[i]}`} className="mainPage_img-wrapper">
                                <img src={p.url} className="mainPage_img"></img>
                            </Link>
                        </div>
                        )}) 
                ) 
            }
        </div>
        </body>
    );
}
 
export default Main;