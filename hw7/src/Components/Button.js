const button = () => {
    var output = <div><button type="button" class="button_border" onClick={() => { alert('Login Successful !') }}>
        <img src={require('./Button_Image.png')} class="Button_Image" /></button></div>

    return output;
}

export default button;