const Button ={
    button: '<button id="mybutton">Press Me</button>',
    attachEl: () => {
        document.getElementById('mybutton').addEventListener('click', 
        () => {
            console.log('clicked');
        })
    }
}

export default Button;
