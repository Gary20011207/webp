const username = () => {
    var output = <div><img src={require('./UserName_Image.png')} class="UserName_Image" />
        <input class="username" onChange={(usertext) => { console.log(usertext.target.value) }}></input></div>

    return output;
}

export default username;