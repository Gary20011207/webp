import "../Component/MyPost.css";
import { getFirestore,collection,query,getDocs, where} from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../utils/firebase";
import { Link } from "react-router-dom";

const MyPost = () => {
    const db=getFirestore();
    const currentUser=useAuth();
    const [loading,setLoading]=useState(true);
    const [imgURL,setImgURL]=useState([]);
    const [id,setId]=useState([]);
    async function fetchDate(){
        const q = query(collection(db,"posts"),where("author.uid","==",`${currentUser.uid}`));
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc)=>{
            setImgURL((prev)=>[...prev,doc.data().url]);
            setId((prev)=>[...prev,doc.id]);
        })
        setLoading(false);
    }
    useEffect(()=>{
        if(currentUser!==undefined){
            fetchDate();
        }
    },[currentUser])
    return (
        <dvi className="mypost_wrapper">
            {loading && <h1>Loading...</h1>}
            <center>{!(loading) && id.length===0&& <h1>&#x6B64;&#x7528;&#x6236;&#x5C1A;&#x672A;&#x767C;&#x5E03;&#x4EFB;&#x4F55;&#x8CBC;&#x6587;</h1>}</center>
            {!(loading) && id && 
            <div className="mypost_list">
                { imgURL.map((url,i)=>{
                    return <Link to={`/${id[i]}`} className="mypost_link"><img src={url} className="mypost_img"></img></Link>
                }) }
            </div>
            }
        </dvi>
    );
}
 
export default MyPost;