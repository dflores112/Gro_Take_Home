import styled from 'styled-components';

const Submit = styled.input`
background-color: #008181;
color:#fff;
height:35px;
width: 90px;
padding: 10px 8px;
margin: 5px;
border-radius:3px;
font-weight: 500;
border: 0 solid #006767;
text-align:center;
cursor:pointer;

&:hover{
    background-color: #006767;
    transition: background-color .3s ease-out;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
}
&:focus{outline:0;}`;

const Input = styled.input`
margin:3px;
&:focus{outline:0;}`;

const Form = styled.form`
font-family: Helvetica,arial,sans-serif;
font-style:normal;
font-weight:400;
background-color: #fff;
width: 350px;
height:240px;

padding: 25px;
color: #033b4c;
margin: 60px;

&:hover{
    box-shadow: 0 0 16px 0 #e3e2de;
}

`;

const Err = styled.div`
color:red;
`;

const Totals = styled.div`
color: #033b4c;
padding:10px;

&:hover{
    text-decoration: underline .125rem;

}
`;

const styles = {
  Submit, Form, Totals, Err, Input,
};

export { styles as default };
