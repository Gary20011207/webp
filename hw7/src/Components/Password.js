const password = () => {
    var output = <div><img src={require('./Password_Image.png')} class="Password_Image" />
        <input type="password" class="password" onChange={(passtext) => { console.log(passtext.target.value) }}></input></div>

    return output;
}

export default password;