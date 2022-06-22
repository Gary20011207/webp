import { Link } from 'react-router-dom';
import search from '../Graph/search.png';
import user from '../Graph/usericon.png';
import add from '../Graph/addicon.png';
import '../Component/Header.css';
import { useEffect, useState } from 'react';
import { useAuth} from '../utils/firebase';
import { collection,query,getDocs, where, getFirestore} from 'firebase/firestore';

const Header = () => {
    const db=getFirestore();
    const [loading,setLoading]=useState(false);
    const [searchName,setSearchName]=useState('');
    const currentUser=useAuth();
    const [content,setContent]=useState([]);
    const [id,setId]=useState([]);
    const [searchNow,setSearchNow]=useState(false);
    const [searchDone,setSearchDone]=useState(false);

    useEffect(()=>{
        if(currentUser===undefined){
            setLoading(true);
        }
        else{
            setLoading(false);
        }
    },[currentUser])

    useEffect(()=>{
        if(searchNow===true){
            if(content.length===0||id.length===0){
                alert('user not found, or the user did not post anything');
                setSearchNow(false);
                return;
            }
            setSearchNow(false);
            setSearchDone(true);
        }
    },[searchNow])
    async function handleSearch(){
        if(!searchName){
            alert('please input some words');
            return
        }
        setContent([]);
        setId([]);
        const collectionRef=collection(db,"posts");
        const q=query(collectionRef,where("author.displayName","==",`${searchName}`));
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((docs)=>{
            setContent((prev)=>[...prev,docs.data()]);
            setId((prev)=>[...prev,docs.id]);
        })
        setSearchNow(true);
    }
    return (
        <div className="header_wrapper">
            {loading && <div className="header_loading">Loading...</div> }
            { !(loading) && <Link to="/" className="header_title">
            <img className='LOGO' src="https://cdn-icons-png.flaticon.com/512/1362/1362894.png" width={45} height={45}></img>&nbsp;Instagram
            </Link>}
            { !(loading) && <div className="header_search">
                <input type='text' className='header_search-input' placeholder='&#x5C0B;&#x627E;&#x7528;&#x6236;' value={searchName} onChange={(e)=>setSearchName(e.target.value)}/>
                <img src={search} className="header_search-icon" onClick={()=>handleSearch()}></img>
            </div>}
            { !(loading) && 
                <div className="header_add-icon">
                <Link to='/newpost'><img src={add}></img></Link>
                </div>
            }
            { !(loading) && currentUser && <div className="header_user-icon">
                <Link to='/user'><img src={user}></img></Link>
            </div>}
            { !(loading) && !(currentUser) && 
            <Link to="/signin" className="header_signin">
            &#x767B;&#x5165;
            </Link>
            }
            {!(loading) && (searchDone) && 
            <div className='header_search-list'>
                {content.map((c,i)=>{
                    return <a href={`/${id[i]}`} className='header_search-item'>{c.content}</a>
                })}
            </div>
            }
        </div>
    );
}
 
export default Header;