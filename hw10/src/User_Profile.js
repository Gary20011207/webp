import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
const Personalpage = ({ useState, useEffect }) => {
    const [id, setid] = useState('');
    const [username, setusername] = useState('');
    const [avatar, setavatar] = useState('');
    const [blog, setblog] = useState('');
    const [followers, setfollowers] = useState('');
    const [following, setfollowing] = useState('');
    const [company , setcompany] = useState('');
    const [location , setlocation] = useState('');
    useEffect(() => {
        setInterval(() => {
            fetch('https://api.github.com/users/gary20011207', { method: "GET" })
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    console.log(res);
                    setid(res.login);
                    setusername(res.name);
                    setavatar(res.avatar_url);
                    setblog(res.blog);
                    setfollowers(res.followers);
                    setfollowing(res.following);
                    setcompany(res.company);
                    setlocation(res.location);
                })
        }, 500)
    }, [])

    return (
        <div>
            <Avatar alt="IU" src={avatar} sx={{ width: 100, height: 100, margin: "auto" }} />
            <h1>{username}</h1>
            <div style={{ width: 300, margin: "auto" }}>
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={1}
                    sx={{ width: 200, margin: "auto" }}
                >
                    <p>Followers : {followers}</p>
                    <p>Followering : {following}</p>
                </Stack>
                
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={1}
                    sx={{ width: 300, margin: "auto" }}
                >
                <p>Country : {company}</p>
                <p>City : {location}</p>
                </Stack>
            </div>
            <Button variant="outlined" sx={{ width: 200}}>Edit Profile</Button>
            <div style={{margin: "auto",width: 150}}>
            <p style={{float:'left'}}>ID :  {id}</p>
            </div>
            <div style={{margin: "auto",width: 400}}>
            <p><LinkRoundedIcon sx={{position:'relative',right:345,top:38}}/><a href={blog}>{blog}</a></p>
            </div>
        </div >
    )
};

export default Personalpage;