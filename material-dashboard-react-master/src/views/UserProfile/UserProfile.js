import React , { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Input from "@material-ui/core/Input";
import classNames from "classnames";
import axios from 'axios';
import Table from "components/Table/Table.js";

import avatar from "assets/img/faces/marc.jpg";
import stylesInput from "assets/jss/material-dashboard-react/components/customInputStyle.js";
const useStylesInput = makeStyles(stylesInput);
 

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {

  const classesInput = useStylesInput();
  const [userId, setUserId] = useState(0);

  const [produtos, setProdutos] = useState([]);
  const [preco, setPreco] = useState("");
  const [nome, setNome] = useState("");


  const getProdutos = async (evt) => {
    const response = await axios.get(`http://localhost:8080/api/produtos`)
    const data = await response.data
   
      setProdutos(data)
  
  }

  useEffect( () => {
    getProdutos()
  },[userId])
//   function cadastrarProduto(data){

//       console.log('produto:',data)
// }

const cadastrarProduto = (evt) => {
  console.log(preco,nome)
  
  const datas = {
    nome: nome,
    preco: preco

  };
  console.log(datas)
  axios.post(`http://localhost:8080/api/produtos`,{ nome: nome, preco: preco })
  .then(res => {
    console.log(res)
  })
  evt.preventDefault();
 // window.location.reload(true);

  //alert(`Submitting Name ${preco}`)
}
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <form onSubmit={cadastrarProduto}>
       
          <Card>

            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Cadastro de Produtos        </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>

                  <Input
                   value={nome}
                   onChange={e => setNome(e.target.value)}  
                    style={{marginTop:"43px"}}
                    placeholder="Nome do produto"
                    id="produto"
                
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <Input
                  value={preco}
                  onChange={e => setPreco(e.target.value)}  
                   style={{marginTop:"43px"}}
                    placeholder="Preço do produto"
                    id="preco-produto"
                  
                  />
                 
                </GridItem>
              </GridContainer>
            
              
         
            </CardBody>
            <CardFooter>

              <Button  type="submit"  color="primary">Cadastrar</Button>
            </CardFooter>
          </Card>
          </form>

        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
            Lista de produtos
              
            </h4>
         
          </CardHeader>
          <CardBody>
          
              
            <Table
              tableHeaderColor="primary"
              tableHead={[ "Nome", "Preço","Alterar","Excluir"]}
              dados={produtos}
          
            />
       
          </CardBody>
        </Card>
      </GridItem>
      </GridContainer>
    </div>
  );
}
